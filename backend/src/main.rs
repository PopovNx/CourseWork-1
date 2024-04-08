use actix_cors::Cors;
use actix_web::{get, web, App, HttpServer};
use dotenvy::dotenv;
use log::info;
use serde::Deserialize;

pub mod database;
pub mod files_processor;
pub mod routes;

#[derive(Debug, Deserialize)]
struct ServerConfig {
    endpoint: String,
    database_url: String,
}

#[get("/")]
async fn index() -> &'static str {
    "Hello from backend"
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv().unwrap();
    env_logger::init();
    let config: ServerConfig = envy::from_env().unwrap();
    let db = database::MusicDb::new(&config.database_url).await.unwrap();
    let state = web::Data::new(db);
    let server = HttpServer::new(move || {
        let cors = Cors::default()
            .allowed_origin("http://localhost:5173")
            .allow_any_method()
            .allow_any_header();

        App::new()
            .wrap(cors)
            .app_data(state.clone())
            .wrap(actix_web::middleware::Logger::default())
            .wrap(actix_web::middleware::NormalizePath::trim())
            .configure(routes::init_routes)
            .service(index)
    })
    .bind(&config.endpoint)?
    .workers(2)
    .run();

    info!("Server running at http://{}", &config.endpoint);
    server.await
}
