import os
import json
import uuid
import boto3
import time

# putFood
def lambda_handler(event, context):
    print('received event:')
    print(event)

    # Static Variables
    db_client = boto3.client('dynamodb')
    DYNAMODB_TABLE = os.environ['DYNAMODB_TABLE']
   
    body = json.loads(event['body'])

    # Create item object
    if 'foodId' in body:
        foodId = body['foodId']
        response = db_client.get_item(
            TableName=DYNAMODB_TABLE,
            Key={
                'foodId':{'S': foodId}
            },
        )
        item = response['Item']
    else:
        foodId = str(uuid.uuid4())
        dateCreated = time.time()
        item = {
            'foodId':{'S': foodId},
            'dateCreated':{'N': str(dateCreated)},
            'rating':{'N': "0"},
            'totalReviews':{'N': "0"},
            'imageUrls':{'L': []},
        }

    if 'name' in body:
        item['name'] = {'S': body['name']}
    if 'type' in body:
        item['type'] = {'S': body['type']}
    if 'restaurants' in body:
        restaurants = [{'S' : restaurant} for restaurant in body['restaurants']]
        item['restaurants'] = {'L': restaurants}
    if 'tags' in body:
        tags = [{'S' : tag} for tag in body['tags']]
        item['tags'] = {'L': tags}
    if 'imageUrls' in body:
        imageUrls = [{'S' : imageUrl} for imageUrl in body['imageUrls']]
        item['imageUrls'] = {'L': imageUrls}

    # Put object in DB
    response = db_client.put_item(
      TableName=DYNAMODB_TABLE,
      Item=item,
    )

    return {
        "statusCode": 200,
        "headers": {
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        "body": json.dumps({}),
    }
