import React, { useEffect, useState } from 'react';

import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          'https://react-food-order-app-4c35a-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json'
        );

        if (!response.ok) {
          throw new Error('Response error!');
        }

        const data = await response.json();

        const loadedMeals = [];

        for (const key in data) {
          loadedMeals.push({
            id: key,
            name: data[key].name,
            description: data[key].description,
            price: data[key].price,
          });
        }

        setMeals(loadedMeals);
      } catch (error) {
        setError(error.message);
      }

      setIsLoading(false);
    };

    fetchMeals();
  }, []);

  let mealsList = <p>Found no meals.</p>;

  if (meals.length > 0) {
    mealsList = meals.map((meal) => (
      <MealItem
        key={meal.id}
        id={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
      />
    ));
  }

  if (error) {
    console.log(error);
    mealsList = <p>{error}</p>;
  }

  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
