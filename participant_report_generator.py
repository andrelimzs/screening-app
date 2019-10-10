import os
import math
import re
import pymongo
import sys
from StyleFrame import StyleFrame
from pymongo import MongoClient
import pandas as pd
from pandas import ExcelFile

TEMPLATE_LOCATION = './Forms/ReportTemplates/Participant.xlsx'
OUT_LOCATION = './ParticipantReports/'

question_map = {
    'preRegistrationQ': 'Pre-Registration',
    'registrationQ': 'Registration',
    'phlebotomyQ': 'Phlebotomy',
    'hxHcsrQ': 'Hx HCSR',
    'hxNssQ': 'Hx NSS',
    'hxSocialQ': 'Hx Social',
    'hxCancerQ': 'Hx Cancer',
    'fitQ': 'FIT',
    'wceQ': 'WCE',
    'geriAmtQ': 'Geri - AMT',
    'geriEbasDepQ': 'Geri - EBAS-DEP',
    'geriCognitiveFollowUpQ': 'Geri - Cognitive Follow Up',
    'geriVisionQ': 'Geri - Vision',
    'geriParQQ': 'Geri - PAR-Q',
    'geriPhysicalActivityLevelQ': 'Geri - Physical Activity Level',
    'geriFrailScaleQ': 'Geri - Frail Scale',
    'geriOtQuestionnaireQ': 'Geri - OT Questionnaire',
    'geriSppbQ': 'Geri - SPPB',
    'geriTugQ': 'Geri - TUG',
    'geriPtConsultQ': 'Geri - PT Consult',
    'geriOtConsultQ': 'Geri - OT Consult',
    'geriGeriApptQ': 'Geri - Geri Appt',
    'doctorSConsultQ': 'Doctor\'s Consult',
    'dietitianQ': 'Dietitian',
    'socialServiceQ': 'Social Service',
    'feedbackFormQ': 'Feedback Form',
}

def run():
    client = MongoClient('localhost',3001)
    db = client.meteor.patientinfo

    df = pd.read_excel(TEMPLATE_LOCATION, skiprows=1)

    for info in db.find({'id': {'$exists' :True}}): 
        out_df = generate_data_frame(info, df)
        StyleFrame(out_df).to_excel(os.path.join(OUT_LOCATION,"{}.xlsx".format(info['id'])), index=False).save()
        print("Finished", str(info['id']))
    
def convert_info_to_string(data):
    if type(data) is bool:
        if data:
            return "Yes"
        else:
            return "No"
    if isinstance(data, list):
        return "\n".join(list(map(str, data)))
    return data

def generate_data_frame(info, df):
    responses = {}
    for question_id in df.columns:
        if question_id == 'ID':
            responses['ID'] = info['id']
        else:
            station = question_map[question_id].rstrip('0123456789')
            if station in info and question_id in info[station]:
                responses[question_id] = convert_info_to_string(info[station][question_id])
            else:
                responses[question_id] = '-'
    df = df.append(responses, ignore_index=True)
    return df


if __name__ == "__main__":
    run()