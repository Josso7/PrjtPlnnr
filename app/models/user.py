from flask_login import UserMixin
from werkzeug.security import check_password_hash, generate_password_hash

from .db import db
from .project_invitation import ProjectInvitation


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)


    invitations = db.relationship('ProjectInvitation', foreign_keys=[ProjectInvitation.user_id], back_populates='user')

    sent_invites = db.relationship('ProjectInvitation', foreign_keys=[ProjectInvitation.inviter_id], back_populates='user_inviting')

    messages = db.relationship('Message', back_populates='user')



    @property
    def password(self):
        return self.hashed_password

    # @property
    # def username(self):
    #     return self.username

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)


    def inviting_user_to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
        }

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'invitations': {invite.id: invite.to_dict() for invite in self.invitations},
            'sent_invites': [sent_invite.to_dict() for sent_invite in self.sent_invites]
        }
