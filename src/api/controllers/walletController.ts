import { Request, Response, NextFunction } from 'express'
import { Container } from 'typedi'
import BitcoinWalletService from '../../services/wallet'
import { Logger } from 'winston'
import { z, ZodError } from 'zod'
import handleZodError from '../../helpers/handleZodError'
import { validateBIP32Path } from '../../helpers/bip32PathValidator'

export const generateHDWallet = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<Response | void> => {
    const schema = z
        .object({
            seed: z.string(),
            path: z.string().refine(validateBIP32Path),
        })
        .strict()

    const logger: Logger = Container.get('logger')
    logger.debug('creating segwit address endpoint')

    let request
    try {
        request = schema.parse(req.body)
    } catch (e) {
        return res.status(400).json({
            success: false,
            message: handleZodError(e as ZodError<any>).message,
        })
    }

    try {
        const bitcoinWalletServiceInstance = Container.get(BitcoinWalletService)
        const generateAddress =
            await bitcoinWalletServiceInstance.GenerateSegwitWithHD(
                request.seed,
                request.path,
            )
        return res.status(200).json({
            success: true,
            data: generateAddress,
        })
    } catch (e) {
        logger.error('error: %o', e)
        return next(e)
    }
}

export const generateMultisigAddress = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<Response | void> => {
    const schema = z
        .object({
            m: z.number(),
            n: z.number(),
            pubkey: z.array(z.string()),
        })
        .strict()

    const logger: Logger = Container.get('logger')
    logger.debug('creating mulitsignature address endpoint')

    let request
    try {
        request = schema.parse(req.body)
    } catch (e) {
        return res.status(400).json({
            success: false,
            message: handleZodError(e as ZodError<any>).message,
        })
    }

    try {
        if (request.pubkey.length !== request.n) {
            return res.status(401).json({
                status: false,
                message: `expected ${request.n} pubkeys got ${request.pubkey.length}`,
            })
        }
        const bitcoinWalletServiceInstance = Container.get(BitcoinWalletService)
        const generateAddress =
            await bitcoinWalletServiceInstance.GenerateMultisigP2SH(
                request.m,
                request.pubkey,
            )
        return res.status(200).json({
            success: true,
            data: generateAddress,
        })
    } catch (e) {
        logger.error('error: %o', e)
        return next(e)
    }
}
