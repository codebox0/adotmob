import app from './app'
import swaggerUi from "swagger-ui-express"

import * as swaggerDocument from "./swagger.json";

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(app.get('port'), (): void => {
    // eslint-disable-next-line
    console.log('server start : ', `🌏 Express server started at http://localhost:${app.get('port')}`);
});

process.on('SIGINT', () => {
    console.log('server stop')
    process.exit(0);
});
