// cargo run
// http://127.0.0.1:8000/

use std::io::prelude::*;
use std::net::{TcpListener, TcpStream};
use std::thread;
use std::time::{Instant};
use serde::{Deserialize, Serialize};
use std::fs;
use tiny_http::{Server, Response, StatusCode};

#[derive(Debug, Serialize, Deserialize)]
struct CalculationRequest {
    n: u64,
}

#[derive(Debug, Serialize, Deserialize)]
struct CalculationResponse {
    result: u64,
    process_time: u64, // in milliseconds
}

fn main() {
    let listener = TcpListener::bind("127.0.0.1:8000").unwrap();
    println!("Server running at http://127.0.0.1:8000/");

    let server = Server::http("127.0.0.1:8000").unwrap();

    for request in server.incoming_requests() {
        if request.url() == "/" {
            let contents = fs::read_to_string("index.html").unwrap();
            let response = Response::from_string(contents)
                .with_status_code(StatusCode(200));
            request.respond(response).unwrap();
        } else {
            let response = Response::from_string("404 Not Found".to_string())
                .with_status_code(StatusCode(404));
            request.respond(response).unwrap();
        }
    }





    for stream in listener.incoming() {
        match stream {
            Ok(stream) => {
                thread::spawn(|| {
                    handle_client(stream).unwrap_or_else(|error| eprintln!("{:?}", error));
                });
            }
            Err(e) => {
                eprintln!("Error: {}", e);
            }
        }
    }
}

fn handle_client(mut stream: TcpStream) -> std::io::Result<()> {
    let mut buffer = [0; 1024];
    stream.read(&mut buffer)?;

    let response = if buffer.starts_with(b"POST /calculate HTTP/1.1\r\n") {
        let request_body = String::from_utf8_lossy(&buffer);
        if let Some(n) = extract_number(&request_body) {
            let start_time = Instant::now();
            let result = lucas_number(n);
            let elapsed_time = start_time.elapsed().as_millis();

            let response_body = serde_json::to_string(&CalculationResponse {
                result,
                process_time: elapsed_time as u64,
            }).unwrap();

            format!("HTTP/1.1 200 OK\r\nContent-Length: {}\r\n\r\n{}", response_body.len(), response_body)
        } else {
            "HTTP/1.1 400 BAD REQUEST\r\n\r\n".to_string()
        }
    } else {
        "HTTP/1.1 404 NOT FOUND\r\n\r\n".to_string()
    };

    stream.write_all(response.as_bytes())?;
    stream.flush()?;

    Ok(())
}

fn extract_number(request_body: &str) -> Option<u64> {
    let parts: Vec<&str> = request_body.split('\n').collect();
    if let Some(last_part) = parts.last() {
        if let Ok(json_data) = serde_json::from_str::<CalculationRequest>(last_part) {
            return Some(json_data.n);
        }
    }
    None
}

fn lucas_number(n: u64) -> u64 {
    if n == 0 {
        return 2;
    } else if n == 1 {
        return 1;
    }

    let mut a = 2;
    let mut b = 1;
    let mut result = 0;
    for _ in 2..=n {
        result = a + b;
        a = b;
        b = result;
    }
    result
}
