use std::ops::Add;

use chrono::{Days, NaiveDate};
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

impl Todo {
    pub fn is_today(&self) -> bool {
        let Some(time) = &self.time else {
            return false;
        };

        let range = time.get_time_range();

        for check in &self.checks {
            if range.start <= *check && *check <= range.end {
                return false;
            }
        }

        let now = chrono::Local::now().naive_local().date();
        if range.start <= now && now <= range.end {
            return true;
        }

        false
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct TimeRange {
    pub start: NaiveDate,
    pub end: NaiveDate,
}

const fn default_start() -> u64 {
    6
}

const fn default_end() -> u64 {
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
        start: u64,
        #[serde(default = "default_end")]
        end: u64,
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

impl Time {
    pub fn get_time_range(&self) -> TimeRange {
        match self {
            Time::Range { inner } => inner.clone(),
            Time::Recurring { inner } => match inner {
                TimeRecurring::Daily {} => {
                    let now = chrono::Local::now();

                    TimeRange {
                        start: now.date_naive(),
                        end: now.date_naive(),
                    }
                }
                TimeRecurring::Weekly { start, end } => {
                    let now = chrono::Local::now();

                    TimeRange {
                        start: now.add(Days::new(*start)).date_naive(),
                        end: now.add(Days::new(*end)).date_naive(),
                    }
                }
            },
        }
    }
}
