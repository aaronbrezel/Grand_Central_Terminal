import csv
import json
import math

day_counts = {}

month_total = 0
bike_total = 0
FHV_total = 0
Uber_total = 0
Lyft_total = 0
Via_total = 0
yellowcab_total = 0

critical_totals = {}

with open("bikes_counts_by_day_march.csv") as bikes:
    bikes_reader = csv.reader(bikes, delimiter=',')
    next(bikes_reader,None)
    for row in bikes_reader:
        day_counts[row[0]] = {"bikes": row[1]}
        day_counts[row[0]].update({"total" : int(row[1])})
        month_total = month_total + int(row[1])
        bike_total = bike_total + int(row[1])

with open("FHV_counts_by_day_march.csv") as FHV:
    FHV_reader = csv.reader(FHV,delimiter=",")
    next(FHV_reader,None)
    for row in FHV_reader:
        month_total = month_total + int(row[2])
        if "FHV" in day_counts[row[0]]:
            day_counts[row[0]]["FHV"].update({ row[1]: row[2] })
            day_counts[row[0]]["total"] = day_counts[row[0]]["total"] + int(row[2]) 
        else:
            day_counts[row[0]]["FHV"] = { row[1]: row[2] }
            day_counts[row[0]]["total"] = day_counts[row[0]]["total"] + int(row[2])

        FHV_total = FHV_total + int(row[2])
        #calculates individual totals for each rideshare
        if row[1] == "Uber":
            Uber_total = Uber_total + int(row[2])
        elif row[1] == "Lyft":
            Lyft_total = Lyft_total + int(row[2])
        elif row[1] == "Via":
            Via_total = Via_total + int(row[2])
            

with open("yellowcab_counts_by_day_march.csv") as yellowcab:
    yellowcab_reader = csv.reader(yellowcab, delimiter=",")
    next(yellowcab_reader,None)
    for row in yellowcab_reader:
        if row[0] == "2018-04-01":
            pass
        else:
            day_counts[row[0]].update({"yellowcabs": row[1]})
            day_counts[row[0]]["total"] = day_counts[row[0]]["total"] + int(row[1])
            month_total = month_total + int(row[1])
            yellowcab_total = yellowcab_total + int(row[1])

day_counts_json = json.dumps(day_counts)    

with open("day_counts_march_json.json", "w") as write_file:
    write_file.write(day_counts_json)

critical_totals["month_total"] = month_total
critical_totals["bike_total"] = bike_total
critical_totals["FHV_total"] = FHV_total
critical_totals["Uber_total"] = Uber_total
critical_totals["Lyft_total"] = Lyft_total
critical_totals["Via_total"] = Via_total
critical_totals["yellowcab_total"] = yellowcab_total

critical_totals_json = json.dumps(critical_totals)

with open("critical_totals_march_json.json", "w") as write_file:
    write_file.write(critical_totals_json)


proportion_table = {}
proportion_by_day = {}


#########################################################################
# Create table 984 rows proportional by day
########################################################################
for key in day_counts:
    proportion_by_day[key] = math.floor((day_counts[key]["total"] / month_total)*2000)

count = 1

for key in proportion_by_day:
    for i in range(1,proportion_by_day[key]+1):
        proportion_table[str(count)] = [key]
        count = count+1


########################################################################
# Assign bikes FHV and yellowcab by day
#########################################################################
proportion_of_transportation_by_day = {}

for key in day_counts:
    
    for category in ["bikes", "yellowcabs", "Ubers", "Lyfts", "Vias"]:        
        if key in proportion_of_transportation_by_day:
            if category == "Ubers":
                proportion_of_transportation_by_day[key].update({category: (int(day_counts[key]["FHV"]["Uber"])/day_counts[key]["total"])*proportion_by_day[key]})
            elif category == "Lyfts":
                proportion_of_transportation_by_day[key].update({category:(int(day_counts[key]["FHV"]["Lyft"])/day_counts[key]["total"])*proportion_by_day[key]})
            elif category == "Vias":
                proportion_of_transportation_by_day[key].update({category:(int(day_counts[key]["FHV"]["Via"])/day_counts[key]["total"])*proportion_by_day[key]})
            else:
                proportion_of_transportation_by_day[key].update({category:(int(day_counts[key][category])/day_counts[key]["total"])*proportion_by_day[key]})
        else:
            if category == "Ubers":
                proportion_of_transportation_by_day[key] = {category:(int(day_counts[key]["FHV"]["Uber"])/day_counts[key]["total"])*proportion_by_day[key]}
            elif category == "Lyfts":
                proportion_of_transportation_by_day[key] = {category:(int(day_counts[key]["FHV"]["Lyft"])/day_counts[key]["total"])*proportion_by_day[key]}
            elif category == "Vias":
                proportion_of_transportation_by_day[key] = {category:(int(day_counts[key]["FHV"]["Via"])/day_counts[key]["total"])*proportion_by_day[key]}
            else:
                proportion_of_transportation_by_day[key] = {category:(int(day_counts[key][category])/day_counts[key]["total"])*proportion_by_day[key]}


print(proportion_of_transportation_by_day)



# for key in proportion_table:
#     proportion_table[key].append("citiBike")
#     print(proportion_table[key])
