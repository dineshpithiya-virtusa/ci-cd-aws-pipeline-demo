import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Function, InlineCode, Runtime, Code} from 'aws-cdk-lib/aws-lambda';
import * as path from 'path';
const ecr = require('aws-cdk-lib/aws-ecr');
const ecs = require('@aws-cdk/aws-ecs')

export class MyLambdaStack extends cdk.Stack {
    constructor(scope: Construct, id: string, stageName: string, props?: cdk.StackProps) {
      super(scope, id, props);
      const repo = ecr.Repository.fromRepositoryArn(
        this,
        'Servic1Repo',
        `arn:aws:ecr:us-west-2:${props?.env?.account}:repository/service1`
      )
      const image = ecs.ContainerImage.fromEcrRepository(repo, 'latest')
      
      new Function(this, 'LambdaFunction', {
        runtime: Runtime.NODEJS_18_X, //using node for this, but can easily use python or other
        handler: 'index.handler',
        code: Code.fromAsset(path.join(__dirname, 'lambda')), //resolving to ./lambda directory
        environment: { "stageName": stageName } //inputting stagename
      });
    }
}