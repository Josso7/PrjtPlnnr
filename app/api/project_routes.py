from datetime import datetime

from flask import Blueprint, request
from flask_login import current_user, login_required
from sqlalchemy import func

from app.models import (Channel, Message, OnlineUsers, Project,
                        ProjectInvitation, ProjectMembers, User, db)

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

@project_routes.route('/<int:project_id>/invite', methods=['POST'])
# @login_required
def invite_to_project(project_id):
    data = request.json
    user = User.query.filter(func.lower(User.username) == data['username'].lower()).first()
    # add future validation if inviting permissions are not allowed for every project member
    if not user:
        return {'errors': 'That user does not exist'}
    existing_member = ProjectMembers.query.filter(ProjectMembers.user_id == user.id, ProjectMembers.project_id == project_id).first()
    existing_invitation = ProjectInvitation.query.filter(ProjectInvitation.user_id == user.id, ProjectInvitation.project_id == project_id).first()
    if existing_member:
        return {'errors': 'User is already a member of this project'}
    if not existing_invitation:
        project_invitation = ProjectInvitation(user_id = user.id, project_id = project_id, inviter_id = data['inviterId'])
        db.session.add(project_invitation)
        db.session.commit()
        return project_invitation.to_dict()
    return {'errors': 'User has already been invited to this Project'}

@project_routes.route('/<int:project_id>/leave', methods=['DELETE'])
def leave_project(project_id):
    user_id = current_user.get_id()
    project_member = ProjectMembers.query.filter(ProjectMembers.user_id == user_id, ProjectMembers.project_id == project_id).first()
    if project_member:
        db.session.delete(project_member)
        db.session.commit()
        return project_member.to_dict()

@project_routes.route('/invites/<int:invite_id>/accept', methods=['PUT'])
# @login_required
def accept_invitation(invite_id):
    existing_invitation = ProjectInvitation.query.get(invite_id)
    existing_invitation_dict = existing_invitation.to_dict()
    project_member = None
    if existing_invitation:
        project_member = ProjectMembers(
            user_id = existing_invitation.user_id,
            project_id = existing_invitation.project_id,
            created_at_date = datetime.utcnow(),
            updated_at_date = datetime.utcnow()
        )
        project = Project.query.get(project_member.project_id)
        db.session.add(project_member)
        db.session.delete(existing_invitation)
        db.session.commit()
        return {'invitation': existing_invitation_dict, 'project': project.to_dict()}
    return {"errors:" "You aren't invited to that project"}

@project_routes.route('/invites/<int:invite_id>/decline', methods=['DELETE'])
# @login_required
def decline_invitation(invite_id):
    existing_invitation = ProjectInvitation.query.get(invite_id)
    if existing_invitation:
        db.session.delete(existing_invitation)
        db.session.commit()
        return '', 202
    return {'errors': 'Invitation not found'}
