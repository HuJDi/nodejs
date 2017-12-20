var mongoose=require("mongoose");
var Schema=mongoose.Schema;

var obj={
	bookName:String,
	author:String,
	time:String,
	upPeople:String
}

var model=mongoose.model("upBook",new Schema(obj));

module.exports=model;