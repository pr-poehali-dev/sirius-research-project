"""Загрузка фотографий для питомника GASPOWER в S3."""
import json
import os
import base64
import uuid
import boto3

def handler(event: dict, context) -> dict:
    cors = {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Token', 'Access-Control-Allow-Methods': 'POST, OPTIONS'}

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors, 'body': ''}

    if event.get('httpMethod') != 'POST':
        return {'statusCode': 405, 'headers': cors, 'body': json.dumps({'error': 'Method not allowed'})}

    token = event.get('headers', {}).get('X-Admin-Token', '')
    if token != os.environ.get('ADMIN_TOKEN', ''):
        return {'statusCode': 401, 'headers': cors, 'body': json.dumps({'error': 'Unauthorized'})}

    body = json.loads(event.get('body') or '{}')
    file_data = body.get('file', '')
    content_type = body.get('content_type', 'image/jpeg')

    if not file_data:
        return {'statusCode': 400, 'headers': cors, 'body': json.dumps({'error': 'No file provided'})}

    if ',' in file_data:
        file_data = file_data.split(',', 1)[1]

    file_bytes = base64.b64decode(file_data)

    ext = 'jpg'
    if 'png' in content_type:
        ext = 'png'
    elif 'webp' in content_type:
        ext = 'webp'

    key = f'gaspower/{uuid.uuid4()}.{ext}'

    s3 = boto3.client(
        's3',
        endpoint_url='https://bucket.poehali.dev',
        aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
        aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY']
    )
    s3.put_object(Bucket='files', Key=key, Body=file_bytes, ContentType=content_type)

    project_id = os.environ['AWS_ACCESS_KEY_ID']
    url = f'https://cdn.poehali.dev/projects/{project_id}/files/{key}'

    return {'statusCode': 200, 'headers': cors, 'body': json.dumps({'url': url})}
