var a;
var b;
var regularName=/^[a-zA-Z_]\w{5,14}$/;
var username=$("#InputName");
var Pname=$("#InputName+p");
var regularEmail=/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
var email=$("#inputEmail");
var Pemail=$("#inputEmail+p");
var password=$("#inputPassword");

var regular=function(){
	//验证用户名是否正确
	if(username.val()==""){
		Pname.html("用户名不能为空");
	}else if(!regularName.test(username.val())){
		Pname.html("用户名不正确");
	}else{
		Pname.html("");
		a=true;
	}

	//验证邮箱是否正确
	if(email.val()==""){
		Pemail.html("邮箱不能为空");
	}else  if(!regularEmail.test(email.val())){
		Pemail.html("邮箱不正确");
	}else{
		Pemail.html("");
		b=true;
	}
}


$(".btn").on("click",function(){
	$.ajax({
		type:'POST',
		url:"/register",
		data:{
			name:username.val(),
			email:email.val(),
			password:password.val()
		}	
	}).done(function(data){
		regular();
		if(data==1&&a&&b){
			location.href="/";
		}else if(data==0){
			alert("邮箱已注册!");
		}
	})
})
	