import csv
import json

day_counts = {}

with open("bikes_counts_by_day_march.csv") as bikes:
    bikes_reader = csv.reader(bikes, delimiter=',')
    next(bikes_reader,None)
    for row in bikes_reader:
        day_counts[row[0]] = {"bikes": row[1]}

with open("FHV_counts_by_day_march.csv") as FHV:
    FHV_reader = csv.reader(FHV,delimiter=",")
    next(FHV_reader,None)
    for row in FHV_reader:
        if "FHV" in day_counts[row[0]]:
            day_counts[row[0]]["FHV"].update({ row[1]: row[2] }) 
        else:
            day_counts[row[0]]["FHV"] = { row[1]: row[2] }

with open("yellowcab_counts_by_day_march.csv") as yellowcab:
    yellowcab_reader = csv.reader(yellowcab, delimiter=",")
    next(yellowcab_reader,None)
    for row in yellowcab_reader:
        if row[0] == "2018-04-01":
            pass
        else:
            day_counts[row[0]].update({"yellowcabs": row[1]})

day_counts_json = json.dumps(day_counts)    

with open("day_counts_march_json.json", "w") as write_file:
    write_file.write(day_counts_json)



