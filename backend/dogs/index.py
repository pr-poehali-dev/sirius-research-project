"""API для получения и редактирования карточек собак питомника GASPOWER."""
import json
import os
import psycopg2

SCHEMA = os.environ['MAIN_DB_SCHEMA']

def get_conn():
    return psycopg2.connect(os.environ['DATABASE_URL'])

def handler(event: dict, context) -> dict:
    cors = {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Token', 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'}

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors, 'body': ''}

    method = event.get('httpMethod', 'GET')

    if method == 'GET':
        conn = get_conn()
        cur = conn.cursor()
        cur.execute(f'SELECT id, name, title, age, image_url, description, sort_order FROM {SCHEMA}.dogs ORDER BY sort_order ASC')
        rows = cur.fetchall()
        conn.close()
        dogs = [{'id': r[0], 'name': r[1], 'title': r[2], 'age': r[3], 'image': r[4], 'desc': r[5], 'sort_order': r[6]} for r in rows]
        return {'statusCode': 200, 'headers': cors, 'body': json.dumps(dogs, ensure_ascii=False)}

    token = event.get('headers', {}).get('X-Admin-Token', '')
    if token != os.environ.get('ADMIN_TOKEN', ''):
        return {'statusCode': 401, 'headers': cors, 'body': json.dumps({'error': 'Unauthorized'})}

    body = json.loads(event.get('body') or '{}')

    if method == 'POST':
        conn = get_conn()
        cur = conn.cursor()
        cur.execute(
            f'INSERT INTO {SCHEMA}.dogs (name, title, age, image_url, description, sort_order) VALUES (%s, %s, %s, %s, %s, %s) RETURNING id',
            (body['name'], body['title'], body['age'], body['image'], body['desc'], body.get('sort_order', 0))
        )
        new_id = cur.fetchone()[0]
        conn.commit()
        conn.close()
        return {'statusCode': 200, 'headers': cors, 'body': json.dumps({'id': new_id})}

    if method == 'PUT':
        dog_id = body.get('id')
        conn = get_conn()
        cur = conn.cursor()
        cur.execute(
            f'UPDATE {SCHEMA}.dogs SET name=%s, title=%s, age=%s, image_url=%s, description=%s, sort_order=%s, updated_at=NOW() WHERE id=%s',
            (body['name'], body['title'], body['age'], body['image'], body['desc'], body.get('sort_order', 0), dog_id)
        )
        conn.commit()
        conn.close()
        return {'statusCode': 200, 'headers': cors, 'body': json.dumps({'ok': True})}

    if method == 'DELETE':
        dog_id = body.get('id')
        conn = get_conn()
        cur = conn.cursor()
        cur.execute(f'DELETE FROM {SCHEMA}.dogs WHERE id=%s', (dog_id,))
        conn.commit()
        conn.close()
        return {'statusCode': 200, 'headers': cors, 'body': json.dumps({'ok': True})}

    return {'statusCode': 405, 'headers': cors, 'body': json.dumps({'error': 'Method not allowed'})}
