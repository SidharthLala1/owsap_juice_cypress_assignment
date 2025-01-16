import { defineConfig } from "cypress";
import * as dotenv from "dotenv";
import * as fs from "fs";

dotenv.config({ path: ".env" });

export default defineConfig({
  projectId: process.env.CYPRESS_PROJECT_ID,
  reporter: "mochawesome",
  viewportWidth: 1680,
  viewportHeight: 1050,
  video: false,
  screenshotOnRunFailure: true,
  watchForFileChanges: false,
  pageLoadTimeout: 2000000,
  defaultCommandTimeout: 2000000,
  experimentalMemoryManagement: true,

  e2e: {
    testIsolation: false,
    experimentalRunAllSpecs: true,
    setupNodeEvents(on, config) {
      on("task", {
        log(message) {
          console.log(message);
          return null;
        },
        readdir({ path }) {
          return fs.readdirSync(path);
        },
      });

      // we can grab some process environment variables
      // and stick it into config.env before returning the updated config
      config.env = config.env || {};
      config.env.app_env = process.env.CYPRESS_APP_ENV;
      config.baseUrl = process.env.CYPRESS_APP_BASE_URL || "";
      config.defaultCommandTimeout = 9000;

      return config;
    },
  },
});
