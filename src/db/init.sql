CREATE TABLE IF NOT EXISTS users (
  user_id SERIAL PRIMARY KEY,
  name	TEXT NOT NULL,
  score   INTEGER DEFAULT 0
)