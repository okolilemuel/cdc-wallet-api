import { Router } from 'express'
import * as walletController from '../controllers/walletController'

const walletRouter = Router()

export default (app: Router): Router => {
    app.use('/generate', walletRouter)

    // Generate a Hierarchical Deterministic (HD) Segregated Witness (SegWit) bitcoin address
    walletRouter.route('/segwit').post(walletController.generateHDWallet)

    // Generate an n-out-of-m Multisignature (multi-sig) Pay-To-Script-Hash (P2SH) bitcoin address
    walletRouter
        .route('/multisig')
        .post(walletController.generateMultisigAddress)
    return app
}
