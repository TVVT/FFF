define(['base','language'],function(Base,L){

	var F;

	function FFF(){
		Base.apply(this,arguments);
	}

	L.core.extend(FFF,Base);

	window.FFF = F ? F : new FFF();

})