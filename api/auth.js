// Azure Function: Auth API (register & login)
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { findUserByEmail, createUser } = require("../backend/userDb");
const setCors = require("../backend/cors");
const setSecurityHeaders = require("../backend/securityHeaders");

const JWT_SECRET = process.env.JWT_SECRET;

module.exports = async function (context, req) {
  setCors(context);
  setSecurityHeaders(context);
  if (req.method === "POST") {
    const { action, email, password, name } = req.body || {};
    if (!email || !password || (action === "register" && !name)) {
      context.res = { status: 400, body: { error: "Missing fields" } };
      return;
    }
    if (action === "register") {
      // Registration
      const existing = await findUserByEmail(email);
      if (existing) {
        context.res = { status: 409, body: { error: "Email already registered" } };
        return;
      }
      const user = await createUser({ email, password, name });
      const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: "7d" });
      context.res = { status: 201, body: { token, user: { id: user.id, email: user.email, name: user.name } } };
      return;
    } else if (action === "login") {
      // Login
      const user = await findUserByEmail(email);
      if (!user) {
        context.res = { status: 401, body: { error: "Invalid credentials" } };
        return;
      }
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        context.res = { status: 401, body: { error: "Invalid credentials" } };
        return;
      }
      const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: "7d" });
      context.res = { status: 200, body: { token, user: { id: user.id, email: user.email, name: user.name } } };
      return;
    } else {
      context.res = { status: 400, body: { error: "Invalid action" } };
      return;
    }
  } else {
    context.res = { status: 405 };
  }
};
