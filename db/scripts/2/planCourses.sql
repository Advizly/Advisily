use advisily;


INSERT INTO planCourses(catalogId,courseId,semesterNumber)
		SELECT catalogId,courseId,semesterNumber 
		FROM  catalogCourses
        WHERE semesterNumber IS NOT NULL ;


INSERT INTO planCourses(catalogId,courseId,semesterNumber) 
				VALUES(1,10,5),
                (1,10,6),
                (1,10,6),
                (1,10,7),
                (1,10,7),
                (1,10,8);
                