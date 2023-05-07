#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CiCd } from '../lib/cicd-stack';

const app = new cdk.App();
new CiCd(
  app, 
  'CiCdAwsPipelineDemoStack', 
  {
    env: {
      account: '####',
      region: '####',
    }
});