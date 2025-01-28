const { message } = require("./lang/messages/en/en");
const { getDate } = require("./modules/utils");

exports.handler = async (event) => {
  if (event.httpMethod !== "GET") {
    return {
      statusCode: 405,
      body: message[405],
    };
  }

  const params = event.queryStringParameters;
  const name = params.name;

  if (!name) {
    return {
      statusCode: 400,
      body: message.error,
    };
  }

  const responseMessage = getDate(name, message.success);

  return {
    statusCode: 200,
    headers: { "Content-Type": "text/html" },
    body: responseMessage,
  };
};
