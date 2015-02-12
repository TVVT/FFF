define(['base','language'],function(base,language){

	var L = language.language;
	var Base = base.Base;
	
	var VERSION = 0.1;

	function FFF(){
		this.version = VERSION;
		Base.apply(this,arguments);
	}

	L.core.extend(FFF,Base);

	var F = new FFF();

	window.FFF = F;

	return {
		FFF:F
	}

})