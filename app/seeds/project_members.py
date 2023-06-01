from datetime import date, datetime

from app.models import ProjectMembers, db


def seed_project_members():
    member1 = ProjectMembers(
        user_id = 1, project_id=1, created_at_date = datetime.utcnow(), updated_at_date = datetime.utcnow()
    )
    member2 = ProjectMembers(
        user_id = 2, project_id=1, created_at_date = datetime.utcnow(), updated_at_date = datetime.utcnow()
    )
    member3 = ProjectMembers(
        user_id = 3, project_id=1, created_at_date = datetime.utcnow(), updated_at_date = datetime.utcnow()
    )
    member4 = ProjectMembers(
        user_id = 2, project_id=2, created_at_date = datetime.utcnow(), updated_at_date = datetime.utcnow()
    )
    db.session.add(member1)
    db.session.add(member2)
    db.session.add(member3)
    db.session.add(member4)
    db.session.commit()

def undo_project_members():
    db.session.execute('TRUNCATE project_members RESTART IDENTITY CASCADE;')
    db.session.commit()
