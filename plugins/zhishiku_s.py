from plugins import settings
from whoosh import highlight
from whoosh.filedb.filestore import FileStorage
storage = FileStorage('sy')
ix = storage.open_index()
my_cf = highlight.ContextFragmenter(maxchars=settings.chunk_size, surround=50)


def find(s):
    with ix.searcher() as searcher:
        results = searcher.find("content", s)
        results.fragmenter.charlimit = None
        results.fragmenter = my_cf
        results.formatter = highlight.UppercaseFormatter()
        return [{'title': results[i]["title"], 'content':results[i].highlights("content")} for i in range(min(settings.chunk_count, len(results)))]
