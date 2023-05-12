from views.index import *

bottle.debug(True)

# import webbrowser
# webbrowser.open_new('http://127.0.0.1:'+str(settings.Port))

bottle.run(server='paste', host="0.0.0.0", port=settings.port, quiet=True)