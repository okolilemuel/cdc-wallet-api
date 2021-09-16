import { Router } from 'express'
import wallet from './routes/wallet'

export default (): Router => {
    const app = Router()
    wallet(app)
    return app
}
