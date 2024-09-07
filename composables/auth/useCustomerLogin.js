export default defineEventHandler(async (event) => {
  const { email, password } = await useBody(event)
  
  // Authentication logic...
  
  const token = jwt.sign({ userId: user.entity_id }, process.env.JWT_SECRET, { expiresIn: '1h' })

  // Set the JWT as an HTTP-only cookie
  setCookie(event, 'authToken', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',  // Only use secure cookies in production
    maxAge: 60 * 60,  // 1 hour
  })

  return { message: 'Logged in successfully' }
})
