from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import os
db = SQLAlchemy()

def create_app():
    """
    Initialize the app, and the ORM (SQLAlchemy) used to access the database
    """

    app = Flask(__name__)
    basedir = os.path.abspath(os.path.dirname(__file__))

    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'db.sqlite')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.init_app(app)

    from .views import main
    app.register_blueprint(main)

    return app