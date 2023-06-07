from .db import SCHEMA, add_prefix_for_prod, db, environment


class ProjectInvitation(db.Model):
    __tablename__ = 'project_invitations'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    inviter_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    project_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('projects.id')), nullable=False)


    user = db.relationship('User', foreign_keys=[user_id], back_populates='invitations')

    user_inviting = db.relationship('User', foreign_keys=[inviter_id],  back_populates='sent_invites')

    project = db.relationship('Project', back_populates='invitations')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'inviter_id': self.inviter_id,
            'project_id': self.project_id,
            'project': self.project.to_dict(),
            'user_inviting': self.user_inviting.inviting_user_to_dict()
        }
