from flask import Blueprint, request

from app.models import Message, db

message_routes = Blueprint('messages', __name__)

@message_routes.route('/<int:message_id>/edit', methods=['PUT'])
def edit_message(message_id):

    message = Message.query.get(message_id)
    data = request.json

    if message:
        message.content = data['content']
        db.session.commit()
        return message.to_dict()

    return 'message not found'

@message_routes.route('/<int:message_id>/delete', methods=['DELETE'])
def delete_message(message_id):

    message = Message.query.get(message_id)

    if message:
        db.session.delete(message)
        db.session.commit()
        return 'sucessfully deleted'

    return 'could not find message'
