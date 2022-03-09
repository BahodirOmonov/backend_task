import UserModel from '../models/user.js'

const GET = async (req, res) => {
	try {
		const { userId } = req.params

		if (userId) {
			const check = checkValue(userId, 'id')
			if(check.message) throw new Error(check.message)

			const user = await req.fetchOne(UserModel.GET_ONE, userId)
			if (!user) throw new Error("Bunday id'li user mavjud emas!")

			return res.status(200).json(user)
		}

		const users = await req.fetch(UserModel.GET)

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

		const checkFirstName = checkValue(firstName, 'firstName')
		if (checkFirstName.message) throw new Error(checkFirstName.message)

		const checkEmail = checkValue(email, 'email')
		if (checkEmail.message) throw new Error(checkEmail.message)

		const checkPhoneNumber = checkValue(phoneNumber, 'phoneNumber')
		if (checkPhoneNumber.message) throw new Error(checkPhoneNumber.message)

		const newUser = await req.fetchOne(UserModel.POST, firstName, lastName, email, phoneNumber)

		if(newUser.message) throw new Error(newUser.message)

		return res.status(201).json({
			status: 201,
			message: "User muvaffaqiyatli ro'yxatga olindi!",
			data: newUser
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

		const checkId = checkValue(userId, 'id')
		if (checkId.message) throw new Error(checkId.message)

		const findUser = await req.fetchOne(UserModel.GET_ONE, userId)
		
		if(!findUser) throw new Error("Bunday id'li user mavjud emas!")

		const { firstName, lastName, email, phoneNumber, status } = req.body

		if(!firstName && !lastName && !email && !phoneNumber && !status)
			throw new Error("Tahrirlash uchun qiymat kiriting!")

		if (firstName) {
			const checkFirstName = checkValue(firstName, 'firstName')
			if (checkFirstName.message) throw new Error(checkFirstName.message)
		}

		if (email) {
			const checkEmail = checkValue(email, 'email')
			if (checkEmail.message) throw new Error(checkEmail.message)
		}

		if (phoneNumber) {
			const checkPhoneNumber = checkValue(phoneNumber, 'phoneNumber')
			if (checkPhoneNumber.message) throw new Error(checkPhoneNumber.message)
		}

		if (status) {
			const checkStatus = checkValue(status, 'status')
			if (checkStatus.message) throw new Error(checkStatus.message) 
		}

		const changeUser = await req.fetchOne(UserModel.PUT, userId, firstName, lastName, email, phoneNumber, status)

		if(changeUser.message) throw new Error(changeUser.message)

		return res.status(200).json({
			status: 200,
			message: 'User muvaffaqiyatli o\'zgartirildi!',
			data: changeUser
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

		const checkId = checkValue(userId, 'id')
		if(checkId.message) throw new Error(checkId.message)

		const deleteUser = await req.fetchOne(UserModel.DELETE, userId)

		if(!deleteUser) throw new Error("Bunday id'li user mavjud emas!")
		if(deleteUser.message) throw new Error(deleteUser.message)

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

function checkValue(value, type) {
	try {
		if (type == 'id') {
			if(!value) throw new Error("Parametrdan userId kiritilmadi!")
			if(+value != value) throw new Error("Parametrdan no'to'g'ri qiymat kiritilgan!")
		}

		else if (type == 'firstName') {
			if (!value) throw new Error("firstName kiritilmagan!")
			if (value.length < 3 || value.length > 50) throw new Error("firstName uzunligi 3 va 50 orasida bo'lishi kerak!") 
		}

		else if (type == 'email') {
			if (!value) throw new Error("email kiritilmagan!")
			if (!(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(value))
				throw new Error("emailni to'g'ri kiriting!")
		}

		else if (type == 'phoneNumber') {
			if (!value) throw new Error("phoneNumber kiritilmagan!")
			if (!( /^(9[012345789]|6[125679]|7[01234569])[0-9]{7}$/).test(value))
				throw new Error("phoneNumberni to'g'ri kiriting!")
		}

		else if (type == 'status') {
			if (!['client', 'lead'].includes(value)) throw new Error("Status faqat lead yoki client bo'lishi mumkin!")
		}

		return {}
	} catch (error) {
		return error
	}
}

export default {
	GET,
	POST,
	PUT,
	DELETE
}