INSERT INTO payments (amount, payment_id, date) values ($1, $2, $3)
RETURNING *;