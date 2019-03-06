$(() => {
    var data = decodeURI(location.search); //解码的方法
    var str = data.slice(1);
    var good = setStr(str);
    var id = good._id;
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
                username = data.field.username;
            if (id) {
                //修改
                $.ajax({
                    type: "get",
                    url: "/sort/upd",
                    data: {
                        _id: id,
                        desc: desc,
                        username: username,
                        timer: timer
                    },
                    success: function (str) {
                        if (str.ok === 1) {
                            alert('修改成功');
                        }
                    }
                });

            } else {
                //添加
                $.ajax({
                    type: "get",
                    url: "/sort/add",
                    data: {
                        desc: desc,
                        username: username,
                        timer: timer
                    },
                    success: function (str) {
                        if (str.ok === 1) {
                            alert('添加成功');
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
            url: "/sort",
            data: {
                _id: id
            },
            success: function (str) {
                $('#name').val(str.data[0].username);
                $('#desc').val(str.data[0].desc);
            }
        });
    }
})