from .db import db

class OnlineUsers(db.Model):
    __tablename__= 'online_users'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
    }
