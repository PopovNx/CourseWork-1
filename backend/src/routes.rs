
mod tracks;


pub fn init_routes(cfg: &mut actix_web::web::ServiceConfig) {
    tracks::init_routes(cfg);
}
