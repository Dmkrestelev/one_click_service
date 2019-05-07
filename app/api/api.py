import hashlib
import json
from flask import request
from flask_jwt_extended import create_access_token, create_refresh_token
from flask_login import current_user, login_user
from flask_restful import reqparse

from app import db
from app.api import bp
from app.api.helper import crossdomain
from app.models import City, Company, ServicesType, Request, User
from flask import jsonify


@bp.route('/city/', methods=['GET'])
@crossdomain(origin='*')
def city_all():
    cities = City.all()
    return json.dumps({'city': City.serialize_list(cities)}), 200, {'ContentType': 'application/json'}


@bp.route('/company/', methods=['POST'])
@crossdomain(origin='*')
def company_create():
    if not request.json or 'name' not in request.json:
        return json.dumps({'error': 'incorrect_params'}), 400, {'ContentType': 'application/json'}

    name = request.json['name']
    Company.create(name)
    return jsonify({'success': True}), 200, {'ContentType': 'application/json'}


@bp.route('/company/', methods=['GET'])
@crossdomain(origin='*')
def company_all():
    company = Company.all()
    return json.dumps({'companies': Company.serialize_list(company)}), 200, {'ContentType': 'application/json'}


@bp.route('/services/', methods=['GET'])
@crossdomain(origin='*')
def types_all():
    services = ServicesType.all()
    return json.dumps({'services': ServicesType.serialize_list(services)}), 200, {'ContentType': 'application/json'}


@bp.route('/request/', methods=['POST'])
def request_create():
    # if not request.json or 'description' not in request.json or 'service_id' not in request.json:
    #     return json.dumps({'error': 'incorrect_params'}), 400, {'ContentType': 'application/json'}

    description = request.json['description']
    service_id = request.json['service_id']
    username = request.json['username']
    phone = request.json['phone']
    Request.create(description, service_id, username, phone)
    return jsonify({'success': True}), 200, {'ContentType': 'application/json'}


@bp.route('/request/<int:id>', methods=['PUT'])
@crossdomain(origin='*')
def request_update(id):
    if not id:
        return json.dumps({'error': 'incorrect_params'}), 400, {'ContentType': 'application/json'}
    if Request.update(id):
        return jsonify({'success': True}), 200, {'ContentType': 'application/json'}
    else:
        return json.dumps({'error': 'not found'}), 404, {'ContentType': 'application/json'}


@bp.route('/request/', methods=['GET'])
@crossdomain(origin='*')
def request_all():
    requests = Request.all()
    return json.dumps({'requests': Request.serialize_list(requests)}), 200, {'ContentType': 'application/json'}


@bp.route('/user/', methods=['GET'])
@crossdomain(origin='*')
def request_userinfo():
    requests = User.userinfo(request.args.getlist('id')[0])
    return json.dumps({'requests': User.serialize(requests)}), 200, {'ContentType': 'application/json'}


parser_auth = reqparse.RequestParser()
parser_auth.add_argument('phone', help='phone cannot be blank', required=True)
parser_auth.add_argument('pass', help='pass cannot be blank', required=True)


@bp.route('/auth/', methods=['POST'])
def auth():
    try:
        data = parser_auth.parse_args()
        current_user = User.query.filter(User.phone == data['phone']).first()

        if not current_user:
            return json.dumps({"error": "User not in DB. Register as a new user"}), 403, {'ContentType': 'application/json'}

        password = hashlib.md5(data['pass'].encode()).hexdigest()
        if current_user.password == password:
            access_token = create_access_token(identity=data['phone'])
            refresh_token = create_refresh_token(identity=data['phone'])
            return json.dumps({
                'name': current_user.name,
                'access_token': access_token,
                'refresh_token': refresh_token
            }), 400, {'ContentType': 'application/json'}
        else:
            return json.dumps({'error': 'incorrect_params'}), 403, {'ContentType': 'application/json'}
    except:
        raise Exception("Cannot login user")


parser_register = reqparse.RequestParser()
parser_register.add_argument('phone', help='phone cannot be blank', required=True)
parser_register.add_argument('pass', help='pass cannot be blank', required=True)
parser_register.add_argument('name', help='pass cannot be blank', required=True)


@bp.route('/register/', methods=['POST'])
def register():
    # try:
    data = parser_register.parse_args()
    print(hashlib.md5(data['pass'].encode()).hexdigest())
    if User.query.filter(User.phone == data['phone']).first():
        return json.dumps({"error": "User already exists"}), 403, {'ContentType': 'application/json'}

    u = User()
    u.phone = data['phone']
    u.password = hashlib.md5(data['pass'].encode()).hexdigest()
    u.name = data['name']
    db.session.add(u)
    db.session.commit()

    access_token = create_access_token(identity=data['phone'])
    refresh_token = create_refresh_token(identity=data['phone'])
    return json.dumps({
            'name': data['name'],
            'access_token': access_token,
            'refresh_token': refresh_token
        }), 400, {'ContentType': 'application/json'}
    # except:
    #     raise Exception()


@bp.route('/request_info/', methods=['GET'])
@crossdomain(origin='*')
def request_get_info():
    request_info = Request.get_info(request.args.getlist('id')[0])
    return json.dumps({'requests': request_info}), 200, {'ContentType': 'application/json'}
