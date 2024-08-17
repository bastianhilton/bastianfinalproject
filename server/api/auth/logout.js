export default defineEventHandler(async (event) => {
  // Assuming you're using sessions (e.g., express-session)
  return new Promise((resolve, reject) => {
    event.req.session.destroy((err) => {
      if (err) {
        reject({
          statusCode: 500,
          body: 'Failed to logout',
        });
      } else {
        // Optionally clear the session cookie
        event.res.clearCookie('connect.sid'); // Replace with your session cookie name
        resolve({
          statusCode: 200,
          body: 'Logged out successfully',
        });
      }
    });
  });
});
