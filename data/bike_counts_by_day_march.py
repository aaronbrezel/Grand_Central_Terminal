import csv
import json

month_total = 0 
day_counts = {}
with open("bikes_counts_by_day_march.csv") as bikes:
    bikes_reader = csv.reader(bikes, delimiter=',')
    next(bikes_reader,None)
    for row in bikes_reader:
        day_counts[row[0]] = int(row[1])
        month_total = month_total + int(row[1])

day_counts["March"] = month_total

day_counts_json = json.dumps(day_counts)

with open("bike_counts_by_day_march.json", "w") as write_file:
    write_file.write(day_counts_json)