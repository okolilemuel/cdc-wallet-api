import { expect } from 'chai'
import { Server } from 'http'
import request from 'supertest'
import server from '../../src/server'

describe('Generate HD segwit wallet using seed and path', function () {
    let testServer: Server
    before(function () {
        testServer = server(3009)
    })
    after(function (done) {
        testServer.close(done)
    })
    it('should return status 200 with correct payload', function (done) {
        request(testServer)
            .post('/api/generate/segwit')
            .send({
                seed: 'excellent sun position metal toothbrush board fish babies destruction one gabby flaky',
                path: "m/44'/0'/0'/0/0",
            })
            .end(function (e, res) {
                expect(res.statusCode).to.be.equal(200)
                done()
            })
    })

    it('should return status 400 with wrong or incomplete payload', function (done) {
        request(testServer)
            .post('/api/generate/segwit')
            .send({
                seed: ' excellent sun position metal toothbrush board fish babies destruction one gabby flaky',
            })
            .end(function (e, res) {
                expect(res.status).to.equal(400)
                done()
            })
    })

    it('should return status 400 with wrong payload format', function (done) {
        request(testServer)
            .post('/api/generate/segwit')
            .send({
                seed: ' excellent sun position metal toothbrush board fish babies destruction one gabby flaky',
                path: 'hmm',
            })
            .end(function (e, res) {
                expect(res.status).to.equal(400)
                done()
            })
    })
})

describe('Multisignature Segwit wallet using API', function () {
    let testServer: Server
    before(function () {
        testServer = server(3009)
    })
    after(function (done) {
        testServer.close(done)
    })
    it('should return status 200 with correct payload', function (done) {
        request(testServer)
            .post('/api/generate/multisig')
            .set('Accept', '*/*')
            .set('Content-Type', 'application/json')
            .send({
                m: 2,
                n: 3,
                pubkey: [
                    '026477115981fe981a6918a6297d9803c4dc04f328f22041bedff886bbc2962e01',
                    '02c96db2302d19b43d4c69368babace7854cc84eb9e061cde51cfa77ca4a22b8b9',
                    '03c6103b3b83e4a24a0e33a4df246ef11772f9992663db0c35759a5e2ebf68d8e9',
                ],
            })
            .end(function (e, res) {
                expect(res.status).to.equal(200)
                done()
            })
    })

    it('should return status 400 with wrong payload', function (done) {
        request(testServer)
            .post('/api/generate/multisig')
            .set('Accept', '*/*')
            .set('Content-Type', 'application/json')
            .send({
                hehe: 'me',
                n: 3,
                pubkey: [
                    '026477115981fe981a6918a6297d9803c4dc04f328f22041bedff886bbc2962e01',
                    '02c96db2302d19b43d4c69368babace7854cc84eb9e061cde51cfa77ca4a22b8b9',
                    '03c6103b3b83e4a24a0e33a4df246ef11772f9992663db0c35759a5e2ebf68d8e9',
                ],
            })
            .end(function (e, res) {
                expect(res.status).to.equal(400)
                done()
            })
    })

    it('should return status 401 when n does not equal pubkeys', function (done) {
        request(testServer)
            .post('/api/generate/multisig')
            .set('Accept', '*/*')
            .set('Content-Type', 'application/json')
            .send({
                m: 2,
                n: 4,
                pubkey: [
                    '026477115981fe981a6918a6297d9803c4dc04f328f22041bedff886bbc2962e01',
                    '02c96db2302d19b43d4c69368babace7854cc84eb9e061cde51cfa77ca4a22b8b9',
                    '03c6103b3b83e4a24a0e33a4df246ef11772f9992663db0c35759a5e2ebf68d8e9',
                ],
            })
            .end(function (e, res) {
                expect(res.status).to.equal(401)
                done()
            })
    })
})
