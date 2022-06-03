var flag1=true;  //邮箱判断标识符
var flag2=true;  //用户名判断标识符
var flag3=true;  //密码判断标识符
var flag4=true;
var flag5=true;



function Register1()
{
    let username=document.getElementById("Username").value;
    var usernamePattern = /^\S{1,10}$/;  //用户名正则表达式
    if(!usernamePattern.test(username) ){
        alert("用户名格式不对，字符数必须在1-10之间！")
        flag1=false;
    }
    else{
        flag1=true;
    }
    console.log(username);

    let password1=document.getElementById("Password").value;
    var passwordPattern =  /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$/;  //密码正则表达式
    if(!passwordPattern.test(password1)){
        alert("密码格式不对，长度至少为6位，且应为数字和字母的组合");
        flag2=false;
    }
    else{
        flag2=true;
    }

    let password2=document.getElementById("ConfirmPassword").value;
    let name1=document.getElementById("Name").value;
    var namePattern = /^\S{1,10}$/;  //用户名正则表达式
    if(!namePattern.test(name1) ){
        alert("姓名格式不对，字符数必须在1-10之间！")
        flag3=false;
    }
    else{
        flag3=true;
    }


    let tel=document.getElementById("Tel").value;
    var telPattern = /^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/;  //用户名正则表达式
    if(!telPattern.test(tel) ){
        alert("电话格式不对，请输入正确的电话！")
        flag4=false;
    }
    else{
        flag4=true;
    }


    let ID=document.getElementById("ID").value;
    var IDPattern = /(^\d{10}$)/;  //用户名正则表达式
    if(!IDPattern.test(ID) ){
        alert("学号格式不对，应为长度为10的数字序列！")
        flag5=false;
    }
    else{
        flag5=true;
    }

    if (flag1 && flag2 && flag3 && flag4 && flag5 && password1!=''){
        if(password1==password2){
        alert("注册成功！");
        window.location.href="login.html";
        }
        else{
            alert("两次输入的密码不一样！");
        }
    }
    else{
        alert("信息格式不对，请输入正确的信息！")
    }


}