// Azure Function: User API
const authenticate = require("../backend/auth");
const setCors = require("../backend/cors");

module.exports = async function (context, req) {
  if (!authenticate(context, req)) return;
  // Example: Get user profile (replace with Cosmos DB logic)
  if (req.method === "GET") {
    // Example: In future, require id param for user lookup
    // if (!req.query || !req.query.id) {
    //   context.res = { status: 400, body: { error: 'Missing user id' } };
    //   setCors(context);
    //   return;
    // }
    context.res = {
      status: 200,
      body: { id: "user123", name: "Drip God", avatar: "/avatars/dripgod.png" },
    };
  } else if (req.method === "POST" || req.method === "PUT") {
    // Scaffold: Add input validation for user updates here
    context.res = {
      status: 400,
      body: { error: "User update not implemented" },
    };
    setCors(context);
    return;
  } else {
    context.res = { status: 405 };
  }
  setCors(context);
};
