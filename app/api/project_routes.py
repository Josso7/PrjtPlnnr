from cmath import log
from flask import Blueprint, request
from flask_login import login_required
from app.models import Project, Message, db

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

@project_routes.route('/channels/<int:channel_id>/messages')
@login_required
def get_messages_by_channel(channel_id):

    messages = Message.query.filter(Message.channel_id == channel_id).all()
    return { 'messages' : [message.to_dict() for message in messages]}
