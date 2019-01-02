import { DatabaseTable, Columns, Column } from '../../src/models/base'

export class Pilot extends DatabaseTable {
  constructor () {
    super('pilot', 'pilot')
    this.columns = new Columns([
      new Column('id', Column.Type.Id, 'pilotId'),
      new Column('account', Column.Type.String),
      new Column('password', Column.Type.String),
    ])
  }
}

export class Profile extends DatabaseTable {
  constructor () {
    super('pilot', 'pilot')
    this.columns = new Columns([
      new Column('id', Column.Type.Id, 'pilotId'),
      new Column('staffNumber', Column.Type.String),
      new Column('firstName', Column.Type.String),
      new Column('lastName', Column.Type.String),
      new Column('email', Column.Type.String),
      new Column('mobile', Column.Type.String),
      new Column('address', Column.Type.String),
    ])
  }
}

export class License extends DatabaseTable {
  constructor () {
    super('pilot', 'license')
    this.columns = new Columns([
      new Column('id', Column.Type.Id, 'licenseId'),
      new Column('pilotId', Column.Type.Id),
      new Column('type', Column.Type.Number),
    ])
  }
}

export class LicenseAircraft extends DatabaseTable {
  constructor () {
    super('pilot', 'license_aircraft')
    this.columns = new Columns([
      new Column('id', Column.Type.Id, 'laId'),
      new Column('pilotId', Column.Type.Id),
      new Column('aircraftTypeId', Column.Type.Id),
      new Column('startDate', Column.Type.Number),
      new Column('endDate', Column.Type.Number),
    ])
  }
}

export class Visa extends DatabaseTable {
  constructor () {
    super('pilot', 'license_aircraft')
    this.columns = new Columns([
      new Column('id', Column.Type.Id, 'visaId'),
      new Column('pilotId', Column.Type.Id),
      new Column('countryId', Column.Type.Id),
      new Column('dateOfIssue', Column.Type.Number),
      new Column('enterBefore', Column.Type.Number),
      new Column('durationOfEntry', Column.Type.Number),
    ])
  }
}

export class Message extends DatabaseTable {
  constructor () {
    super('pilot', 'license_aircraft')
    this.columns = new Columns([
      new Column('id', Column.Type.Id, 'messageId'),
      new Column('type', Column.Type.Number),
      new Column('referenceId', Column.Type.Id),
      new Column('sender', Column.Type.Id),
      new Column('messageType', Column.Type.Number),
      new Column('content', Column.Type.String),
    ])
  }
}

export class Order extends DatabaseTable {
  constructor () {
    super('pilot', 'license_aircraft')
    this.columns = new Columns([
      new Column('id', Column.Type.Id, 'orderId'),
      new Column('operatorId', Column.Type.Id),
      new Column('pilotId', Column.Type.Id),
      new Column('title', Column.Type.String),
      new Column('remark', Column.Type.String),
    ])
  }
}
