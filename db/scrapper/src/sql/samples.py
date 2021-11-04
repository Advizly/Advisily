import mysql.connector
import re
import csv 
from decouple import  config



db = mysql.connector.connect(
  host= config("DB_HOST"),
  user= config("DB_USER"),
  password= config("DB_PASSWORD"),
  database= config("DB_NAME")
)

cursor=db.cursor()
csv_folder="/home/youssef/dev/projects/Advisily/repo/db/scrapper/src/csv"

def insertUsers():
    with open(f"{csv_folder}/samples/random_ce_sample_students.csv",mode="r") as csv_file:
        student_reader=csv.DictReader(csv_file)

        sql1='''INSERT IGNORE INTO users(userId, firstName, lastName, email,password,isVerified,standingId) 
        VALUES (%s,%s,%s,%s,%s,%s,%s)'''
        sql2='''INSERT IGNORE INTO userMajors(userId, majorId, catalogId)   VALUES (%s,%s,%s)'''
      
        for userRow in student_reader:
            majorPrefix=userRow.pop("majorPrefix")
            catalogYear=userRow.pop("catalogYear")
            creditHrs=userRow.pop("creditHrs")

            majorId=_get_majorId(majorPrefix)
            catalogId=_get_catalogId(catalogYear,majorPrefix)
            standingId=_get_standing_id(creditHrs)

            userRow["standingId"]=standingId
            userId=userRow.get("studentId")
            values1= list(userRow.values())
            values2= list()

            values2.append(userId)
            values2.append(majorId)
            values2.append(catalogId)
            cursor.execute(sql1, values1)
            cursor.execute(sql2, values2)

         

        db.commit()

def insertUserCourses():
      with open(f"{csv_folder}/samples/random_ce_sample_courses3.csv",mode="r") as csv_file:
        student_reader=csv.DictReader(csv_file)
        sql='''INSERT IGNORE INTO userCourses(userId, courseId)   VALUES (%s,%s)'''
      
        for userRow in student_reader:
            prefix=userRow.pop("prefix")
            courseCode=userRow.pop("courseCode")
            courseTitle=userRow.pop("courseTitle")
            userId= userRow.get("studentId")

            courseId=_get_courseId_by_code_prefix(courseCode,prefix)
            print(userRow)  
            if(courseId is None):
                print("\n\nFOUND NONE:",courseTitle,prefix,courseCode,"\n\n")
                _add_new_course(prefix,courseCode,courseTitle)
                courseId=_get_courseId_by_code_prefix(courseCode,prefix)
                print("\n\nNew courseI :",courseId,"\n\n")

            if(userId is None):
                print("\n\nFOUND NONE:",courseTitle,prefix,courseCode,"\n\n")
                print("\n\nNew courseI :",courseId,"\n\n")
            


            userRow["courseId"]=courseId    

            values= list(userRow.values())
            cursor.execute(sql, values)

         

        db.commit()


def _add_new_course(prefix,courseCode,courseTitle):
    sql="INSERT INTO courses(prefix,courseCode,courseTitle) VALUES (%s,%s,%s)"
    cursor.execute(sql,[prefix,courseCode,courseTitle])
    db.commit()

def _get_majorId(majorPrefix):
    sql = "SELECT majorId from majors WHERE majorPrefix LIKE %s LIMIT 1"
    majorPrefix="%"+majorPrefix+"%"
    
    cursor.execute(sql,[majorPrefix])
    majorId=cursor.fetchone()
    return majorId[0] if majorId else None

def _get_catalogId(catalogYear,majorPrefix):
    majorId= _get_majorId(majorPrefix)
    if(not majorId): return None
    sql="SELECT catalogId from catalogs WHERE year LIKE %s AND majorId= %s LIMIT 1"
    cursor.execute(sql,[catalogYear,majorId])
    catalogId=cursor.fetchone()
    return catalogId[0] if catalogId else None

def _get_standing_id(creditHrs):
    sql= '''SELECT standingId from standings 
            WHERE creditHrs= (select max(creditHrs) from standings where creditHrs<= %s)
            LIMIT 1
         '''
    cursor.execute(sql,[creditHrs])
    standingId=cursor.fetchone()
    return standingId[0] if standingId else None    

def _get_courseId_by_code_prefix(courseCode,prefix):
    sql="SELECT courseId from courses WHERE courseCode= %s  AND prefix = %s LIMIT 1"
    cursor.execute(sql,[courseCode,prefix])
    courseId=cursor.fetchone()
    return courseId[0] if courseId else None

def _get_courseId_by_title(courseTitle):
    courseTitleLike= "%"+courseTitle+"%"
    sql="SELECT courseId from courses WHERE courseTitle= %s or courseTitle LIKE %s  LIMIT 1"
    cursor.execute(sql,[courseTitle,courseTitleLike])
    courseId=cursor.fetchone()
    return courseId[0] if courseId else None



# insertUsers()
insertUserCourses()