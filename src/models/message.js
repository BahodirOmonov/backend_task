const GET = ` SELECT * FROM messages ORDER BY message_id `

const GET_ONE = ` SELECT * FROM messages WHERE message_id = $1 `

const GET_COUNT = ` SELECT COUNT(message_id) FROM messages WHERE user_id = $1 `


const POST = `
	INSERT INTO 
		messages(user_id, message_body)
	VALUES
		($1, $2)
	RETURNING *
`

const PUT = `
	UPDATE 
		messages 
	SET
		message_body = 
			CASE
				WHEN LENGTH($2) > 0 THEN $2
				ELSE message_body
			END,
		message_updated_at = current_timestamp
	WHERE 
		message_id = $1
	RETURNING *
`

const DELETE = `
	DELETE FROM 
		messages 
	WHERE 
		message_id = $1
	RETURNING *
`


export default {
	GET,
	GET_ONE,
	GET_COUNT,
	POST,
	PUT,
	DELETE
}