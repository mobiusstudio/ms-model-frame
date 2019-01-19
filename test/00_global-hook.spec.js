import '@babel/polyfill'
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import log4js from 'log4js'
import models, { configure } from '../dist/models'
import options from './config/config.json'

const log = log4js.getLogger()
chai.use(chaiAsPromised)
chai.should()


global.models = models
global.env = {}
global.log = log

env.errCount_actual = 0
env.errCount_expected = 0


before(async () => {
  const dbManager = await configure(options)
  await dbManager.rebuild()
  log.info(`Current db version: ${dbManager.version}`)
})

after((done) => {
  done()
})
