from . import db

#Spreadsheet Class / Model
class Spreadsheet(db.Model):
    """Spreadsheet model stores the spreadsheet id for access to each
    spreadsheet during routing, as well as the JSON encoding the React
    Table component to be accessed. Values for the table dimensions are
    also retained.
    """

    id = db.Column(db.Integer, primary_key=True)
    json_string = db.Column(db.String)
    num_rows = db.Column(db.Integer)
    num_cols = db.Column(db.Integer)

    def __init__(self, id, json_string, num_rows, num_cols):
        self.id = id
        self.json_string = json_string
        self.num_rows = num_rows
        self.num_cols = num_cols