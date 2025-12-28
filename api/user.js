// Azure Function: User API
module.exports = async function (context, req) {
  // Example: Get user profile (replace with Cosmos DB logic)
  if (req.method === "GET") {
    context.res = {
      status: 200,
      body: { id: "user123", name: "Drip God", avatar: "/avatars/dripgod.png" },
    };
  } else {
    context.res = { status: 405 };
  }
};
