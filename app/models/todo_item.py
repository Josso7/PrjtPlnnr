from .db import db

class Todo_Item(db.Model):
    __tablename__ = 'todo_items'

    id = db.Column(db.Integer, primary_key=True)
    channel_id = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, nullable=False)
    content = db.Column(db.String(1000), nullable=False)
    completed = db.Column(db.Boolean, nullable=False)
    created_at_date = db.Column(db.DateTime, nullable=False)
    updated_at_date = db.Column(db.DateTime, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'channel_id': self.channel_id,
            'user_id': self.user_id,
            'content' : self.content,
            'completed' : self.completed,
            'created_at_date': self.created_at_date,
            'updated_at_date': self.updated_at_date,
        }
