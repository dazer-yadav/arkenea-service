const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/user-db';

mongoose.connect(url,{
	useNewUrlParser: true,
	useFindAndModify: false,
	useUnifiedTopology: true,
	useCreateIndex: true
},(err)=>{
	if(err){
		throw new Error('Unable to connect');
	}
	console.log('connected to database');
});