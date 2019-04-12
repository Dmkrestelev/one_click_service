from flask import Blueprint

bp = Blueprint('client', __name__)

from app.client import client
