
    function paGe(table, laypage) {

        table.on('toolbar(test)', function (obj) {
            var checkStatus = table.checkStatus(obj.config.id),
                data = checkStatus.data; //获取选中的数据
            switch (obj.event) {
                case 'add':
                    layer.msg('添加');
                    break;
                case 'delete':
                    if (data.length === 0) {
                        layer.msg('请选择一行');
                    } else {
                        layer.msg('删除');
                    }
                    break;
            };
        });

        laypage.render({
            elem: 'pageDemo' //分页容器的id
            ,
            count: 100 //总页数
            ,
            skin: '#1E9FFF' //自定义选中色值
            //,skip: true //开启跳页
            ,
            jump: function (obj, first) {
                if (!first) {
                    layer.msg('第' + obj.curr + '页', {
                        offset: 'b'
                    });
                }
            }
        });
    }

    function DelE() {
        let arr = [];

        for (let i = 0; i < $('.layui-form-checked').size(); i++) {
            let ids = $('.layui-form-checked').eq(i).parent().parent().next().children().html();
            arr.push(ids)
        }
        let obj = {};
        for (let i = 0; i < arr.length; i++) {
            obj['_id' + (i + 1)] = arr[i]; //键值对
        }
        return obj;
    }
    window.onload = function () {
    // 退出登录
    $('#user_exit').on('click', '.exit', function () {
        alert('退出成功 ~');
        localStorage.clear();
        location.href = '../login.html';
    });
    // 初始化渲染头部登录信息
    let user = localStorage.getItem('user');
    user = JSON.parse(user);
    // console.log(user.str.length);
    if(user){
        if (user.str.length > 0) {
            var html = `<li class="layui-nav-item">
                            <a href="javascript:;">
                                <img src="http://t.cn/RCzsdCq" class="layui-nav-img">
                                ${user.str[0].name}
                            </a>
                            <dl class="layui-nav-child">
                                <dd><a href="javascript:;">基本资料</a></dd>
                                <dd><a href="javascript:;">安全设置</a></dd>
                            </dl>
                        </li>
                        <li class="layui-nav-item"><a class="exit" href="javascript:;">退出</a></li>`;
            $('#user_exit').html(html);
        }else{
            alert('sorry~ 您不是真实管理员');
            location.href = '../login.html';
        }
    }else{
        alert('sorry~ 您还未登录哦');
        location.href = '../login.html';
    }
    // 修改个人信息
    $('.myedit').click(function(){
        let user = localStorage.getItem('user');
        user = JSON.parse(user);
        location.href = `./user_edit.html?${user.str[0].username}`;
    });
}