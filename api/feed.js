// Azure Function: Feed API
module.exports = async function (context, req) {
  // Example: Get feed posts (replace with Cosmos DB logic)
  if (req.method === "GET") {
    context.res = {
      status: 200,
      body: [
        {
          id: "post1",
          user: "Drip God",
          content: "Welcome to LiTbiT-2.0!",
          timestamp: Date.now(),
        },
        {
          id: "post2",
          user: "Drip God",
          content: "90000x vibes only.",
          timestamp: Date.now(),
        },
      ],
    };
  } else {
    context.res = { status: 405 };
  }
};
// Azure Function: Feed API (Cosmos DB integration)
const client = require("../backend/cosmos");
const databaseId = "litbit";
const containerId = "feed";

module.exports = async function (context, req) {
  const db = client.database(databaseId);
  const container = db.container(containerId);

  if (req.method === "GET") {
    // Fetch all posts
    try {
      const { resources: posts } = await container.items
        .query("SELECT * FROM c ORDER BY c.timestamp DESC")
        .fetchAll();
      context.res = { status: 200, body: posts };
    } catch (err) {
      context.res = { status: 500, body: { error: err.message } };
    }
  } else if (req.method === "POST") {
    // Add a new post
    try {
      const post = req.body;
      post.timestamp = Date.now();
      const { resource } = await container.items.create(post);
      context.res = { status: 201, body: resource };
    } catch (err) {
      context.res = { status: 500, body: { error: err.message } };
    }
  } else {
    context.res = { status: 405 };
  }
};
