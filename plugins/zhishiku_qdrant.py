import re
import time
from sentence_transformers import SentenceTransformer
from qdrant_client import QdrantClient
from typing import Dict, List, Optional, Tuple, Union
from plugins.common import settings, allowCROS
from bottle import route, request, static_file

MetadataFilter = Dict[str, Union[str, int, bool]]
COLLECTION_NAME = settings.librarys.qdrant.collection
divider = "\n"


class QdrantIndex(object):
    def __init__(self, embedding_model):
        if(settings.librarys.qdrant.qdrant_path):
            self.qdrant_client = QdrantClient(
                path=settings.librarys.qdrant.qdrant_path,
            )
        elif(settings.librarys.qdrant.qdrant_host):
            self.qdrant_client = QdrantClient(
                url=settings.librarys.qdrant.qdrant_host,
            )

        self.embedding_model = embedding_model
        self.collection_name = COLLECTION_NAME

    def similarity_search_with_score(
            self, query, k=settings.librarys.qdrant.count
    ):
        embedding = self.embedding_model.encode(query)
        results = self.qdrant_client.search(
            collection_name=self.collection_name,
            query_vector=embedding,
            with_payload=True,
            limit=k,
        )

        return results

    def retrieve_from_id(self, _id):
        return self.qdrant_client.retrieve(self.collection_name, [_id])[0]


def find(s, step=0):
    try:
        original_results = qdrant.similarity_search_with_score(s)
        docs = []
        for sample in original_results:
            if sample.score < settings.librarys.qdrant.similarity_threshold:
                continue
            docs.append(get_doc(sample, step))
        return docs
    except Exception as e:
        print(e)
        return []


def get_doc(doc, step):
    final_content = doc.payload["page_content"]
    doc_source = doc.payload["metadata"]["source"]
    print("文段分数: ", doc.score, final_content)

    # 当前文段在对应文档中的分段数
    _id = int(doc.id[-3:], 16)
    if step > 0:
        for i in range(1, step+1):
            try:
                doc_before = qdrant.retrieve_from_id(doc.id[:-3] + str(hex(_id-i))[2:].zfill(3))
                # 可能出现哈希碰撞
                if doc_source == doc_before.payload["metadata"]["source"]:
                    final_content = process_strings(doc_before.payload["page_content"], divider, final_content)
            except:
                pass
            try:
                doc_after = qdrant.retrieve_from_id(doc.id[:-3] + str(hex(_id+i))[2:].zfill(3))
                # 可能出现哈希碰撞
                if doc_source == doc_after.payload["metadata"]["source"]:
                    final_content = process_strings(final_content, divider, doc_after.payload["page_content"])
            except:
                pass
    if doc_source.endswith(".pdf") or doc_source.endswith(".txt"):
        title = f"[{doc_source}](/{settings.librarys.qdrant.path}/{doc_source})"
    else:
        title = doc_source
    return {'title': title, 'content': re.sub(r'\n+', "\n", final_content), "score": doc.score}


def process_strings(A, C, B):
    """
    find the longest common suffix of A and prefix of B
    """
    common = ""
    for i in range(1, min(len(A), len(B)) + 1):
        if A[-i:] == B[:i]:
            common = A[-i:]
    # if there is a common substring, replace one of them with C and concatenate
    if common:
        return A[:-len(common)] + C + B
    # otherwise, just return A + B
    else:
        return A + B


embedding_model = SentenceTransformer(settings.librarys.qdrant.model_path, device=settings.librarys.qdrant.device)
qdrant = QdrantIndex(embedding_model)
