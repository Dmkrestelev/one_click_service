from flask import render_template, redirect, url_for, flash
from werkzeug.urls import url_parse
from flask_login import login_user, logout_user, current_user, login_required
from flask_babel import *
from app import db
from app.auth import bp
from app.auth.forms import LoginForm, RegistrationForm
from app.models import User


@bp.route('/', methods=['GET', 'POST'])
@bp.route('/index', methods=['GET', 'POST'])
def index():
    if current_user.is_authenticated:
        return redirect(url_for('main.classifier_register'))
    form = LoginForm()
    if form.submit.data:
        if form.validate_on_submit():
            user = User.query.filter_by(login=form.username.data).first()
            if user is None or not user.check_password(form.password.data):
                flash('Неверные логин или пароль')
                return redirect(url_for('auth.index'))
            user.date_last_auth = datetime.today()
            db.session.commit()
            login_user(user)
            next_page = request.args.get('next')
            if not next_page or url_parse(next_page).netloc != '':
                next_page = url_for('main.classifier_register')
            return redirect(next_page)
        else:
            flash('Неверные логин или пароль')
    return render_template('auth/login.html', title='Sign In', form=form)


@bp.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('auth.index'))


@bp.route('/register', methods=['GET', 'POST'])
@login_required
def register():
    form = RegistrationForm()
    if form.submit_cancel.data:
        return redirect('/users')
    if form.submit.data:
        if form.validate_on_submit():
            user = User(login=form.username.data, date_create=datetime.today(), date_last_auth=datetime(1, 1, 1))
            user.set_password(form.password.data)
            db.session.add(user)
            db.session.commit()
            flash('Новый пользователь зарегистрирован!')
            return redirect('/users')
        else:
            flash('Invalid username')
    return render_template('auth/register.html', title='Register', form=form)
