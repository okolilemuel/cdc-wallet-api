import { Application, Request, Response } from 'express'
import bodyParser from 'body-parser'
import rateLimit from 'express-rate-limit'
import compression from 'compression'
import helmet from 'helmet'
import cors from 'cors'
import routes from '../api'
import config from '../config'

const Limiter = rateLimit({
    max: 20,
    windowMs: 1 * 60 * 1000,
    message: 'IP has exceed request threshold',
})

export default ({ app }: { app: Application }): Application => {
    app.get('/status', (req, res) => {
        res.status(200).json({ message: 'server is running' })
    })

    app.enable('trust proxy')
    app.use(compression())
    app.use(helmet())
    app.use(cors())
    app.use(Limiter)
    app.use(bodyParser.json())
    app.use(config.api.prefix, routes())

    app.use((req, res, next) => {
        const err: any = new Error('Not Found')
        err['status'] = 404
        next(err)
    })

    app.use((err: Error, req: Request, res: Response) => {
        if (err.name === 'ValidationError') {
            return res
                .status(400)
                .json({ success: false, message: err.message })
        }
        return res.status(400).json({
            errors: {
                message: err.message,
                status: false,
            },
        })
    })
    return app
}
