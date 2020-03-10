from flask import Blueprint, request, redirect, render_template
from . import db
from .models import Spreadsheet

import json

main = Blueprint('main', __name__)

@main.route("/")
def my_index():
    """Creates a new sheet ID and redirects to the new sheet."""

    obj = db.session.query(Spreadsheet.id).order_by(Spreadsheet.id.desc()).first()
    new_route = obj[0] + 1 if obj else 1
    return redirect('/' + str(new_route))

@main.route('/<user_id>')
def get_spreadsheet(user_id):
    """Get the sheet with this ID and render it, i.e. load the last stored state of a queried spreadsheet."""

    exists = db.session.query(Spreadsheet.id).filter_by(id=user_id).scalar() is not None

    if not exists:
        return render_template("index.html", token=user_id, numRows="5", numCols="1")
    else:
        user_json = Spreadsheet.query.get(int(user_id))
        return render_template("index.html", table_data_string=user_json.json_string, numRows=user_json.num_rows, numCols=user_json.num_cols)

@main.route('/<user_id>', methods=['POST'])
def update_spreadsheet(user_id):
    """Save the spreadsheet state for a specified ID to the data base for later access."""

    spreadsheet_data = request.get_json()
    num_rows = int(spreadsheet_data['numRows'])
    num_cols = int(spreadsheet_data['numCols'])

    new_spreadsheet = Spreadsheet(id=int(user_id), json_string=json.dumps(spreadsheet_data['modifiedData']), num_rows=num_rows, num_cols=num_cols)

    db.session.add(new_spreadsheet)
    db.session.commit()

    return 'Done', 201