var express=require("express");
var router=express.Router();
var user=require("../model/user");
var md5=require("md5");

router.get("/",function(req,res){
	res.render("login",{error:false});
});

router.post("/",function(req,res){
	user.find({
		email:req.body.email,
		password:md5(req.body.password)
	}).then(result=>{
		
		if(result.length==0){
			res.render("login",{error:true});
		}else{
			req.session.nameinfo=result[0].name
			res.cookie("cookname",result[0].name);
			res.cookie("cookemail",req.body.email);
			res.redirect("/");  
		}
	})
})

module.exports=router;