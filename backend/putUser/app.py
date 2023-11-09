import os
import json
import uuid
import boto3
import time
from dynamodb_json import json_util as json_db

email_already_exists_response = {
    "statusCode": 400,
    "headers": {
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
    },
    "body": json.dumps({'error': 'Email already exists.'}),
}

username_already_exists_response = {
    "statusCode": 400,
    "headers": {
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
    },
    "body": json.dumps({'error': 'Username already exists.'}),
}


def email_taken(email, db_client, DYNAMODB_TABLE):
    response = db_client.query(
        TableName=DYNAMODB_TABLE,
        IndexName='emailIndex',
        KeyConditionExpression='email = :email',
        ExpressionAttributeValues={
            ':email': {'S': email}
        },
    )
    return len(response['Items']) > 0


def username_taken(username, db_client, DYNAMODB_TABLE):
    response = db_client.query(
        TableName=DYNAMODB_TABLE,
        IndexName='usernameIndex',
        KeyConditionExpression='username = :username',
        ExpressionAttributeValues={
            ':username': {'S': username}
        },
    )
    return len(response['Items']) > 0

# putUser
def lambda_handler(event, context):
    print('received event:')
    print(event)

    # Static Variables
    db_client = boto3.client('dynamodb')
    DYNAMODB_TABLE = os.environ['DYNAMODB_TABLE']

    body = json.loads(event['body'])

    # Create item object
    if 'userId' in body:
        userId = body['userId']
        response = db_client.get_item(
            TableName=DYNAMODB_TABLE,
            Key={
                'userId': {'S': userId}
            },
        )
        item = response['Item']
        if ('password' in body):
            item['password'] = {'S': body['password']}
        if (item['email']['S'] != body['email'] and email_taken(body['email'], db_client, DYNAMODB_TABLE)):
            return email_already_exists_response
        item['email'] = {'S': body['email']}
        if (item['username']['S'] != body['username'] and username_taken(body['username'], db_client, DYNAMODB_TABLE)):
            return username_already_exists_response
        item['username'] = {'S': body['username']}
        if 'admin' in body:
            item['admin'] = {'BOOL': body['admin']}
        if 'photoUrl' in body:
            item['photoUrl'] = {'S': body['photoUrl']}
    else:
        if email_taken(body['email'], db_client, DYNAMODB_TABLE):
            return email_already_exists_response
        if username_taken(body['username'], db_client, DYNAMODB_TABLE):
            return username_already_exists_response
        userId = str(uuid.uuid4())
        dateCreated = time.time()
        item = {
            'userId': {'S': userId},
            'dateCreated': {'N': str(dateCreated)},
            'email': {'S': body['email']},
            'username': {'S': body['username']},
            'password': {'S': body['password']},
            'admin': {'BOOL': False}
        }

    # Put object in DB
    response = db_client.put_item(
        TableName=DYNAMODB_TABLE,
        Item=item,
    )

    item = json_db.loads(item)
    item.pop('password')

    return {
        "statusCode": 200,
        "headers": {
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        "body": json.dumps({"user" : item}),
    }
