import os
basedir = os.path.abspath(os.path.dirname(__file__))

class DefaultConfig(object):
    DEBUG = False
    TESTING = False
    SQLALCHEMY_DATABASE_URI = 'sqlite:///pyny_url.db'
    CSRF_ENABLED = True
    SECRET_KEY = 'should_be_changed'

class ProductionConfig(DefaultConfig):
    DEBUG = False

class StagingConfig(DefaultConfig):
    DEVELOPMENT = True
    DEBUG = True

class DevelopmentConfig(DefaultConfig):
    DEVELOPMENT = True
    DEBUG = True

class TestingConfig(DefaultConfig):
    TESTING = True
