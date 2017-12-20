var Li=$(".list-group li");
var box=$(".bookBox>div");

var bookBtn=$(".book p>button");
var upbtn=$(".upbtn");
var bookName=$(".upBook input").eq(0);
var author=$(".upBook input").eq(1);
var time=$(".upBook input").eq(2);
var upPeople=$(".upBook input").eq(3);

var searchbox=$(".searchbox");
var searchtext=$(".searchbox input");
var search=$(".search");

for(var i=0;i<Li.length;i++){
	Li.eq(i).on("click",function(){
		for(var j=0;j<Li.length;j++){
			box.eq(j).addClass("bookNone");
		}
		box.eq($(this).index()).removeClass("bookNone");
	})
}

// 查找
search.on("click",function(){
	if(searchtext.val()!=""){
		$.ajax({
			type:"POST",
			url:"/search",
			data:{
				bookName:searchtext.val()
			}
		}).done(function(data){
			console.log(data);
			if(data!=0){
				$(".tablebox").addClass("bookNone");
				$(".searchbook").removeClass("bookNone");
				$(".book p").addClass("bookNone");
				$(".searchName").html(data[0].bookName);
				$(".searchAuther").html(data[0].author);
				$(".searchTime").html(data[0].time);
				$(".searchPeople").html(data[0].upPeople);
			}else{
				alert("对不起，暂无此书籍");
			}
		})
	}
})

$(".sure").on("click",function(){
	$(".tablebox").removeClass("bookNone");
	$(".searchbook").addClass("bookNone");
	$(".book p").removeClass("bookNone");
	$(".none").addClass("bookNone");
	searchtext.val("");
})

//刷新页面获取数据
function getbook(index){
$.ajax({
	type:"POST",
	url:"/res",
	data:{index:index},
	dataType:"json"
}).done(function(result){
	var data1=result[1];
	var data=result[0];
	console.log(result);
	 if(data.length){
	 	$(".none").addClass("bookNone");
	 	$(".searchbox").removeClass("bookNone");
	 	$(".tablebox").removeClass("bookNone");
	 	var tbody=""
	 	for(var j=0;j<data.length;j++){
	 		tbody+="<tr><td>"+data[j].bookName+"</td><td>"+data[j].author+"</td><td>"+data[j].time+"</td><td>"+data[j].upPeople+"</td><td>删除</td></tr>"
	 	}
	 	$("tbody").html(tbody);
	}
	var html="";
	for(var z=1;z<data1+1;z++){
		html+=`<li class='btn btn-default' index="${z}">${z}</li>`
	}
	$('.pagination').html(html);
	$('.pagination').find('[index='+index+']').attr("class","btn btn-primary")
	var tr=$("tbody tr");
	remove(data,tr);
})
}
getbook(1);
$(document).ready(function(){
	$('.pagination').on('click','li',function(){
		getbook($(this).html())
	})
})


// 上传
upbtn.on("click",function(){
	$(".searchbox").removeClass("bookNone");
	var addtr=$("tbody tr");
 	up();
})


//上传书籍
bookBtn.on("click",function(){
	$(".upBook").removeClass("bookNone");
	$(".book p").addClass("bookNone");
	$(".none").addClass("bookNone");
	$(".searchbox").addClass("bookNone");
	$(".book .tablebox").addClass("bookNone");
	bookName.val("");
	author.val('');
	time.val('');
	upPeople.val('');
})

function up(){
	$.ajax({
		type:"POST",
		url:"/test",
		data:{
			bookName:bookName.val(),
			author:author.val(),
			time:time.val(),
			upPeople:upPeople.val()
		}
	}).done(function(data){
		if(data==1){
			$(".upBook").addClass("bookNone");
			$(".book p").removeClass("bookNone");
			$(".book .tablebox").removeClass("bookNone");
			$(".none").addClass("bookNone");
			getbook(1);
			var addtr=$("tbody tr");
			remove(addtr,addtr);
		}else if(data==0){
			$(".searchbook").addClass("bookNone");
			alert("该书籍已经上传过了");
		}
	})
}

// 删除
function remove(data,addtr){
	for(var a=0;a<data.length;a++){
		addtr.eq(a).children("td:last").off('click');
		addtr.eq(a).children("td:last").on("click",function(){
			$(this).parent().remove();
			var des=$(this).parent().children("td:nth-child(1)").html();
			destory(des)


			getbook(1);


			data.length--;
			console.log(addtr);
			if(data.length==0){
				$(".tablebox").addClass("bookNone");
				$(".none").removeClass("bookNone");
				$(".searchbox").addClass("bookNone");
			}
		})
	}
}
// 从数据库删除
function destory(bookName){
	console.log(bookName);
	$.ajax({
		type:"POST",
		url:"/des",
		data:{
			bookName:bookName,
		}
	}).done(function(data) {
		console.log(data);
		if(data==1){
			alert("删除成功！");
		}
	})
}


//员工信息
var alter=$(".alter");
var save=$(".save");
var staffName=$(".staffName")
var sex=$(".sex");
var age=$(".age");
var phone=$(".phone");
var staffTime=$(".staffTime");

var aftername=$(".after-name");
var aftersex=$(".after-sex");
var afterage=$(".after-age");
var afterphone=$(".after-phone");
var aftertime=$(".after-time");

//获取数据库里的数据
$.ajax({
	url:"/getstaff",
	type:"POST"
}).done(function(data){
	if(typeof data=='string'){
		aftername.html(data);
	}else if(typeof data=='object'){
		aftername.html(data[0].staffName);
		aftersex.html(data[0].sex);
		afterage.html(data[0].age);
		afterphone.html(data[0].phone);
		aftertime.html(data[0].staffTime);
	}
});

// 修改
alter.on("click",function(){
	$(".aftersave").addClass("bookNone");
	$(".insave").removeClass("bookNone");
	staffName.html(aftername.html());
	sex.val(aftersex.html());
	age.val(afterage.html());
	phone.val(afterphone.html());
	staffTime.val(aftertime.html());
})

// 保存
save.on("click",function(){
	$(".aftersave").removeClass("bookNone");
	$(".insave").addClass("bookNone");
	$.ajax({
		url:"/staff",
		type:"POST",
		data:{
			sex:sex.val(),
			age:age.val(),
			phone:phone.val(),
			staffTime:staffTime.val()
		}
	}).done(function(data){

		if(data==1){
			alert("修改成功！");
		}
	})
	aftersex.html(sex.val());
	afterage.html(age.val());
	afterphone.html(phone.val());
	aftertime.html(staffTime.val());
})