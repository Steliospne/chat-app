#! /usr/bin/env node
require("dotenv").config();
const { Client } = require("pg");
const bcrypt = require("bcryptjs");

const ADMIN_PASS = process.env.ADMIN_PASS;
const TEST_USER_PASS = process.env.TEST_USER_PASS;

const CREATE_TABLES = `
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "firstname" VARCHAR (50),  
  "lastname" VARCHAR (50),
  "email" VARCHAR (100),
  "username" VARCHAR (50),  
  "password" VARCHAR (100),
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP  
);

CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, 
  user_id INTEGER NOT NULL,
  content TEXT NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS friends (
    user_id INTEGER NOT NULL,
    friend_id INTEGER NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, friend_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (friend_id) REFERENCES users(id) ON DELETE CASCADE
);
`;

const main = async () => {
  const [, , connectionString] = process.argv;
  console.log("seeding...");
  const client = new Client({
    connectionString: connectionString,
  });
  await client.connect();
  await client.query(CREATE_TABLES);

  // bcrypt.hash(ADMIN_PASS, 10, async (err, hashedPassword) => {
  //   if (err) {
  //     throw err;
  //   }

  //   const SET_ADMIN = `
  //   INSERT INTO users ("firstName", "lastName", "email", "userName", "pwd")
  //   VALUES ('Stelios','Pnevmatikakis','stelios@domain.com','admin1','${hashedPassword}');
  //   `;

  //   await client.query(SET_ADMIN);
  // });

  // bcrypt.hash(TEST_USER_PASS, 10, async (err, hashedPassword) => {
  //   if (err) {
  //     throw err;
  //   }

  //   const SET_TEST_USER = `
  //   INSERT INTO users ("firstName", "lastName", "email", "userName", "pwd")
  //   VALUES
  //   ('Test','User','testuser@domain.com','testuser','${hashedPassword}');
  //   `;

  //   await client.query(SET_TEST_USER);

  //   const SET_USER_RELATION = `
  //   INSERT INTO friends ("user_id", "friend_id")
  //   VALUES (1,2), (2,1);
  // `;

  //   await client.query(SET_USER_RELATION);
  // await client.end();
  // });
  await client.end();
};

main();
