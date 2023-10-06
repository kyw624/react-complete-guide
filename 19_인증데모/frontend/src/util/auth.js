import { redirect } from 'react-router-dom';

export function getTokenDuration() {
  const storedExpiration = localStorage.getItem('expiration');
  const expirationDate = new Date(storedExpiration);
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime(); // 토큰 잔여시간

  return duration; // 유효하다면 양수, 만료됐다면 음수
}

export function getAuthToken() {
  const token = localStorage.getItem('token');

  if (!token) {
    return null;
  }

  const tokenDuration = getTokenDuration();

  // 토큰 만료
  if (tokenDuration < 0) {
    return 'EXPIRED';
  }

  return token;
}

export function tokenLoader() {
  return getAuthToken();
}

export function checkAuthLoader() {
  const token = getAuthToken();

  if (!token) {
    return redirect('/auth');
  }

  return null;
}
