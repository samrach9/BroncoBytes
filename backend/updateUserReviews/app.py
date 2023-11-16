import os
import json
import boto3
import time

def getUser(review, db_client, DYNAMODB_TABLE):
   userId = review['userId']['S']
   response = db_client.get_item(
      TableName=DYNAMODB_TABLE,
      Key={
         'userId':{'S': userId}
      },
   )
   if 'Item' not in response:
      raise Exception('User not found')
   return response['Item']  

# updateUser
def lambda_handler(event, context):
   print('received event')
   print(event)

   db_client = boto3.client('dynamodb')
   DYNAMODB_TABLE = os.environ['DYNAMODB_TABLE']
   
   record = event['Records'][0]
   eventName = record['eventName']

   if eventName == 'INSERT':
      review = record['dynamodb']['NewImage']
      try:
         user = getUser(review, db_client, DYNAMODB_TABLE)
      except Exception as e:
         print(e)
         return
      totalReviews = float(user['totalReviews']['N']) + 1

   elif eventName == 'REMOVE':
      review = record['dynamodb']['OldImage']
      try:
         user = getUser(review, db_client, DYNAMODB_TABLE)
      except Exception as e:
         print(e)
         return
      totalReviews = float(user['totalReviews']['N']) - 1

   # Update the user
   user['totalReviews'] = {'N': str(totalReviews)}
   user['lastActive'] = {'N': str(time.time())}

   db_client.put_item(
      TableName=DYNAMODB_TABLE,
      Item=user,
    )



