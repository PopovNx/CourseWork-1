use sqlx::prelude::FromRow;

#[derive(Debug, FromRow, serde::Serialize, serde::Deserialize)]
pub struct Track {
    pub id: String,
    pub title: String,
    pub duration: f64,
}

impl super::MusicDb {
    pub async fn tracks_get_all(&self) -> Result<Vec<Track>, sqlx::Error> {
        sqlx::query_as!(Track, "SELECT * FROM tracks order by id")
            .fetch_all(&self.pool)
            .await
    }

    pub async fn tracks_insert(&self, track: Track) -> Result<Track, sqlx::Error> {
        let result = sqlx::query_as!(
            Track,
            "INSERT INTO tracks (title, id, duration) VALUES (?, ?, ?) RETURNING *",
            track.title,
            track.id,
            track.duration
        )
        .fetch_one(&self.pool)
        .await?;
        Ok(result)
    }
    pub async fn tracks_get_by_id(&self, id: &str) -> Result<Track, sqlx::Error> {
        let result = sqlx::query_as!(Track, "SELECT * FROM tracks WHERE id = ?", id)
            .fetch_one(&self.pool)
            .await?;
        Ok(result)
    }
}
