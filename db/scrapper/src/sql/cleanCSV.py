import re
import csv 
csv_folder="/home/youssef/dev/projects/Advisily/repo/db/scrapper/src/csv"



def clean_plan():
    cleaned=[]
    keys=[]
    infilename=f'{csv_folder}/plan_ce_2019-2020.csv'
    outfilename=f'{csv_folder}/plan_ce_2019-2020_cleaned.csv'
    with open(infilename,"r") as ce_plan_file:
        plan_reader= csv.DictReader(ce_plan_file)
        for plan in plan_reader:
            keys=plan.keys()
            course_title=plan["courseTitle"]
            
            has_numbers= re.search("[0-9]{3}L?\/[0-9]{4}.*",course_title)
            if(has_numbers):
                index=re.search("[0-9]{3}L?\/[0-9]{4}",course_title).span()[1]
                course_title=course_title[index:].strip()
            
            if(re.search("XXXX.*",course_title)): #starts with XXXX
                course_title =course_title[4:].strip()
            
            plan["courseTitle"]=course_title
            cleaned.append(plan)
    ce_plan_file.close()

    with open(outfilename,"w") as ce_plan_file:
        plan_writer=csv.DictWriter(ce_plan_file,keys)
        plan_writer.writeheader()
        plan_writer.writerows(cleaned)
    

# clean_plan()    