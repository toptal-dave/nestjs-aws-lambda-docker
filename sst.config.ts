import { SSTConfig } from "sst";
import { API } from "./stacks/Api";

export default {
  config(input) {
    return {
      name: "iluvcoffee",
      region: "us-east-1",
      profile:
        input.stage === "production"
          ? "artlyticalmedia-production"
          : "artlyticalmedia-dev",
    };
  },
  stacks(app) {
    app.stack(API);
  },
} satisfies SSTConfig;
