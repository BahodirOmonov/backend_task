const GET = async (req, res) => {
	try {
		const { userId } = req.params

		const users = await req.fetch(`
			SELECT 
				user_id,
				first_name,
				last_name,
				phone_number,
				email,
				status
			FROM 
				users
			WHERE
				CASE
					WHEN $1 > 0 THEN user_id = $1
					ELSE true
				END
			ORDER BY user_id
		`, userId)

		if(users.message) throw new Error(users.message)

		return res.status(200).json(users)

	} catch(error) {
		res.status(400).json({
			status: 400,
			message: error.message
		})
	}
}

const POST = async (req, res) => {
	try {		
		const { firstName, lastName, email, phoneNumber } = req.body

		if (!firstName) throw new Error("firstName kiritilmagan!")
		if (!lastName) throw new Error("lastName kiritilmagan!")
		if (!email) throw new Error("email kiritilmagan!")
		if (!phoneNumber) throw new Error("phoneNumber kiritilmagan!")

		const newUser = await req.fetch(`
			INSERT INTO 
				users(first_name, last_name, email, phone_number)
			VALUES
				($1, $2, $3, $4)
			RETURNING 
				user_id, first_name, last_name, email, phone_number
		`, firstName, lastName, email, phoneNumber)

		if(newUser.message) throw new Error(newUser.message)

		return res.status(201).json({
			status: 201,
			message: "User muvaffaqiyatli ro'yxatga olindi!",
			data: newUser[0]
		})
	} catch (error) {
		res.status(401).json({
			status: 401,
			message: error.message
		})
	}
}

const PUT = async (req, res) => {
	try {
		const { userId } = req.params

		if(!userId) throw new Error("Parametrdan userId kiritilmagan!")

		const [findUser] = await req.fetch(`SELECT * FROM users WHERE user_id = $1`, userId)
		
		if(!findUser) throw new Error("Bunday id'li user mavjud emas!")

		const { firstName, lastName, email, phoneNumber, status } = req.body

		if(!firstName && !lastName && !email && !phoneNumber && !status)
			throw new Error("Tahrirlash uchun qiymat kiriting!")

		const changeUser = await req.fetch(`
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
					END
			WHERE 
				user_id = $1
			RETURNING user_id, first_name, last_name, email, phone_number, status
		`, userId, firstName, lastName, email, phoneNumber, status)

		if(changeUser.message) throw new Error(changeUser.message)

		return res.status(200).json({
			status: 200,
			message: 'User muvaffaqiyatli o\'zgartirildi!',
			data: changeUser[0]
		})
	} catch(error) {
		res.status(400).json({
			status: 400,
			message: error.message
		})
	}
}

const DELETE = async (req, res) => {
	try {
		const { userId } = req.params

		if(!userId) throw new Error("Parametrdan userId kiritilmadi!")

		const deleteUser = await req.fetch(`
			DELETE FROM 
				users 
			WHERE 
				user_id = $1
			RETURNING user_id, first_name, last_name, email, phone_number, status
		`, userId)

		if(deleteUser.message) throw new Error(deleteUser.message)
		if(!deleteUser.length) throw new Error("Bunday id user topilmadi!")

		return res.status(200).json({
			status: 200,
			message: "User muvaffaqiyatli o'chirildi!",
			data: deleteUser[0]
		})

	} catch(error) {
		res.status(400).json({
			status: 400,
			message: error.message
		})
	}
}


export default {
	GET,
	POST,
	PUT,
	DELETE
}