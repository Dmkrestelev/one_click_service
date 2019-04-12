import base64
import os
from datetime import datetime, timedelta

from flask import json
from flask_login import UserMixin
from sqlalchemy import *
from sqlalchemy.orm import relationship
from werkzeug.security import generate_password_hash, check_password_hash

from app import db
from sqlalchemy.inspection import inspect


class Serializer(object):

    def serialize(self):
        return {c: getattr(self, c) for c in inspect(self).attrs.keys()}

    @staticmethod
    def serialize_list(l):
        x = [m.serialize() for m in l]
        return x


class City(db.Model, Serializer):
    __tablename__ = 'city'

    id = Column(Integer, primary_key=True, server_default=text("nextval('city_id_seq'::regclass)"))
    name = Column(String, nullable=False)

    # Создание города
    @classmethod
    def create(cls, name):
        city = cls(name=name)
        db.session.add(city)
        db.session.commit()
        return True

    # Просмотр доступных городов
    @classmethod
    def all(cls):
        city = cls.query.all()
        return city


class Company(db.Model, Serializer):
    __tablename__ = 'companies'

    id = Column(Integer, primary_key=True, server_default=text("nextval('companies_id_seq'::regclass)"))
    name = Column(String(100), nullable=False)

    # Создание компании
    @classmethod
    def create(cls, name):
        company = cls(name=name)
        db.session.add(company)
        db.session.commit()
        return True

    # Просмотр доступных компаний
    @classmethod
    def all(cls):
        company = cls.query.all()
        return company


class ServicesType(db.Model, Serializer):
    __tablename__ = 'services_type'

    id = Column(Integer, primary_key=True, server_default=text("nextval('services_type_id_seq'::regclass)"))
    name = Column(String(100), nullable=False)

    # Просмотр доступных сервисов
    @classmethod
    def all(cls):
        service = cls.query.all()
        return service


class Status(db.Model, Serializer):
    __tablename__ = 'statuses'

    id = Column(Integer, primary_key=True, server_default=text("nextval('statuses_id_seq'::regclass)"))
    name = Column(String(100), nullable=False)


class User(UserMixin, db.Model, Serializer):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, server_default=text("nextval('users_id_seq'::regclass)"))
    name = Column(String(100), nullable=False)
    password = Column(String(50), nullable=False)
    phone = Column(String(20), nullable=False)
    company_id = Column(ForeignKey('companies.id'))
    is_company = Column(Boolean)
    city_id = Column(ForeignKey('city.id'))

    city = relationship('City')
    company = relationship('Company')

    def __repr__(self):
        return '<User {}>'.format(self.username)

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        data = {
            'id': self.id,
            'username': self.username,
            'date_create': self.date_create.isoformat() + 'Z',
            'date_last_auth': self.date_last_auth.isoformat() + 'Z'
        }
        return data

    def from_dict(self, data, new_user=False):
        for field in ['username']:
            if field in data:
                setattr(self, field, data[field])
        if new_user and 'password' in data:
            self.set_password(data['password'])

    def get_token(self, expires_in=3600):
        now = datetime.utcnow()
        if self.token and self.token_expiration > now + timedelta(seconds=60):
            return self.token
        self.token = base64.b64encode(os.urandom(24)).decode('utf-8')
        self.token_expiration = now + timedelta(seconds=expires_in)
        db.session.add(self)
        return self.token

    def revoke_token(self):
        self.token_expiration = datetime.utcnow() - timedelta(seconds=1)

    def get_id(self):
        return self.user_id


class Request(db.Model, Serializer):
    __tablename__ = 'requests'

    id = Column(ForeignKey('services_type.id'), ForeignKey('statuses.id'), primary_key=True, nullable=False, server_default=text("nextval('requests_id_seq'::regclass)"))
    description = Column(String(300))
    date_create = Column(Time(True), primary_key=True, nullable=False)
    user_id = Column(ForeignKey('users.id'))
    status_id = Column(Integer)
    service_id = Column(Integer)

    status = relationship('Status')
    services_type = relationship('ServicesType')
    user = relationship('User')

    def serialize_list(self):
        x = []

        for m in self:
            data = {
                'description': m.description,
                'date_create': m.date_create.isoformat() + 'Z',
                'user': m.user.name if m.user is not None else None,
                'status': m.status.serialize() if m.status is not None else None,
                'services': m.services_type.serialize() if m.services_type is not None else None,
            }
            x.append(data)
        return x

    # Создание заявки, по умолчанию со статусом открая
    @classmethod
    def create(cls, description, service_id):
        request = cls(description=description, service_id=service_id, date_create=datetime.today(), status_id=1)
        db.session.add(request)
        db.session.commit()
        return True

    # Просмотр доступных всех заявок
    @classmethod
    def all(cls):
        crevice = cls.query.all()
        return crevice

    # Закрытие заявки
    @classmethod
    def update(cls, id):
        request = cls.query.filter_by(id=id).first()
        if request:
            request.status_id = 2
            db.session.commit()
            return True
        else:
            return False
