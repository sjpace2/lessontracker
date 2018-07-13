SELECT students.first_name, students.last_name, notes.content, notes.date
FROM students
JOIN notes
    on students.id = notes.note_id
JOIN users
    on users.id = students.user_id
WHERE users.id = $1;
    