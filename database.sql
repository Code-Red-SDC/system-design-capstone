DROP DATABASE IF EXISTS products;
CREATE DATABASE products;

CREATE TABLE products (
  id INT PRIMARY KEY NOT NULL,
  campus VARCHAR(10) NOT NULL,
  name VARCHAR(25) NOT NULL,
  slogan VARCHAR(50),
  description VARCHAR(250),
  category VARCHAR(25) NOT NULL,
  defaultPrice DECIMAL(5, 2) NOT NULL,
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME
);

CREATE TABLE features (
  feature VARCHAR(25) NOT NULL,
  value VARCHAR(25) NOT NULL,
  id INT NOT NULL,
  FOREIGN KEY (id) REFERENCES products(id)
);

CREATE TABLE styles (
  styleId INT PRIMARY KEY NOT NULL,
  name VARCHAR(25),
  originalPrice DECIMAL(5, 2) NOT NULL,
  salePrice DECIMAL(5, 2) NOT NULL,
  default BOOLEAN NOT NULL
  id INT NOT NULL,
  FOREIGN KEY (id) REFERENCES products(id)
);

CREATE TABLE photos (
  thumbnailUrl VARCHAR(255) NOT NULL,
  url VARCHAR(255) NOT NULL,
  styleId INT NOT NULL,
  FOREIGN KEY (styleId) REFERENCES styles(styleId)
);

CREATE TABLE skus (
  skuId INT PRIMARY KEY NOT NULL,
  quantity INT NOT NULL,
  size VARCHAR(5) NOT NULL,
  styleId INT NOT NULL,
  FOREIGN KEY (styleId) REFERENCES styles(styleId)
);

CREATE TABLE related (
  relatedId INT NOT NULL,
  id INT NOT NULL,
  FOREIGN KEY (relatedId) REFERENCES products(id),
  FOREIGN KEY (id) REFERENCES products(id)
);