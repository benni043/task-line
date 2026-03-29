use chrono::NaiveDate;
use serde::{Deserialize, Serialize};

pub type UUID = String;

#[derive(Debug, Serialize, Deserialize)]
pub struct Todo {
    pub uuid: UUID,
    pub title: String,
    pub note: String,
    pub time: Option<Time>,
    pub tags: Vec<UUID>,
    pub category: Option<UUID>,
    pub checks: Vec<NaiveDate>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct TimeRange {
    pub start: NaiveDate,
    pub end: NaiveDate,
}

const fn default_start() -> i64 {
    6
}

const fn default_end() -> i64 {
    0
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(tag = "mode")]
pub enum TimeRecurring {
    #[serde(rename = "daily")]
    Daily {},

    #[serde(rename = "weekly")]
    Weekly {
        #[serde(default = "default_start")]
        start: i64,
        #[serde(default = "default_end")]
        end: i64,
    },
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(tag = "type")]
pub enum Time {
    #[serde(rename = "range")]
    Range {
        #[serde(flatten)]
        inner: TimeRange,
    },

    #[serde(rename = "recurring")]
    Recurring {
        #[serde(flatten)]
        inner: TimeRecurring,
    },
}
