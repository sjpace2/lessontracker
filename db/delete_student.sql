alter table notes nocheck constraint all
DELETE FROM students
WHERE id = $1
alter table notes check constraint all;