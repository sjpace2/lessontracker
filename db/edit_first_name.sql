UPDATE students
SET first_name = $1
WHERE id = $2
RETURNING *;