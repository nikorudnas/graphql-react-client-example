export default function logger(msg) {
  // IF in dev -environment, log the errors to console
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    console.error(msg);
  }
}
