/**
 * Created by unique on 2018/5/24.
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

$(document).ready(function () {
    $('#username').editable();
    $('#tb_assets').bootstrapTable({
        url: '/api/assets',  //请求后台的URL（*）
        method: 'get',                      //请求方式（*）
        toolbar: '#toolbar',                //工具按钮用哪个容器
        striped: true,                      //是否显示行间隔色
        cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination: true,                   //是否显示分页（*）
        sortable: false,                    //是否启用排序
        sortOrder: "asc",                   //排序方式
        //iconsPrefix: 'fa',
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
        clickToSelect: true,                //是否启用点击选中行
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
                title: 'SN'
            },
            {
                field: 'type',
                title: '资产类型ID',
                visible: false
            },
            {
                field: 'type_name',
                title: '资产类型'
            },
            {
                field: 'purchase_date',
                title: '采购时间'
            },

            {
                field: 'checker',
                title: '验收人员ID',
                visible: false
            },
            {
                field: 'checker_nick',
                title: '验收人员',
                formatter: function (value, row, index) {
                    return "<a href=\"#\" class=\"UserName\" data-type=\"text\" data-pk=\""+row.Id+"\" data-title=\"用户名\">" + value + "</a>";
                }
            },
            {
                field: 'description',
                title: '说明'
            },
            {
                field: 'action',
                title: '动作',
                formatter: function (value, row, index) {
                    return '<div class="btn-group btn-group-sm" role="group" aria-label="..."><button id="btn_delete" type="button" class="btn btn-secondary"><i class="glyphicon glyphicon-remove" aria-hidden="true"></i></button></div>';
                }
            },
        ]
    });

})

