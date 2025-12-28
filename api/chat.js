// Azure Function: Chat API (SignalR negotiation)
module.exports = async function (context, req) {
  // Example: Negotiate SignalR connection (replace with real logic)
  if (req.method === 'POST') {
    context.res = {
      status: 200,
      body: {
        url: 'https://your-signalr-service.service.signalr.net/client/?hub=chat',
        accessToken: 'FAKE_TOKEN_FOR_DEMO'
      }
    };
  } else {
    context.res = { status: 405 };
  }
};
