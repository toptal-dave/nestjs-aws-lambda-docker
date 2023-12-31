import { SSTConfig } from "sst";
import { API } from "./stacks/Api";

export default {
  config(input) {
    return {
      name: "iluvcoffee",
      region: "us-east-1",
      profile:
        // Replace the below with your actual profiles
        input.stage === "production" ? "PRODUCTION_PROFILE" : "DEV_PROFILE",
    };
  },
  stacks(app) {
    app.stack(API);
  },
} satisfies SSTConfig;
