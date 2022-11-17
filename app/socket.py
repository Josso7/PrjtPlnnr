import os
from flask_socketio import SocketIO, emit, join_room, leave_room, send
from .models.db import db
from .models import OnlineUsers
import socketio
import asyncio
import time
import datetime
from engineio.payload import Payload
Payload.max_decode_packets = 1000

users_online = False

users = {}

# async def workload(text, duration):
#     while duration > 0:
#         # run sleep and yield control
#         # back to the event loop (for one cycle)
#         await asyncio.sleep(1)
#         print(f'{text} counter: sleeping {duration} seconds')
#         duration -= 1

# async def main():
#     # send the workload() coroutine to the background,
#     # to let it run concurrently with other tasks,
#     # switching between them at await points
#     task_1 = asyncio.create_task(workload('First', 2))
#     task_2 = asyncio.create_task(workload('Second', 4))
#     task_3 = asyncio.create_task(workload('Third', 8))
#     print(f"Started: {time.strftime('%X')}")
#     # create await points for each
#     # of the concurrent tasks
#     await task_1
#     await task_2
#     await task_3
#     print(f"Ended: {time.strftime('%X')}")

socketio = SocketIO(logger=False, engineio_logger=False)

# if os.environ.get("FLASK_ENV") == "production":
#     origins = [
#         "http://actual-app-url.herokuapp.com",
#         "https://actual-app-url.herokuapp.com"
#     ]
# else:
#     origins = "*"
# socketio = SocketIO(cors_allowed_origins=origins)

socketio = SocketIO(cors_allowed_origins="*")

# @socketio.on("event-type")
# def function_to_handle_event(data_included_with_event):
#     pass

# handle chat messages
@socketio.on("chat")
def handle_chat(data):
    room = data['room']
    emit("chat", data, broadcast=True, to=room)

# handle joining chat rooms
@socketio.on('join')
def on_join(data):
    username = data['username']
    room = data['room']
    join_room(room)
    send(username + ' has entered the room.', to=room)

# handle leaving chat rooms
@socketio.on('leave')
def on_leave(data):
    username = data['username']
    room = data['room']
    leave_room(room)
    send(username + ' has left the room.', to=room)


# handle live update of login
@socketio.on('login')
def on_active(data):
    # user = OnlineUsers(
    #     user_id = data['id']
    # )
    # db.session.add(user)
    # db.session.commit()
    users[data['id']] = data
    users[data['id']]['last_online'] = datetime.datetime.now().timestamp()
    # print('!!!!!!!!!!!!!! USERS !!!!!!!!!!!!!!!!!!', users)
    emit('login', data, broadcast=True)


# hande live update of logout
@socketio.on('logout')
def on_inactive(data):
    user = db.session.query(OnlineUsers).filter(OnlineUsers.user_id == data['id']).delete()
    db.session.commit()
    emit('logout', data, broadcast=True)

@socketio.on('join_room')
def on_join_room(data):
    emit('join_room', data, broadcast=True)

@socketio.on('leave_room')
def on_leave_room(data):
    emit('leave_room', data, broadcast=True)

@socketio.on('heartbeat')
def heartbeat_check(user):
    # pass
    users[user['id']]['last_online'] = datetime.datetime.now().timestamp()
    print('!!!!!!!!!!!!!!!!! HEARTBEAT FROM USER:', users[user['id']])
    for user in users.copy():
        if datetime.datetime.now().timestamp() - users[user]['last_online'] > 15:
            print('!!!!!!!!!!!!!! USERS BEFORE DELETE !!!!!!!!!!!!!!!', users)
            emit('user_inactive', users[user], broadcast=True)
            del users[user]
            print('!!!!!!!!!!!!!! USERS AFTER DELETE !!!!!!!!!!!!!!!', users)
    emit('online_users', users)

def check_users_online():
    if db.session.query(OnlineUsers).all():
        return True
    else:
        return False

print('YOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO')
