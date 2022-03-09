const GET_ONE = ` SELECT * FROM users WHERE user_id = $1 `

const GET = ` SELECT * FROM users ORDER BY user_id `

const POST = `
	INSERT INTO 
		users(first_name, last_name, email, phone_number)
	VALUES
		($1, $2, $3, $4)
	RETURNING *
`

const PUT = `
	UPDATE 
		users 
	SET
		first_name = 
			CASE
				WHEN LENGTH($2) > 0 THEN $2
				ELSE first_name
			END,
		last_name =
			CASE
				WHEN LENGTH($3) > 0 THEN $3
				ELSE last_name
			END,
		email =
			CASE
				WHEN LENGTH($4) > 0 THEN $4
				ELSE email
			END,
		phone_number =
			CASE
				WHEN LENGTH($5) > 0 THEN $5
				ELSE phone_number
			END,
		status =
			CASE
				WHEN LENGTH($6) > 0 THEN $6
				ELSE status
			END,
		user_updated_at = current_timestamp
	WHERE 
		user_id = $1
	RETURNING *
`

const PUT_STATUS = ` UPDATE users SET status = $2 WHERE user_id = $1 `

const DELETE = `
	DELETE FROM 
		users 
	WHERE 
		user_id = $1
	RETURNING *
`


export default {
	GET_ONE,
	GET,
	POST,
	PUT,
	PUT_STATUS,
	DELETE
}