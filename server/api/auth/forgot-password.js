// Define an event handler function
module.exports = async function(event) {
    // Read the body from the event (assuming the event contains a request object)
    const body = await readBody(event);
  
    // Check if the email is provided in the request body
    if (body.email) {
      return {
        statusCode: 200,
        statusMessage: 'Email sent',
        email: body.email,
      };
    }
  
    // If the email is not provided, throw an error with status code 400
    throw createError({
      statusCode: 400,
      statusMessage: 'Email is required',
    });
  };
  
  // A helper function to read the body from the event (assuming it's a JSON body)
  async function readBody(event) {
    return new Promise((resolve, reject) => {
      let body = '';
      
      event.req.on('data', chunk => {
        body += chunk.toString();
      });
  
      event.req.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch (err) {
          reject(err);
        }
      });
    });
  }
  
  // A helper function to create an error object
  function createError({ statusCode, statusMessage }) {
    const error = new Error(statusMessage);
    error.statusCode = statusCode;
    return error;
  }
  