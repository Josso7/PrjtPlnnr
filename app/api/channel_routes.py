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
