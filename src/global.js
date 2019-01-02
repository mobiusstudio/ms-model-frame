import pg from 'pg'
import sqorn from '@sqorn/pg'

const pool = new pg.Pool()

export const sq = sqorn({ pg, pool })