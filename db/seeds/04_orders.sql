-- seeds for orders table
INSERT INTO orders (restaurant_id, user_id, name, total_quantity, total_price, pending, created_at, cart_qty, cart_price)
VALUES (1, 2, 'name', 5, 30, false, '2017-07-23', '{"apple":1, "orange":4}', '{"apple": "$1", "orange": "$4"}'),
(1, 2, 'name', 10, 60, false, '2017-06-12', '{"apple":1, "orange":4, "lemon":9}', '{"apple":"$1", "orange":"$4", "lemon":"$9"}'),
(1, 2, 'name', 14, 84, true, '2017-08-20', '{"apple":1, "orange":1}', '{"apple":"$1", "orange":"$1"}'),
(1, 2, 'name', 2, 12, false, '2017-07-29', '{"apple":1, "orange":10}', '{"apple":"$1", "orange":"$10"}'),
(1, 2, 'name', 7, 42, true, '2017-08-20', '{"watermelon":100, "orange":4}', '{"watermelon":"$100", "orange":"$4"}'),
(1, 2, 'name', 8, 48, false, '2017-05-10', '{"apple":12, "pear":20}', '{"apple":"$12", "pear":"$20"}');
