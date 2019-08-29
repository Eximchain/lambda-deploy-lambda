// Provided automagically by AWS
export const awsRegion = process.env.AWS_REGION as string;

// Provided by Terraform
export const deploymentPackageBucket = process.env.DEPLOYMENT_PACKAGE_BUCKET as string;
export const deploymentPackageKey = process.env.DEPLOYMENT_PACKAGE_KEY as string;
export const functionsToDeploy = process.env.FUNCTIONS_TO_DEPLOY ? process.env.FUNCTIONS_TO_DEPLOY.split(',') : [];


import AWSUnconfigured from 'aws-sdk';
export const AWS = AWSUnconfigured;
AWS.config.update({region: awsRegion});

export default { 
    AWS, awsRegion, deploymentPackageBucket, deploymentPackageKey, functionsToDeploy
};