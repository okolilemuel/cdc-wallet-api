import config from './config'
import Logger from './loaders/logger'
import { Server } from 'http'
import { app } from './app'

const server = function (port?: number): Server {
    const serverPort = port || config.port

    return app
        .listen(serverPort, () => {
            Logger.info(`Wallet API server listening on port: ${serverPort}`)
        })
        .on('error', (err) => {
            Logger.error(err)
            process.exit(1)
        })
}
export default server
server()
