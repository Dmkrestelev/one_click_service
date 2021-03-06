import logging
from logging.handlers import RotatingFileHandler
import os
from flask import Flask
from flask_jwt_extended import JWTManager
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager
from flask_babel import Babel, lazy_gettext as _l
from config import Config
from flask_cors import CORS
import pymysql

pymysql.install_as_MySQLdb()
db = SQLAlchemy()
migrate = Migrate()
login = LoginManager()
login.login_view = 'auth.index'
login.login_message = _l('Please log in to access this page.')
babel = Babel()


def create_app(config_class=Config):
    app = Flask(__name__, static_url_path='/static')
    app.config['JWT_SECRET_KEY'] = 'boost-is-the-secret-of-our-app'
    jwt = JWTManager(app)
    CORS(app)
    app.config.from_object(config_class)

    db.init_app(app)
    migrate.init_app(app, db)
    login.init_app(app)
    babel.init_app(app)

    from app.errors import bp as errors_bp
    app.register_blueprint(errors_bp)

    from app.auth import bp as auth_bp
    app.register_blueprint(auth_bp)

    from app.api import bp as api_bp
    app.register_blueprint(api_bp, url_prefix='/api')

    if not app.debug and not app.testing:
        if app.config['LOG_TO_STDOUT']:
            stream_handler = logging.StreamHandler()
            stream_handler.setLevel(logging.INFO)
            app.logger.addHandler(stream_handler)
        else:
            if not os.path.exists('logs'):
                os.mkdir('logs')
            file_handler = RotatingFileHandler('logs/x5.log',
                                               maxBytes=10240, backupCount=10)
            file_handler.setFormatter(logging.Formatter(
                '%(asctime)s %(levelname)s: %(message)s '
                '[in %(pathname)s:%(lineno)d]'))
            file_handler.setLevel(logging.INFO)
            app.logger.addHandler(file_handler)

        app.logger.setLevel(logging.INFO)
        app.logger.info('x5 startup')

    return app


from app import models
