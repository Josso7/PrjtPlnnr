"""empty message

Revision ID: b510f0dc0755
Revises: 8d30ad386bd9
Create Date: 2022-11-06 19:10:24.333373

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b510f0dc0755'
down_revision = '8d30ad386bd9'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('online_users', 'project_id')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('online_users', sa.Column('project_id', sa.INTEGER(), autoincrement=False, nullable=False))
    # ### end Alembic commands ###