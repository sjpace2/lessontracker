SELECT notes.content, notes.note_id, students.first_name, students.last_name
FROM notes
JOIN students
    ON (notes.note_id = students.id)
WHERE notes.note_id = $1;
