/**
 * Created by unique on 2018/5/28.
 */

function getQueryStringArgs(q) {
    var qs = q.split('?')[1] || (location.search.length > 0 ? location.search.substring(1) : ''),
        query = {},
        items = qs.length ? qs.split('&') : [],
        item = null,
        name = null,
        value = null,
        i = 0,
        len = items.length;
    for (i = 0; i < len; i++) {
        item = items[i].split('=');
        name = decodeURIComponent(item[0]);
        value = decodeURIComponent(item[1]);
        if (name.length) {
            query[name] = value;
        }
    }
    return query;
}

function nowDateString() {
    let date = new Date()
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
}

let $table = null

$(document).ready(function () {

    $table = $('#tb_assets')

    let asset_types_enum = [];
    $.ajax({
        url: '/api/asset_types',
        async: false,
        type: "get",
        data: {},
        success: function (data) {
            let $sel = $('#asset-types-select')
            $.each(data.rows, function (key, value) {
                asset_types_enum.push({value: value.type_id, text: value.type_name});
                $sel.append(`<option value="${value.type_id}">${value.type_name}</option>`);
            });
        }
    });

    $('#purchasepicker>input').attr('value',nowDateString)
    $('#purchasepicker').datetimepicker({
        format: 'yyyy-mm-dd',
        language: 'zh-CN',
        autoclose: true, //自动关闭
        startView: 2,
        minView: "month",
    });

    $("#tableview-mode").bootstrapSwitch({
        state: false,
        onText: '详情',
        offText: '列表',
        size: 'small',
        onSwitchChange: function(event, state) {
            $table.bootstrapTable('toggleView')
        }
    });

    $('#btn_add_asset').on('click', function () {
       console.log('保存。。。。。。')
        $('#myModal').modal('hide')
    })


    //
    // user_list =  $.ajax({
    //     url: "/api/users",
    //     async: false
    // }).responseJSON
    //
    // user_types =  $.ajax({
    //     url: "/api/user_types",
    //     async: false
    // }).responseJSON




    $('#username').editable();

    $table.bootstrapTable({
        url: '/api/assets',  //请求后台的URL（*）
        method: 'get',                      //请求方式（*）
        toolbar: '#toolbar',                //工具按钮用哪个容器
        striped: true,                      //是否显示行间隔色
        cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination: true,                   //是否显示分页（*）
        sortable: false,                    //是否启用排序
        sortOrder: "asc",                   //排序方式
        queryParams: function (params) {
            var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
                limit: params.limit,   //页面大小
                offset: params.offset,  //页码
                search: params.search
            };
            return temp;
        },//传递参数（*）
        sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
        pageNumber: 1,                      //初始化加载第一页，默认第一页
        pageSize: 10,                       //每页的记录行数（*）
        search: true,                       //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
        strictSearch: false,
        showColumns: false,                  //是否显示所有的列
        showRefresh: true,                  //是否显示刷新按钮
        showPaginationSwitch: false,
        minimumCountColumns: 2,             //最少允许的列数
        clickToSelect: false,                //是否启用点击选中行
        idField:'id',
        uniqueId: "id",                     //每一行的唯一标识，一般为主键列
        showToggle: false,                  //是否显示详细视图和列表视图的切换按钮
        cardView: false,                    //是否显示详细视图
        detailView: false,                  //是否显示父子表
        searchAlign: 'right',
        columns: [
            {
                checkbox: true
            },
            {
                field: 'id',
                title: 'ID',
                visible: false
            },
            {
                field: 'sn',
                title: 'SN',
                editable: {
                    type: 'text',
                    title: 'SN',
                    mode: "inline",
                    validate: function (v) {
                        if (!v) return 'SN不能为空';
                    }
                }
            },
            {
                field: 'type',
                title: '资产类型',
                editable: {
                    type: 'select',
                    title: '资产类型',
                    mode: "inline",
                    source: asset_types_enum,
                    validate: function (v) {
                        if (!v) return '资产类型不能为空';
                    }
                }
            },
            {
                field: 'purchase_date',
                title: '采购时间',
                editable: {
                    type: 'date',
                    mode: "inline",
                    title: '采购时间',
                    validate: function (v) {
                        if (!v) return '采购时间格式不正确';
                    }
                }
            },
            {
                field: 'reject_date',
                title: '报废时间',
                editable: {
                    type: 'date',
                    mode: "inline",
                    title: '报废时间',
                }
            },
            {
                field: 'checker',
                title: '验收人员ID',
                visible: false
            },
            {
                field: 'checker_nick',
                title: '验收人员'
            },
            {
                field: 'description',
                title: '说明',
                width: '200',
                editable: {
                    type: 'text',
                    mode: "inline",
                    title: '说明',
                },
                formatter: function (value, row, index) {
                    return value ? value : '';
                }
            },
            {
                field: 'action',
                title: '动作',
                formatter: function (value, row, index) {
                    return '<div class="btn-group btn-group-sm" role="group" aria-label="...">' +
                        '<button id="btn_delete" type="button" class="btn btn-secondary">' +
                        '<i class="glyphicon glyphicon-remove" aria-hidden="true"></i>' +
                        '</button>' +
                        '</div>';
                }
            },
        ]
    });

})

