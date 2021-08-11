use advisily;
INSERT INTO students(student_id,fname,lname,email,password) 
			VALUES (900192237,'Youssef', 'Agiza', 'youssefagiza@aucegypt.edu', 'abcd12345'),
					(900192238,'Youssef2', 'Agiza2', 'youssefagiza2@aucegypt.edu', 'hello12345');
            
            
INSERT INTO student_majors(student_id, major_id,catalog_id) 
								VALUES(900192237,1,1),
								(900192237,3,1),
                                (900192238,3,1);

INSERT INTO student_minors(student_id,minor_id) 
							VALUES (900192237,4),
								  (900192238,3);

INSERT INTO student_courses(student_id,course_id)
							VALUES (900192237,2),
								 (900192237,12),
								 (900192237,13),
								 (900192237,14),
                                  (900192238,98),
                                   (900192238,3);
