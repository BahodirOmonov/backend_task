const GET = `
	SELECT 
		*
	FROM 
		messages
	WHERE
		CASE
			WHEN $1 > 0 THEN message_id = $1
			ELSE true
		END
	ORDER BY 
		message_id
`

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
	POST,
	PUT,
	DELETE
}