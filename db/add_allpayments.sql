INSERT INTO allpayments (amount, allpayment_id, date) values ($1, $2, $3)
RETURNING *;

