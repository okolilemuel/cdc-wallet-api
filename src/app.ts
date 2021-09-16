import express from 'express'
import expressApp from './loaders'

const app = expressApp({ expressApp: express() })

export { app }
