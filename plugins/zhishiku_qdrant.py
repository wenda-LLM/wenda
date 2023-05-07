
from sentence_transformers import SentenceTransformer
from langchain.docstore.document import Document
from qdrant_client import QdrantClient
from qdrant_client.http.models import Filter
from typing import Dict,  List, Optional, Tuple, Union
from plugins.common import settings
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
        
    def similarity_search_with_score(
        self, query: str, k: int = 5, filter: Optional[MetadataFilter] = None
    ) -> List[Tuple[Document, float]]:
        embedding = self.embedding_model.encode(query)
        results = self.qdrant_client.search(
            collection_name=self.collection_name,
            query_vector=embedding,
            query_filter=Filter(**filter) if filter else None,
            with_payload=True,
            limit=k,
        )
        return [
            dict({
                "title":result.payload['metadata']['source'],
                "content": result.payload['page_content']
            })
            for result in results
        ]


def find(s):
    try:
        return qdrant.similarity_search_with_score(s)
    except Exception as e:
        print(e)
        return []
    
embedding_model = SentenceTransformer(settings.embeddings_path,device=settings.librarys.qdrant.device)
qdrant = QdrantIndex(embedding_model)