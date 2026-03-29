use color_eyre::eyre;
use futures::stream::StreamExt;
use reqwest_eventsource::{Event, EventSource};
use std::{thread, time::Duration};
use tokio::sync::mpsc::{self, Receiver};

use crate::types::Todo;

pub fn get_todos(url: String, token: String) -> Receiver<Vec<Todo>> {
    let (tx, rx) = mpsc::channel(8);

    tokio::spawn(async move {
        loop {
            let todos = loop {
                match fetch_todos(&url, &token).await {
                    Ok(todos) => break todos,
                    Err(err) => {
                        eprintln!("Error fetching todos: {}", err);
                        thread::sleep(Duration::from_secs(5));
                    }
                }
            };

            tx.send(todos).await.unwrap();

            let mut event_source = EventSource::new(
                reqwest::Client::new()
                    .get(format!("{}{}", url, "/api/todos/sse"))
                    .header("Authorization", format!("Bearer {}", token)),
            )
            .unwrap();
            while let Some(event) = event_source.next().await {
                match event {
                    Ok(Event::Open) => {}
                    Ok(Event::Message(message)) => {
                        let todos = serde_json::from_str(&message.data).unwrap();
                        tx.send(todos).await.unwrap();
                    }
                    Err(err) => {
                        eprintln!("Error: {}", err);
                        break;
                    }
                }
            }
        }
    });

    rx
}

async fn fetch_todos(url: &str, token: &str) -> eyre::Result<Vec<Todo>> {
    let response = reqwest::Client::new()
        .get(format!("{}{}", url, "/api/todos"))
        .header("Authorization", format!("Bearer {}", token))
        .send()
        .await?
        .text()
        .await?;

    Ok(serde_json::from_str(&response)?)
}
