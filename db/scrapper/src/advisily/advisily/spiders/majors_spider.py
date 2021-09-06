

from selenium import webdriver
from selenium.common.exceptions import TimeoutException

from bs4 import BeautifulSoup
import requests
import re

import os
import sys
import scrapy
import csv




class CoursesSpider(scrapy.Spider):
    name="majors"
    start_urls=["https://catalog.aucegypt.edu/content.php?catoid=26&navoid=1250" ]

    def parse(self,response):
        majors=  response.css("table+ul li *::text").re(".*B\..*?\)")
    
        majorsParsed=[]
        for major in majors: 
            if (re.search("[A-Za-z ].*with",major)):
                start= major.find(",")
                end=major.find("(",start)

                major=major[0:start]+major[end-1:]
            majorsParsed.append({"majorTitle":major})   
        
        keys= majorsParsed[0].keys()
        with open("majors.csv","w",newline="") as of:
            dict_writer = csv.DictWriter(of,keys)
            dict_writer.writeheader()
            dict_writer.writerows(majorsParsed)
    
        


    


    