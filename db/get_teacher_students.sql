SELECT first_name, last_name 
FROM students
WHERE user_id = $1
