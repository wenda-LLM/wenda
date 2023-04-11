import sqlalchemy_utils
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine, Column, Integer, String, ForeignKey
DATABASE_URI = 'sqlite:///knowledge_graph.db'


Base = declarative_base()


class Entity(Base):
    tablename = 'entities'

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False, unique=True)

    relations = relationship('Relation', back_populates='entity')


class Relation(Base):
    tablename = 'relations'

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    from_entity_id = Column(Integer, ForeignKey('entities.id'), nullable=False)
    to_entity_id = Column(Integer, ForeignKey('entities.id'), nullable=False)

    entity = relationship('Entity', back_populates='relations')


engine = create_engine(DATABASE_URI)
if not sqlalchemy_utils.database_exists(engine.url):
    sqlalchemy_utils.create_database(engine.url)
Base.metadata.create_all(engine)

Session = sessionmaker(bind=engine)


def create_entity(name):
    session = Session()
    entity = Entity(name=name)
    session.add(entity)
    session.commit()


def create_relation(name, from_entity_id, to_entity_id):
    session = Session()
    relation = Relation(
        name=name, from_entity_id=from_entity_id, to_entity_id=to_entity_id)
    session.add(relation)
    session.commit()


def find_entity(name):
    session = Session()
    return session.query(Entity).filter(Entity.name == name).first()


def find_related_entities(entity_id):
    session = Session()
    entity = session.query(Entity).filter(Entity.id == entity_id).first()

    if entity:
        return [(r.name, r.to_entity_id) for r in entity.relations]

    return []


# 示例：使用知识图谱查找程序的方法
entity = find_entity('北京')
if entity:
    related_entities = find_related_entities(entity.id)
    print("查找到实体 '{}' 及其关联实体：".format(entity.name))
    session = Session()
    for relation, to_entity_id in related_entities:
        to_entity = session.query(Entity).get(to_entity_id)
        print("- 关系 '{}', 目标实体: '{}'".format(relation, to_entity.name))
else:
    print("示例实体未找到。请先创建实体及其关联实体。")


def create_knowledge_graph_from_string(from_entity_name, relation_name, to_entity_name):

    from_entity = find_entity(from_entity_name)
    if not from_entity:
        create_entity(from_entity_name)
        from_entity = find_entity(from_entity_name)

    to_entity = find_entity(to_entity_name)
    if not to_entity:
        create_entity(to_entity_name)
        to_entity = find_entity(to_entity_name)

    create_relation(relation_name, from_entity.id, to_entity.id)
