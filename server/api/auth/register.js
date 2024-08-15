// Define an event handler function
module.exports = async function(event) {
    // Read the body from the event (assuming the event contains a request object)
    const body = await readBody(event);
  
    // Return the response object
    return {
      statusCode: 200,
      statusMessage: 'Account created successfully.',
      data: body,
    };
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
  