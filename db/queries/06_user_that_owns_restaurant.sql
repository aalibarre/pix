SELECT users.*
FROM users
JOIN restaurants ON restaurants.restaurant_owner_id = users.id;
