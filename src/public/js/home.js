/**
 * Created by unique on 2018/5/24.
 */

function getQueryStringArgs(q){
    var qs = q.split('?')[1] || (location.search.length > 0 ? location.search.substring(1) : ''),
        query = {},
        items = qs.length ? qs.split('&') : [],
        item = null,
        name = null,
        value = null,
        i = 0,
        len = items.length;
    for(i = 0; i < len; i++){
        item = items[i].split('=');
        name = decodeURIComponent(item[0]);
        value = decodeURIComponent(item[1]);
        if(name.length){
            query[name] = value;
        }
    }
    return query;
}

$(document).ready(function() {

    //var $user = $('#userMenu')
    //var host = getQueryStringArgs(window.location.href)
    //$user.text(result[0].user_nick)
})

