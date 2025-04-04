import { ApplicationConfig, mergeApplicationConfig } from "@angular/core";
import { provideServerRendering } from "@angular/platform-server";
import { appConfig } from "./app.config";
import { ConfigHelper } from "./components/helpers/config_helper";

// Disable logs in production
if (ConfigHelper.NODE_ENV === "production") {
  console.log = () => undefined;
  console.warn = () => undefined;
}

const serverConfig: ApplicationConfig = {
  providers: [provideServerRendering()],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
