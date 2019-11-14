export default class AuthenticationError extends Error {
  constructor(message: string) {
    super(`Access denied: ${message}`);
    this.name = "AuthenticationError";
  }
}