from app.models import db, Channel
from datetime import date, datetime


def seed_channels():
    channel1 = Channel(
        project_id = 1, name='general', channel_type='todo', created_at_date = datetime.utcnow(), updated_at_date = datetime.utcnow()
    )
    channel2 = Channel(
        project_id = 1, name='todo', channel_type='text', created_at_date = datetime.utcnow(), updated_at_date = datetime.utcnow()
    )
    channel3 = Channel(
        project_id = 1, name='general', channel_type='todo', created_at_date = datetime.utcnow(), updated_at_date = datetime.utcnow()
    )
    channel4 = Channel(
        project_id = 2, name='todo', channel_type='text', created_at_date = datetime.utcnow(), updated_at_date = datetime.utcnow()
    )
    channel5 = Channel(
        project_id = 3, name='general', channel_type='todo', created_at_date = datetime.utcnow(), updated_at_date = datetime.utcnow()
    )
    channel6 = Channel(
        project_id = 1, name='todo',channel_type='text', created_at_date = datetime.utcnow(), updated_at_date = datetime.utcnow()
    )
    channel7 = Channel(
        project_id = 1, name='general', channel_type='todo', created_at_date = datetime.utcnow(), updated_at_date = datetime.utcnow()
    )
    channel8 = Channel(
        project_id = 1, name='todo', channel_type='text', created_at_date = datetime.utcnow(), updated_at_date = datetime.utcnow()
    )
    channel9 = Channel(
        project_id = 2, name='general', channel_type='todo', created_at_date = datetime.utcnow(), updated_at_date = datetime.utcnow()
    )
    channel10 = Channel(
        project_id = 3, name='todo', channel_type='text', created_at_date = datetime.utcnow(), updated_at_date = datetime.utcnow()
    )
    db.session.add(channel1)
    db.session.add(channel2)
    db.session.add(channel3)
    db.session.add(channel4)
    db.session.add(channel5)
    db.session.add(channel6)
    db.session.add(channel7)
    db.session.add(channel8)
    db.session.add(channel9)
    db.session.add(channel10)
    db.session.commit()

def undo_channels():
    db.session.execute('TRUNCATE channels RESTART IDENTITY CASCADE;')
    db.session.commit()
