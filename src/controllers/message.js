import MessageModel from '../models/message.js'
import UserModel from '../models/user.js'
import checkValue from '../util/validate.js'

const GET = async (req, res) => {
	try {
		const { messageId } = req.params

		if (messageId) {
			const checkId = checkValue(messageId, 'id')
			if (checkId.message) throw new Error(checkId.message)

			const findMessage = await req.fetchOne(MessageModel.GET_ONE, messageId)
			if (!findMessage) throw new Error("Bunday id'li message mavjud emas!")

			return res.status(200).json(findMessage)
		}

		const messages = await req.fetch(MessageModel.GET)
		if(messages.message) throw new Error(messages.message)

		return res.status(200).json(messages)

	} catch(error) {
		res.status(400).json({
			status: 400,
			message: error.message
		})
	}
}

const POST = async (req, res) => {
	try {		
		const { userId, messageBody } = req.body

		const checkId = checkValue(userId, 'id')
		if (checkId.message) throw new Error(checkId.message)
		
		const checkMessage = checkValue(messageBody, 'message')
		if (checkMessage.message) throw new Error(checkMessage.message)

		const findUser = await req.fetchOne(UserModel.GET_ONE, userId)

		if(!findUser) throw new Error("Bunday id'li user mavjud emas!")

		const newMessage = await req.fetchOne(MessageModel.POST, userId, messageBody)

		if(newMessage.message) throw new Error(newMessage.message)

		if (findUser.status == 'lead') {
			await req.fetchOne(UserModel.PUT_STATUS, userId, 'client')
		}

		return res.status(201).json({
			status: 201,
			message: "Message muvaffaqiyatli yuborildi!",
			data: newMessage
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
		const { messageId } = req.params

		const checkId = checkValue(messageId, 'id')
		if (checkId.message) throw new Error(checkId.message)

		const findMessage = await req.fetchOne(MessageModel.GET_ONE, messageId)	
		if(!findMessage) throw new Error("Bunday id'li message mavjud emas!")

		const { messageBody } = req.body

		const checkMessage = checkValue(messageBody, 'message')
		if (checkMessage.message) throw new Error(checkMessage.message)

		const changeMessage = await req.fetch(MessageModel.PUT, messageId, messageBody)

		if(changeMessage.message) throw new Error(changeMessage.message)

		return res.status(200).json({
			status: 200,
			message: 'Message muvaffaqiyatli o\'zgartirildi!',
			data: changeMessage
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
		const { messageId } = req.params

		const checkId = checkValue(messageId, 'id')
		if (checkId.message) throw new Error(checkId.message)

		const deleteMessage = await req.fetchOne(MessageModel.DELETE, messageId)

		if(!deleteMessage) throw new Error("Bunday id'li message topilmadi!")
		if(deleteMessage.message) throw new Error(deleteMessage.message)

		const findUserCount = await req.fetchOne(MessageModel.GET_COUNT, deleteMessage.user_id)

		if (findUserCount.count == 0) {
			await req.fetchOne(UserModel.PUT_STATUS, deleteMessage.user_id, 'lead')
		}

		return res.status(200).json({
			status: 200,
			message: "Message muvaffaqiyatli o'chirildi!",
			data: deleteMessage
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