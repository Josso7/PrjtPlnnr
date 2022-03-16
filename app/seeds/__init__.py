from flask.cli import AppGroup
from .users import seed_users, undo_users
from .projects import seed_projects, undo_projects
from .messages import seed_messages, undo_messages
from .channels import seed_channels, undo_channels
from .todo_items import seed_todo_items, undo_todo_items

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_projects()
    seed_messages()
    seed_channels()
    seed_todo_items()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_projects()
    undo_messages()
    undo_channels()
    undo_todo_items()
    # Add other undo functions here
