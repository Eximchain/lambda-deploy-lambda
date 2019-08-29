import { CodePipelineJob } from './lambda-event-types';
import services from './services';
const { codepipeline, lambda } = services;

// View a sample JSON event from a CodePipeline here:
//
// https://docs.aws.amazon.com/codepipeline/latest/userguide/actions-invoke-lambda-function.html#actions-invoke-lambda-function-json-event-example
//
// Below function is called by index, it receives the event["CodePipeline.job"] field.

async function completePipelineBuildJob({ id }:CodePipelineJob) {
  console.log("Completing Lambda Deploy tasks");

  try {
    await lambda.deployAllFunctions();
    console.log("Successfully completed all CodePipeline Lambda Deploy steps!");
    return await codepipeline.completeJob(id);
  } catch (err) {
    console.log("Error completing CodePipeline Lambda Deploy steps: ", err);
    await codepipeline.failJob(id, err);
  }
}

export default {
  completePipelineBuild : completePipelineBuildJob
}