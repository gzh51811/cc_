$(() => {
    $('.btnDEL').click(function () {
        if ($('.layui-form-checked')) {
            let obj = DelE();
            $.ajax({
                type: "get",
                url: "/order/delALL",
                data: obj,
                success: function (str) {
                    oeder();
                }
            });
        }
    });
    oeder();

    function oeder() {
        layui.use(['table', 'laypage', 'element'], function () {
            var table = layui.table,
                laypage = layui.laypage,
                element = layui.element;
            //第一个实例
            table.render({
                elem: '#demo',
                url: '/order', //数据接口,
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
                            width: 100,
                            sort: true,
                            fixed: 'left'
                        }, {
                            field: 'username',
                            title: '商品名称',
                            width: 100
                        }, {
                            field: 'price',
                            title: '价格',
                            width: 80,
                            sort: true
                        }, {
                            field: 'num',
                            title: '数量',
                            width: 80
                        }, {
                            field: 'yunfei',
                            title: '运费',
                            width: 80
                        }, {
                            field: 'zong',
                            title: '商品总额',
                            width: 100
                        }, {
                            field: 'quane',
                            title: '订单总额',
                            width: 100
                        }, {
                            field: 'timer',
                            title: '下单时间',
                            width: 102,
                            sort: true
                        }, {
                            field: 'status',
                            title: '状态',
                            width: 100
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
            paGe(table, laypage);
            table.on('tool(test)', function (obj) {
                var data = obj.data ,
                    layEvent = obj.event; //获得 lay-event 对应的值

                if (layEvent === 'detail') {
                    layer.msg('查看操作');
                } else if (layEvent === 'del') {
                    layer.confirm('真的不要我了吗？', function (index) {
                        obj.del(); //删除对应行（tr）的DOM结构
                        layer.close(index);
                        let id = data._id;
                        $.ajax({
                            type: "get",
                            url: "/order/del",
                            data: {
                                _id: id
                            }
                        });
                    });
                } else if (layEvent === 'edit') {
                    $('.model_bg').css('display', 'block');
                    $('.my_model').css('display', 'block');
                    $('.layui-body').css('overflow-y', 'hidden');
                    $('.dialog-sure').click(function () {
                        $('.model_bg').css('display', 'none');
                        $('.my_model').css('display', 'none');
                        $('.layui-body').css('overflow-y', 'auto');
                        let das = $('.layui-form-radioed').find('div').text();
                        let id = data._id;
                        if ($('.layui-form-radioed')) {
                            $.ajax({
                                type: "get",
                                url: "/order/upd",  
                                data: {
                                    status: das,
                                    _id: id
                                },
                                success: function (str) {
                                    if (str.ok == 1) {
                                        location.reload();  
                                    }
                                }
                            });
                        }

                    });
                    $('.dialog-close').click(function () {
                        $('.model_bg').css('display', 'none');
                        $('.my_model').css('display', 'none');
                        $('.layui-body').css('overflow-y', 'auto');
                    });
                    $('.closeModel').click(function () {
                        $('.model_bg').css('display', 'none');
                        $('.my_model').css('display', 'none');
                        $('.layui-body').css('overflow-y', 'auto');
                    });
                }
            });
        });
    }
});