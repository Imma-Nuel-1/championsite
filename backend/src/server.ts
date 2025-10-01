import http from "http";
import App from "./app";
import env from "./config/env";
import { logger } from "./utils/logger";

const appInstance = new App();
const server = http.createServer(appInstance.app);

server.listen(Number(env.PORT), () => {
  logger.info(`🔌 Server running on port ${env.PORT}`);
});
