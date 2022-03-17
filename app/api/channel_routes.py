from flask import Blueprint, request
from flask_login import login_required
from app.models import Channel, db

channel_routes = Blueprint('channels', __name__)

@channel_routes.route('/', methods=['POST'])
@login_required
def post_channel():
    data = request.json
    channel = Channel(
        project_id = data['project_id'],
        name = data['name'],
        channel_type = data['channel_type']
    )

    db.session.add(channel)
    db.session.commit()

    return channel.to_dict()

@channel_routes.route('/<int:project_id>', methods=['GET'])
@login_required
def get_channels_by_project_id(project_id):

    channels = Channel.query.filter(project_id == Channel.project_id).all()
    return { 'channels' : [channel.to_dict() for channel in channels]}
