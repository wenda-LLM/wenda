import os
import xml.etree.ElementTree as ET
import re
import json





class obj:
  def __init__(self, dict1):
    self.__dict__.update(dict1)

def object_hook(dict1):
  for key, value in dict1.items():
    if isinstance(value, dict):
      dict1[key] = object_hook(value)
    else:
      dict1[key] = value
  return obj(dict1)



wenda_Config = os.environ.get('wenda_'+'Config')
wenda_Port = os.environ.get('wenda_'+'Port')
wenda_Logging = os.environ.get('wenda_'+'Logging')
wenda_LLM_Type = os.environ.get('wenda_'+'LLM_Type')



def setting(xml_path=str):
    out = {}
    tree=ET.parse(xml_path)
    root = tree.getroot()
    generals = root.findall("General/property")
    for general in generals: # 遍历列表
        name = general.find("name") # 查找<name>标签
        if eval("wenda_"+name.text) == None or eval("wenda_"+name.text) == 'None':
            out[name.text] = general.find("value").text
        else:
            out[name.text] = eval("wenda_"+name.text)

    models = root.findall("Models/" + out['LLM_Type'].upper() + "/property")
    for model in models: # 遍历列表
        name = model.find("name") # 查找<name>标签
        out[name.text] = model.find("value").text

    librarys = root.findall("Library/property")
    librarys_dict = {}
    for library in librarys: # 遍历列表
        name = library.find("name") # 查找<name>标签
        librarys_dict[name.text] = library.find("value").text
    out['library'] = librarys_dict

    librarys = root.findall("Library/" + out['library']['Type'].upper() + "/property")
    librarys_dict = {}
    for library in librarys: # 遍历列表
        name = library.find("name") # 查找<name>标签
        librarys_dict[name.text] = library.find("value").text
    out['library'][out['library']['Type']] = librarys_dict
    
    if out['library']['Type'] == 'mix':
        mix_list = out['library']['mix']['Strategy'].split(" ")
        for mix_lib in mix_list:
            Type = mix_lib.split(":")[0]
            if ":" in mix_lib:
                Count = mix_lib.split(":")[1]
            librarys = root.findall("Library/" + Type.upper() + "/property")
            librarys_dict = {}
            for library in librarys: # 遍历列表
                name = library.find("name") # 查找<name>标签
                librarys_dict[name.text] = library.find("value").text
            if not (Count == '' or Count == None):
                librarys_dict['Count'] = Count
            out['library'][Type] = librarys_dict

    # glm = root.findall("Models/GLM")
    return out



settings = setting(wenda_Config)



settings_str=json.dumps(settings,indent=4)
settings_str_toprint=re.sub(r':', ":"+"\033[1;32m", settings_str)
settings_str_toprint=re.sub(r'[",]', "", settings_str_toprint)
settings_str_toprint=re.sub(r'\s+\}', "", settings_str_toprint)
settings_str_toprint=re.sub(r'\n', "\n\033[1;31m", settings_str_toprint)
settings_str_toprint=re.sub(r'\{', "\033[1;31m", settings_str_toprint)
print("\033[1;31m",end="")
print(settings_str_toprint,end="")
print("\033[1;37m")
settings = json.loads(settings_str, object_hook=object_hook)
settings.red = "\033[1;32m"
settings.green = "\033[1;31m"
settings.white = "\033[1;37m"
