import pg from 'pg'

const pool = new pg.Pool({
	host: process.env.PG_HOST,
	user: process.env.PG_USER,
	password: process.env.PG_PASSWORD,
	port: process.env.PG_PORT,
	database: process.env.PG_DATABASE
})

export default async function fetching (req, res, next) {
	const client = await pool.connect()
	try {
		req.fetch = async (query, ...arr) => {
			const { rows } = await client.query(query, arr.length ? arr: null)
			return rows
		}

		req.fetchOne = async (query, ...arr) => {
			const { rows: [row] } = await client.query(query, arr.length ? arr: null)
			return row
		}
	} 	
	catch(error) {
		return error
	} 
	finally {
		client.release()
	}

	return next()
}




