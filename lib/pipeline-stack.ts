import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as codecommit from 'aws-cdk-lib/aws-codecommit';
import * as codepipeline from 'aws-cdk-lib/aws-codepipeline';
import * as codebuild from 'aws-cdk-lib/aws-codebuild';
import * as codepipeline_actions from 'aws-cdk-lib/aws-codepipeline-actions';
import { CodeBuildStep, CodePipeline, CodePipelineSource } from 'aws-cdk-lib/pipelines';
import { LambdaStack } from './lambda-stack';

export class PipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, 'Pipeline', {
      pipelineName: 'WillPipeline',
      synth: new CodeBuildStep('SynthStep', {
        input: CodePipelineSource.gitHub('heqish/cdk-for-will', 'main', {
          authentication: cdk.SecretValue.secretsManager('github-token'),
        }),
        installCommands: [
          'npm install -g aws-cdk',
          'pip install -r requirements.txt',
        ],
        commands: [
          'npm ci',
          'npm run build',
          'npx cdk synth',
        ],
      }),
    });

    const appStage = pipeline.addStage(new ApplicationStage(this, 'ApplicationStage'), {
      pre: [
        new CodeBuildStep('Tests', {
          commands: [
            'cd lambda',
            'python -m pytest handler_test.py',
          ],
        })
      ]
    });
  }
}

class ApplicationStage extends cdk.Stage {
  constructor(scope: Construct, id: string, props?: cdk.StageProps) {
    super(scope, id, props);

    new LambdaStack(this, 'LambdaStack');
  }
}