import boto3
import json
import username

access = username.access
secret = username.secret

def main():
    topicArn = 'arn:aws:sns:us-east-1:668476015887:designProject_test'
    snsClient = boto3.client(
        'sns',
        aws_access_key_id = username.access,
        aws_secret_access_key = username.access,
        region_name = 'us-east-1'
    )

    publish_message = 'Hi There! Welcome to the Design Project Course taught by Professor KL Chan!'

    response = snsClient.publish(
        TopicArn = topicArn,
        Message = publish_message
    )

    print(response['ResponseMetadata']['HTTPStatusCode'])
    
main()


