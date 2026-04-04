import { Pool } from "pg"

const pool = new Pool( {
	user: process.env.PG_USER,
	host: process.env.PG_HOST,
	database: process.env.PG_DBNAME,
	password: process.env.PG_PASSWORD,
	port: process.env.PG_PORT,
	max: 20,
	idleTimeoutMillis: 30_000,
	connectionTimeoutMillis: 2_000,
} )

export async function query( sql, ...params ) {

	const client = await pool.connect()

	try {

		const result = await client.query( sql, params )

		return result.rows
	}
	finally {

		client.release()
	}
}
