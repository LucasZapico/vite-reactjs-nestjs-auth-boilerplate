interface AppError extends Error {
  statusCode: number
}

// Create a custom error class
class AppError extends Error implements AppError {
  constructor(message: string, statusCode: number) {
    super(message)
    this.statusCode = statusCode
  }
}

export { AppError }

