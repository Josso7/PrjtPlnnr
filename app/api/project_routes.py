from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Project, Message, ProjectMembers, OnlineUsers, User, Channel, ProjectInvitation, db
from datetime import datetime

project_routes = Blueprint('projects', __name__)

@project_routes.route('/', methods=['POST'])
@login_required
def post_project():
    data = request.json

    project = Project(
        user_id = current_user.get_id(),
        name = data['name'],
        created_at_date = datetime.utcnow(),
        updated_at_date = datetime.utcnow()
    )


    db.session.add(project)
    db.session.commit()

    project_member = ProjectMembers(
        user_id = current_user.get_id(),
        project_id = project.id,
        created_at_date = datetime.utcnow(),
        updated_at_date = datetime.utcnow()
    )

    channel = Channel(
        project_id = project.id,
        name = 'general',
        created_at_date = datetime.utcnow(),
        updated_at_date = datetime.utcnow()
    )

    db.session.add(project_member)
    db.session.add(channel)
    db.session.commit()

    return project.to_dict()


@project_routes.route('/<int:user_id>', methods=['GET'])
# @login_required
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

    return message.to_dict()

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

@project_routes.route('/<int:project_id>/channels', methods=['GET'])
@login_required
def get_channels_by_project_id(project_id):

    channels = Channel.query.filter(project_id == Channel.project_id).all()
    return { 'channels' : [channel.to_dict() for channel in channels]}

@project_routes.route('/<int:project_id>/users')
@login_required
def get_project_users(project_id):
    project_members = ProjectMembers.query.filter(ProjectMembers.project_id == project_id)
    users = User.query.filter(User.id.in_(project_member.user_id for project_member in project_members))
    return { 'entries': [user.to_dict() for user in users]}

@project_routes.route('/<int:project_id>/delete', methods=['DELETE'])
@login_required
def delete_project(project_id):
    project = Project.query.get(project_id)

    if project:
        db.session.delete(project)
        db.session.commit()
        return 'project deleted'
    return 'project not found'


@project_routes.route('/<int:project_id>/edit', methods=['PUT'])
@login_required
def edit_project(project_id):
    data = request.json
    project = Project.query.get(project_id)
    if project:
        project.name = data['name']
        db.session.commit()
        return project.to_dict()
    return 'Project not found'

@project_routes.route('/invite', methods=['POST'])
# @login_required
def invite_to_project():
    data = request.json
    existing_invitation = ProjectInvitation.query.filter(ProjectInvitation.user_id == data['userId'], ProjectInvitation.project_id == data['projectId']).first()
    if not existing_invitation:
        project_invitation = ProjectInvitation(user_id = data['userId'], project_id = data['projectId'], inviter_id = data['inviterId'])
        db.session.add(project_invitation)
        db.session.commit()
        return project_invitation.to_dict()
    return {'errors': 'User has already been invited to this Project'}
