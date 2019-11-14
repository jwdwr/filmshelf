export default class ValidationError extends Error {
  constructor(message: string) {
    super(`Bad input: ${message}`);
    this.name = 'ValidationError';
  }
}