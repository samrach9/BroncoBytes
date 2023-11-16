import os
import boto3
import random

# biteOfTheDay 
def lambda_handler(event, context):
    print('received event:')
    print(event)

    # Static Variables
    db_client = boto3.client('dynamodb')
    DYNAMODB_TABLE = os.environ['DYNAMODB_TABLE']
    
    # Make new biteOTD
    foods = db_client.scan(
        TableName=DYNAMODB_TABLE,
    )['Items']
    oldBiteOTD = [food for food in foods if 'biteOTD' in food and food['biteOTD']['S'] == 'T']
    oldBiteOTD = oldBiteOTD[0] if len(oldBiteOTD) > 0 else None
    randomFood = random.choice(foods)
    while randomFood == oldBiteOTD:
        randomFood = random.choice(foods)
    
    if oldBiteOTD is not None:
        oldBiteOTD['biteOTD'] = {'S': 'F'}
        db_client.put_item(
            TableName=DYNAMODB_TABLE,
            Item=oldBiteOTD,
        )

    randomFood['biteOTD'] = {'S': 'T'}
    db_client.put_item(
        TableName=DYNAMODB_TABLE,
        Item=randomFood,
    )
