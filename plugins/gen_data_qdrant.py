import re
import os,sys
os.chdir(sys.path[0][:-8])
from langchain.text_splitter import CharacterTextSplitter
from langchain.document_loaders import DirectoryLoader
from sentence_transformers import SentenceTransformer
from langchain.text_splitter import CharacterTextSplitter
from langchain.document_loaders import DirectoryLoader
from qdrant_client import QdrantClient
from qdrant_client.http.models import Distance, VectorParams
from qdrant_client.http import models as rest
from typing import Dict, Iterable, List, Optional, Union
import uuid

from common import settings
source_folder = settings.librarys.qdrant.Path
target_folder = source_folder + '_out'
source_folder_path = os.path.join(os.getcwd(), source_folder)
target_folder_path = os.path.join(os.getcwd(), target_folder)

MetadataFilter = Dict[str, Union[str, int, bool]]
COLLECTION_NAME = settings.librarys.qdrant.Collection

class QdrantIndex():

    def __init__(self,embedding_model):
        self.qdrant_client = QdrantClient(
                url=settings.librarys.qdrant.Qdrant_Host,
        )
        self.embedding_model =  embedding_model
        self.embedding_size = self.embedding_model.get_sentence_embedding_dimension()
        self.collection_name = COLLECTION_NAME
        print(f"Collection {COLLECTION_NAME} is successfully created.")

    def insert_into_index(self, filepath: str):
        self.qdrant_client.recreate_collection(
            collection_name=self.collection_name,
            vectors_config=VectorParams(size=self.embedding_size, distance=Distance.COSINE),
        ) 
        loader = DirectoryLoader(filepath, glob='**/*.txt')
        docs = loader.load()
        text_splitter = CharacterTextSplitter(hunk_size=500, chunk_overlap=30)#
        documents = text_splitter.split_documents(docs)
        texts = [doc.page_content for doc in documents]
        metadatas = [doc.metadata for doc in documents]
        ids = [uuid.uuid4().hex for _ in texts]
        vectors = self.embedding_model.encode(texts, show_progress_bar=False, batch_size=128).tolist()
        payloads = self.build_payloads(
                    texts,
                    metadatas,
                    'page_content',
                    'metadata',
                )
        # Upload points in bactches
        self.qdrant_client.upsert(
            collection_name=COLLECTION_NAME,
            points=rest.Batch(
                ids=ids,
                vectors=vectors,
                payloads=payloads
            ),
        )
        print("Index update successfully done!")
        
    # Adopted from lanchain github            
    def build_payloads(self,
        texts: Iterable[str],
        metadatas: Optional[List[dict]],
        content_payload_key: str,
        metadata_payload_key: str,
    ) -> List[dict]:
        payloads = []
        for i, text in enumerate(texts):
            if text is None:
                raise ValueError(
                    "At least one of the texts is None. Please remove it before "
                    "calling .from_texts or .add_texts on Qdrant instance."
                )
            metadata = metadatas[i] if metadatas is not None else None
            payloads.append(
                {
                    content_payload_key: text,
                    metadata_payload_key: metadata,
                }
            )

        return payloads
    

if not os.path.exists(target_folder_path):
    os.mkdir(target_folder_path)

root_path_list = source_folder_path.split(os.sep)

print("预处理数据")
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
        data = re.sub(r'！', "！\n", data)
        data = re.sub(r'：', "：\n", data)
        data = re.sub(r'。', "。\n", data)
        data = re.sub(r'\n+', "\n", data)
        filename_prefix_list = [
            item for item in path_list if item not in root_path_list]
        file_name_prefix = '_'.join(x for x in filename_prefix_list if x)
        cut_file_name = file_name_prefix + '_' + file if file_name_prefix else file
        cut_file_path = os.path.join(target_folder_path, cut_file_name)
        with open(cut_file_path, 'w', encoding='utf-8') as f:
            f.write(data)
            f.close()

print("开始读取数据")
embedding_model = SentenceTransformer(settings.librarys.qdrant.model_path,device=settings.librarys.qdrant.device)
qdrant = QdrantIndex(embedding_model)
qdrant.insert_into_index(target_folder)

print("保存完成")
