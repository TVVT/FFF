define(['base','language'],function(Base,L){

	var VERSION = 0.1;

	function FFF(){
		this.version = VERSION;
		Base.apply(this,arguments);
	}

	L.core.extend(FFF,Base);

	var F = new FFF();

	window.FFF = F;

	return F

})