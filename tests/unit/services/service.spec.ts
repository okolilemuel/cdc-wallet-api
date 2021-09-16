import { expect } from 'chai'
import BitcoinWalletService from '../../../src/services/wallet'
import { Container } from 'typedi'

describe('Generate HD segwit wallet with path', () => {
    const data = {
        seed: ' excellent sun position metal toothbrush board fish babies destruction one gabby flaky',
        path: "m/44'/0'/0'/0/0",
    }
    it('should generate a segwith wallet address', async () => {
        const bitcoinWalletServiceInstance = Container.get(BitcoinWalletService)
        const generateAddress =
            await bitcoinWalletServiceInstance.GenerateSegwitWithHD(
                data.seed,
                data.path,
            )
        expect(generateAddress).to.be.equal(
            'bc1qvt56s5v04s3t6dz9utq479zdhsuuf7yrp0wukh',
        )
    })
})

describe('Multisignature Segwit wallet', () => {
    const data = {
        m: 2,
        n: 3,
        pubkey: [
            '026477115981fe981a6918a6297d9803c4dc04f328f22041bedff886bbc2962e01',
            '02c96db2302d19b43d4c69368babace7854cc84eb9e061cde51cfa77ca4a22b8b9',
            '03c6103b3b83e4a24a0e33a4df246ef11772f9992663db0c35759a5e2ebf68d8e9',
        ],
    }
    it('should generate a multsignature P2SH address', async () => {
        const bitcoinWalletServiceInstance = Container.get(BitcoinWalletService)
        const address = await bitcoinWalletServiceInstance.GenerateMultisigP2SH(
            data.m,
            data.pubkey,
        )
        expect(address).to.be.equal('36NUkt6FWUi3LAWBqWRdDmdTWbt91Yvfu7')
    })
})
