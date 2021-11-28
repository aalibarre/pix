-- get a list of users order history (both active and inactive)
SELECT orders.name, orders.total_price, orders.total_quantity, orders.created_at
FROM orders
JOIN users ON users.id = orders.user_id
WHERE users.id = 2;
