var express=require('express');
var router=express.Router();
var user=require('../model/user');
var md5=require("md5");
 
router.get("/",function(req,res){
	res.render('register',{name:false,email:false});
});

router.post("/",function(req,res){//用户名密码通过post传入后台
	console.log(req.body);
	user.find(
	{//判断邮箱是否存在
		email:req.body.email
	}
	).then(result=>{
		console.log(1);
		console.log(req.body);
		if(result.length==0){//不存在，插入数据
			console.log(req.body.email)
			user.create({//创建并传入数据，格式要与之前相同
				name:req.body.name,
				email:req.body.email,
				password:md5(req.body.password)
			})
		 	res.send("1");
		}else{
			res.send("0");
		}
	})

})
module.exports=router; 