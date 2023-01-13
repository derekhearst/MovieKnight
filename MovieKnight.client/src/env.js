export const dev = window.location.origin.includes("localhost")
export const baseURL = dev ? "http://localhost:3000" : "https://api.movieknight.uk"
export const useSockets = true
export const domain = "movieknight.us.auth0.com"
export const clientId = "pQnFxvcyv5bYlxaSIjwkQwUdzLoKxHlq"
export const audience = "https://auth.movieknight.uk"
