# Setup

1. Follow the steps on SST's website [here](https://docs.sst.dev/setting-up-aws) to set up your AWS account.
2. Update the profile names in `sst.config.ts` to match what you created in step 1.
3. Run `npm run deploy -- --stage dev` to deploy to `dev` (or `production` to deploy to production).
4. The output of that command will give you a Lambda URL for which to test this with.  The expected response is a 200 status with "Hello Nest!" as the response.
