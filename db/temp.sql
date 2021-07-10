CREATE TABLE `students` (
  `studentid` int PRIMARY KEY AUTO_INCREMENT,
  `fname` varchar(255),
  `lname` varchar(255),
  `email` varchar(255)
);

CREATE TABLE `students_majors` (
  `studentid` int,
  `majorid` int
);

CREATE TABLE `majors` (
  `majorid` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `departmentid` int
);

CREATE TABLE `department` (
  `departmentid` int PRIMARY KEY,
  `name` int,
  `prefix` varchar(255)
);

CREATE TABLE `courses` (
  `number` int,
  `short_number` int,
  `departmentid` int,
  `name` varchar(255)
);

ALTER TABLE `students_majors` ADD FOREIGN KEY (`studentid`) REFERENCES `students` (`studentid`);

ALTER TABLE `students_majors` ADD FOREIGN KEY (`majorid`) REFERENCES `majors` (`majorid`);

ALTER TABLE `majors` ADD FOREIGN KEY (`departmentid`) REFERENCES `department` (`departmentid`);

ALTER TABLE `courses` ADD FOREIGN KEY (`departmentid`) REFERENCES `department` (`departmentid`);
