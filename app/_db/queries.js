'use server';
const pool = require('./pool');

export const getUsers = async () => {
  const { rows } = await pool.query('SELECT * FROM users');
  return rows;
};

export const getUserById = async (userId) => {
  const { rows } = await pool.query('SELECT * FROM users WHERE id = $1;', [
    userId,
  ]);
  return rows[0];
};

export const getUserByUsername = async (username) => {
  const { rows } = await pool.query(
    'SELECT * FROM users WHERE username = $1;',
    [username],
  );
  return rows[0];
};

export const createNewUser = async (data) => {
  const { firstname, lastname, email, username, password } = data;
  const query = `
  INSERT INTO users ("firstname","lastname","email","username","password") 
  VALUES ($1,$2,$3,$4,$5) 
  `;
  // console.log(firstname, lastname, email, username, password);
  await pool.query(query, [firstname, lastname, username, email, password]);
  const { rows } = await pool.query(`SELECT id FROM users WHERE username=$1`, [
    username,
  ]);
  return rows;
};
