import Joi from 'joi';
import _ from 'lodash';

const validate = (schema) => (req, res, next) => {
	const validSchema = _.pick(schema, ['cookies', 'params', 'query', 'body']);
	const object = _.pick(req, Object.keys(validSchema));
	const { error, value } = Joi.compile(validSchema)
		.prefs({ errors: { label: 'path', wrap: { label: false } }, abortEarly: false })
		.validate(object);
	if (error) {
		return res.status(400).json({ conflictError: error.details[0].message });
	}
	Object.assign(req, value);
	return next();
};

export default validate;