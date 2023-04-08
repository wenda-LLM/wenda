
import settings
import threading,os
mutex = threading.Lock()
floder='txt'
files=os.listdir(floder)
from whoosh.fields import *
from jieba.analyse import ChineseAnalyzer
from whoosh.filedb.filestore import FileStorage
analyzer = ChineseAnalyzer()
schema = Schema(title=TEXT(stored=True), content=TEXT(stored=True, analyzer=analyzer))
storage = FileStorage('sy')
if not os.path.exists('sy'):
    os.mkdir('sy')
    ix = storage.create_index(schema)
else:
    ix = storage.open_index()

writer = ix.writer()
for file in files:
    try:
        with open(floder+'/'+file,"r",encoding='utf-16') as f:  
            data = f.read()
    except:
            with open(floder+'/'+file,"r",encoding='utf-8') as f:  
                data = f.read()
    # print(file,data)
    writer.add_document(title=file, content=data)

writer.commit()  # 提交