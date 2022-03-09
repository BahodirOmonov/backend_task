import MessageModel from '../models/message.js'

const GET = async (req, res) => {
	try {
		const { messageId } = req.params

		const messages = await req.fetch(MessageModel.GET, messageId)

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

		if (!userId) throw new Error("userId kiritilmagan!")
		if (!messageBody) throw new Error("messageBody kiritilmagan!")

		const newMessage = await req.fetch(MessageModel.POST, userId, messageBody)

		if(newMessage.message) throw new Error(newMessage.message)

		const [findUser] = await req.fetch("SELECT * FROM users WHERE user_id = $1", userId)

		if (findUser.status == 'lead') {
			await req.fetch(`
				UPDATE users SET status = 'client' WHERE user_id = $1
 			`, userId)
		}

		return res.status(201).json({
			status: 201,
			message: "Message muvaffaqiyatli yuborildi!",
			data: newMessage[0]
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

		if(!messageId) throw new Error("Parametrdan messageId kiritilmagan!")

		const [findMessage] = await req.fetch(`SELECT * FROM messages WHERE message_id = $1`, messageId)
		
		if(!findMessage) throw new Error("Bunday id'li message mavjud emas!")

		const { messageBody } = req.body

		if(!messageBody)
			throw new Error("Tahrirlash uchun qiymat kiriting!")

		const changeMessage = await req.fetch(MessageModel.PUT, messageId, messageBody)

		if(changeMessage.message) throw new Error(changeMessage.message)

		return res.status(200).json({
			status: 200,
			message: 'Message muvaffaqiyatli o\'zgartirildi!',
			data: changeMessage[0]
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

		if(!messageId) throw new Error("Parametrdan messageId kiritilmadi!")

		const deleteMessage = await req.fetch(MessageModel.DELETE, messageId)

		if(deleteMessage.message) throw new Error(deleteMessage.message)
		if(!deleteMessage.length) throw new Error("Bunday id message topilmadi!")

		return res.status(200).json({
			status: 200,
			message: "Message muvaffaqiyatli o'chirildi!",
			data: deleteMessage[0]
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