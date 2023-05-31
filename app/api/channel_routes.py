from datetime import datetime

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
        created_at_date = datetime.utcnow(),
        updated_at_date = datetime.utcnow()
    )

    db.session.add(channel)
    db.session.commit()

    return channel.to_dict()

@channel_routes.route('/<int:channel_id>/delete', methods=['DELETE'])
@login_required
def delete_channel(channel_id):
    channel = Channel.query.get(channel_id)
    if channel:
        db.session.delete(channel)
        db.session.commit()
        return 'Successfully deleted'
    return 'Could not find channel'

@channel_routes.route('/<int:channel_id>/edit', methods=['PUT'])
@login_required
def edit_channel(channel_id):
    channel = Channel.query.get(channel_id)
    data = request.json
    if channel:
        channel.name = data['name']
        db.session.commit()
        print(channel.to_dict())
        return channel.to_dict()
    return 'Could not find channel'
