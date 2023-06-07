from .db import SCHEMA, add_prefix_for_prod, db, environment


class Channel(db.Model):
    __tablename__ = 'channels'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    project_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("projects.id")), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    # channel_type = db.Column(db.String(100), nullable=False)
    created_at_date = db.Column(db.DateTime, nullable=False)
    updated_at_date = db.Column(db.DateTime, nullable=False)

    projects = db.relationship("Project", back_populates='channels')

    def to_dict(self):
        return {
            'id': self.id,
            'project_id': self.project_id,
            'name': self.name,
            'created_at_date': self.created_at_date,
            'updated_at_date': self.updated_at_date,
        }
