INSERT INTO allpayments (amount, allpayment_id, payment_id, date, student_id, payment_id) values ($1, $2, $3, $4, $5)
RETURNING *;

