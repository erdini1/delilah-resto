const { checkMethodName, checkIdMethod } = require('../repositories/paymentMethods');

async function validate_id_payment(req, res, next) {
	const idParams = parseInt(req.params.idPayment);
	const paymentMethod = await checkIdMethod(idParams);
	if (!Number.isInteger(idParams) || idParams == undefined) {
		res.status(400).json({ mensaje: 'El id del metodo debe ser un numero entero' });
	} else {
		if (!paymentMethod) {
			res.status(400).json({ mensaje: 'El id indicado no pertenece a un metodo de pago' });
		} else {
			next();
		}
	}
}

async function validate_payment_method(req, res, next) {
	let paymentMethod = req.body.payment;
	let paymentFind = await checkMethodName(paymentMethod)
	if (paymentFind) {
		next();
	} else {
		res.status(400).json({ mensaje: `No ingreso un metodo de pago valido`});		
	}
}

async function validate_payment_body(req, res, next) {
	const { method } = req.body;
	if (method != undefined) {
		const findMethod = await checkMethodName(method);
		if (!findMethod) {
			next();
		} else {
			res.status(400).json({ msg: 'El metodo de pago ingresado ya se encuentra registrado' });
		}
	} else {
		res.status(400).json({ msg: 'Tiene que ingresar el metodo a agregar' });
	}
}

module.exports = {
	validate_id_payment,
	validate_payment_method,
	validate_payment_body
};
