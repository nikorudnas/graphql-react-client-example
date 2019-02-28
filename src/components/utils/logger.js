export default function logger(msg) {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    console.error(msg);
  } else {
    // Production
    // Could save the errors to a log with library like Winston
  }
}
