import os
import math
import re
import pymongo
from pymongo import MongoClient
import pandas as pd
from pandas import ExcelFile

def run():
    # for filename in os.listdir(FORMS_LOCATION)[0:4]:
    #     df = pd.read_excel(os.path.join(FORMS_LOCATION, filename), nrows=1, headers=None)
    #     form_name = df['Unnamed: 2'][0]

    #     df = pd.read_excel(os.path.join(FORMS_LOCATION, filename), skiprows=4)
    #     generate_strings(df, form_name)

    filename = './Registration.xlsx'

    df = pd.read_excel(filename)
    station = df.columns[0]
    df = pd.read_excel(filename, skiprows=2)

    client = MongoClient('localhost',3001)
    db = client.meteor.patientinfo

    out_df = generate_data_frame(station, df, db)
    out_df.to_excel('./Registration_Report.xlsx', index=False)
    
def convert_info_to_string(data):
    if type(data) is bool:
        if data:
            return "Yes"
        else:
            return "No"
    else:
        return data

def generate_data_frame(station, df, db):
    for i in range(1, db.count_documents({}) + 1):
        info = db.find_one({'id' : i})    
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