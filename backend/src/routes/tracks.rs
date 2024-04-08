use std::path::Path;

use crate::{
    database::{MusicDb, Track},
    files_processor::{AUDIO_NAME, POSTER_NAME, TRACKS_DIR},
};
use actix_files as afs;
use actix_multipart::form::{tempfile::TempFile, text::Text, MultipartForm};
use actix_web::{get, post, web, HttpResponse, Responder};

#[get("")]
async fn get_tracks(db: web::Data<MusicDb>) -> impl Responder {
    let tracks = db.tracks_get_all().await;
    match tracks {
        Ok(tracks) => HttpResponse::Ok().json(tracks),
        Err(e) => HttpResponse::InternalServerError().body(format!("Error: {}", e)),
    }
}

#[derive(MultipartForm)]
struct NewTrackRequest {
    title: Text<String>,
    content: TempFile,
    poster: TempFile,
}

impl NewTrackRequest {
    fn is_valid_title(&self) -> bool {
        !self.title.is_empty() && self.title.len() <= 100
    }
    fn is_valid_content(&self) -> bool {
        if let Some(f_mime) = &self.content.content_type {
            return f_mime.type_() == mime::AUDIO;
        }
        false
    }

    fn is_valid_poster(&self) -> bool {
        if let Some(f_mime) = &self.poster.content_type {
            return f_mime.type_() == mime::IMAGE;
        }
        false
    }
    pub fn is_valid(&self) -> bool {
        self.is_valid_title() && self.is_valid_content() && self.is_valid_poster()
    }
}

#[post("")]
async fn create_track(
    db: web::Data<MusicDb>,
    MultipartForm(form): MultipartForm<NewTrackRequest>,
) -> impl Responder {
    if !form.is_valid() {
        return HttpResponse::BadRequest().finish();
    }
    let title = form.title.trim();
    let content = form.content;
    let poster = form.poster;

    let id = uuid::Uuid::new_v4().to_string();
    let output_dir = Path::new(TRACKS_DIR).join(&id);
    if !output_dir.exists() {
        std::fs::create_dir_all(&output_dir).unwrap();
    }

    let duration =
        crate::files_processor::process_files(content.file, poster.file, &output_dir).await;

    let duration = match duration {
        Ok(duration) => duration,
        Err(e) => return HttpResponse::InternalServerError().body(format!("Error: {}", e)),
    };

    let new_task = Track {
        id,
        title: title.to_string(),
        duration,
    };
    let new_task = db.tracks_insert(new_task).await;

    match new_task {
        Ok(new_task) => HttpResponse::Ok().json(new_task),
        Err(_) => HttpResponse::InternalServerError().finish(),
    }
}

#[get("/{id}")]
async fn get_track(db: web::Data<MusicDb>, id: web::Path<String>) -> impl Responder {
    let track = db.tracks_get_by_id(&id).await;

    match track {
        Ok(track) => HttpResponse::Ok().json(track),
        Err(_) => HttpResponse::NotFound().finish(),
    }
}

#[derive(serde::Deserialize, Debug)]
enum FileType {
    #[serde(rename = "content", alias = "audio")]
    Content,
    #[serde(rename = "poster", alias = "image")]
    Poster,
}

#[get("/{id}/{file_type}")]
async fn stream_track(
    db: web::Data<MusicDb>,
    path: web::Path<(String, FileType)>,
) -> actix_web::Result<afs::NamedFile> {
    let track = db.tracks_get_by_id(&path.0).await;
    let track = match track {
        Ok(track) => track,
        Err(_) => return Err(actix_web::error::ErrorNotFound("Track not found")),
    };

    let name = match path.1 {
        FileType::Content => AUDIO_NAME,
        FileType::Poster => POSTER_NAME,
    };
    let file_path = Path::new(TRACKS_DIR).join(track.id).join(name);
    if !std::path::Path::new(&file_path).exists() {
        return Err(actix_web::error::ErrorNotFound("Track file not found"));
    }

    let file = afs::NamedFile::open_async(file_path).await?;

    Ok(file)
}

pub fn init_routes(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/tracks")
            .service(create_track)
            .service(get_tracks)
            .service(get_track)
            .service(stream_track),
    );
}
