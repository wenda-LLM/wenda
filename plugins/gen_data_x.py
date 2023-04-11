
from langchain.embeddings import HuggingFaceEmbeddings
import settings
import os
from langchain.vectorstores.faiss import FAISS
from langchain.document_loaders import DirectoryLoader
from langchain.text_splitter import TokenTextSplitter, CharacterTextSplitter

source_folder = settings.zhishiku_folder_name
target_folder = source_folder + '_out'
source_folder_path = os.path.join(os.getcwd(), source_folder)
target_folder_path = os.path.join(os.getcwd(), target_folder)

if not os.path.exists(target_folder_path):
    os.mkdir(target_folder_path)


def replaceall(mul, str):
    while str.find(mul) > -1:
        str = str.replace(mul, '')
    return str


def replace_all_double_n(str):
    while str.find('\n\n') > -1:
        str = str.replace('\n\n', '\n')
    return str


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
        data = replace_all_double_n(data)
        filename_prefix_list = [
            item for item in path_list if item not in root_path_list]
        file_name_prefix = '_'.join(x for x in filename_prefix_list if x)
        cut_file_name = file_name_prefix + '_' + file if file_name_prefix else file
        cut_file_path = os.path.join(target_folder_path, cut_file_name)
        with open(cut_file_path, 'w', encoding='utf-8') as f:
            f.write(data)
            f.close()

print("开始读取数据")
loader = DirectoryLoader(target_folder, glob='**/*.txt')
docs = loader.load()
# text_splitter = TokenTextSplitter(chunk_size=500, chunk_overlap=15)
text_splitter = CharacterTextSplitter(
    chunk_size=settings.chunk_size, chunk_overlap=20, separator='\n')
doc_texts = text_splitter.split_documents(docs)
# print(doc_texts)
embeddings = HuggingFaceEmbeddings(model_name=settings.embeddings_path)

vectorstore = FAISS.from_documents(doc_texts, embeddings)
print("处理完成")
vectorstore.save_local(settings.vectorstore_path)
print("保存完成")
