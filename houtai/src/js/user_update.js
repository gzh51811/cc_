$(function () {
    // 验证正则
    var checkReg = {
        tel: function (str) {
            var reg = /^1[3-9]\d{9}$/;
            return reg.test(str);
        },
        password: function (str) {
            var reg = /.{6,18}$/;
            return reg.test(str);
        },
        name: function (str) {//验证姓名正则
            var reg = /^[\u4E00-\u9FA5A-Za-z]+$/;
            return reg.test(str);
        }
    }
    // 开关，当所有开关都为ture时才能添加用户
    var user_ojbk = true;
    var phone_ojbk = true;
    var psw1_ojbk = true;
    var psw2_ojbk = true;
    var name_ojbk = true;
    var sex = '女';
    // 从列表页接收id
    var kum = decodeURI(location.search);//接收字符串
    var _id = kum.substring(1);
    // 初始化渲染
    $.ajax({
        type: "post",
        url: "/user_update",
        data: {
            _id: _id,
            code: 3
        },
        success: function (str) {
            lnit(str);
        }
    });
    function lnit (str){
        $('#user').val(str[0].username);
        $('#psw1').val(str[0].password) ;
        $('#psw2').val(str[0].password);
        $('#name').val(str[0].name);
        $('#phone').val(str[0].phone);
        $('#add_intro').val(str[0].intro);
    }
    // 密码验证
    $('#psw1').change(function () {
        let psw1 = $('#psw1').val();
        if (psw1) {
            if (checkReg.password(psw1)) {
                $('.add_data_psw1 .add_span').css({ 'display': 'block', 'color': '#58bc58' });
                $('.add_data_psw1 .add_span').html('OK');
                psw1_ojbk = true;
            } else {
                $('.add_data_psw1 .add_span').css({ 'display': 'block', 'color': 'red' });
                $('.add_data_psw1 .add_span').html('密码长度要求为6到18位');
                psw1_ojbk = false;
            }
        } else {
            $('.add_data_psw1 .add_span').css({ 'display': 'block', 'color': 'red' });
            $('.add_data_psw1 .add_span').html('密码不能为空');
            psw1_ojbk = false;
        }
    });
    $('#psw2').change(function () {
        let psw1 = $('#psw1').val();
        let psw2 = $('#psw2').val();
        if (psw1 == psw2) {
            $('.add_data_psw2 .add_span').css({ 'display': 'block', 'color': '#58bc58' });
            $('.add_data_psw2 .add_span').html('OK');
            psw2_ojbk = true;
        } else {
            $('.add_data_psw2 .add_span').css({ 'display': 'block', 'color': 'red' });
            $('.add_data_psw2 .add_span').html('两次密码不一致');
            psw2_ojbk = false;
        }
    });
    $('#name').change(function () {
        let name_val = $('#name').val();
        if (checkReg.name(name_val)) {
            $('.add_data_name .add_span').css({ 'display': 'block', 'color': '#58bc58' });
            $('.add_data_name .add_span').html('OK');
            name_ojbk = true;
        } else {
            $('.add_data_name .add_span').css({ 'display': 'block', 'color': 'red' });
            $('.add_data_name .add_span').html('只能输入中文和英文');
            name_ojbk = false;
        }
    })
    $('#phone').change(function () {
        let phone_val = $('#phone').val();
        if (phone_val) {
            if (checkReg.tel(phone_val)) {
                $('.add_data_phone .add_span').css({ 'display': 'block', 'color': '#58bc58' });
                $('.add_data_phone .add_span').html('OK');
                phone_ojbk = true;
            } else {
                $('.add_data_phone .add_span').css({ 'display': 'block', 'color': 'red' });
                $('.add_data_phone .add_span').html('您输入的手机号码格式错误');
                phone_ojbk = false;
            }
        } else {
            $('.add_data_phone .add_span').css({ 'display': 'block', 'color': 'red' });
            $('.add_data_phone .add_span').html('输入不能为空');
            phone_ojbk = false;
        }
    });
    $('.add_data_sex .layui-form').on('click', '.layui-form-radio', function () {
        if ($(this).index() == 1) {
            sex = '男';
        } else if ($(this).index() == 3) {
            sex = '女';
        } else if ($(this).index() == 5) {
            sex = '中性';
        }

    });
    $('#add_btn').click(function () {
        let intro_val = $('#add_intro').val();
        let user_val = $('#user').val();
        let psw1_val = $('#psw1').val();
        let name_val = $('#name').val();
        let phone_val = $('#phone').val();
        // 获取注册时间
        let time = new Date();
        let year = time.getFullYear();
        let mon = time.getMonth() + 1;
        let day = time.getDate();
        let hour = time.getHours();
        let min = time.getMinutes();
        var nowTime = `${year}.${mon}.${day} ${hour}:${min}`;
        if (user_ojbk && phone_ojbk && psw1_ojbk && psw2_ojbk && name_ojbk) {
            console.log(user_val, psw1_val, sex, phone_val, name_val);
            $.ajax({
                type: "post",
                url: "/user_update",
                data: {
                    code: 2,
                    username: user_val,
                    password: psw1_val,
                    sex: sex,
                    phone: phone_val,
                    regtime: nowTime,
                    intro: intro_val,
                    name: name_val
                },
                success: function (str) {
                    if (str) {
                        alert('修改用户成功~');
                        location.href = './user_list.html';
                    }
                }
            });
        }
    });
});