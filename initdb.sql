CREATE TABLE IF NOT EXISTS users(
  id SERIAL PRIMARY KEY,
  name VARCHAR(50),
  balance INT
);

CREATE TABLE IF NOT EXISTS stores(
  id SERIAL PRIMARY KEY,
  name VARCHAR(50),
  img_header TEXT,
  balance INT,
  created_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS store_product(
  store_id INT REFERENCES stores(id),
  user_id INT REFERENCES users(id),
  PRIMARY KEY(store_id, user_id)
);

CREATE TABLE IF NOT EXISTS products(
  id SERIAL PRIMARY KEY,
  name VARCHAR(50),
  img_url TEXT,
  price INT
);

CREATE TABLE IF NOT EXISTS reviews(
  id SERIAL PRIMARY KEY,
  trx_header_id INT REFERENCES trx_headers(id),
  review TEXT,
  rating INT CONSTRAINT ratingCheck CHECK(rating >= 1 AND rating <= 5),
  created_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS trx_headers(
  id SERIAL PRIMARY KEY,
  store_id INT REFERENCES stores(id),
  user_id INT REFERENCES users(id),
  status VARCHAR(50),
  ordered_at TIMESTAMP,
  canceled_at TIMESTAMP,
  confirmed_at TIMESTAMP,
  ready_at TIMESTAMP,
  done_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS trx_details(
  trx_header_id INT REFERENCES trx_headers(id),
  product_id INT REFERENCES products(id),
  PRIMARY KEY (trx_header_id, product_id
);