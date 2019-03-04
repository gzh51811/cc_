$(() => {

    $('.btnAdd').click(function () {
        location.href = './srot_add.html';
    });
    $('.btnDEL').click(function () {
        if ($('.layui-form-checked')) {
            let obj = DelE();
            $.ajax({
                type: "get",
                url: "/sort/delALL",
                data: obj,
                success: function (str) {
                    srot();
                }
            });
        }
    });
    srot();

    function srot() {
        layui.use(['table', 'laypage', 'element'], function () {
            var table = layui.table,
                laypage = layui.laypage,
                element = layui.element;
            //第一个实例
            table.render({
                elem: '#demo',
                url: '/sort', //数据接口,
                page: true, //开启分页-,
                height: 472,
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
                            width: 450
                        }, {
                            field: 'timer',
                            title: '添加时间',
                            width: 114,
                            sort: true
                        }, {
                            fixed: 'right',
                            title: '操作',
                            width: 185,
                            align: 'center',
                            toolbar: '#barDemo'
                        }
                    ]
                ]

            });
            //监听头工具栏事件
            paGe(table, laypage);
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
                            url: "/sort/del",
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
                    location.href = './srot_add.html?_id=' + data._id;
                }
            });
        });
    }
});