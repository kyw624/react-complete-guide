import { useIsFetching } from '@tanstack/react-query'; // 데이터 가져오는지 확인

export default function Header({ children }) {
  const fetching = useIsFetching(); // 데이터를 가져오면 0, 아니면 더 큰 수

  return (
    <>
      <div id='main-header-loading'>{fetching > 0 && <progress />}</div>
      <header id='main-header'>
        <div id='header-title'>
          <h1>React Events</h1>
        </div>
        <nav>{children}</nav>
      </header>
    </>
  );
}
