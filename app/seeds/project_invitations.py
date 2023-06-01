from app.models import ProjectInvitation, db


def seed_project_invitations():

    invitation1 = ProjectInvitation(user_id = 1, inviter_id = 2, project_id = 2)

    db.session.add(invitation1)
    db.session.commit()

def undo_project_invitations():
    db.session.execute('TRUNCATE project_invitations RESTART IDENTITY CASCADE;')
    db.session.commit()
