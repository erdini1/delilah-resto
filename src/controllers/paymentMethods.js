const paymentMethods = require('../models/paymentMethods');
const { getAllMethods, createMethod, modifyMethod, deleteMethod } = require('../repositories/paymentMethods');

exports.paymentList = async (req, res) => {
	const methods = await getAllMethods();
	res.status(200).json({ 'Metodos de pago': methods });
};

exports.newPayment = async (req, res) => {
	const body = req.body;
	const newMethod = await createMethod(body);
	res.status(201).json({ mensaje: 'Metodo de pago agregado' });

	//terminar el post, put y delete, revisar los middlewares

	/* let newMethod = req.body
    if(newMethod.method != undefined && newMethod.method != ""){
        let paymentMethodFind = paymentMethods.find(element => element.method === newMethod.method)
        if(!paymentMethodFind){
            if((paymentMethods[paymentMethods.length - 1]) != undefined){
                newMethod.id = paymentMethods[paymentMethods.length - 1].id + 1 
            } else{
                newMethod.id = 1
            }
            paymentMethods.push(newMethod)
            
        } else{
            res.status(400).json({"mensaje":"El metodo de pago ya existe"})
        }
    }else{
        res.status(400).json({"mensaje":"No puede dejar el campo de metodo vacio"})
    }
     */
};

exports.modifyPayment = async (req, res) => {
	const idParams = parseInt(req.params.idPayment);
	const body = req.body;
	const method = await modifyMethod(body, idParams);
	res.status(200).json({ mensaje: `Metodo de pago modificado a ${body.method}` });

	/* let paymentMethodFind = paymentMethods.find(element => element.id == parseInt(req.params.idPayment)) 
    let indexPaymentMethod = paymentMethods.indexOf(paymentMethodFind)
    let newPayment = req.body.method
    paymentMethods[indexPaymentMethod].method = newPayment
     */
};

exports.deletePayment = async (req, res) => {
	const idParams = parseInt(req.params.idPayment);
	const method = await deleteMethod(idParams);
	res.status(200).json({ mensaje: 'Metodo de pago eliminado' });

	/* let paymentMethodFind = paymentMethods.find(element => element.id == parseInt(req.params.idPayment)) 
    let indexPaymentMethod = paymentMethods.indexOf(paymentMethodFind)
    paymentMethods.splice(indexPaymentMethod, 1)
    res.status(200).json({"mensaje":"Metodo de pago eliminado"}) */
};
