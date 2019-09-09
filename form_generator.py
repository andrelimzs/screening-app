import os
import math
import re
import pandas as pd
from pandas import ExcelFile

#TODO
# Illegal character replacement (e.g. < > ) 

FORMS_LOCATION = './Forms/'
OUTPUT_LOCATION = './GeneratedForms/'
string_formats = {
    'label': '<h2>{text}</h2>\n',
    'smalllabel': '<h3>{text}</h3>\n',
    'radio': '{text}\n<RadioField name=\"{name}\" label=\"{label}\"/>\n',
    'textfield': '{text}\n<TextField name=\"{name}\" label=\"{label}\"/>\n',
    'textbox': '{text}\n<TextField name=\"{name}\" label=\"{label}\"/>\n',
    'dropdown': '{text}\n<SelectField name=\"{name}\" label=\"{label}\"/>\n',
    'agreement': '{text}\n<BoolField name=\"{name}\" label=\"{label}\"/>\n',
    'checkbox': '{text}\n<SelectField name=\"{name}\" checkboxes="true" label=\"{label}\" />\n',
    'textarea': '{text}\n<LongTextField name=\"{name}\" label=\"{label}\" />\n',
    'number': '{text}\n<NumberField name=\"{name}\" label=\"{label}\" />\n',
    'todo': '{text}<TODO-MANUALLY name=\"{name}\" label=\"{label}\" />\n'
}

def run():
    # for filename in os.listdir(FORMS_LOCATION)[0:4]:
    #     df = pd.read_excel(os.path.join(FORMS_LOCATION, filename), nrows=1, headers=None)
    #     form_name = df['Unnamed: 2'][0]

    #     df = pd.read_excel(os.path.join(FORMS_LOCATION, filename), skiprows=4)
    #     generate_strings(df, form_name)

    filename = './Forms/6o. PHS Data Collection Geri - Geri Appointment.xlsx'

    df = pd.read_excel(filename, nrows=1, headers=None)
    form_name = df['Unnamed: 2'][0]

    df = pd.read_excel(filename, skiprows=4)
    generate_strings(df, form_name)
    

def generate_strings(df, form_name):
    form_string = ''
    schema_obj = {}
    question_count = 1
    for i in range(df.shape[0]):
        question_type = df['Type '][i].lower().replace(' ', '') # Label has a space at the end

        label = form_name + ' Q' + str(question_count)
        question_name = camelCase(label)

        if question_type in ('label', 'smalllabel'):
            form_string += string_formats[question_type].format(text=df['Label Text'][i].replace('\n','<br />'))
            continue

        elif question_type in ('radio', 'dropdown'):
            schema_obj[question_name] = {
                'type': 'String',
                'allowedValues': get_allowed_values(df, i)
            }

        elif question_type in ('textfield', 'textarea', 'textbox'):
            schema_obj[question_name] = {
                'type': 'String',
            }
        
        elif question_type == 'agreement':
            schema_obj[question_name] = {
                    'type': 'Boolean',
                    'label': '\"' + df['Value 1'][i] + '\"'
                }

        elif question_type == 'checkbox':
            schema_obj[question_name] = {
                    'type': 'Array',
                }
            schema_obj['\"{}.$\"'.format(question_name)] = {
                'type': 'String',
                'allowedValues': get_allowed_values(df, i)
            }
        
        elif question_type == 'number':
            schema_obj[question_name] = {
                    'type': 'Number'
                }
        else:
            form_string += string_formats['todo'].format(text=df['Label Text'][i].replace('\n','<br />'), name=question_name, label=label)
            continue    

        question_count += 1
        schema_obj[question_name]['optional'] = 'false' if df['Mandatory'][i].startswith('Y') else 'true'

        form_string += string_formats[question_type].format(text=df['Label Text'][i].replace('\n','<br />'), name=question_name, label=label)
    
    form_string = format_form_string(form_string, form_name)
    schema_string = format_schema_string(schema_obj, form_name)

    write_file(form_string, schema_string, form_name)


def write_file (form_string, schema_string, form_name):
    with open(os.path.join(OUTPUT_LOCATION, form_name + '.txt'), 'w', encoding='utf-8') as f:
        f.write(form_string)
        f.write('\n\n\n==========================================================================================================================================\n\n\n')
        f.write(schema_string)


def format_form_string(form_string, form_name):
    form_string = '\t' + form_string.replace('\n','\n\t')
    new_string = '\"' + form_name + '\" : (info) => (\n<Fragment>\n'
    new_string += form_string
    new_string = new_string.replace('\n','\n\t')
    new_string += '\n\t</Fragment>'
    new_string += '\n),'

    return new_string

def format_schema_string(schema_obj, form_name):
    schema_string = str(schema_obj)
    schema_string = schema_string.replace('\'','')
    schema_string = schema_string.replace('{', '{\n\t')
    schema_string = schema_string.replace('}', '\n\t}')
    schema_string = '\"' + form_name + "\" : new SimpleSchema(" + schema_string + '\n ),'

    return schema_string

def get_allowed_values(df, i):
    values = []
    for j in range(1,13):
        try:
            # Until no more values (is nan)
            if math.isnan(df['Value {}'.format(j)][i]):
                break
        except:
            pass
    
        values.append('\"' + str(df['Value {}'.format(j)][i]).strip() + '\"')
        
    return values


# https://stackoverflow.com/questions/8347048/how-to-convert-string-to-title-case-in-python
def camelCase(string):
    output = ''.join(x for x in string.title() if x.isalnum())
    return output[0].lower() + output[1:]

if __name__ == "__main__":
    run()