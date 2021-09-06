#formats for credits
# n cr. 
# n cr. + n cr.
# 1 or 2 or 3
# up to 3
# no cr.
# n1-n2

import re
import os
import sys
import scrapy
import csv


#https://catalog.aucegypt.edu/content.php?catoid=36&navoid=1738&filter\%%5B27%%5D=-1&filter%%5B29%%5D=&filter%%5Bcourse_type%%5D=-1&filter%%5Bkeyword%%5D=&filter%%5B32%%5D=1&filter%%5Bcpage%%5D=1&filter%%5Bitem_type%%5D=3&filter%%5Bonly_active%%5D=1&filter%%5B3%%5D=1


pseudo_courses=[
{"courseCode":-10,"courseTitle":"Major Elective","credits":"NULL","prefix":"XXXX"},
{"courseCode":-9,"courseTitle":"General Elective","credits":"NULL","prefix":"XXXX"},
{"courseCode":-8,"courseTitle":"Arab World Studies II","credits":3,"prefix":"XXXX"},
{"courseCode":-7,"courseTitle":"Arab World Studies I","credits":3,"prefix":"XXXX"},
{"courseCode":-6,"courseTitle":"Core Capstone II","credits":3,"prefix":"XXXX"},
{"courseCode":-5,"courseTitle":"Core Capstone I","credits":3,"prefix":"XXXX"},
{"courseCode":-4,"courseTitle":"Humanities and Social Sciences","credits":3,"prefix":"XXXX"},
{"courseCode":-3,"courseTitle":"Global Studies","credits":3,"prefix":"XXXX"},
{"courseCode":-2,"courseTitle":"Pathways II: Cultural Explorations","credits":3,"prefix":"XXXX"},
{"courseCode":-1,"courseTitle":"Pathways I: Scientific Encounters","credits":3,"prefix":"XXXX"} 
]

class CoursesSpider(scrapy.Spider):
    name="courses"
    start_urls=["https://catalog.aucegypt.edu/content.php?catoid=36&navoid=1738&filter\%%5B27%%5D=-1&filter%%5B29%%5D=&filter%%5Bcourse_type%%5D=-1&filter%%5Bkeyword%%5D=&filter%%5B32%%5D=1&filter%%5Bcpage%%5D=%s&filter%%5Bitem_type%%5D=3&filter%%5Bonly_active%%5D=1&filter%%5B3%%5D=1" % page for page in range(1,26)]
    def parse(self,response):
        match=re.search("page.*?=[0-9]{2}",response.url)
        if(match):
            page=match.group()[-2:]
        else: page=re.search("page.*?=[0-9]{1}",response.url).group()[-1]

        filename="courses.csv"
  
        courses=self.parseCoursesHtml(response)
        keys={}
        if(len(courses)):
            keys= courses[0].keys()
        else :print("\n\n\n\problem getting data from page ",page,"\n\n\n\n\n")

        write_header= not os.path.isfile(filename) or os.path.getsize(filename)==0
        with open(filename,"a",newline="") as of:
            dict_writer = csv.DictWriter(of,keys)
            if(write_header):
                dict_writer.writeheader()
                dict_writer.writerows(pseudo_courses)
            dict_writer.writerows(courses)


    def parseCoursesHtml(self,response):
        courses=response.css('table.table_default tr td.width a').re('[A-Z]{3,4} [0-9]{3,4}L?\/[0-9]{4}.*?\(.*?cr\..*?\)')
        coursesParsed=[]
        # print(courses)
        skipRepeat=False
        for course in courses:
                if(not skipRepeat):
                    coursesParsed.append(self.parseCourse(course))
                skipRepeat= not skipRepeat
        return coursesParsed

    def parseCourse(self,course:str):
        prefix= re.search("[A-Z]{3,4}",course).group().strip()
        shortCode=re.search("[0-9]{3}L?",course).group().strip()
        longCode=re.search("[0-9]{4}L?",course).group().strip()
        _credits=re.search("\([^\(]*cr.*?",course).group()
        titleStartIndex=course.find("-")
        creditsIndex=course.find(_credits)
        courseTitle=course[titleStartIndex+1:creditsIndex-1].strip().replace("&amp;","&")

        # print(course)
        _credits=_credits.replace("cr.","").replace("cr","").replace("(","").strip()#remove cr and bracket
        if(_credits.find("no")!=-1):_credits=0 #no cr means 0 credits
        elif (re.search("([0-9][ ]*?-[ ]*?[0-9])|(1, 2, or 3)|(up to)",_credits)):_credits="NULL" 
        elif (re.search("[0-9][ ]*?\+[ ]*?[0-9]", _credits)):_credits=eval(re.search("[0-9][ ]*?\+[ ]*?[0-9]", _credits).group())
        # elif(_credits.find("up to ")!=-1):
        #     index=_credits.find("up to ")
        #     _credits="1-"+_credits[index+6:]
        # elif(re.search("[0-9]-[0-9]",_credits)): _credits=re.search("[0-9]-[0-9]",_credits).group()
        # elif (re.search("1, 2, or 3",_credits)):_credits="1-3"
        # else : _credits=_credits[1:len(_credits)-3]

        return {
            "courseCode":longCode,
            "courseTitle":courseTitle,
            "prefix":prefix,
            "credits":_credits,
        }
