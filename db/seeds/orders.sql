-- seeds for orders table
INSERT INTO orders (restaurant_id, user_id, name, total_quantity, total_price, pending, created_at)
VALUES (1, 2, 'name', 5, 30, false, '2017-07-23'),
(1, 2, 'name', 10, 60, false, '2017-06-12'),
(1, 2, 'name', 14, 84, true, '2017-08-20'),
(1, 2, 'name', 2, 12, false, '2017-07-29'),
(1, 2, 'name', 7, 42, true, '2017-08-20'),
(1, 2, 'name', 8, 48, false, '2017-05-10');
