from .db import db

class Project(db.Model):
    __tablename__ = 'projects'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    name = db.Column(db.String(100), nullable=False)
    created_at_date = db.Column(db.DateTime, nullable=False)
    updated_at_date = db.Column(db.DateTime, nullable=False)

    invitations = db.relationship('ProjectInvitation', back_populates='project')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name,
            'created_at_date': self.created_at_date,
            'updated_at_date': self.updated_at_date,
        }
