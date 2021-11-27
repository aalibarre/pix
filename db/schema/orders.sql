DROP TABLE IF EXISTS orders CASCADE;

CREATE TABLE orders (

  id SERIAL PRIMARY KEY NOT NULL,
  restaurant_id INTEGER REFERENCES restaurants(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  total_quantity INTEGER NOT NULL DEFAULT 0,
  total_price INTEGER NOT NULL DEFAULT 0,
  pending BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP

);
