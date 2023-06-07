from .db import SCHEMA, add_prefix_for_prod, db, environment


class OnlineUsers(db.Model):
    __tablename__= 'online_users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
    }
