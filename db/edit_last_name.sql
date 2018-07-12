UPDATE students
SET last_name = $1
WHERE id = $2
RETURNING * ;

