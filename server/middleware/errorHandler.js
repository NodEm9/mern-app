// Error handling middleware
class ErrorHandler {
  statusCode = 500 || 400 || 404 || 401;

  constructor(statusCode = this.statusCode, error = new Error()) {
    this.statusCode = statusCode;
    this.error = error;
  }

  // Handle error and log it to external service 
  async handleError(error, statusCode) {
    new FireMonitoringMetric(error);
    await crashIfUntrustedErrorOrCriticalError(error, statusCode);
    new LogErrorToExternalService(error, statusCode);
  }
}

export const handler = new ErrorHandler();








// Fire monitoring metric to external service like Firebase or Google Analytics
function FireMonitoringMetric(error = new Error()) {
  this.error = error;
  if (error instanceof Error) {
    console.log('Error: ', error);
  }
}

// Crash the server if the error is untrusted or critical
async function crashIfUntrustedErrorOrCriticalError(error, res) {
  if (error instanceof Error) {
    await res.status(500).json({
      statusMessage: 'error',
      statusCode: 500,
      error: 'Internal server error'
    });
  }
}

// Log error to external service like Sentry or LogRocket
// This is a dummy function that logs the error to the console
function LogErrorToExternalService(error, statusCode) {
  this.error = error;
  this.statusCode = statusCode || this.statusCode;
  console.log(error);
}