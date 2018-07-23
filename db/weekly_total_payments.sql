SELECT SUM(amount)
FROM payments
WHERE payment_id = $1