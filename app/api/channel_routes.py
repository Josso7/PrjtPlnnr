from flask import Blueprint, request
from flask_login import login_required
from app.models import Channel, db
from datetime import datetime

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
