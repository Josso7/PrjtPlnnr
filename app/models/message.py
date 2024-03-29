from .db import SCHEMA, add_prefix_for_prod, db, environment


class Message(db.Model):
    __tablename__ = 'messages'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    channel_id = db.Column(db.Integer, nullable=False)
    content = db.Column(db.String(1000), nullable=False)
    created_at_date = db.Column(db.DateTime, nullable=False)
    updated_at_date = db.Column(db.DateTime, nullable=False)

    user = db.relationship('User', back_populates='messages')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'channel_id': self.channel_id,
            'content' : self.content,
            'created_at_date': self.created_at_date,
            'updated_at_date': self.updated_at_date,
            'user': self.user.to_dict()
        }
