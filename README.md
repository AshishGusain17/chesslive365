# Chesslive365
A chess website where you can challenge your friends for a 2-player match without logging in or any verification. <br>
Also, all other persons with the access to the game-link can view the game live.<br>
Visit:
https://chesslive365.onrender.com/
<br>



## Click on the video link below to see the working of this app:
[![Click here](https://i.ytimg.com/vi/IIoAEb1a2U8/2.jpg)](https://youtu.be/IIoAEb1a2U8)

 
 

## UI in mobile & desktop
You can play in desktop as well as from your mobile devices.
Screenshots of both the versions are attached below:<br>
 
<img src="https://github.com/AshishGusain17/display/blob/main/Chesslive365/mobile_version.jpeg?raw=true" width=30% height=30%>
<img src="https://github.com/AshishGusain17/display/blob/main/Chesslive365/laptop_version.png?raw=true"  width=60% height=60%>




## Dependencies required:
* [Node.js](https://nodejs.org/docs/v14.17.6/api/) - v14.17.6
* [ReactJS](https://reactjs.org/docs/getting-started.html) - v17.0.2
* [MongoDb](https://docs.mongodb.com/) - v4.2.7
* [Mongoose](https://mongoosejs.com/docs/api.html) - v6.0.6




##  Features:
```
1.) Challenge your friends for a 2-player match without logging in or any verification.
2.) All other persons with the access to the game-link can view the game live.
3.) You can play with both the pieces by yourself in home-page.
4.) Reverse board, change box colors, 5 different pieces(like metal, gothic, graffiti) are available.
```


 

## Changes while working locally:
```
FilePath: backend/package.json/
Change scripts as below:
"start": "nodemon index.js"

FilePath: src/context/position/PositionState.js/ 
change HOST variable value to REACT_APP_BACKEND_LOCALHOST

Create a .env file inside root folder and provide following env variable:
REACT_APP_BACKEND_LOCALHOST = 'http://localhost:5000'

Create a .env file inside backend folder too and provide following env variables:
MONGO_URL = <MONGO_URL>
PORT = 5000
```



## Changes while deploying:
```
FilePath: backend/package.json/ 
Change scripts as below:
"start": "node index.js"

FilePath: src/context/position/PositionState.js/
change HOST variable value to REACT_APP_BACKEND_HOST

Create a .env file inside root folder and provide following env variable:
REACT_APP_BACKEND_HOST = <end_point_url>

Create a .env file inside backend folder too and provide following env variables:
MONGO_URL = <MONGO_URL> 
PORT = 5000
```







## SELF NOTE:
```
1.) Changes in files in backend folder:
app.listen(process.env.PORT || '0.0.0.0' );
from gitbash : touch Procfile   ==>  web: node index.js  ==>  scripts:{"start": "node index.js"}

2.) Update config vars in heroku settings for environment variables 
in both frontend and backend

3.) While deploying, since backend folder is already inside a git repo, we cannot
directly push it. 
So, copy backend files(except node_modules and .env) in some non-git folder(Assume FOLDER_NAME = 'chesslive365api') 
and follow below steps:


cd chesslive365api
git init
git remote add heroku  https://git.heroku.com/chesslive365api.git
git add .
git commit -am "make it better"
git push heroku main --force
```

