const checkComplaintValidation = (req, res, next) => {

	let isvalid = true
	const messages = [];
	if (isEmpty(req.body)) {
		messages.push("form is empty")
		isvalid = false

	}
	else {


		if (req.body.description === "" || req.body.department === "") {
			isvalid = false;
			messages.push("description or department is null")
		}
		if (req.body.email) {
			isvalid = req.body.email.split('@')[1].split('.')[0] === 'tothenew';
			messages.push("email is not valid")
		}
	}
	if (isvalid) {
		next()
	}
	else {
		res.status(400)
		res.send(messages)
	}
}



const checkActivityValidation = (req, res, next) => {
	let isvalid = true;
	const messages = [];

	if (isEmpty(req.body)) {
		messages.push("object is empty")
		isvalid = false
	}
	else {
		if (req.body.activity === "") {
			isvalid = false;
			messages.push("activity iis empty")
		}
	}

	if (isvalid) {
		next()
	}
	else {
		res.status(400)
		res.send(messages)
	}
}

checkValuableValidation = (req, res, next) => {
	let isvalid = true;
	let messages = [];
	const category = ["Lost", "Found"]
	const options = [
		"Electronics",
		"Wallets",
		"File/Doc",
		"Kid",
		"Accessory",
		"others",
	];
	if (isEmpty(req.body)) {
		isvalid = false
		messages.push("Body is Empty")

	}
	else {
		if (!category.includes(req.body.category) || !options.includes(req.body.type)) {
			isvalid = false;
			messages("Category or issue title is not valid")
		}
		if (req.body.description === "") {
			isvalid = false;
			messages("description is Empty")
		}
		if (req.body.email) {
			isvalid = req.body.email.split('@')[1].split('.')[0] === 'tothenew';
			messages.push("email is not valid")
		}

	}

	if (isvalid) {
		next()
	}
	else {
		res.status(400)
		res.send(messages)
	}


}

function isEmpty(obj) {
	const arr = Object.keys(obj);

	if (arr.length > 0)
		return false

	return true
}


module.exports = {
	checkComplaintValidation,
	checkActivityValidation,
	checkValuableValidation
}