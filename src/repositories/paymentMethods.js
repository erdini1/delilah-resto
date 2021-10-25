//const paymentMethods = require('../models/paymentMethods');
const { PaymentMethod } = require('../modelsdb/paymentMethods');

exports.getAllMethods = async () => {
	return await PaymentMethod.findAll();
};

exports.createMethod = async (body) => {
	return await PaymentMethod.create({
		method: body.method
	});
};

exports.checkMethodName = async (method) => {
	return await PaymentMethod.findOne({
		where: {
			method: method
		}
	});
};

exports.checkIdMethod = async (idMethod) => {
	return await PaymentMethod.findOne({
		where: {
			id: idMethod
		}
	});
};

exports.modifyMethod = async (body, idPayment) => {
	return PaymentMethod.update(
		{
			method: body.method
		},
		{
			where: {
				id: idPayment
			}
		}
	);
};

exports.deleteMethod = async (idPayment) => {
	return PaymentMethod.destroy({
		where: {
			id: idPayment
		}
	});
};
