window.onload = function(){
    let user = document.querySelector('#username');
    let psw = document.querySelector('#password');
    let checked = document.querySelector('#checked');
    let btn = document.querySelector('#btn');
    let hint = document.querySelector('.hint');

    // let user_val = user.value;
    // let psw_val = psw.value;
    // let ck = checked.checked;

    btn.onclick = (e)=>{
        let user_val = user.value;
        let psw_val = psw.value;
        let ck = checked.checked;
        // console.log(user_val,psw_val,ck);
        // 发起ajax请求
        let xhr = new XMLHttpRequest();
        xhr.onload = ()=>{
            if(xhr.status == 200){
                let arr = JSON.parse(xhr.responseText);
                if(arr[0].power == '管理员'){
                    hint.style.display = 'none';
                    alert(`欢迎您~管理员${arr[0].name}`);
                    location.href = '../index.html';
                }else{
                    hint.style.display = 'block';
                }
            }
        }
        xhr.open('post','/login_r',true);
        xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');

        let data = `username=${user_val}&password=${psw_val}`;
        xhr.send(data);
        // console.log(data);
    }

};