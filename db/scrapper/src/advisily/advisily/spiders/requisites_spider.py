#Formats
#  CODE AND CODE.
#  CODE, CODE
#  CODE, CODE, AND CODE etc
#  CODE AND CODE OR "concurrently"
#   CODE and X "standing" 
#  "concurrent with" CODE   
#   CODE or CODE
#    "permission/consent of"




from selenium import webdriver
from selenium.common.exceptions import TimeoutException

import re
import os
import sys
import scrapy
import csv

   



class RequisitesSpider(scrapy.Spider):
    name="requisites"
    start_urls=[
    # "https://catalog.aucegypt.edu/preview_program.php?catoid=36&poid=6107", #CE 2020 - 2021
    # "https://catalog.aucegypt.edu/preview_program.php?catoid=36&poid=6108" #CS 2020 - 2021
    "file:///home/youssef/dev/projects/Advisily/repo/db/scrapper/src/coursesReq/index.html"
    ]

    # def __init__(self):
        # self.driver = webdriver.Chrome("/usr/lib/chromedriver/chromedriver")


    def parse(self,response):
        # self.driver.set_page_load_timeout(80)
        # try:
        #     self.driver.get(response.url)
        # except TimeoutException:
        #     self.driver.execute_script("window.stop();")
        # # self.driver.findElement(By.cssSelector("a[onclick^='javascript: confirmDelete']")).click()
        # elements=self.driver.find_elements_by_css_selector("ul li.acalog-course span a")
        # for e in elements:
        #     try:
        #         e.click()
        #     except:
        #         print("Err")
        # page=self.driver.page_source
        # try:
        #     page.css("")
        # self.driver.quit()
        coursesHtml=str(response.css("*::text").getall())
        # print(f"\n\n\n\n{coursesHtml}\n\n\n\n")
        x=re.compile("Prerequisite.*((?=Description)|\\n.*(?=Description))")
        courseCodeRegex=re.compile("[A-Z]{3,4} [0-9]{3,4}L?\/[0-9]{4}")
        courseRequisiteRegex=re.compile("Prerequisite.*((?=Description)|\\n.*(?=Description))")

        for html in coursesHtml:
            text= x.search(coursesHtml).group() 
            print("\n\n\n\n",text,"\n\n\n\n")
            break
            # courseMatch=courseCodeRegex.search(text)
            # requisiteMatch=courseRequisiteRegex.search(text)

            # if(courseMatch and requisiteMatch):
            # text= courseMatch.group()
            # prerequisiteIndex=text.find("Prerequisite")
            # course= courseMatch.group()
            # prerequisite=requisiteMatch.group()[13:]
            # print(course,"\npre:",prerequisite)
            thisdict={
                "prerequisite":"prerequisite"
            }
        # print(f"\n\n\n\n\n{type(coursesHtml)}\n\n\n\n\n")
        #     else:
        #         print("Error in : ",text,courseMatch)
        #         break
