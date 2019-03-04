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