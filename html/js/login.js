var flag1=true;  //邮箱判断标识符
var flag2=true;  //用户名判断标识符


   
   function Login1()
   {
        let username = document.getElementById("Username").value;
        var usernamePattern = /^\S{1,10}$/;
        if(!usernamePattern.test(username) ){
            alert("用户名格式不对，字符数必须在1-10之间！")
            flag1=false;
        }
        else{
            flag1=true;
        }
        console.log(username);


        let password = document.getElementById("Password").value;
        var passwordPattern =  /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$/;
        if(!passwordPattern.test(password)){
            alert("密码格式不对，长度至少为6位，且应为数字和字母的组合");
            flag2=false;
        }
        else{
            flag2=true;
        }
        console.log(password);

        if(flag1 && flag2)
        window.location.href="studentIndex.html"; 
   } 




    