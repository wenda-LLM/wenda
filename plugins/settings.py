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
settings.green = "\033[1;32m"
settings.red = "\033[1;31m"
settings.white = "\033[1;37m"

import webbrowser
def error_helper(e,doc_url):
    error_print(e)
    webbrowser.open_new(doc_url)
def error_print(s):
    print(settings.red,end="")
    print(s)
    print(settings.white,end="")
def success_print(s):
    print(settings.green,end="")
    print(s)
    print(settings.white,end="")
    

import json
import os
from collections import OrderedDict

import xml.etree.cElementTree as ET


def strip_tag(tag):
    strip_ns_tag = tag
    split_array = tag.split('}')
    if len(split_array) > 1:
        strip_ns_tag = split_array[1]
        tag = strip_ns_tag
    return tag


def elem_to_internal(elem, strip_ns=1, strip=1):
    """Convert an Element into an internal dictionary (not JSON!)."""

    d = OrderedDict()
    elem_tag = elem.tag
    if strip_ns:
        elem_tag = strip_tag(elem.tag)
    for key, value in list(elem.attrib.items()):
        d['@' + key] = value

    # loop over subelements to merge them
    for subelem in elem:
        v = elem_to_internal(subelem, strip_ns=strip_ns, strip=strip)

        tag = subelem.tag
        if strip_ns:
            tag = strip_tag(subelem.tag)

        value = v[tag]

        try:
            # add to existing list for this tag
            d[tag].append(value)
        except AttributeError:
            # turn existing entry into a list
            d[tag] = [d[tag], value]
        except KeyError:
            # add a new non-list entry
            d[tag] = value
    text = elem.text
    tail = elem.tail
    if strip:
        # ignore leading and trailing whitespace
        if text:
            text = text.strip()
        if tail:
            tail = tail.strip()

    if tail:
        d['#tail'] = tail

    if d:
        # use #text element if other attributes exist
        if text:
            d["#text"] = text
    else:
        # text is the value if no attributes
        d = text or None
    return {elem_tag: d}


def internal_to_elem(pfsh, factory=ET.Element):

    """Convert an internal dictionary (not JSON!) into an Element.
    Whatever Element implementation we could import will be
    used by default; if you want to use something else, pass the
    Element class as the factory parameter.
    """

    attribs = OrderedDict()
    text = None
    tail = None
    sublist = []
    tag = list(pfsh.keys())
    if len(tag) != 1:
        raise ValueError("Illegal structure with multiple tags: %s" % tag)
    tag = tag[0]
    value = pfsh[tag]
    if isinstance(value, dict):
        for k, v in list(value.items()):
            if k[:1] == "@":
                attribs[k[1:]] = v
            elif k == "#text":
                text = v
            elif k == "#tail":
                tail = v
            elif isinstance(v, list):
                for v2 in v:
                    sublist.append(internal_to_elem({k: v2}, factory=factory))
            else:
                sublist.append(internal_to_elem({k: v}, factory=factory))
    else:
        text = value
    e = factory(tag, attribs)
    for sub in sublist:
        e.append(sub)
    e.text = text
    e.tail = tail
    return e


def elem2json(elem, pretty, strip_ns=1, strip=1):

    """Convert an ElementTree or Element into a JSON string."""

    if hasattr(elem, 'getroot'):
        elem = elem.getroot()

    if pretty:
        return json.dumps(elem_to_internal(elem, strip_ns=strip_ns, strip=strip), indent=4, separators=(',', ': '))
    else:
        return json.dumps(elem_to_internal(elem, strip_ns=strip_ns, strip=strip))


def json2elem(json_data, factory=ET.Element):

    """Convert a JSON string into an Element.
    Whatever Element implementation we could import will be used by
    default; if you want to use something else, pass the Element class
    as the factory parameter.
    """

    return internal_to_elem(json.loads(json_data), factory)


def xml2json(xmlstring, options, strip_ns=1, strip=1):

    """Convert an XML string into a JSON string."""

    elem = ET.fromstring(xmlstring)
    return elem2json(elem, options, strip_ns=strip_ns, strip=strip)


def json2xml(json_data, factory=ET.Element):

    """Convert a JSON string into an XML string.
    Whatever Element implementation we could import will be used by
    default; if you want to use something else, pass the Element class
    as the factory parameter.
    """
    if not isinstance(json_data, dict):
        json_data = json.loads(json_data)

    elem = internal_to_elem(json_data, factory)
    return ET.tostring(elem)
