SELECT users.username, restaurants.name
FROM users
JOIN restaurants ON restaurants.restaurant_owner_id = users.id
GROUP BY users.username;
