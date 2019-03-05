window.onload = function () {
    let user = document.querySelector('#username');
    let psw = document.querySelector('#password');
    let checked = document.querySelector('#checked');
    let btn = document.querySelector('#btn');
    let hint = document.querySelector('.hint');

    // let user_val = user.value;
    // let psw_val = psw.value;
    // let ck = checked.checked;

    btn.onclick = (e) => {
        let user_val = user.value;
        let psw_val = psw.value;
        let ck = checked.checked;
        // console.log(user_val,psw_val,ck);
        // 发起ajax请求
        let xhr = new XMLHttpRequest();
        xhr.onload = () => {
            if (xhr.status == 200) {
                var arr = JSON.parse(xhr.responseText);
                if (arr.str.length > 0) {
                    this.console.log(xhr.responseText);
                    let str2 = `{"token":"${arr.token}","str":[{"username":"${arr.str[0].username}","name":"${arr.str[0].name}","power":"${arr.str[0].power}"}]}`;
                    // console.log(str2);
                    if (arr.str[0].power == '管理员' || arr.str[0].power == '超级管理员') {
                        localStorage.setItem('user',str2);
                        let user = localStorage.getItem('user');
                        user = JSON.parse(user);
                        // token验证方式
                        if (user.token) {
                            // 判断本地是否有token
                            let xhr = new XMLHttpRequest();
                            xhr.onload = () => {
                                let res = JSON.parse(xhr.responseText);
                                if (res.status == 200) {
                                    hint.style.display = 'none';
                                    alert(`欢迎您~管理员${arr.str[0].name}`);
                                    location.href = 'html/index.html';
                                }else{
                                    console.log(123);
                                }
                            }
                            xhr.open('post', '/tokenverify', true);
                            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                            xhr.send('token=' + user.token);
                        }
                        
                    } else {
                        hint.style.display = 'block';
                    }
                } else {
                    hint.style.display = 'block';
                }
            }
        }
        xhr.open('post', '/login_r', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        let data = `username=${user_val}&password=${psw_val}`;
        xhr.send(data);
        // console.log(data);
    }

};