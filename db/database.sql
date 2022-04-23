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

--\c products to go into products database
--\dt to view tables
--\d table to describe specific table
--\copy products (id, name, slogan, description, category, defaultPrice) FROM './csv/product.csv' (FORMAT CSV, HEADER, DELIMITER ',');
--\copy tempFeatures FROM './csv/features.csv' (FORMAT CSV, HEADER, DELIMITER ',');
--\copy styles FROM './csv/styles.csv' (FORMAT CSV, null "null", HEADER, DELIMITER ',');
--\copy tempPhotos FROM './csv/photos.csv' (FORMAT CSV, HEADER, DELIMITER ',');
--\copy skus FROM './csv/skus.csv' (FORMAT CSV, HEADER, DELIMITER ',');
--\copy tempRelated FROM './csv/related.csv' (FORMAT CSV, HEADER, DELIMITER ',');
--ALTER TABLE features ADD CONSTRAINT productId FOREIGN KEY(productId) REFERENCES products(id) ON DELETE CASCADE ON UPDATE CASCADE;
--ALTER TABLE features ALTER COLUMN productId SET NOT NULL;
--ALTER TABLE photos ALTER COLUMN styleId SET NOT NULL;
--ALTER TABLE photos ADD CONSTRAINT styleId FOREIGN KEY(styleId) REFERENCES styles(id) ON DELETE CASCADE ON UPDATE CASCADE;
--SELECT productId, relatedId INTO related FROM tempRelated;
--ALTER TABLE related ALTER COLUMN productId SET NOT NULL;
--ALTER TABLE related ALTER COLUMN relatedId SET NOT NULL;
--ALTER TABLE related ADD CONSTRAINT productId FOREIGN KEY(productId) REFERENCES products(id) ON DELETE CASCADE ON UPDATE CASCADE;
--CREATE INDEX idx_features_productId on features(productId);
--CREATE INDEX idx_styles_productId on styles(productId);
--CREATE INDEX idx_photos_styleId on photos(styleId);
--CREATE INDEX idx_skus_styleId on skus(styleId);
--CREATE INDEX idx_related_productId on related(productId);