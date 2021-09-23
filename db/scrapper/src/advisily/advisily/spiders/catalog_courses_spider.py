
import re

import scrapy
import os
import sys
import csv


class CatalogCourses(scrapy.Spider):
    name="catalogs"
    start_urls=[
    "https://catalog.aucegypt.edu/preview_program.php?catoid=26&poid=4490", #CS 2016 - 2017
    "https://catalog.aucegypt.edu/preview_program.php?catoid=20&poid=2943", #CS 2017 - 2018
    "https://catalog.aucegypt.edu/preview_program.php?catoid=27&poid=4747", #CS 2018 - 2019
    "https://catalog.aucegypt.edu/preview_program.php?catoid=29&poid=5123", #CS 2019 - 2020
    "https://catalog.aucegypt.edu/preview_program.php?catoid=36&poid=6108", #CS 2020 - 2021
    "https://catalog.aucegypt.edu/preview_program.php?catoid=37&poid=6352",  #CS 2021 - 2022
    
    "https://catalog.aucegypt.edu/preview_program.php?catoid=26&poid=4489", #CE 2016 - 2017
    "https://catalog.aucegypt.edu/preview_program.php?catoid=20&poid=2942", #CE 2017 - 2018
    "https://catalog.aucegypt.edu/preview_program.php?catoid=27&poid=4746", #CE 2018 - 2019
    "https://catalog.aucegypt.edu/preview_program.php?catoid=29&poid=5122", #CE 2019 - 2020
    "https://catalog.aucegypt.edu/preview_program.php?catoid=36&poid=6107", #CE 2020 - 2021
    "https://catalog.aucegypt.edu/preview_program.php?catoid=37&poid=6351"  #CE 2021 - 2022

    ]
    
    def parse(self,response):
       catalog=self.parseCatalog(response)
       catalog_courses=self.parseCourses(response,catalog["year"])
       catalog_file="catalogs.csv"
       catalog_courses_file=f'catalog_courses_{catalog["year"]}.csv'

       keys=catalog.keys()
       write_headers=not os.path.isfile(catalog_file) or os.path.getsize(catalog_file)==0 

       with open(catalog_file,"a") as f:
           dict_writer=csv.DictWriter(f,keys)
           if(write_headers):
                dict_writer.writeheader()

           dict_writer.writerow(catalog)

       keys=catalog_courses[0].keys()
       write_headers=not os.path.isfile(catalog_courses_file) or os.path.getsize(catalog_courses_file)==0 
       with open(catalog_courses_file,"a")as f:
             dict_writer=csv.DictWriter(f,keys)
             if(write_headers):
                    dict_writer.writeheader()

             dict_writer.writerows(catalog_courses)
             f.close()

    def parseCatalog(self,response):    
        catalogYear=response.css("#acalog-catalog-name::text").re("[0-9]+-[0-9]+")[0]
        majorTitle=response.css('#acalog-content::text').get()
        headers= response.css('.custom_leftpad_20 div.acalog-core *::text').re(".*\([0-9]+.*credits.*")
        creditsPattern="[0-9]+-[0-9]+|[0-9]+"

        if(majorTitle.find("Engineering")!=-1):
            collateralCredits=None
            engCoreCredits=re.search(creditsPattern,headers[1]).group()
        else:
            collateralCredits=re.search(creditsPattern,headers[4]).group()
            engCoreCredits=None

        coreCredits=re.search(creditsPattern,headers[0]).group()
        concReqCredits=re.search(creditsPattern,headers[2]).group()
        concElecCredits=re.search(creditsPattern,headers[3]).group()
        generalElecCredits=re.search(creditsPattern,headers[-1]).group()
        generalElecCredits=generalElecCredits if generalElecCredits.isnumeric() else '9'#set general electives to 9 in old catalogs
        catalog={    
            "year":catalogYear,
            "majorTitle":majorTitle,
            "coreCredits":coreCredits,
            "concReqCredits":concReqCredits,
            "concElecCredits":concElecCredits,
            "collateralCredits":collateralCredits,
            "generalElecCredits":generalElecCredits,
            "engCoreCredits":engCoreCredits
        }
        return catalog

    def parseCoursesByCategories(self, courses,catalogYear,courseTypeId,majorTitle): 
        coursesParsed=[]
        if(len(courses)>0):
            for course in courses:
                prefix= re.search("[A-Z]{3,4}",course).group()
                shortCode=re.search("[0-9]{3}L?",course).group()
                longCode=re.search("[0-9]{4}",course).group()
                coursesParsed.append( {
                    "majorTitle":majorTitle,
                    "catalogYear":catalogYear,
                    "courseCode":longCode,
                    "prefix":prefix,
                    "courseTypeId":courseTypeId,
                })
        return coursesParsed

    def parseCourses(self,response,catalogYear):
        majorTitle=response.css('#acalog-content::text').get()
        coursesHtml= response.css('.custom_leftpad_20 div.acalog-core').getall()
        courses=[]
        for html in coursesHtml:
            courses.append(re.findall("[A-Z]{3,4} [0-9]{3,4}L?\/[0-9]{4}.*?\(.*?cr\..*?\)",html))

        if(majorTitle.find("Engineering")!=-1): #CE 
            collateralPart=[]
            engCorePart=self.parseCoursesByCategories(courses[1],catalogYear,5,majorTitle)
        else: #CS
            engCorePart=[]

            #add differential equations course for old catalogs
            startYear=re.search("[0-9]+",catalogYear).group()
            if(int(startYear)<=2018):
                courses[3].append("MACT 233/2141 - Differential Equations (3 cr.)")

            collateralPart= self.parseCoursesByCategories(courses[4],catalogYear,4,majorTitle)

        #get each course by category 
        concenterationPart= self.parseCoursesByCategories(courses[2],catalogYear,2,majorTitle)
        electivePart=self.parseCoursesByCategories( courses[3],catalogYear,3,majorTitle)

        
        #combine and return
        allCourses=concenterationPart+electivePart+collateralPart+engCorePart
        return allCourses
        
    

      
        

        
