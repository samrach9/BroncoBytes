import os
import json
import boto3

def getFood(review, db_client, DYNAMODB_TABLE):
   foodId = review['foodId']['S']
   response = db_client.get_item(
      TableName=DYNAMODB_TABLE,
      Key={
         'foodId':{'S': foodId}
      },
   )
   return response['Item']  

# updateFood
def lambda_handler(event, context):
   print('received event')
   print(event)

   db_client = boto3.client('dynamodb')
   DYNAMODB_TABLE = os.environ['DYNAMODB_TABLE']
   
   record = event['Records'][0]
   eventName = record['eventName']

   if eventName == 'INSERT':
      review = record['dynamodb']['NewImage']
      food = getFood(review, db_client, DYNAMODB_TABLE)
      totalReviews = float(food['totalReviews']['N']) + 1
      reviewRating = float(review['rating']['N'])
      foodRating = float(food['rating']['N'])
      foodRating = (foodRating * (totalReviews - 1) + reviewRating) / totalReviews
      foodImageUrls = food['imageUrls']['L']
      for imageUrl in review['imageUrls']['L']:
         foodImageUrls.append(imageUrl)

   elif eventName == 'REMOVE':
      review = record['dynamodb']['OldImage']
      food = getFood(review, db_client, DYNAMODB_TABLE)
      totalReviews = float(food['totalReviews']['N']) - 1
      reviewRating = float(review['rating']['N'])
      foodRating = float(food['rating']['N'])
      if totalReviews > 0:
         foodRating = (foodRating * (totalReviews + 1) - reviewRating) / totalReviews
      else:
         foodRating = 0
      foodImageUrls = food['imageUrls']['L']
      for imageUrl in review['imageUrls']['L']:
         foodImageUrls.remove(imageUrl)
   
   elif eventName == 'MODIFY':
      new_review = record['dynamodb']['NewImage']
      old_review = record['dynamodb']['OldImage']
      food = getFood(new_review, db_client, DYNAMODB_TABLE)
      totalReviews = float(food['totalReviews']['N'])
      newReviewRating = float(new_review['rating']['N'])
      oldReviewRating = float(old_review['rating']['N'])
      foodRating = float(food['rating']['N'])
      foodRating = (foodRating * totalReviews + newReviewRating - oldReviewRating) / totalReviews
      foodImageUrls = food['imageUrls']['L']
      for imageUrl in old_review['imageUrls']['L']:
         foodImageUrls.remove(imageUrl)
      for imageUrl in new_review['imageUrls']['L']:
         foodImageUrls.append(imageUrl)

   # Update the food
   food['totalReviews'] = {'N': str(totalReviews)}
   food['rating'] = {'N': str(foodRating)}
   food['imageUrls'] = {'L': foodImageUrls}

   db_client.put_item(
      TableName=DYNAMODB_TABLE,
      Item=food,
    )



