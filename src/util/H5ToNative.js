define([],function(){
	var h5tonative =
	{
		urlList:
		{
			apphome:"yhd://home/",
			appcart:"yhd://cart/",
			appgroupone:"yhd://groupon/"
		},
		functionlist:
		{
		   shake:"yhdiosfun://shake/",
		   playAudio:"yhdiosfun://playAudio/",
		   addCart:"yhdiosfun://addCart/",
		   share:"yhdiosfun://share/",
		   goback:"yhdiosfun://back/",
		   unionlogin:"yhdiosfun://unionloginback/",
		   buoyCart:"yhdiosfun://buoyCart/",
		   getRemoteData:"yhdiosfun://getRemoteData/",
		   saveH5Data:"yhdiosfun://saveH5Data/",
		   getH5Data:"yhdiosfun://getH5Data/",
		   h5Init:"yhdiosfun://h5Init/",
		   h5Refresh:"yhdiosfun://h5Refresh/",
		   hideTab:"yhdiosfun://hideTab/"
		},
		getAllCookie:function()
		{
			return unescape(document.cookie);
		},
	    getCookie:function(sMainName,sSubName)
		{
			var re = new RegExp((sSubName ? sMainName + "=(?:.*?&)*?" + sSubName + "=([^&;$]*)" : sMainName + "=([^;$]*)"),"i");
	        return re.test(unescape(document.cookie)) ? RegExp["$1"] : "";
		},
		getUserAgent:function(){return navigator.userAgent;},
		yhdplatform:
		{
			isandroid:function(){return h5tonative.getUserAgent().indexOf("yhdandroid")>0;},
			isios:function(){return h5tonative.getUserAgent().indexOf("yhdios")>0;},
			isother:function(){return h5tonative.getUserAgent().indexOf("yhdandroid")< 0 && h5tonative.getUserAgent().indexOf("yhdios")<0;}
		},
		getClientInfo:function(){return h5tonative.getCookie("clientinfo","");},
		getUserToken:function(){return h5tonative.getCookie("usertoken","");},
		getProvinceid:function(){return h5tonative.getCookie("provinceid","");},
		getFrom:function(){return h5tonative.getCookie("from","");},
		getSessionid:function(){return h5tonative.getCookie("sessionid","");},
		isWireless2:function()
		{
			if(h5tonative.getCookie("frameworkver","") != "")
			{
				return true;
			}
			return false;
		},
		//url:native模块url地址,必须以/结尾,如:yhd://home/,yhd://cart/
		goToNative:function(url,param)
		{
			if(h5tonative.yhdplatform.isandroid())
			{
				window.yhd.gotToNative(url,param);
			}
			if(h5tonative.yhdplatform.isios())
			{
				window.location.href = url+"?body="+param;
			}
		},
		playAudio:function(param)
		{
			if(h5tonative.yhdplatform.isandroid())
			{
				window.yhd.playAudio(param);
			}
			if(h5tonative.yhdplatform.isios())
			{
				window.location.href = h5tonative.functionlist.playAudio+"?body="+param;
			}
		},
		addCart:function(param)
		{
			if(h5tonative.yhdplatform.isandroid())
			{
				window.yhd.addCart(param);
			}
			if(h5tonative.yhdplatform.isios())
			{
				window.location.href = h5tonative.functionlist.addCart+"?body="+param;
			}
		},
		shake:function(param)
		{
			if(h5tonative.yhdplatform.isandroid())
			{
				window.yhd.shake(param);
			}
			if(h5tonative.yhdplatform.isios())
			{
				window.location.href = h5tonative.functionlist.shake+"?body="+param;
			}
		},
		share:function(param)
		{
			if(h5tonative.yhdplatform.isandroid())
			{
				h5tonative.goToNative("yhd://share/",param);
			}
			if(h5tonative.yhdplatform.isios())
			{
				window.location.href = h5tonative.functionlist.share+"?body="+param;
			}
		},
		appBack:function()
		{
			if(h5tonative.yhdplatform.isandroid())
			{
				window.yhd.back();
			}
			if(h5tonative.yhdplatform.isios())
			{
				window.location.href = h5tonative.functionlist.goback;
			}
		},
		unionloginback:function(param)
		{
			if(h5tonative.yhdplatform.isandroid())
			{
				window.yhd.unionloginback(param);
			}
			if(h5tonative.yhdplatform.isios())
			{
				window.location.href = h5tonative.functionlist.unionlogin+"?body="+param;
			}
		},
		buoyCart:function(param)
		{
			if(h5tonative.yhdplatform.isandroid())
			{
				window.yhd.buoyCart(param);
			}
			if(h5tonative.yhdplatform.isios())
			{
				window.location.href = h5tonative.functionlist.buoyCart+"?body="+param;
			}
		},
		h5Init:function(param)
		{
			if(h5tonative.yhdplatform.isandroid())
			{
				window.yhd.h5Init(param);
			}
			if(h5tonative.yhdplatform.isios())
			{
				window.location.href = h5tonative.functionlist.h5Init+"?body="+param;
			}
		}
		,
		getRemoteData:function(param)
		{
			if(h5tonative.yhdplatform.isandroid())
			{
				window.yhd.getRemoteData(param);
			}
			if(h5tonative.yhdplatform.isios())
			{
				window.location.href = h5tonative.functionlist.getRemoteData+"?body="+param;
			}
		},
		saveH5Data:function(param)
		{
			if(h5tonative.yhdplatform.isandroid())
			{
				window.yhd.saveH5Data(param);
			}
			if(h5tonative.yhdplatform.isios())
			{
				window.location.href = h5tonative.functionlist.saveH5Data+"?body="+param;
			}
		},
		getH5Data:function(param)
		{
			if(h5tonative.yhdplatform.isandroid())
			{
				window.yhd.getH5Data(param);
			}
			if(h5tonative.yhdplatform.isios())
			{
				window.location.href = h5tonative.functionlist.getH5Data+"?body="+param;
			}
		},
		h5Refresh:function()
		{
			if(h5tonative.yhdplatform.isandroid())
			{
				window.yhd.h5Refresh();
			}
			if(h5tonative.yhdplatform.isios())
			{
				window.location.href = h5tonative.functionlist.h5Refresh;
			}
		}
		,
		hideTab:function(param)
		{
			if(h5tonative.yhdplatform.isandroid())
			{
				window.yhd.hideTab(param);
			}
			if(h5tonative.yhdplatform.isios())
			{
				window.location.href = h5tonative.functionlist.hideTab+"?body="+param;
			}
		}
		,
		alertsomthing:function()
	    {
		   alert(h5tonative.isWireless2());
	    },
		
	};
	return h5tonative;
});