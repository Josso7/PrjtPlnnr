from .db import db

class Message(db.Model):
    __tablename__ = 'messages'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    channel_id = db.Column(db.Integer, nullable=False)
    content = db.Column(db.String(1000), nullable=False)
    created_at_date = db.Column(db.DateTime, nullable=False)
    updated_at_date = db.Column(db.DateTime, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'channel_id': self.channel_id,
            'content' : self.content,
            'created_at_date': self.created_at_date,
            'updated_at_date': self.updated_at_date,
        }
