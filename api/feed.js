// Azure Function: Feed API
module.exports = async function (context, req) {
  // Example: Get feed posts (replace with Cosmos DB logic)
  if (req.method === 'GET') {
    context.res = {
      status: 200,
      body: [
        { id: 'post1', user: 'Drip God', content: 'Welcome to LiTbiT-2.0!', timestamp: Date.now() },
        { id: 'post2', user: 'Drip God', content: '90000x vibes only.', timestamp: Date.now() }
      ]
    };
  } else {
    context.res = { status: 405 };
  }
};
