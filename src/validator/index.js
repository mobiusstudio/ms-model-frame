import Joi from 'joi'
import errors from '../errors'

const ERRORS = {
  ValidationFailed: {
    statusCode: 400,
  },
}
errors.register(ERRORS)

export const validate = (data, schema, ext) => {
  if (typeof(schema) === 'object') {
    /* eslint-disable no-param-reassign */
    schema = Joi.object(schema)
  }
  if (ext) {
    if (Array.isArray(ext)) {
      const required = {}
      for (const r of ext) {
        required[r] = Joi.required()
      }
      ext = Joi.object(required)
    } else if (typeof(ext) === 'object') {
      ext = Joi.object(ext)
    }
    schema = schema.concat(ext)
  }
  const result = Joi.validate(data, schema)
  if (result.error) {
    throw new errors.ValidationFailedError(result.error.details[0])
  }
  return result.value
}

export const getSchema = (schema, ...keys) => {
  const schemaKeys = []
  for (const key of keys) {
    if (Array.isArray(key)) {
      schemaKeys.push(...key)
    } else {
      schemaKeys.push(key)
    }
  }
  const sub = {}
  for (const key of schemaKeys) {
    sub[key] = schema[key]
  }
  return sub
}

