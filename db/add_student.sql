INSERT INTO students (first_name, last_name, email, phone, day, time, user_id) values ($1, $2, $3, $4, $5, $6, $7)
RETURNING *;
