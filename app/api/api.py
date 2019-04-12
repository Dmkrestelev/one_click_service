import json
from flask import request
from app.api import bp
from app.api.helper import crossdomain
from app.models import City, Company, ServicesType, Request
from flask import jsonify


@bp.route('/city/', methods=['GET'])
@crossdomain(origin='*')
def city_all():
    cities = City.all()
    return json.dumps({'city': City.serialize_list(cities)}), 200, {'ContentType': 'application/json'}


@bp.route('/company/', methods=['POST'])
@crossdomain(origin='*')
def company_create():
    if not request.json or not 'name' in request.json:
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
@crossdomain(origin='*')
def request_create():
    if not request.json or not 'description' in request.json or not 'service_id' in request.json:
        return json.dumps({'error': 'incorrect_params'}), 400, {'ContentType': 'application/json'}

    description = request.json['description']
    service_id = request.json['service_id']
    Request.create(description, service_id)
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
    return json.dumps({'services': Request.serialize_list(requests)}), 200, {'ContentType': 'application/json'}

