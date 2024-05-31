const client = require('../database.client');

class UserModel {
  async find() {
    const query = 'SELECT * FROM users';
    const connection = await client.connect();
    const { rows } = await connection.query(query);
    connection.release();
    return rows;
  }

  async findById(id) {
    const query = 'SELECT * FROM users WHERE id = $1';
    const connection = await client.connect();
    const { rows } = await connection.query(query, [id]);
    connection.release();
    return rows[0];
  }

  async findOne(filter) {
    const { email } = filter;
    const query = 'SELECT * FROM users WHERE email = $1';
    const connection = await client.connect();
    const { rows } = await connection.query(query, [email]);
    connection.release();
    return rows[0];
  }

  async save(user) {
    const { name, email, password } = user;
    const query = 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)';
    const connection = await client.connect();
    await connection.query(query, [name, email, password]);
    connection.release();
  }

  async findByIdAndUpdate(id, user) {
    const { name, email, password } = user;
    const query = 'UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4';
    const connection = await client.connect();
    await connection.query(query, [name, email, password, id]);
    connection.release();
  }

  async findByIdAndDelete(id) {
    const query = 'DELETE FROM users WHERE id = $1';
    const connection = await client.connect();
    await connection.query(query, [id]);
    connection.release();
  }

};

module.exports = UserModel;