from cmath import log
from flask import Blueprint, request
from flask_login import login_required
from app.models import Project, Message, ProjectMembers, OnlineUsers, User, db
from datetime import datetime

project_routes = Blueprint('projects', __name__)

@project_routes.route('/', methods=['POST'])
@login_required
def post_project():
    data = request.json
    project = Project(
        user_id = data['user_id'],
        name = data['name']
    )

    db.session.add(project)
    db.session.commit()

    return project.to_dict()

@project_routes.route('/<int:user_id>', methods=['GET'])
@login_required
def get_projects_by_user(user_id):

    projects = Project.query.filter(user_id == Project.user_id).all()
    return { 'projects' : [project.to_dict() for project in projects]}

@project_routes.route('/channels/<int:channel_id>/messages', methods=['GET'])
@login_required
def get_messages_by_channel(channel_id):

    messages = Message.query.filter(Message.channel_id == channel_id).all()
    return { 'messages' : [message.to_dict() for message in messages]}

@project_routes.route('/channels/<int:channel_id>/messages', methods=['POST'])
@login_required
def post_messages(channel_id):

    data = request.json

    message = Message(
        channel_id = data['channelId'],
        user_id = data['userId'],
        content = data['content'],
        created_at_date = datetime.utcnow(),
        updated_at_date = datetime.utcnow()
    )

    db.session.add(message)
    db.session.commit()

    return {}

@project_routes.route('/members/<int:user_id>', methods=['GET'])
@login_required
def get_projects_by_member(user_id):

    members = ProjectMembers.query.filter(ProjectMembers.user_id == user_id).all()
    projects = Project.query.filter(Project.id.in_(member.project_id for member in members))
    return { 'project_members': [project.to_dict() for project in projects]}
    # return { 'project_members': [member.to_dict() for member in members]}

@project_routes.route('/<int:project_id>/online')
@login_required
def get_online_users(project_id):
    members = ProjectMembers.query.filter(ProjectMembers.project_id == project_id).all()
    # print('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', [member.user_id for member in members])
    online_users = OnlineUsers.query.filter(OnlineUsers.user_id.in_(member.user_id for member in members))
    # print('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', [online_user.to_dict() for online_user in online_users])
    users = User.query.filter(User.id.in_(online_user.user_id for online_user in online_users))
    # print('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', [user.to_dict() for user in users])
    return { 'online_users': [user.to_dict() for user in users]}
