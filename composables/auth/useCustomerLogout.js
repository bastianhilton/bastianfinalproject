
export default defineEventHandler((event) => {
  // Clear the JWT cookie
  setCookie(event, 'authToken', '', { maxAge: -1 })

  return { message: 'Logged out successfully' }
})
