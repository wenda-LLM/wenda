
import sqlalchemy_utils
from sqlalchemy import create_engine, Enum, Text, DateTime, Sequence
from sqlalchemy.orm import Session
from sqlalchemy.ext.declarative import declarative_base
import sqlalchemy
from contextlib import contextmanager

# 创建对象的基类:
Base = declarative_base()
engine = create_engine("sqlite:///record.db?check_same_thread=False")
if not sqlalchemy_utils.database_exists(engine.url):
    sqlalchemy_utils.create_database(engine.url)


class 记录(Base):
    __tablename__ = '记录'
    时间 = sqlalchemy.Column(sqlalchemy.DateTime, primary_key=True)
    IP = sqlalchemy.Column(sqlalchemy.String(3*4+3))
    问 = sqlalchemy.Column(sqlalchemy.Text)
    答 = sqlalchemy.Column(sqlalchemy.Text)


Base.metadata.create_all(engine)

session = Session(engine)


@contextmanager
def session_maker(session=session):
    try:
        yield session
        session.commit()
    except:
        session.rollback()
        raise
    finally:
        session.close()
