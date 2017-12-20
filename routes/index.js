var express = require('express');
var router = express.Router();
var staff=require("../model/staff")
var user=require("../model/user")
var upbook=require("../model/upbook")

router.get('/', function(req, res, next) {
	if(req.session.nameinfo){
	 	user.find({
	 		name:req.session.nameinfo["name"]
	 	}).then(result=>{
	 		res.render('index', { title: '图书管理页面',name:req.cookies["cookname"], list:result});
	 	})
	}else{
	  	res.redirect("/login"); //重新登录
	}
})

router.get("/loginout",function(req,res){
	req.session.destroy(()=>{
		res.redirect("/login");
	})
});

router.post("/res",function(req,res){
	upbook.find().then(result=>{
		var rst=result.length/3;
		upbook.find().skip((req.body.index-1)*3).limit(3).then(result=>{
			res.send([result,rst]);
		})
	})
})

router.post("/test",function(req,res){
	upbook.find({
		bookName:req.body.bookName
	}).then(result=>{
		if(result.length==0){
			upbook.create({
				bookName:req.body.bookName,
				author:req.body.author,
				time:req.body.time,
				upPeople:req.body.upPeople
			})
			res.send("1");
		}else{
			res.send("0");
		}
	})
})

router.post("/des",function(req,res){
	upbook.find({
		bookName:req.body.bookName
	}).then(result=>{
		upbook.findByIdAndRemove(result[0]._id).then(result=>{
			res.send("1");
		})
	})
})

router.post("/search",function(req,res){
	console.log(req.body.bookName);
	upbook.find({
		bookName:req.body.bookName
	}).then(result=>{
		if(result.length==0){
			res.send("0")
		}else{
			res.send(result);
		}
		
	})
})

router.post("/getstaff",function(req,res){
	staff.find({
		email:req.cookies["cookemail"]
	}).then(result=>{
		if(result.length==0){
			res.send(req.cookies.cookname);
		}else{
			res.send(result);
		}
	})
})

router.post("/staff",function(req,res){
	staff.find({
		email:req.cookies["cookemail"]
	}).then(result=>{
		if(result.length==0){
			staff.create({
				email:req.cookies["cookemail"],
				staffName:req.cookies["cookname"],
				sex:req.body.sex,
				age:req.body.age,
				phone:req.body.phone,
				staffTime:req.body.staffTime
			})
		}else{
			staff.findByIdAndUpdate(result[0]._id,{$set:{sex:req.body.sex,age:req.body.age,phone:req.body.phone,staffTime:req.body.staffTime}}).then(result=>{
				res.send("1"); 
			})
		}
		
	})
})

module.exports = router;
