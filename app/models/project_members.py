from .db import SCHEMA, add_prefix_for_prod, db, environment


class ProjectMembers(db.Model):
    __tablename__ = 'project_members'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    created_at_date = db.Column(db.DateTime, nullable=False)
    updated_at_date = db.Column(db.DateTime, nullable=False)
    project_id = db.Column(db.Integer, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'project_id': self.project_id,
            'created_at_date': self.created_at_date,
            'updated_at_date': self.updated_at_date,
    }
