import sql from 'better-sqlite3';

const db = sql('meals.db');

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000)); // 로딩 테스트를 위해 추가

  return db.prepare('SELECT * FROM meals').all();
}
