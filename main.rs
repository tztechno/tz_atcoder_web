#[macro_use] extern crate rocket;

use std::path::{Path, PathBuf};
use rocket::fs::NamedFile;
use rocket::Config;

#[get("/")]
async fn index() -> Option<NamedFile> {
    NamedFile::open(Path::new("index.html")).await.ok()
}

#[get("/<file..>", rank = 2)]
async fn files(file: PathBuf) -> Option<NamedFile> {
    NamedFile::open(Path::new("static/").join(file)).await.ok()
}

#[launch]
fn rocket() -> _ {
    let config = Config::figment().merge(("port", 8080));
    rocket::custom(config)
        .mount("/", routes![index, files])
}

