// backend/userDb.js
// Cosmos DB helpers for user registration and login
const { getClient } = require("./cosmos");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");

const DB_NAME = process.env.COSMOS_DB_NAME || "main";
const CONTAINER = "users";

async function getUserContainer() {
  const client = await getClient();
  const db = client.database(DB_NAME);
  const { container } = await db.containers.createIfNotExists({
    id: CONTAINER,
  });
  return container;
}

async function findUserByEmail(email) {
  const container = await getUserContainer();
  const query = {
    query: "SELECT * FROM c WHERE c.email = @email",
    parameters: [{ name: "@email", value: email }],
  };
  const { resources } = await container.items.query(query).fetchAll();
  return resources[0] || null;
}

async function createUser({ email, password, name }) {
  const container = await getUserContainer();
  const hash = await bcrypt.hash(password, 10);
  const user = {
    id: uuidv4(),
    email,
    password: hash,
    name,
    createdAt: new Date().toISOString(),
  };
  await container.items.create(user);
  return user;
}

module.exports = { findUserByEmail, createUser };
