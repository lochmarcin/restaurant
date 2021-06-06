SELECT * FROM users
SELECT * FROM tables
SELECT * FROM restaurant
SELECT * FROM reserwation


UPDATE restaurant SET user_id=18 WHERE id=1
UPDATE reserwation SET time_booking='19:30:00' WHERE id=2

SELECT reserwation.id, users.name, restaurant.name, tables.number_table,reserwation.date_booking, reserwation.time_booking, reserwation.time_reserwation 
FROM reserwation 
INNER JOIN tables
ON reserwation.id_table = tables.id
INNER JOIN users
ON reserwation.id_user = users.id
INNER JOIN restaurant
ON reserwation.id_restaurant = restaurant.id
WHERE users.id=18 AND date_booking >= CURRENT_DATE OR time_booking >= CURRENT_TIME(0)

// Pobieranie rezerwacji z konkretnego dnia dla konkretnego stolika 
SELECT tables.id, tables.id_rest, tables.image_url, tables.number_table 
FROM tables INNER JOIN reserwation ON reserwation.id_table = tables.id 
WHERE tables.id_rest=1 AND reserwation.date_booking = '2021-06-20'
