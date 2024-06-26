// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

/*
ABOUT THIS NODE.JS EXAMPLE: This example works with the AWS SDK for JavaScript version 3 (v3),
which is available at https://github.com/aws/aws-sdk-js-v3.

Purpose:
transcribe_create_job.ts demonstrates how to create an Amazon Transcribe transcription job.

Inputs (replace in code):
- REGION
- JOB_NAME
- LANGUAGE_CODE
- SOURCE_FILE_FORMAT
- SOURCE_LOCATION
- S3_BUCKET_DESTINATION

Running the code:
node transcribe_create_job.js
 */
// snippet-start:[transcribe.JavaScript.jobs.createJobV3]
// Import the required AWS SDK clients and commands for Node.js
import {
  LanguageCode,
  MediaFormat,
  StartTranscriptionJobCommand,
  TranscribeClient,
} from '@aws-sdk/client-transcribe';

const transcribeClient = new TranscribeClient({ region: 'REGION' });

// Set the parameters
export const params = {
  TranscriptionJobName: 'JOB_NAME',
  Media: {
    // For example, "https://transcribe-demo.s3-REGION.amazonaws.com/hello_world.wav"
    MediaFileUri: '/',
  },
  LanguageCode: LanguageCode.EN_GB,
  MediaFormat: MediaFormat.MP3,
  OutputBucketName: '/',
};

// https://www.npmjs.com/package/@aws-sdk/client-transcribe

const transcribe = async () => {
  try {
    const data = await transcribeClient.send(
      new StartTranscriptionJobCommand(params)
    );
    return data; // For unit tests.
  } catch (err) {}
};

// snippet-end:[transcribe.JavaScript.jobs.createJobV3]
// For unit tests.
// module.exports = {run, params}

export { transcribe };
