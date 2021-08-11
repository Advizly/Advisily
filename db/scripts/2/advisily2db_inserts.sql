use advisily;

-- -----------------------------------------------
--   DEPARTMENTS
-- -----------------------------------------------
INSERT INTO advisily.departments (title,prefix) VALUES("Template Department","XXX"),
													  ("Computer Science and Engineering", "CSCE"),
                                                      ("Mathematics and Actuarial Science", "MACT"),
                                                      ("Physics", "PHYS"),
                                                      ("Rhetoric and Composition", "RHET"),
                                                      ("Core Curriculum", "CORE"),
                                                      ("Libraries and Learning Technologies", "LALT"),
                                                      ("Sciences", "SCI"),
                                                      ("Philosophy", "PHIL");



-- -----------------------------------------------
--   COURSES
-- -----------------------------------------------
INSERT INTO course_types
					VALUES(1,'Core Curriculum'),
						  (2,'Concentration Requirements'),
						  (3,'Concentration Electives'),
						  (4,'Collateral Requirements'),
						  (5,'General Electives');
INSERT INTO courses (course_code,title,credits,department_id)
                   VALUES(-1,"Pathways I: Scientific Encounters",3,1),
                        (-2,"Pathways II: Cultural Exploration",3,1),
                        (-3,"Global Studies",3,1),
                        (-4,"Humanities and Social Sciences",3,1),
                        (-5,"Core Capstone I",3,1),
                        (-6,"Core Capstone II",3,1),
                        (-7,"Arab World Studies I",3,1),
                        (-8,"Arab World Studies II",3,1),
                        (-9,"General Elective",3,1),
                        (-10,"Major Elective",3,1),	
                        (1000,"Introduction to Computers and their Applications",3,2),
                        (1001,"Fundamentals of Computing I",3,2),
                        (1101,"Fundamentals of Computing II",3,2),
                        (1102,"Fundamentals of Computing II Lab",1,2),
                        (2202,"Analysis and Design of Algorithms",3,2),
                        (2203,"Analysis and Design of Algorithms Lab",1,2),
                        (2301,"Digital Design I",3,2),
                        (2302,"Digital Design I Lab",1,2),
                        (2303,"Computer Organization and Assembly Language Programming",3,2),
                        (2501,"Fundamentals of Database Systems",3,2),
                        (2502,"Information Technology",3,2),
                        (3102,"Programming in Java",3,2),
                        (3103,"Object Oriented Programming",3,2),
                        (3104,"Concepts of Programming Languages",3,2),
                        (3301,"Computer Architecture",3,2),
                        (3302,"Computer Architecture Lab",1,2),
                        (3303,"Fundamental Microelectronics",3,2),
                        (3304,"Digital Design II",3,2),
                        (3311,"Data and Computer Communications",3,2),
                        (3312,"Computer Networks",3,2),
                        (3313,"Computer Networks Lab",1,2),
                        (3401,"Operating Systems",3,2),
                        (3402,"Operating Systems Lab",1,2),
                        (3421,"Fundamentals of Computing and Communication Systems",3,2),
                        (3422,"Introduction to Information Security",3,2),
                        (3601,"Artificial Intelligence",3,2),
                        (3611,"Digital Signal Processing",3,2),
                        (3701,"Software Engineering",3,2),
                        (4101,"Compiler Design",3,2),
                        (4201,"Theory of Computing",3,2),
                        (4301,"Embedded Systems",3,2),
                        (4302,"Embedded Systems Lab",1,2),
                        (4313,"Local and Metropolitan Area Networks",3,2),
                        (4314,"Local Area Networks Lab",1,2),
                        (4411,"Fundamentals of Distributed Systems",3,2),
                        (4421,"Computer Security",3,2),
                        (4501,"Database Systems",3,2),
                        (4502,"Design of Web-based Systems",3,2),
                        (4503,"Internet-based Information Systems",3,2),
                        (4602,"Introduction to Artificial Neural Networks",3,2),
                        (4603,"Fundamentals of Computer Vision",3,2),
                        (4604,"Practical Machine Deep Learning",3,2),
                        (4621,"Computer Graphics",3,2),
                        (4701,"Object-Oriented Analysis and Design",3,2),
                        (4702,"Secure Systems Engineering",3,2),
                        (4950,"Industrial Training",1,2),
                        (4980,"Senior Project I",1,2),
                        (4981,"Senior Project II",2,2),
                        (5221,"Algorithms and Complexity Theory",3,2),
                        (5222,"Design and Analysis of Parallel Algorithms",3,2),
                        (5231,"Advanced Processor Architecture",3,2),
                        (5232,"High Speed Networks",3,2),
                        (5241,"Distributed Systems",3,2),
                        (5242,"Parallel Computer Architecture",3,2),
                        (5243,"Information and System Security",3,2),
                        (5245,"Embedded Real-Time Systems",3,2),
                        (5261,"Advanced Artificial Intelligence",3,2),
                        (5262,"Neural Networks and Genetic Algorithms",3,2),
                        (5263,"Knowledge Engineering",3,2),
                        (5264,"Natural Language Processing and Machine Translation",3,2),
                        (5265,"Web Mining",3,2),
                        (5266,"Computer Vision",3,2),
                        (5267,"Digital Image Processing",3,2),
                        (5268,"Computer Graphics and Animation",3,2),
                        (5269,"Pattern Analysis",3,2),
                        (5271,"Advanced Software Engineering",3,2),
                        (5272,"Advanced Software Quality",3,2),
                        (5930,"Selected Topics in Computer Science and Engineering",3,2),
                        (5940,"Seminar",1,2),
                        (5980,"Capstone Project in Computing",3,2),
                        (5981,"Graduate Thesis",3,2),
                        (6231,"Mobile and Pervasive Computing",3,2),
                        (6261,"Advanced Data Mining",3,2),
                        (6930,"Advanced Selected Topics in Computer Science",3,2),
                        (6980,"Research Guidance Dissertation",3,2),
                        (1122,"Caclulus II",3,3),
                        (2123,"Caclulus III",3,3),
                        (2131,"Discrete Mathematics",3,3),
                        (2132,"Linear Algebra",3,3),
                        (3211,"Applied Probability",3,3),
                        (3223,"Statistical Inference",3,3),
                        (1012,"General Physics Laboratory I",1,4),
                        (1011,"Classical Mechanics Sound and Heat",3,4),
                        (1021,"Electricity and Magnetism",3,4),
                        (1022,"General Physics Laboratory II",1,4),
                        (2211,"Introduction to Electronics",3,4),
                        (2213,"Electronics Lab for Computer Scientists & Computer Engineers",1,4),
                        (1010,"Freshman Writing",3,5),
                        (1020,"Research Writing",3,5),
                        (1010,"Freshman Seminar",3,6),
                        (1020,"Libraries & Learning Technologies",0,7),
                        (1020,"Scientific Thinking",3,8),
                        (2100,"Philosophical Thinking",3,9);		
                        
-- -----------------------------------------------
--   MAJORS
-- -----------------------------------------------			
INSERT INTO majors (title,department_id)
                   VALUES("Computer Science ",2),
                        ("Computer Engineering",2),
                        ("Mathematics and Actuarial Science",3),
                        ("Physics",4);

-- -----------------------------------------------
--   MINORS
-- -----------------------------------------------		
INSERT INTO minors (title,department_id)
                   VALUES("Computer Science Minor",2),
                        ("Mathematics Minor",3),
                        ("Philosophy Minor",9),
                        ("Physics Minor",4);



-- -----------------------------------------------
--   CATALOGS
-- -----------------------------------------------		

INSERT INTO catalogs
(catalog_id,`year`,major_id,core_credits,conc_req_credits,conc_elec_credits,collateral_credits,general_elec_credits,season) 
VALUES(1,2019,1,33,42,18,30,9,'Fall'),
	  (2,2020,1,33,42,18,30,9,'Spring');
INSERT INTO catalog_courses (catalog_id,course_id,course_type_id,semester_number)
                   VALUES(1,12,2,1),
                        (1,86,4,1),
                        (1,93,4,1),
                        (1,92,4,1),
                        (1,98,1,1),
                        (1,100,1,1),
                        (1,13,2,2),
                        (1,14,2,2),
                        (1,87,4,2),
                        (1,94,4,2),
                        (1,95,4,2),
                        (1,99,1,2),
                        (1,101,1,2),
                        (1,102,1,2),
                        (1,2,1,3),
                        (1,17,2,3),
                        (1,18,2,3),
                        (1,88,4,3),
                        (1,96,4,3),
                        (1,97,4,3),
                        (1,103,1,3),
                        (1,3,1,4),
                        (1,15,2,4),
                        (1,16,2,4),
                        (1,19,2,4),
                        (1,89,4,4),
                        (1,90,4,4),
                        (1,24,2,5),
                        (1,25,2,5),
                        (1,26,2,5),
                        (1,91,4,5),
                        (1,7,1,5),
                        (1,4,1,6),
                        (1,8,1,6),
                        (1,32,2,6),
                        (1,33,2,6),
                        (1,38,2,6),
                        (1,40,2,7),
                        (1,56,2,7),
                        (1,57,2,7),
                        (1,6,1,8),
                        (1,39,2,8),
                        (1,58,2,8),
                        (1,20,3,null),                        
						(1,21,3,null),
                        (1,22,3,null),
                        (1,23,3,null),
                        (1,27,3,null),
                        (1,28,3,null),
                        (1,29,3,null),
                        (1,30,3,null),
                        (1,31,3,null),
                        (1,34,3,null),
                        (1,35,3,null),
                        (1,36,3,null),
                        (1,37,3,null),
                        (1,41,3,null),
                        (1,42,3,null),
                        (1,43,3,null),
                        (1,44,3,null),
                        (1,45,3,null),
                        (1,46,3,null),
                        (1,47,3,null),
                        (1,48,3,null),
                        (1,49,3,null),
                        (1,50,3,null),
                        (1,51,3,null),
                        (1,52,3,null),
                        (1,53,3,null),
                        (1,54,3,null),
                        (1,55,3,null);


-- -----------------------------------------------
--   STUDENTS and related tables
-- -----------------------------------------------		

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
INSERT INTO advising_sessions(student_id)VALUES(900192237);

INSERT INTO advising_courses(advising_session_id,course_id)
						VALUES(1,99),
                        (1,101),
                        (1,15),
                        (1,16);
