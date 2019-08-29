import { addAwsPromiseRetries } from '../common';
import { AWS, deploymentPackageBucket, deploymentPackageKey, functionsToDeploy } from '../env';
const lambda = new AWS.Lambda({apiVersion: '2015-03-31'});

function promiseUpdateFunctionCode(functionName:string) {
    let maxRetries = 5;
    let params = {
        FunctionName: functionName,
        Publish: true,
        S3Bucket: deploymentPackageBucket,
        S3Key: deploymentPackageKey
    }
    return addAwsPromiseRetries(() => lambda.updateFunctionCode(params).promise(), maxRetries);
}

async function deployAllFunctions() {
    let updatePromises = functionsToDeploy.map(functionName => promiseUpdateFunctionCode(functionName));
    try {
        await Promise.all(updatePromises);
        console.log("Finished deploying Lambda functions");
    } catch (err) {
        console.log("Error deploying Lambda functions: ", err);
        throw err;
    }
}

export default {
    deployAllFunctions: deployAllFunctions
}