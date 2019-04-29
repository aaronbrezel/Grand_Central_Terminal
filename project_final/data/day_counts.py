import csv
import json
import math

day_counts = {}
bikes_total = 0


with open("bikes_counts_by_day_march.csv") as bikes:
    bikes_reader = csv.reader(bikes, delimiter=',')
    next(bikes_reader,None)
    for row in bikes_reader:
        if "bikes" in day_counts:
            day_counts["bikes"].update({row[0]: int(row[1])})
            bikes_total = bikes_total + int(row[1])
        else:
            day_counts["bikes"] = {row[0]: int(row[1])}
            bikes_total = bikes_total + int(row[1])
    day_counts["bikes"].update({"total" : bikes_total})
       
with open("FHV_counts_by_day_march.csv") as FHV:
    FHV_reader = csv.reader(FHV,delimiter=",")
    next(FHV_reader,None)
    for row in FHV_reader:
 
        if "FHV" in day_counts:
            if row[0] in day_counts["FHV"]:
                day_counts["FHV"][row[0]] = day_counts["FHV"][row[0]] + int(row[2])
            else:
                day_counts["FHV"].update({row[0]: int(row[2])})
        else:
            day_counts["FHV"] = {row[0]: int(row[2])}
    total = 0
    for key in day_counts["FHV"]:
        total = total + day_counts["FHV"][key]
    day_counts["FHV"].update({"total": total})

with open("yellowcab_counts_by_day_march.csv") as yellowcab:
    yellowcab_reader = csv.reader(yellowcab, delimiter=",")
    next(yellowcab_reader,None)
    yellowcab_total = 0
    for row in yellowcab_reader:
        if row[0] == "2018-04-01":
            pass
        else:
            if "yellowcabs" in day_counts:
                day_counts["yellowcabs"].update({row[0]: int(row[1])})
                yellowcab_total = yellowcab_total + int(row[1])
            else:
                day_counts["yellowcabs"] = {row[0]: int(row[1])}
                yellowcab_total = yellowcab_total + int(row[1])
    day_counts["yellowcabs"].update({"total" : yellowcab_total})

day_counts_json = json.dumps(day_counts)    

with open("day_counts_march_json.json", "w") as write_file:
    write_file.write(day_counts_json)



