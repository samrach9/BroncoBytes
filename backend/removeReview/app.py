import os
import json
import boto3

# removeReview
def lambda_handler(event, context):
    print('received event:')
    print(event)

    # Static Variables
    db_client = boto3.client('dynamodb')
    DYNAMODB_TABLE = os.environ['DYNAMODB_TABLE']
   
    body = json.loads(event['body'])

    # Remove item object
    reviewId = body['reviewId']
    response = db_client.delete_item(
        TableName=DYNAMODB_TABLE,
        Key={
            'reviewId':{'S': reviewId}
        },
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
