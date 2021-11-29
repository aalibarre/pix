--number of orders a user made

SELECT users.username as username, count(orders.id) as total_orders, sum(orders.total_price) as total_price
FROM orders
JOIN users ON users.id = user_id
WHERE users.username = 'Amy Garfield'
GROUP BY users.username;
