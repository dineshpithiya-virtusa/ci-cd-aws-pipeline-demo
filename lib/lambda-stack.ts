import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Function, InlineCode, Runtime, Code} from 'aws-cdk-lib/aws-lambda';
import * as path from 'path';
import { DockerImageAsset, NetworkMode,Platform  } from 'aws-cdk-lib/aws-ecr-assets';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ecrdeploy from 'cdk-ecr-deployment';

export class MyLambdaStack extends cdk.Stack {
    constructor(scope: Construct, id: string, stageName: string, props?: cdk.StackProps) {
      super(scope, id, props);
      
      const image = new DockerImageAsset(this, 'MyBuildImage', {
        directory: path.join(__dirname, 'my-image'),
        invalidation: {
          buildArgs: false,
        }
      });

      new ecrdeploy.ECRDeployment(this, 'DeployDockerImage', {
        src: new ecrdeploy.DockerImageName(image.imageUri),
        dest: new ecrdeploy.DockerImageName(`${cdk.Aws.ACCOUNT_ID}.dkr.ecr.us-west-2.amazonaws.com/test:nginx`),
      });

      new Function(this, 'LambdaFunction', {
        runtime: Runtime.NODEJS_18_X, //using node for this, but can easily use python or other
        handler: 'index.handler',
        code: Code.fromAsset(path.join(__dirname, 'lambda')), //resolving to ./lambda directory
        environment: { "stageName": stageName } //inputting stagename
      });
    }
}