import expressLoader from './express'
import { Container } from 'typedi'
import { Application } from 'express'
import Logger from './logger'

export default ({ expressApp }: { expressApp: Application }): Application => {
    Container.set('logger', Logger)
    expressApp = expressLoader({ app: expressApp })
    Logger.info('Express loaded')
    return expressApp
}
