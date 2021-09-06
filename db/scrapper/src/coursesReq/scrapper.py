#Formats
#  CODE AND CODE.
#  CODE, CODE
#  CODE, CODE, AND CODE etc
#  CODE AND CODE OR "concurrently"
#   CODE and X "standing" 
#  "concurrent with" CODE
#   CODE or CODE
#    "permission/consent of"
#
  


from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC

from bs4 import BeautifulSoup
import requests
import re

# driver = webdriver.Chrome("/usr/lib/chromedriver/chromedriver")
# link="https://catalog.aucegypt.edu/preview_program.php?catoid=36&poid=6108"

# driver.get(link)
# # driver.findElement(By.cssSelector("a[onclick^='javascript: confirmDelete']")).click()
# elements=driver.find_elements_by_css_selector("ul li.acalog-course span a")
# for e in elements:
#    try:
#         e.click()
#    except:
#        print("Err")
# page=driver.page_source
# print(page)
# driver.quit()

with open("./index.html") as fp:
    soup= BeautifulSoup(fp,'html.parser')

coursesHtml=list(soup.select('table.td_dark'))

courses=[]
courseCodeRegex=re.compile("[A-Z]{3,4} [0-9]{3,4}L?\/[0-9]{4}")
courseRequisiteRegex=re.compile("Prerequisite.*((?=Description)|\\n.*(?=Description))")
codeFormat="[A-Z]{4} [0-9]{4}"

def parseCourse(course:str):
    prefix= re.search("[A-Z]{3,4}",course).group()
    shortCode=re.search("[0-9]{3}L?",course).group()
    longCode=re.search("[0-9]{4}",course).group()
    return {
        "prefix":prefix.strip(),
        "courseCode":longCode.strip(),
    }
    
count=0
for html in coursesHtml:
    text= html.getText()
    # print(text)
    text.replace(u'\xa0',' ')
    # print(text)
    courseMatch=courseCodeRegex.search(text)
    requisiteMatch=courseRequisiteRegex.search(text)

    if(courseMatch and requisiteMatch):
        text= courseMatch.group().strip()
        prerequisiteIndex=text.find("Prerequisite")
        course= courseMatch.group()
        prerequisite=requisiteMatch.group()[13:].replace("\xa0",' ')

        # concurrent=re.search(f"(and)? concurrent(ly)? with.*{codeFormat}.*",prerequisite,flags=re.IGNORECASE)
        # concurrent=re.search(f".*concurrent.*",prerequisite,flags=re.IGNORECASE)
        # concurrent=re.search(f'''(  concurrent with.*{codeFormat})|(must be taken concurrently with.*{codeFormat})|and concurrent(ly)? with.*{codeFormat}|concurrent with {codeFormat}''',prerequisite,flags=re.IGNORECASE)
        # if(concurrent):
            # concurrent=re.search(f"{codeFormat}.*(or).*concurrent(ly)?",concurrent.group(),flags=re.IGNORECASE)
        # changed=False
        # prerequisite2=prerequisite
        # if(concurrent):
            # prerequisite=concurrent.group()
      
            # prerequisite=re.search(codeFormat,prerequisite).group()
        # print("\npre:",prerequisite)
        courseParsed= parseCourse(course)


        

        thisdict={
            "prefix":courseParsed["prefix"],
            "courseCode":courseParsed["courseCode"],
            "prerequisite":prerequisite.strip(),
        }
        print(thisdict)
        count+=1
        courses.append(thisdict)
    else:
        break

print(count)


# special case: remove conncurent from assembly. 
#  PHYS  2211 concurrent course


import csv

# keys= courses[0].keys()
# with open("coursesRequisites.csv","w",newline="") as of:
#     dict_writer = csv.DictWriter(of, keys)
#     dict_writer.writeheader()
#     dict_writer.writerows(courses)
