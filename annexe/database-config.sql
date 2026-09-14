CREATE TABLE users(
   id_user INT AUTO_INCREMENT,
   username VARCHAR(50)  NOT NULL,
   email VARCHAR(150)  NOT NULL,
   password VARCHAR(150)  NOT NULL,
   role INT NOT NULL DEFAULT 0,
   PRIMARY KEY(id_user),
   UNIQUE(username),
   UNIQUE(email)
);

CREATE TABLE categories(
   id_category INT AUTO_INCREMENT,
   name VARCHAR(150)  NOT NULL,
   PRIMARY KEY(id_category),
   UNIQUE(name)
);

CREATE TABLE topics(
   id_topic INT AUTO_INCREMENT,
   title VARCHAR(100)  NOT NULL,
   description TEXT NOT NULL,
   id_category INT NOT NULL,
   id_user INT NOT NULL,
   PRIMARY KEY(id_topic),
   UNIQUE(title),
   FOREIGN KEY(id_category) REFERENCES categories(id_category),
   FOREIGN KEY(id_user) REFERENCES users(id_user)
);

CREATE TABLE sections(
   id_section INT AUTO_INCREMENT,
   title VARCHAR(100)  NOT NULL,
   image_path TEXT,
   text TEXT NOT NULL,
   list_nb INT NOT NULL,
   id_user INT NOT NULL,
   id_topic INT NOT NULL,
   PRIMARY KEY(id_section),
   FOREIGN KEY(id_user) REFERENCES users(id_user),
   FOREIGN KEY(id_topic) REFERENCES topics(id_topic)
);
