import os
import math
import re
import pymongo
import sys
from StyleFrame import StyleFrame
from pymongo import MongoClient
import pandas as pd
from pandas import ExcelFile

FORMS_LOCATION = './Forms/ReportTemplates/'
OUT_LOCATION = './Reports/'

def run():
    client = MongoClient('localhost',3001)
    db = client.meteor.patientinfo

    for filename in os.listdir(FORMS_LOCATION)[0:4]:
        df = pd.read_excel(filename)
        station_filename = filename.replace(".xlsx", "")
        station = df.columns[0]

        if station_filename != station:
            print("Station mismatch")
            sys.exit()

        df = pd.read_excel(filename, skiprows=2)

        out_df = generate_data_frame(station, df, db)
        StyleFrame(out_df).to_excel(os.path.join(OUT_LOCATION,"{}_Report.xlsx".format(station_filename)), index=False).save()
    
def convert_info_to_string(data):
    if type(data) is bool:
        if data:
            return "Yes"
        else:
            return "No"
    if isinstance(data, list):
        return "\n".join(list(map(str, data)))
    else:
        return data

def generate_data_frame(station, df, db):
    for info in db.find({station: {'$exists' :True}}, {'id': 1, station: 1}): 
        if station in info:
            responses = {}
            for question_id in df.columns:
                if question_id == 'ID':
                    responses['ID'] = info['id']
                else:
                    if question_id in info[station]:
                        responses[question_id] = convert_info_to_string(info[station][question_id])
                    else:
                        responses[question_id] = '-'
            df = df.append(responses, ignore_index=True)
    return df


if __name__ == "__main__":
    run()