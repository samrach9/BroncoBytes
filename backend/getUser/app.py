import os
import json
import boto3
from dynamodb_json import json_util as json_db

username_or_email_not_found_response = {
    "statusCode": 401,
    "headers": {
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
    },
    "body": json.dumps({"error": "Username or email not found"}),
}

incorrect_password_response = {
    "statusCode": 401,
    "headers": {
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
    },
    "body": json.dumps({"error": "Incorrect password"}),
}

# getUser
def lambda_handler(event, context):

    print('received event:')
    print(event)

    # Static Variables
    db_client = boto3.client('dynamodb')
    DYNAMODB_TABLE = os.environ['DYNAMODB_TABLE']
 
    body = json.loads(event['body'])
     
    # Get user
    if 'userId' in body:
        response = db_client.get_item(
            TableName=DYNAMODB_TABLE,
            Key={
                'userId': {'S': body['userId']}
            },
        )
        item = response['Item']
        respBody = json_db.loads(item)
        respBody.pop('password', None)
    elif 'username' in body:
        response = db_client.query(
            TableName=DYNAMODB_TABLE,
            IndexName='usernameIndex',
            KeyConditionExpression='username = :username',
            ExpressionAttributeValues={
                ':username': {'S': body['username']},
            },
        )
        if len(response['Items']) == 0:
            return username_or_email_not_found_response
        item = response['Items'][0]
        respBody = json_db.loads(item)
        password = respBody.pop('password', None)
        if password != body['password']:
            return incorrect_password_response
    elif 'email' in body:
        response = db_client.query(
            TableName=DYNAMODB_TABLE,
            IndexName='emailIndex',
            KeyConditionExpression='email = :email',
            ExpressionAttributeValues={
                ':email': {'S': body['email']},
            },
        )
        if len(response['Items']) == 0:
            return username_or_email_not_found_response
        item = response['Item'][0]
        respBody = json_db.loads(item)
        password = respBody.pop('password', None)
        if password != body['password']:
            return incorrect_password_response

    

    return {
        "statusCode": 200,
        "headers": {
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        "body": json.dumps({"user" : respBody}),
    }
