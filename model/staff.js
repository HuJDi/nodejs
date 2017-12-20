var mongoose=require("mongoose");
var Schema=mongoose.Schema;

var obj={
	email:String,
	staffName:String,
	sex:String,
	age:String,
	phone:String,
	staffTime:String
	
}

var model=mongoose.model("staff",new Schema(obj));

module.exports=model;