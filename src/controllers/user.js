import UserModel from '../models/user.js'

const GET = async (req, res) => {
	try {
		const { userId } = req.params

		const users = await req.fetch(UserModel.GET, userId)

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

		const newUser = await req.fetch(UserModel.POST, firstName, lastName, email, phoneNumber)

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

		const changeUser = await req.fetch(UserModel.PUT, userId, firstName, lastName, email, phoneNumber, status)

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

		const deleteUser = await req.fetch(UserModel.DELETE, userId)

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