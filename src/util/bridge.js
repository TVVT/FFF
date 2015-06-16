define(['zepto','H5ToNative'], function($,h5tonative) {
    var exports = {};
    var callid = 1;
    var callidObj = {};

    // 由于iOS6不能支持并发，所以需要加入队列
    var queue = [];
    var runningQueue = false;


    //判断link是否为一个可打开的
    function isLinkRef(link) {
        if(link && (link.indexOf("http://") == 0 || link.indexOf("https://") == 0)){
            return true;
        }
        return false;
    }

    //siteName: 默认 m.yhd.com
    //hasTrail: 默认true
    function wrapAsReg(content, siteName, hasTail){
        var prefix = "[http://|https://][\\w\\.]+yhd\\.com";
        if(siteName && siteName.indexOf("yhd") == -1 && siteName.indexOf("com") == -1){
            prefix = "[http://|https://]"+siteName+"\\.yhd\\.com";
        }else if(siteName){
            prefix = siteName;
        }
        var tail = "(/)?[^/]{0,}$";
        if(hasTail != null && hasTail == false){
            tail = "[^/]{0,}$";
        }
        if(content == null){
            content = "";
        }
        return RegExp(prefix+content+tail);
    }


    var h5LinkPattern = [
        [wrapAsReg("/m/login_input\.do","passport",false),'yhd://login/', null],
        [wrapAsReg("/store/m-(\\d{1,11})(-\\d{1,2})?.html","(http://|https://)[\\w\\.]+yhd\\.com",false),'yhd://web/','"url":"${0}","type":1,"targetUrlIntent":"yhd://mallshopsearch?merchantId=${2}"'],//店铺1
        [wrapAsReg("/mw/store/(\\d{1,11})(/\\d{1,2})?","(http://|https://)[\\w\\.]+yhd\\.com",false),'yhd://web/','"url":"${0}","type":1,"targetUrlIntent":"yhd://mallshopsearch?merchantId=${2}"'],//店铺2
        [wrapAsReg("/item/(\\d{1,11})",null,false),'yhd://detail/','"pmId":${1}'],
        [wrapAsReg("/item/lp/(\\d{1,11})_(\\d{1,11})",null,false),'yhd://detail/','"pmId":${2},"promotionId":"${1}_landingpage"'],
        [wrapAsReg("/mingpin/list/(\\d{1,11})(/\\d{1,2})?"),'yhd://flashbuyproductlist/','"flashbuyId":${1}'],//闪购卖场 4
        [wrapAsReg("/mingpin/item/(\\d{1,11})_(\\d{1,11})(/(\\d{1,2})/)?(/?[^/]{0,}categoryId=(\\d{1,11}))?",null,false),'yhd://flashbuyproductdetail/','"flashbuyId":${1},"productId":${2}'],//闪购详情页,5
        [wrapAsReg("/mingpin/category/(\\d{1,11})"),'yhd://flashbuyhome/','"categoryId":${1}'],//闪购类目页 6
        [wrapAsReg("/mingpin"),'yhd://flashbuyhome/',null],//闪购首页
        //团购监听
        [wrapAsReg("/tuan"),'yhd://grouponhome/',null],//团购首页 11
        [wrapAsReg("","http://t.m.yhd.com(/\\d{1,2})?",false),'yhd://grouponhome/',null],//团购首页 11
        [wrapAsReg("/tuan/[^/\\.]{0,}c(\\d{1,11})[^/\\.]{0,}.html\\?nid=(\\d{1,11})"),'yhd://productgroupon/','"grouponType":0,"categoryId":${2}'],//团购类目页
        [wrapAsReg("/[^/\\.]{0,}c(\\d{1,11})[^/\\.]{0,}.html\\?nid=(\\d{1,11})","http://t.m.yhd.com"),'yhd://productgroupon/','"grouponType":0,"categoryId":${2}'],//团购类目页
        [wrapAsReg("/(p\\d{1,2}-)?vt100(-c-1-st0.html)?","http://t.m.yhd.com",false),'yhd://productgroupon/','"grouponType":0,"grouponNum":100'],//商品团
        [wrapAsReg("/(p\\d{1,2}-)?vt2(-c-1-st0.html)?","http://t.m.yhd.com",false),'yhd://productgroupon/','"grouponType":1,"grouponNum":100'],//团购今日上新
        [wrapAsReg("/(p\\d{1,2}-)?vt3(-c-1-st0.html)?","http://t.m.yhd.com",false),'yhd://grouponsoon/',null],//即将开团
        [wrapAsReg("/tuan/detail/(\\d{1,11})",null,false),'yhd://grouponsummary/','"grouponid":${1}'],// 团购详情页 8
        [wrapAsReg("/detail/(\\d{1,11})","http://t.m.yhd.com",false),'yhd://grouponsummary/','"grouponid":${1}'],// 团购详情页 8
        [wrapAsReg("/tuan/brand",null,false),'yhd://brandgroupon/',null],//品牌团 9
        [wrapAsReg("/brand(/\\d{1,2})?","http://t.m.yhd.com",false),'yhd://brandgroupon/',null],//品牌团 9
        [wrapAsReg("/tuan/detailBrand/(\\d{1,11})(-\\d{1,2})?",null,false),'yhd://brandgroupondetail/','"brandId":${1}'],//品牌团详情 10
        [wrapAsReg("/detailBrand/(\\d{1,11})(-\\d{1,2})?","http://t.m.yhd.com",false),'yhd://brandgroupondetail/','"brandId":${1}'],//品牌团详情 10
        [wrapAsReg("/clock","http://t.m.yhd.com",true),'yhd://oclockGroupon/','"title":"金牌秒杀"'],//整点抢

        [wrapAsReg("/search/\\?req.keyword=([^&/=]{1,})",null,false),'yhd://search/','"keyword":"${1}"'],//12 搜索页
        [wrapAsReg("/search/k([^?&=/]{2,})/[^?&=/]*s(\\d+)",null,false),'yhd://search/','"keyword":"${1}","sortType":"${2}"'],//12 搜索页
        [wrapAsReg("/search/k([^?&=/]{2,})",null,false),'yhd://search/','"keyword":"${1}"'],//12 搜索页
        [wrapAsReg("/search/c(\\d{1,11})/p(\\d)+-s(\\d)+/",null,false),'yhd://search/','"categoryId":${1},"name":"#{name}","virtualflag":#{virtualflag}'],//13 类目搜索
        [wrapAsReg("/search/p(\\d{1,11})-pl(\\d{1,11})-[^?]{1,}\\?.*pmid=(\\d+)",null,false),'yhd://salespromotion/','"promotionId":${1},"promotionLevelId":${2},"promotionLevel":${2},"merchantId":#{merchantId},"pmId":${3}'],//14 促销搜索1
        [wrapAsReg("/search/n(\\d{1,11})-pl(\\d{1,11})-[^?]{1,}\\?.*pmid=(\\d+)",null,false),'yhd://salespromotion/','"promotionType":2,"promotionId":${1},"promotionLevelId":${2},"promotionLevel":${2},"conditionValue":0,"merchantId":#{merchantId},"pmId":${3}'],//15 促销搜索2
        [wrapAsReg("/search/p(\\d{1,11})-pl(\\d{1,11})-[^?]{1,}\\?",null,false),'yhd://salespromotion/','"promotionId":${1},"promotionLevelId":${2},"promotionLevel":${2},"merchantId":#{merchantId}'],//14 促销搜索1
        [wrapAsReg("/search/n(\\d{1,11})-pl(\\d{1,11})-[^?]{1,}\\?",null,false),'yhd://salespromotion/','"promotionType":2,"promotionId":${1},"promotionLevelId":${2},"promotionLevel":${2},"conditionValue":0,"merchantId":#{merchantId}'],//15 促销搜索2
        [wrapAsReg("/search/c(\\d{1,11})/k([^?=/&]{2,})",null,false),'yhd://search/','"categoryId":${1},"keyword":"${2}"'],
        [wrapAsReg("(/)?",null,false),'yhd://home/',null]
    ];


    exports._getCallid = function(){
        callid++;
        if(!callidObj[callid]){
            callidObj[callid] = {}
            return callid;
        }else{
            return exports._getCallid;
        }
    }

    function matchPattern(link){
        if(isLinkRef(link)){
            for ( var i = 0; i < h5LinkPattern.length; i++) {
                if(h5LinkPattern[i][0].test(link)){
                    return i;
                }
            }
        }
        return -1;
    }

    exports.ajax = function(options){
        if(h5tonative.yhdplatform.isother()){
            $.ajax(options);
        }else{
            if(options.venusUrl){

                var id = exports._getCallid();

                if(options.success){
                    callidObj[id].success = options.success;
                }

                var paramsArr = [],paramsStr = '';

                if(options.data){
                    for(var key in data){
                        paramsArr.push(key + '=' + data[key] );
                    }
                    paramsStr = paramsArr.join('&')

                }

                var params = {
                    "callid" : id,
                    "urlPath" : options.venusUrl,
                    "params" : paramsStr
                }

                var paramsStr = JSON.stringify(params);

                queue.push({
                    "callid" : id,
                    "type" : "getRemoteData",
                    "paramsStr" : paramsStr
                });

                exports.runQueue();
            }
        }
    }

    exports.addNativeListener = function(){
        if(h5tonative.yhdplatform.isother()){return false;}

        $('body').on('click','a,area',function(e){

            e.preventDefault()
            var me=$(this);
            var link = $.trim(me.attr("href"));
            if (isLinkRef(link)) {
                // var spmData=spm.getData(me);
                var params = {};
                // if(spmData){
                    // var tc=spmData.tc;
                    // var tp=spmData.tp;
                    // params.tp = tp;
                    // params.tc = tc;
                // }
                var matchedPattern = matchPattern(link);
                var paramStr = "";
                if(matchedPattern >= 0){
                    //找到了匹配

                    //取参数,如果需要传参数
                    if(h5LinkPattern[matchedPattern][2]){
                        paramStr = h5LinkPattern[matchedPattern][2];

                        var result = link.match(h5LinkPattern[matchedPattern][0]);
                        var intValue = new RegExp("\\d{1,3}");
                        //1, 用正则去匹配参数
                        var regParam = new RegExp("\\$\\{(\\d{1,3})\\}","g");
                        var matchedParams = paramStr.match(regParam);
                        if(matchedParams && matchedParams.length > 0 && matchedParams.length <= result.length ){
                            for ( var j = 0; j < matchedParams.length; j++) {
                                paramStr = paramStr.replace(matchedParams[j],result[matchedParams[j].match(intValue)[0]]);
                            }
                        }

                        //2, 从url取参数
                        var urlParam = new RegExp("#\\{([a-zA-Z0-9_]{1,30})\\}","g");
                        var matchedURLParams = paramStr.match(urlParam);
                        if(matchedURLParams && matchedURLParams.length > 0 ){//需要取url参数
                            var urlObjs = url.getParams(link);
                            for ( var k = 0; k < matchedURLParams.length; k++) {
                                //是要替换的名称
                                //取出参数名字
                                var name = matchedURLParams[k].match("[a-zA-Z0-9_]{1,30}")[0];
                                if(urlObjs[name]){
                                    paramStr = paramStr.replace(matchedURLParams[k],urlObjs[name]);
                                }else{
                                    //缺少参数
                                    return true;
                                }
                            }
                        }
                    }
                    if(paramStr.length > 0){
                        paramStr += ",";
                    }
                    // paramStr += '"tp":"'+params.tp+'",';
                    // paramStr += '"tc":"'+params.tc+'"';
                    paramStr = "{"+paramStr+"}";
                    h5tonative.goToNative(h5LinkPattern[matchedPattern][1],paramStr);
                    return false;//结束事件冒泡

                }else{
                    return true;
                }
            }
        })
        return true;
    };

    exports.runQueue = function(){
        if(!!runningQueue){return;}
        if(queue.length === 0){return;}

        switch(queue[0].type){
            case 'getRemoteData' : 
                h5tonative.getRemoteData(queue[0].paramsStr);
                runningQueue = true;
            break;
            case 'goToNative' :
                h5tonative.goToNative(queue[0].paramsStr);
                runningQueue = true;
            break;
            default:
                queue.shift();
                exports.runQueue();
            break;
        }
    };
    
    window.nativeCallback = function(callid,rst){
        if(callidObj[callid]){
            callidObj[callid].success && callidObj[callid].success.apply(null,[rst]);
        }
        queue = queue.filter(function(el,index){
            return el.callid != callid;
        })

        runningQueue = false;
        exports.runQueue()
    }

    return exports;
});
