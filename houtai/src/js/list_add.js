$(() => {
    //JavaScript代码区域
        var data = decodeURI(location.search); //解码的方法
        var str = data.slice(1);
        var good = setStr(str);
        var id = good._id;
        // console.log(id);
        layui.use(['element', 'form'], function () {
            var element = layui.element,
                form = layui.form;
            form.on('submit(formDemo)', function (data) {
                //时间
                let date = new Date();
                var y = date.getFullYear();
                var m = date.getMonth() + 1;
                m = m < 10 ? '0' + m : m;
                var d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                let timer = y + '-' + m + '-' + d;
                let desc = data.field.desc,
                    interest = data.field.interest,
                    num = data.field.num,
                    price = data.field.price,
                    presentPrice = data.field.presentPrice,
                    username = data.field.username,
                    usernameF = data.field.usernameF;
                if (id) {
                    //修改
                    $.ajax({
                        type: "post",
                        url: "/list/add",
                        data: {
                            _id: id,
                            desc: desc,
                            interest: interest,
                            num: num,
                            price: price,
                            presentPrice: presentPrice,
                            username: username,
                            usernameF: usernameF,
                            timer: timer
                        },
                        success: function (str) {
                            if (str.ok === 1) {
                                alert('修改成功');
                                location.href = './list.html';
                            }
                        }
                    });

                } else {
                    //添加
                    $.ajax({
                        type: "post",
                        url: "/goods",
                        data: {
                            desc: desc,
                            interest: interest,
                            num: num,
                            price: price,
                            presentPrice: presentPrice,
                            username: username,
                            usernameF: usernameF,
                            timer: timer
                        },
                        success: function (str) {
                            if (str.ok === 1) {
                                alert('添加成功');
                                location.href = './list.html';
                            }
                        }
                    });
                }
                return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
            });
        });

        function setStr(str) {

            var obj = {};

            var arr = str.split('&');

            for (var i in arr) {
                var newarr = arr[i].split('=');
                obj[newarr[0]] = newarr[1];
            }
            return obj;
        }

        if (id) {
            //渲染
            $.ajax({
                type: "get",
                url: "/list",
                data: {
                    _id: id
                },
                success: function (str) {
                    $('#name').val(str.data[0].username);
                    $('#nameF').val(str.data[0].usernameF);
                    $('#price').val(str.data[0].price);
                    $('#presentPrice').val(str.data[0].presentPrice);
                    $('#desc').val(str.data[0].desc);
                    $('#num').val(str.data[0].num);
                    $("#interest").find("option[value=" + str.data[0].interest + "]").attr(
                        "selected", true);
                }
            });
        }
})