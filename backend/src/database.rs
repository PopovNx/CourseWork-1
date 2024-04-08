use sqlx::{migrate, Pool, Sqlite, SqlitePool};

mod track;
pub use track::Track;

#[derive(Debug)]
pub struct MusicDb {
    pool: Pool<Sqlite>,
}

impl MusicDb {
    pub async fn new(database_url: &str) -> Result<MusicDb, sqlx::Error> {
        let pool = SqlitePool::connect(&database_url).await?;
        migrate!("./migrations").run(&pool).await?;
        log::info!("Database connected");
        Ok(MusicDb { pool })
    }
}
