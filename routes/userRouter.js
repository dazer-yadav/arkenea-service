const express = require('express');
const bodyParser = require('body-parser');

const userRouter = express.Router();
userRouter.use(bodyParser.json());

const User = require('../models/user');

userRouter.route('/')
.all((req,res,next)=>{
	res.statusCode = 200;
	next();
})
.get((req,res,next)=>{
	User.find({})
    .then((user)=>{
        res.send({status: 200, body: user, errors: null});
    },(err)=>{
        res.send({status: 400, body: null, errors: err});
    }).catch((err)=>{
        res.send({status: 400, body: null, errors: err});
    });
})
.post((req,res,next)=>{
	// if(!req.file){
	// 	return res.status(500).send({status: 400,body: null, errors: 'Upload fail'});
	// }else{
	// 	req.body.image = 
	// }
	User.create(req.body)
	.then((user)=>{
		res.send({status: 200, body: user, errors: null});
	},(err)=>{
        res.statusCode = 400;
		res.send({status: 400, body: null, errors: err});
	}).catch((err)=>{
		res.send({status: 400, body: null, errors: err});
	})
})
.put((req,res,next)=>{
    res.statusCode = 403;
    res.send({status: 403, body: null, errors: 'PUT operation not allowed'});
})
.delete((req,res,next)=>{
	User.remove()
	.then((user)=>{
        console.log('exe');
		res.send({status: 200, body: user, errors: null});
	},(err)=>{
		res.send({status: 400, body: null, errors: err});
	}).catch((err)=>{
		res.send({status: 400, body: null, errors: err});
	})
})

userRouter.route('/:id')
.all((req,res,next)=>{
	res.statusCode = 200;
	next();
})
.get((req,res,next)=>{
	User.findById(req.params.id)
    .then((user)=>{
        if(!user){
            res.statusCode = 404;
            res.send({status: 404, body: null, errors: 'User not found'});
        }else{
            res.send({status: 200, body: user, errors: null});
        }
    },(err)=>{
        res.send({status: 400, body: null, errors: err});
    }).catch((err)=>{
        res.send({status: 400, body: null, errors: err});
    });
})
.post((req,res,next)=>{
	res.statusCode = 403;
    res.send({status: 403, body: null, errors: 'POST operation not allowed'});
})
.put((req,res,next)=>{
	User.findByIdAndUpdate(req.params.id,{$set:req.body},{new: true})
	.then((user)=>{
        if(!user){
            //res.statusCode = 404
            res.send({status: 404, body: null, errors: 'User not found'});
        }else{
            res.send({status: 200, body: user, errors: null});
        }
		
	},(err)=>{
		res.send({status: 400, body: null, errors: err});
	}).catch((err)=>{
		res.send({status: 400, body: null, errors: err});
	})
})
.delete((req,res,next)=>{
	User.findByIdAndDelete(req.params.id)
	.then((user)=>{
        if(!user){
            res.send({status: 404, body: null, errors: 'User not found'});
        }else{
            res.send({status: 200, body: user, errors: null});
        }
	},(err)=>{
		res.send({status: 400, body: null, errors: err});
	}).catch((err)=>{
		res.send({status: 400, body: null, errors: err});
	})
})


module.exports = userRouter;
