import pg from 'pg'

const pool = new pg.Pool({
	host: 'localhost',
	user: 'postgres',
	password: '7777',
	port: '5432',
	database: 'abutech'
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




