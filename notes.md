Re-iterate later:

- api/students endpoint returns the whole student object (including the password).
- names are inconsistent between backend and frontend.
- minors are not taking catalogid with them.
- passing major_id that doesn't exist while registering for a user will create user without major.
- add primary key for student_minors, student_courses, etc.
