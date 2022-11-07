from flask import Blueprint, request
from flask_login import login_required
from app.models import OnlineUsers, db

online_users_routes = Blueprint('online_users', __name__)

@online_users_routes.route('/connect', methods=['POST'])
@login_required
def post_user():
    data = request.json
    user = OnlineUsers(
        user_id = data['user_id']
    )
    db.session.add(user)
    db.session.commit()
    return user.to_dict()


@online_users_routes.route('/disconnect/<int:user_id>', methods=['DELETE'])
@login_required
def delete_user(user_id):
    db.session.query(OnlineUsers).get(user_id).delete()
    db.session.commit()
    return { 'message': 'Disconnected User'}
