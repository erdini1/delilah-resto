const { getAllMethods, createMethod, modifyMethod, deleteMethod } = require('../repositories/paymentMethods');

exports.paymentList = async (req, res) => {
	const methods = await getAllMethods();
	res.status(200).json({ 'Metodos de pago': methods });
};

exports.newPayment = async (req, res) => {
	const body = req.body;
	const newMethod = await createMethod(body);
	res.status(201).json({ mensaje: 'Metodo de pago agregado' });
};

exports.modifyPayment = async (req, res) => {
	const idParams = parseInt(req.params.idPayment);
	const body = req.body;
	const method = await modifyMethod(body, idParams);
	res.status(200).json({ mensaje: `Metodo de pago modificado a ${body.method}` });
};

exports.deletePayment = async (req, res) => {
	const idParams = parseInt(req.params.idPayment);
	const method = await deleteMethod(idParams);
	res.status(200).json({ mensaje: 'Metodo de pago eliminado' });
};
