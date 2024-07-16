import sql from 'better-sqlite3';

const db = sql('meals.db');

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000)); // 로딩 테스트를 위해 추가

  // throw new Error('Loading meals failed'); // 에러 핸들링 테스트

  return db.prepare('SELECT * FROM meals').all();
}
