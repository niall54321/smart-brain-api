const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: '80b344668b1946eeb49959ca49c437aa'
});

const handleApiCall = (req, res) => {
	app.models
		.predict( Clarifai.FACE_DETECT_MODEL, req.body.input)
		.then(data => {
			res.json(data);
		})
		.catch(err => res.status(400).json('Unable to work with API'))
}


const handleImage = (req, res, db) => {
	const {id} = req.body;
	db('users').where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0]);
	})
	.catch(err => res.status(400).json('Unable to update entries'))
}

module.exports = {
	handleImage: handleImage,
	handleApiCall : handleApiCall
}