$(() => {
    $('.btnDEL').click(function () {
        if ($('.layui-form-checked')) {
            let obj = DelE();
            $.ajax({
                type: "get",
                url: "/list/delALL",
                data: obj,
                success: function (str) {
                    xun();
                }
            });
        }
    });
    $('.btnAdd').click(function () {
        location.href = './list_add.html';
    });
    xun();
    function xun() {
        layui.use([ 'laypage', 'layer', 'table',  'upload', 'element'], function () {
            var laypage = layui.laypage //分页
                ,
                layer = layui.layer //弹层
                ,
                table = layui.table //表格
                ,
                upload = layui.upload //上传
                ,
                element = layui.element ;
            //执行一个 table 实例
            table.render({
                elem: '#demo',
                height: 472,
                url: '/list', //数据接口
                page: true, //开启分页-,
                cols: [
                    [ //表头
                        {
                            type: 'checkbox',
                            fixed: 'left'
                        },
                        {
                            field: '_id',
                            title: 'ID',
                            width: 220,
                            sort: true,
                            fixed: 'left'
                        }, {
                            field: 'username',
                            title: '商品名称',
                            width: 95
                        }, {
                            field: 'interest',
                            title: '分类',
                            width: 90,
                            sort: true
                        }, {
                            field: 'price',
                            title: '价格（原价）',
                            width: 120
                        }, {
                            field: 'presentPrice',
                            title: '价格（现价）',
                            width: 120
                        }, {
                            field: 'num',
                            title: '库存',
                            width: 80
                        }, {
                            field: 'timer',
                            title: '添加时间',
                            width: 120,
                            sort: true
                        }, {
                            fixed: 'right',
                            title: '操作',
                            width: 120,
                            align: 'center',
                            toolbar: '#barDemo'
                        }
                    ]
                ]
            });
            paGe(table,laypage);
            //监听行工具事件
            table.on('tool(test)', function (obj) {
                //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
                var data = obj.data //获得当前行数据
                    ,
                    layEvent = obj.event; //获得 lay-event 对应的值
                if (layEvent === 'detail') {
                    layer.msg('查看操作');
                } else if (layEvent === 'del') {
                    layer.confirm('真的删除行么', function (index) {
                        obj.del(); //删除对应行（tr）的DOM结构
                        layer.close(index);
                        //向服务端发送删除指令
                        // console.log(data._id);
                        let id = data._id;
                        //ajax
                        $.ajax({
                            type: "get",
                            url: "/list/del",
                            data: {
                                _id: id
                            },
                            success: function (str) {
                            }
                        });
                    });
                } else if (layEvent === 'edit') {
                    // layer.msg('编辑操作');
                    // console.log(data._id);
                    location.href = './list_add.html?_id=' + data._id;
                }
            });
        });
    }
})