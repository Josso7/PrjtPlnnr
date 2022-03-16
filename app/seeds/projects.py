from app.models import db, Project
from datetime import date, datetime


def seed_projects():
    project1 = Project(
        user_id = 1, name='Table', created_at_date = datetime.utcnow(), updated_at_date = datetime.utcnow()
    )
    project2 = Project(
        user_id = 1, name='Bench', created_at_date = datetime.utcnow(), updated_at_date = datetime.utcnow()
    )
    project3 = Project(
        user_id = 1, name='Chair', created_at_date = datetime.utcnow(), updated_at_date = datetime.utcnow()
    )
    project4 = Project(
        user_id = 2, name='Cat Tree', created_at_date = datetime.utcnow(), updated_at_date = datetime.utcnow()
    )
    project5 = Project(
        user_id = 3, name='Smart Mirror', created_at_date = datetime.utcnow(), updated_at_date = datetime.utcnow()
    )

    db.session.add(project1)
    db.session.add(project2)
    db.session.add(project3)
    db.session.add(project4)
    db.session.add(project5)
    db.session.commit()

def undo_projects():
    db.session.execute('TRUNCATE projects RESTART IDENTITY CASCADE;')
    db.session.commit()
