import { json, redirect } from 'react-router-dom';

import AuthForm from '../components/AuthForm';

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export async function action({ request }) {
  // URL에서 쿼리 가져오기
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get('mode') || 'login';

  if (mode !== 'login' && mode !== 'signup') {
    throw json(
      {
        message: 'Unsupported mode.',
      },
      { status: 422 }
    );
  }

  const data = await request.formData();
  const authData = {
    email: data.get('email'),
    password: data.get('password'),
  };

  const response = await fetch(`http://localhost:8080/${mode}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(authData),
  });

  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: 'Could not authenticate user.' }, { status: 500 });
  }

  // 토큰 관리
  const resData = await response.json();
  const token = resData.token;

  localStorage.setItem('token', token); // 토큰 저장
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1); // 1시간 뒤
  // expiration.setTime(expiration.getTime() + 5000); // 5초 뒤 만료 테스트 코드
  localStorage.setItem('expiration', expiration.toISOString()); // 토큰 만료시간 저장

  // 로그인 성공시 홈으로 리다이렉션
  return redirect('/');
}
