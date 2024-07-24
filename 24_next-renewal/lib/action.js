'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

import { saveMeal } from './meals';

function isInvalidText(text) {
  return !text || text.trim() === '';
}

export async function shareMeal(prevState, formData) {
  const meal = {
    title: formData.get('title'),
    summary: formData.get('summary'),
    instructions: formData.get('instructions'),
    image: formData.get('image'),
    creator: formData.get('name'),
    creator_email: formData.get('email'),
  };

  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creator_email) ||
    !meal.creator_email.includes('@') ||
    !meal.image ||
    !meal.image.size === 0
  ) {
    return {
      message: 'Invalid input.',
    };
  }

  await saveMeal(meal);

  // 해당 경로의 캐시의 유효성 재검사를 하는 함수.
  // 2번째 인수로 해당 경로만 or 중첩된 페이지 포함 여부 선택 가능.
  // 'page' (default): 해당 경로의 페이지만 재검사
  // 'layout': 중첩된 모든 페이지 재검사
  revalidatePath('/meals', 'page');

  redirect('/meals');
}
