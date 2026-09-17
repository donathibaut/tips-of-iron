# tips-of-iron

Tips of Iron is a web app that will help new players of the video game "Hearts of Iron IV" to understand the game easily.

## Requirements

This project uses the following resources:

- Node.js v24.18.0
- npm
- git
- Express
- Sequelize
- React
- PhpMyAdmin (I use Docker)

## Installation

||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

### .ENV

1. You will find a .env.example file in the server/src/env/ directory

2. Create a .env file in this directory that includes the same variables.

3. You will add the values corresponding to your project configuration.

---

4. .env.example:

- NODE_ENV="production" (only for production test, if that's not your case, remove this key)

- URL="url" - (public website URL)
- PORT=port - (8888 -> our example with Docker config below)
- DB_PORT=db_port - (port associated with the database)
- DB_NAME="name" - (database name)
- HOST="host" - (loopback IP address)
- USER_NAME="username" - (local database admin name)
- USER_PASSWORD="password" - (local database admin password)

- SECRET_KEY="secretkey" - (you can generate one here: https://randomkeygen.com/encryption-key)

---

PS: Sections of the README that reference the .env file will be marked with \*\*\*  
||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

### NODE

1. NVM:
   https://www.nvmnode.com/guide/installation.html

2. Node.js + NPM:
   In the terminal, use:

```bash
nvm install 24.18.0
```

then:

```bash
nvm use 24.18.0
```

To see if it's correctly installed:

```bash
node -v
```

(You should see: v.24.18.0)

### GIT

1. Git:
   https://git-scm.com

2. Clone this repository:
   In your terminal, use:

```bash
git clone https://github.com/donathibaut/tips-of-iron
```

### PACKAGE.JSON

1. Install the packages (including Express & React):
   With the terminal, go to the project root folder.
   In the terminal, use:

```bash
npm i
```

    Then do the same in the client and the server directory.

### DATABASE \*\*\*

1. Docker:
   Follow the official tutorial to install and configure Docker: https://docs.docker.com/desktop/setup/install/windows-install/

2. PhpMyAdmin:
   Create a docker-compose.yml file and paste then follow (the instructions):

```
services:
  mysql_database:
    image: mysql:latest
    container_name: mysql_database
    environment:
      MYSQL_ROOT_PASSWORD: (write a new password)
      MYSQL_DATABASE: (give a name)
    ports:
      - "8888:3306" (if error -> you can modify ports value)
    volumes:
      - db_data:/var/lib/mysql

  phpmyadmin:
    image: phpmyadmin:latest
    container_name: phpmyadmin
    ports:
      - "8080:80" (if error -> you can modify ports value)
    environment:
      PMA_HOST: mysql_database
      PMA_PORT: 3306 (choose a port -> default 3306)
      MYSQL_ROOT_PASSWORD: (write a new password)

volumes:
  db_data:

```

⚠ DO NOT FORGET TO REMOVE PARENTHESIS ⚠

After that:

- Open Docker
- Open the terminal in the docker-compose.yml directory
- Use:

```bash
docker compose up -d
```

- Go to http://localhost:8080 with you browser
- Connect to PhpMyAdmin (username: root; password: )

3. Tips of Iron database:

- In PhpMyAdmin, create a new database ("New" -> Database name | utf8mb4_general_ci)
- Go into your database
- "SQL" tab
- Paste database-config.sql (from the "annexe" folder)
- Click on "Go"
- There you go !

(You can manage the database run from the "Containers" tab in Docker)

4. Create a database ADMIN user account

- In your database, click on the "User accounts" tab
- "Add user account"
- Fill out the form and make sure granting privileges as you wish (ex: Global privileges ▣Check all)

## Usage

### API \*\*\*

1. Files that use .env:

- config.php (directory: server/src/config/config.js)
- app.js uses URL
- index.js uses PORT
- all files related to JavascriptWebToken use SECRET_KEY (ex: authController.js (path: server/src/controllers/authController.js))

### Launch the project

2. Follow these steps:

- Launch the database from Docker
- From the terminal, in the server directory, use:

```bash
npm run dev
```

- Then, in the client directory, use:

```bash
npm start
```
