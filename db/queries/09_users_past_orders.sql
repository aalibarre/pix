SELECT orders.*
FROM orders
JOIN users ON orders.user_id = users.id
WHERE users.email = 'avg123@aol.com' AND pending = false;
