export default function (value, type) {
	try {
		if (type == 'id') {
			if(!value) throw new Error("Id kiritilmadi!")
			if(+value != value) throw new Error("Id'ga no'to'g'ri qiymat berildi!")
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

		else if (type == 'message') {
			if (!value) throw new Error("messageBody kiritilmagan!")
			if (value.length < 1 || value.length > 150) throw new Error("messageBody uzunligi 1 va 150 orasida bo'lishi kerak!") 
		}

		return {}
	} catch (error) {
		return error
	}
}