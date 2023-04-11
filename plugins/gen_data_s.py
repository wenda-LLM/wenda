
from whoosh.filedb.filestore import FileStorage
from jieba.analyse import ChineseAnalyzer
from whoosh.fields import *
import settings
import threading
import os
mutex = threading.Lock()
source_folder = settings.zhishiku_folder_name
source_folder_path = os.path.join(os.getcwd(), source_folder)

analyzer = ChineseAnalyzer()
schema = Schema(title=TEXT(stored=True), content=TEXT(
    stored=True, analyzer=analyzer))
storage = FileStorage('sy')
if not os.path.exists('sy'):
    os.mkdir('sy')
    ix = storage.create_index(schema)
else:
    ix = storage.open_index()

writer = ix.writer()

print(f'source_folder_path is: {source_folder_path}')
root_path_list = source_folder_path.split(os.sep)

for root, dirs, files in os.walk(source_folder_path):
    path_list = root.split(os.sep)
    for file in files:
        try:
            file_path = os.path.join(root, file)
            with open(file_path, "r", encoding='utf-16') as f:
                data = f.read()
        except:
            file_path = os.path.join(root, file)
            with open(file_path, "r", encoding='utf-8') as f:
                data = f.read()

        filename_prefix_list = [
            item for item in path_list if item not in root_path_list]
        file_name_prefix = '_'.join(x for x in filename_prefix_list if x)
        file_title = file_name_prefix + '_' + file if file_name_prefix else file

        writer.add_document(title=file_title, content=data)

writer.commit()  # 提交
