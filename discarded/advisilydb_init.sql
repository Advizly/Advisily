USE advisily;

DROP TABLE IF EXISTS students_minors;
DROP TABLE IF EXISTS students_majors;
DROP TABLE IF EXISTS students;
DROP TABLE IF EXISTS catalog_plans;
DROP TABLE IF EXISTS course_prerequisites;
DROP TABLE IF EXISTS courses;
DROP TABLE IF EXISTS majors;
DROP TABLE IF EXISTS minors;
DROP TABLE IF EXISTS departments;



CREATE TABLE departments(
department_id int auto_increment,
title varchar(125) not null,
prefix varchar(10) not null,

primary key (department_id)
);

CREATE TABLE majors(
major_id int auto_increment,
title varchar(50) not null,
department_id int,

primary key(major_id),
foreign key (department_id) references departments(department_id)
);

CREATE TABLE minors(
minor_id int auto_increment,
title varchar(50) not null,
department_id int,

primary key(minor_id),
foreign key (department_id) references departments(department_id)
);

CREATE TABLE courses
(
 course_number int NOT NULL ,
 title         varchar(125) NOT NULL ,
 department_id int NOT NULL ,
 no_of_credits int NOT NULL ,

PRIMARY KEY (course_number),
 FOREIGN KEY (department_id) REFERENCES departments (department_id)
);

CREATE TABLE course_prerequisites(
course_number int not null,
prerequisite_number int not null,

foreign key (course_number) references courses(course_number),
foreign key (prerequisite_number) references courses(course_number)
);

CREATE TABLE catalog_plans(
catalog_year year,
semester_number int not null,
department_id int not null,
course_number int not null,

primary key (catalog_year),
foreign key (department_id) references departments(department_id),
foreign key (course_number) references courses(course_number)
);

CREATE TABLE students(
student_id int not null, 
fname varchar(255) not null,
lname varchar(255) not null,
catalog_year year,

primary key (student_id),
foreign key (catalog_year) references catalog_plans(catalog_year)
);

CREATE TABLE students_majors(
student_id int,
major_id int,

foreign key (student_id) references students(student_id),
foreign key (major_id)references majors(major_id)
);


CREATE TABLE students_minors(
student_id int,
minor_id int,

foreign key (student_id) references students(student_id),
foreign key (minor_id)references minors(minor_id)
);





INSERT INTO departments VALUES (1,"Computer Science and Engineering", "CSCE");

