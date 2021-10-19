import urllib.request
import os

initialUrl = 'https://images.chesscomfiles.com/chess-themes/pieces/'

pieces = ['wr', 'wn','wb', 'wq', 'wk', 'wp', 'br', 'bn', 'bb', 'bq', 'bk', 'bp']
for folderName in ['gothic', 'neo', 'graffiti', 'metal', 'lolz']:
    os.mkdir(folderName)
    for val in pieces:
        liveUrl =  initialUrl + folderName + '/150/' + val + '.png'
        fileName = folderName + '/' + val + '.png'
        urllib.request.urlretrieve(liveUrl, fileName)