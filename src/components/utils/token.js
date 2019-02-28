export function tokenExists(history) {
  // If the user does not have a token, push to login page
  const token = localStorage.getItem('token');

  if (!token) {
    history.push('/login');
  }
}

export function hasToken(history) {
  // If the user has a token, push to home page
  const token = localStorage.getItem('token');

  if (token) {
    history.push('/');
  }
}
