import {Stack, StackProps} from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apiGateway from 'aws-cdk-lib/aws-apigateway';
import * as dotenv from "dotenv";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

dotenv.config();

export class CopykittInfraStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const layer = new lambda.LayerVersion(this, "BaseLayer", {
      code: lambda.Code.fromAsset("lambda_base_layer/layer.zip"),
      compatibleRuntimes: [lambda.Runtime.PYTHON_3_9],
    });

    const apiLambda = new lambda.Function(this, "ApiFunction", {
      runtime: lambda.Runtime.PYTHON_3_9,
      code: lambda.Code.fromAsset("../app/"),
      handler: "copykitt_api.handler",
      layers: [layer],
      environment: {
        OPENAI_API_KEY: process.env.OPENAI_API_KEY ?? "",
      }
    });


  const copykitt_api = new apiGateway.RestApi(this, "RestApi", {
    restApiName: "CopyKitt Tutorial API",
  });

  copykitt_api.root.addProxy({
    defaultIntegration: new apiGateway.LambdaIntegration(apiLambda),
  });
  }
}
