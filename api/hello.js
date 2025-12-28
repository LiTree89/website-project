// Azure Functions HTTP trigger for Static Web Apps
const setCors = require("../backend/cors");

module.exports = async function (context, req) {
  context.log("HTTP trigger function processed a request.");
  context.res = {
    status: 200,
    headers: { "Content-Type": "application/json" },
    body: { message: "Hello from Azure Functions API!" },
  };
  setCors(context);
};
