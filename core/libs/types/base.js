class Type {
  constructor({
    str,
    def,
    req,
    sep = ' ',
  }) {
    this.str = str
    this.def = def
    this.req = req
    this.sep = sep
  }

  default = (value) => {
    this.str = [this.str, this.def.replace('#defaultValue#', value)].join(this.sep)
  }

  required = () => {
    this.str = [this.str, this.req].join(this.sep)
  }

  tostring = ({ req, def }) => {
    if (req === true || req === 'true' || req === 1) this.required()
    if (def && typeof def === 'string') this.default(def)
    return this.str
  }
}

export class Sql extends Type {
  constructor(str) {
    super({
      str,
      def: 'DEFAULT #defaultValue#',
      req: 'NOT NULL',
      sep: ' ',
    })
  }

  static autoId = schemaName => new Sql('bigint').tostring({ req: true, def: `"${schemaName}".${schemaName}_id()` })

  static seqId = () => new Sql('serial').tostring({ req: false, def: null })
}

export class Joi extends Type {
  constructor(str) {
    super({
      str,
      def: 'default(#defaultValue#)',
      req: 'required()',
      sep: '.',
    })
  }
}

export class Swg extends Type {
  constructor(str) {
    super({
      str,
      def: 'default: #defaultValue#',
      req: 'required: true',
      sep: ',\n',
    })
  }
}

export class Rul {
  constructor(rul) {
    this.rul = rul
  }

  torule = ({ req, def }) => {
    if (req === true || req === 'true' || req === 1) this.rul = this.rul.required()
    if (def !== undefined) this.rul = this.rul.default(def)
    return this.rul
  }
}
