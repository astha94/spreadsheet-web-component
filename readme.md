#### React Spreasheet Component
This project creates a one-page web application that has behavior similar to a spreadsheet.
The root (:/) creates a new sheet ID and redirects to the new sheet ID. The (:/sheetID) loads the sheet with that ID,
and loads the last stored data in the sheet.

##### Backend
Backend is implemented using the Flask framework, with SQLAlchemy to provide access to the database.

##### How to Run
To run the project, you will need to download the packages listed in requirements.txt:
```
pip install requirements.txt
```
 You will need to install node and required packages as well:
``` 
 npm install
```
 You need to set up the database, this can be done by:
 Open the python3 shell and run:
```
from app import db
db.create_all()
```
 Exit the shell. This will create the database in the flask-backend directory.
 You will need to build the frontend. This can be done by going into the react-frontend directory and calling:
 ```
npm run build
```
 You can run the app by going into the flask-backend directory and calling:
``` 
FLASK_APP=__init__.py flask run
```
