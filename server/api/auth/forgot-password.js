export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    if (body.email) {
      // Implement email sending logic here
      console.log('Email sent to:', body.email);
      return {
        statusCode: 200,
        statusMessage: 'Email sent',
        email: body.email,
      };
    } else {
      throw new Error('Email is required');
    }
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      statusCode: 400,
      statusMessage: 'Email is required',
    };
  }
});
