import pg from 'pg'

const pool = new pg.Pool({
	host: process.env.PG_HOST,
	user: process.env.PG_USER,
	password: process.env.PG_PASSWORD,
	port: process.env.PG_PORT,
	database: process.env.PG_DATABASE
})

export default function fetching (req, res, next) {
	req.fetch = async (query, ...arr) => {
		const client = await pool.connect()
		try {
			const { rows } = await client.query(query, arr.length ? arr: null)
			return rows
		} catch(error) {
			return error
		} finally {
			client.release()
		}
	}

	return next()
}




