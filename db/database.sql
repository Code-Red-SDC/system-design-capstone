DROP DATABASE IF EXISTS products;
CREATE DATABASE products;

CREATE TABLE products (
  id INT PRIMARY KEY NOT NULL,
  name VARCHAR(250) NOT NULL,
  slogan VARCHAR(250),
  description VARCHAR(500),
  category VARCHAR(250) NOT NULL,
  defaultPrice INT NOT NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT NOW(),
  updatedAt TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE features (
  productId INT NOT NULL,
  feature VARCHAR(100) NOT NULL,
  value VARCHAR(100) NOT NULL,
  FOREIGN KEY (productId) REFERENCES products(id)
);

CREATE TABLE styles (
  id INT PRIMARY KEY NOT NULL,
  productId INT NOT NULL,
  name VARCHAR(100),
  salePrice INT,
  originalPrice INT NOT NULL,
  defaultStyle INT NOT NULL,
  FOREIGN KEY (productId) REFERENCES products(id)
);

CREATE TABLE photos (
  styleId INT NOT NULL,
  url VARCHAR(255) NOT NULL,
  thumbnailUrl VARCHAR(255) NOT NULL,
  FOREIGN KEY (styleId) REFERENCES styles(id)
);

CREATE TABLE skus (
  styleId INT NOT NULL,
  id INT PRIMARY KEY NOT NULL,
  size VARCHAR(25) NOT NULL,
  quantity INT NOT NULL,
  FOREIGN KEY (styleId) REFERENCES styles(id)
);

CREATE TABLE related (
  productId INT NOT NULL,
  relatedId INT NOT NULL,
  FOREIGN KEY (productId) REFERENCES products(id)
);