"""Авторизация в админку питомника GASPOWER по паролю."""
import json
import os

def handler(event: dict, context) -> dict:
    cors = {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Allow-Methods': 'POST, OPTIONS'}

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors, 'body': ''}

    if event.get('httpMethod') != 'POST':
        return {'statusCode': 405, 'headers': cors, 'body': json.dumps({'error': 'Method not allowed'})}

    body = json.loads(event.get('body') or '{}')
    password = body.get('password', '')
    admin_token = os.environ.get('ADMIN_TOKEN', '')

    if not admin_token:
        return {'statusCode': 500, 'headers': cors, 'body': json.dumps({'error': 'ADMIN_TOKEN not configured'})}

    if password == admin_token:
        return {'statusCode': 200, 'headers': cors, 'body': json.dumps({'ok': True, 'token': admin_token})}

    return {'statusCode': 401, 'headers': cors, 'body': json.dumps({'error': 'Неверный пароль'})}
