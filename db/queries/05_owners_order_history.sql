-- get a list of all orders owner made (both inactive and active)
SELECT orders.restaurant_id, orders.user_id, orders.name, orders.total_price, orders.total_quantity, orders.pending, orders.created_at
FROM orders
JOIN restaurants ON orders.restaurant_id = restaurants.id
JOIN users ON users.id = restaurants.restaurant_owner_id
WHERE users.username = 'Xihai Luo';
