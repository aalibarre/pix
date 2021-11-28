-- get a list of the name, description and price of all meals for a restaurant
SELECT meals.name, meals.description, meals.price
FROM meals
JOIN restaurants ON restaurants.id = meals.restaurant_id
WHERE restaurants.id = 1;
