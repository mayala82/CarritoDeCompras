 CREATE DATABASE online_store;
 USE online_store;

 CREATE TABLE users(
     id int(10) unsigned NOT NULL AUTO_INCREMENT,
	 name VARCHAR(100) NOT NULL,
	 email VARCHAR (100) NOT NULL,
	 password VARCHAR (100) NOT NULL,
	 PRIMARY KEY (id)
 );

 CREATE TABLE products(
     id int(10) unsigned NOT NULL AUTO_INCREMENT,
	 name VARCHAR (100) NOT NULL,
	 price DECIMAL (12,2),
	 quantity DECIMAL (12,2),
	 PRIMARY KEY (id)
 );

 CREATE TABLE sales(
     id int(10) unsigned NOT NULL AUTO_INCREMENT,
	 fk_id_user int(10) UNSIGNED,
	 fk_id_product int (10) UNSIGNED,
	 quantity DECIMAL (12,2),
	 price DECIMAL (12,2),
	 sold BOOLEAN DEFAULT false,
	 PRIMARY KEY (id),
     CONSTRAINT fk_sales_user FOREIGN KEY(fk_id_user) REFERENCES users (id),
	 CONSTRAINT fk_sales_product FOREIGN KEY(fk_id_product) REFERENCES products (id)
 );

 INSERT INTO users (name, email, password) VALUES('CARLOS HUERTAS JUNIOR','abc@gmail.com','123456');
 INSERT INTO users (name, email, password) VALUES('PERENCEJITO MARTINEZ PEREZ','pmp@gmail.com','123456');
 INSERT INTO users (name, email, password) VALUES('ARIEL ALFONSO ALAMIRANDA','aaa@gmail.com','123456');

 INSERT INTO products (name, price, quantity) VALUES('aguacate.jpg', 3000, 250);
 INSERT INTO products (name, price, quantity) VALUES('ajo.jpg', 4000, 120); 
 INSERT INTO products (name, price, quantity) VALUES('almendras.jpg', 7600, 260);
 INSERT INTO products (name, price, quantity) VALUES('arandanos.jpg', 8400, 1200);
 INSERT INTO products (name, price, quantity) VALUES('brocoli.png', 6000, 60);
 INSERT INTO products (name, price, quantity) VALUES('calabaza.jpg', 12000, 26);
 INSERT INTO products (name, price, quantity) VALUES('canela.jpg', 3600, 42);
 INSERT INTO products (name, price, quantity) VALUES('cebolla.jpg', 4500, 100);
 INSERT INTO products (name, price, quantity) VALUES('fresa.jpg', 6500, 32);
 INSERT INTO products (name, price, quantity) VALUES('kiwi.jpg', 7000, 23);
 INSERT INTO products (name, price, quantity) VALUES('limon.jpg', 4000, 68);
 INSERT INTO products (name, price, quantity) VALUES('lychee.jpg', 6500, 25);
 INSERT INTO products (name, price, quantity) VALUES('maiz.jpg', 3600, 65);
 INSERT INTO products (name, price, quantity) VALUES('manzana.jpg', 7000, 23);
 INSERT INTO products (name, price, quantity) VALUES('naranja.jpg', 4500, 35);
 INSERT INTO products (name, price, quantity) VALUES('papa.jpg', 2500, 23);
 INSERT INTO products (name, price, quantity) VALUES('pasta.jpg', 6800, 52);
 INSERT INTO products (name, price, quantity) VALUES('pimienta.jpg', 3600, 23);
 INSERT INTO products (name, price, quantity) VALUES('repollo.jpg', 4500, 32);
 INSERT INTO products (name, price, quantity) VALUES('tomate.jpg', 3600, 32);
 INSERT INTO products (name, price, quantity) VALUES('zanahoria.jpg', 4500, 32);