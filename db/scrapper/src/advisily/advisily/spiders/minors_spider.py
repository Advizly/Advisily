

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
    name="minors"
    start_urls=["https://catalog.aucegypt.edu/content.php?catoid=26&navoid=1250" ]

    def parse(self,response):
        minors=  response.css("table+ul li *::text").re('[A-Za-z ]+ Minor')
        minorsParsed=[]
        for major in minors: 
            minorsParsed.append({"minorTitle":major})   
        
        keys= minorsParsed[0].keys()
        with open("minors.csv","w",newline="") as of:
            dict_writer = csv.DictWriter(of,keys)
            dict_writer.writeheader()
            dict_writer.writerows(minorsParsed)
    
        


    


    