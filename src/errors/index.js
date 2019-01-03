import errors from 'restify-errors'

const normalize = (name) => {
  /* eslint-disable no-param-reassign */
  // name = name.charAt(0).toUpperCase() + name.slice(1)
  if (!name.endsWith('Error')) {
    return `${name}Error`
  }
  return name
}

errors.localization = require('./locale.zh-cn.json')

errors.lang = (error) => {
  if (error.message) return error.message
  const name = error.name.slice(0, -5)
  return errors.localization[name]
}

errors.register = (options) => {
  Object.keys(options).forEach((name) => {
    const config = options[name]
    const errorName = normalize(name)
    switch (typeof config) {
    case 'number':
      errors.makeConstructor(errorName, {
        statusCode: config,
      })
      return
    case 'object':
      errors.makeConstructor(errorName, config)
      return
    default:
    }
    throw new Error(`Invalid error config for ${errorName}`)
  })
}

export default errors
