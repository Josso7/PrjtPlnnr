from app.models import db, Todo_Item
from datetime import date, datetime


def seed_todo_items():
    todo_item1 = Todo_Item(
        channel_id='1', user_id = 1, content='Buy wood for table', completed=True, created_at_date = datetime.utcnow(), updated_at_date = datetime.utcnow()
    )
    todo_item2 = Todo_Item(
        channel_id='3', user_id = 1, content='Buy wood for bench', completed=False, created_at_date = datetime.utcnow(), updated_at_date = datetime.utcnow()
    )
    todo_item3 = Todo_Item(
        channel_id='5', user_id = 1, content='Buy wood for chair', completed=True, created_at_date = datetime.utcnow(), updated_at_date = datetime.utcnow()
    )
    todo_item4 = Todo_Item(
        channel_id='7', user_id = 2, content='Buy wood for cat tree', completed=False, created_at_date = datetime.utcnow(), updated_at_date = datetime.utcnow()
    )
    todo_item5 = Todo_Item(
        channel_id='9', user_id = 3, content='Buy wood and mirrors for smart mirror', completed=True, created_at_date = datetime.utcnow(), updated_at_date = datetime.utcnow()
    )

    db.session.add(todo_item1)
    db.session.add(todo_item2)
    db.session.add(todo_item3)
    db.session.add(todo_item4)
    db.session.add(todo_item5)
    db.session.commit()

def undo_todo_items():
    db.session.execute('TRUNCATE todo_items RESTART IDENTITY CASCADE;')
    db.session.commit()
