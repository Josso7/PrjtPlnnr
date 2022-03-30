from app.models import db, ProjectMembers
from datetime import date, datetime

def seed_projects():
    member1 = ProjectMembers(
        user_id = 1, project_id=1, created_at_date = datetime.utcnow(), updated_at_date = datetime.utcnow()
    )
    member2 = ProjectMembers(
        user_id = 2, project_id=1, created_at_date = datetime.utcnow(), updated_at_date = datetime.utcnow()
    )
    member3 = ProjectMembers(
        user_id = 3, project_id=1, created_at_date = datetime.utcnow(), updated_at_date = datetime.utcnow()
    )


    db.session.add(member1)
    db.session.add(member2)
    db.session.add(member3)
    db.session.commit()
def undo_projects():
    db.session.execte('TRUNCATE project_members RESTART IDENTITY CASCADE;')
    db.session.commit()
