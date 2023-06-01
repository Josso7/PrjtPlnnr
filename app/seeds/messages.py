from datetime import date, datetime

from app.models import Message, db


def seed_messages():
    message1 = Message(
        user_id = 1, channel_id='2', content='How do I make a table?', created_at_date = datetime.utcnow(), updated_at_date = datetime.utcnow()
    )
    message2 = Message(
        user_id = 1, channel_id='4', content='How do I make a bench?', created_at_date = datetime.utcnow(), updated_at_date = datetime.utcnow()
    )
    message3 = Message(
        user_id = 1, channel_id='6', content='How do I make a chair?', created_at_date = datetime.utcnow(), updated_at_date = datetime.utcnow()
    )
    message4 = Message(
        user_id = 2, channel_id='8', content='How do I make a cat tree?', created_at_date = datetime.utcnow(), updated_at_date = datetime.utcnow()
    )
    message5 = Message(
        user_id = 3, channel_id='10', content='How do I make a smart mirror?', created_at_date = datetime.utcnow(), updated_at_date = datetime.utcnow()
    )

    db.session.add(message1)
    db.session.add(message2)
    db.session.add(message3)
    db.session.add(message4)
    db.session.add(message5)
    db.session.commit()

def undo_messages():
    db.session.execute('TRUNCATE messages RESTART IDENTITY CASCADE;')
    db.session.commit()
