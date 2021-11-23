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

def insertCourses():
    with open(f"{csv_folder}/courses.csv",mode="r") as csv_file:
        courses_reader=csv.DictReader(csv_file)

        sql='''INSERT IGNORE INTO courses(courseCode, courseTitle, prefix, credits) 
        VALUES (%s,%s,%s,%s)'''
        for courseRow in courses_reader:

            values= list(courseRow.values())
            for i in range(len(values)):
                if(re.search("null",values[i],flags=re.IGNORECASE)):values[i]=None

            cursor.execute(sql, values)

        db.commit()

def insertMajors():
    with open(f"{csv_folder}/majors.csv",mode="r") as csv_file:
        majors_reader=csv.DictReader(csv_file)
        print(majors_reader)
        sql='''INSERT IGNORE INTO majors(majorTitle) VALUES (%s)'''
        for courseRow in majors_reader:
            majors= list(courseRow.values())
            cursor.execute(sql, majors)

        db.commit()

def insertMinors():
    with open(f"{csv_folder}/minors.csv",mode="r") as csv_file:
        minors_reader=csv.DictReader(csv_file)
        sql='''INSERT IGNORE INTO minors(minorTitle) VALUES (%s)'''
        for courseRow in minors_reader:
            minors= list(courseRow.values())
            cursor.execute(sql, minors)

        db.commit()
        print(cursor.rowcount, "record inserted.")

def insertCatalogs():

    with open(f"{csv_folder}/catalogs/catalogs.csv","r") as catalogs_file:
        catalogs_reader=csv.DictReader(catalogs_file)
        sql='''INSERT IGNORE INTO catalogs(year,coreCredits,concReqCredits,concElecCredits,collateralCredits,generalElecCredits,engCoreCredits,majorId)
                                        VALUES(%s,%s,%s,%s,%s,%s,%s,%s)'''

        for catalogRow in catalogs_reader:

            majorTitle=catalogRow.pop("majorTitle")
            majorId=_get_majorId(majorTitle)
            if(majorId is None): 
                    continue
            catalogRow["majorId"]=majorId

            values=list(catalogRow.values())
            cursor.execute(sql,values)
        db.commit()

    

def insertCourseTypes():
    with open(f"{csv_folder}/courseTypes.csv","r") as course_types_file:
        sql="INSERT INTO courseTypes VALUES(%s,%s)"
        types_reader=csv.DictReader(course_types_file)
        for typeRow in types_reader:
            cursor.execute(sql,list(typeRow.values()))
        db.commit()


def insertCatalogCourses():
    catalogYears=[ "2016-2017","2017-2018","2018-2019","2019-2020","2020-2021","2021-2022"]
    insert_sql='''INSERT INTO catalogCourses(courseTypeId,catalogId,courseId)
                                            VALUES(%s,%s,%s)'''
    try:
        for year in catalogYears:  
            with open(f"{csv_folder}/catalogs/catalog_courses_{year}.csv","r") as catalogs_file:
                courses_reader=csv.DictReader(catalogs_file)

                for courseRow in courses_reader:
                    temp=courseRow
                    majorTitle=courseRow.pop("majorTitle")
                    catalogYear=courseRow.pop("catalogYear")
                    courseCode=courseRow.pop("courseCode")
                    prefix=courseRow.pop("prefix")
                    if(prefix=="CSCE" and int(courseCode)==4311): #wide area networks became computer network
                        courseCode=3312
                    if(prefix=="CSCE" and int(courseCode)==4312):
                        courseCode=3313


                    catalogId=_get_catalogId(catalogYear,majorTitle)
                    courseId=_get_courseId_by_code_prefix(courseCode,prefix)
                    if(not (catalogYear and courseId)): continue

                    courseRow["catalogId"]=catalogId
                    courseRow["courseId"]=courseId
                    if(not catalogId):
                        print("HERE: ",temp,majorTitle,catalogYear,courseCode)
                    values=list(courseRow.values())
                    cursor.execute(insert_sql,values)
        with open(f"{csv_folder}/catalogs/catalog_core_courses.csv","r") as core_courses_file:
                courses_reader=csv.DictReader(core_courses_file)
                cursor.execute("SELECT catalogId from catalogs")
                catalogIds=cursor.fetchall()
                for courseRow in courses_reader:
                        courseCode=courseRow.pop("courseCode")
                        prefix=courseRow.pop("prefix")
                        courseId=_get_courseId_by_code_prefix(courseCode,prefix)
                        if(not (courseId)): continue
                        print(courseRow)
                        for catalogId in catalogIds:
                            courseRow["catalogId"]=catalogId[0]
                            courseRow["courseId"]=courseId
                            values=list(courseRow.values())

                            cursor.execute(insert_sql,values)
    except ValueError:
            print(ValueError)
    db.commit()

def insertStandings():
    sql="INSERT INTO standings(standingId,standing,creditHrs) VALUES (%s,%s,%s)"
    with open(f"{csv_folder}/standings.csv","r") as standings_folder:
        standings_reader=csv.DictReader(standings_folder)
        for standingRow in standings_reader:
            cursor.execute(sql,list(standingRow.values()))
        db.commit()


def insertPaces():
    sql="INSERT INTO paces(paceTitle) VALUES (%s)"
    with open(f"{csv_folder}/paces.csv","r") as paces_folder:
        paces_reader=csv.DictReader(paces_folder)
        for paceRow in paces_reader:
            cursor.execute(sql,list(paceRow.values()))
        db.commit()

def insertRequisiteTypes():
    sql="INSERT INTO requisiteTypes(requisiteTypeId,requisiteType) VALUES (%s, %s)"
    with open(f"{csv_folder}/requisites/requisiteTypes.csv","r") as requisite_types_folder:
        requisite_types_reader=csv.DictReader(requisite_types_folder)
        for typeRow in requisite_types_reader:
            cursor.execute(sql,list(typeRow.values()))
        db.commit()

def insertPlans():
    insert_sql="INSERT INTO planCourses(semesterNumber,catalogId,courseId) VALUES (%s, %s,%s)"
    # plan_years=["2016-2017","2017-2018","2018-2019","2019-2020","2020-2021"]
    plan_years=["2020-2021"]
    plan_majors=["cs"]
    try:
        for major in plan_majors:    
            for year in plan_years:
                with open(f"{csv_folder}/plans/plan_{major}_{year}.csv","r") as plans_folder:
                    plans_reader=csv.DictReader(plans_folder)
                    err=False
                    for planRow in plans_reader:
                        catalogYear=planRow.pop("catalogYear")
                        majorTitle=planRow.pop("majorTitle")
                        prefix=planRow.pop("prefix")
                        courseCode=planRow.pop("courseCode")

                        catalogId=_get_catalogId(catalogYear,majorTitle)
                        courseId=_get_courseId_by_code_prefix(courseCode,prefix)
                        if(not (catalogId and courseId)):
                            err=True
                            # print(f"{catalogId} {courseId}, {prefix}\n{planRow} {courseCode}")
                            break
                        planRow["catalogId"]=catalogId
                        planRow["courseId"]=courseId
                        cursor.execute(insert_sql,list(planRow.values()))
                    if(not err):
                        db.commit()
                        print(cursor.rowcount, "plans inserted sucessfully")
                    else: print(" didn't insert plans with caalogId & courseId=",catalogId,courseId,courseCode)
    except ValueError:
                print(ValueError)




def _get_majorId(majorTitle):
    sql = "SELECT majorId from majors WHERE majorTitle LIKE %s LIMIT 1"
    majorTitle="%"+majorTitle+"%"
    
    cursor.execute(sql,[majorTitle])
    majorId=cursor.fetchone()
    return majorId[0] if majorId else None

def _get_catalogId(catalogYear,majorTitle):
    majorId= _get_majorId(majorTitle)
    if(not majorId): return None
    sql="SELECT catalogId from catalogs WHERE year LIKE %s AND majorId= %s LIMIT 1"
    cursor.execute(sql,[catalogYear,majorId])
    catalogId=cursor.fetchone()
    return catalogId[0] if catalogId else None

def _get_courseId_by_code_prefix(courseCode,prefix):
    print(courseCode,prefix)
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


def insertCourseRequites():
    sql='''INSERT INTO courseRequisites(setId,courseId) 
                        VALUES(%s,%s)
    '''
    with open(f"{csv_folder}/requisites/courseRequisites.csv","r") as requisites_folder:
        requisites_reader=csv.DictReader(requisites_folder)
        for requisiteRow in requisites_reader:
            prefix=requisiteRow.pop('prefix')
            courseCode=requisiteRow.pop('courseCode')
            courseId=_get_courseId_by_code_prefix(courseCode,prefix)
            requisiteRow["courseId"]=courseId
            print(requisiteRow)
            cursor.execute(sql,list(requisiteRow.values()))
        db.commit()


def insertRequisiteSets():
    sql='''INSERT INTO requisiteSets(setId,requisiteTypeId,requisiteId) 
                        VALUES(%s,%s,%s)
    '''
    with open(f"{csv_folder}/requisites/requisiteSets.csv","r") as requisites_folder:
        requisites_reader=csv.DictReader(requisites_folder)
        for requisiteRow in requisites_reader:
            prefix=requisiteRow.pop('requisitePrefix')
            courseCode=requisiteRow.pop('requisiteCode')
            requisiteCourseId=_get_courseId_by_code_prefix(courseCode,prefix)
            requisiteRow["requisiteId"]=requisiteCourseId
            print(requisiteRow)
            cursor.execute(sql,list(requisiteRow.values()))
        db.commit()


# insertStandings()
# insertMajors()
# insertMinors()
# insertCourses()
# insertRequisiteTypes()
# insertCourseTypes()
# insertCatalogs()
# insertPaces()
insertPlans()
# insertCatalogCourses()

# insertCourseRequites()
# insertRequisiteSets()