"""API для получения и обновления контента сайта питомника GASPOWER."""
import json
import os
import psycopg2

SCHEMA = os.environ['MAIN_DB_SCHEMA']

def get_conn():
    return psycopg2.connect(os.environ['DATABASE_URL'])

def handler(event: dict, context) -> dict:
    cors = {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Token', 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'}

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors, 'body': ''}

    method = event.get('httpMethod', 'GET')

    if method == 'GET':
        conn = get_conn()
        cur = conn.cursor()
        cur.execute(f'SELECT key, value FROM {SCHEMA}.site_content')
        rows = cur.fetchall()
        conn.close()
        data = {row[0]: row[1] for row in rows}
        return {'statusCode': 200, 'headers': cors, 'body': json.dumps(data, ensure_ascii=False)}

    if method == 'POST':
        token = event.get('headers', {}).get('X-Admin-Token', '')
        if token != os.environ.get('ADMIN_TOKEN', ''):
            return {'statusCode': 401, 'headers': cors, 'body': json.dumps({'error': 'Unauthorized'})}

        body = json.loads(event.get('body') or '{}')
        conn = get_conn()
        cur = conn.cursor()
        for key, value in body.items():
            cur.execute(
                f"INSERT INTO {SCHEMA}.site_content (key, value, updated_at) VALUES (%s, %s, NOW()) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW()",
                (key, value)
            )
        conn.commit()
        conn.close()
        return {'statusCode': 200, 'headers': cors, 'body': json.dumps({'ok': True})}

    return {'statusCode': 405, 'headers': cors, 'body': json.dumps({'error': 'Method not allowed'})}
