;(function($){
	var lazyloadPlugin=function(ele,opt){
		this.elements=ele?ele:$(".loading"),//若没有第一个参数，默认获取class为loading的元素
		this.defaults={
			"beginHeight":0,
			"howToLoad":"fadeIn",
			"loadingBgClass":"loading",//定义未加载前背景图片的类名
			"whenToLoad":"allIn"//默认为div全部在可视窗口内开始加载；其他值：“someIn”
		},
		this.options=$.extend({},this.defaults,opt)
	};
	lazyloadPlugin.prototype={
		bindLazy:function(){
			var beginHeight=this.options.beginHeight;
			var elements=this.elements;
			var loadingBgClass=this.options.loadingBgClass;
			var whenToLoad=this.options.whenToLoad;
			$(window).scroll(function(){
				srcTop=$(window).scrollTop();
				if(srcTop>=beginHeight){
					elements.trigger("lazyme",$(window).scrollTop());
				}				
			});
			elements.bind("lazyme",function(e,scrTop){
				var url=$(this).attr("request-url");
				var offset=$(this).offset().top;
				var interval=$(window).height()-$(this).height();//当前页面可视高度-元素高度
				var max=0;
				var min=0;
				if(whenToLoad=="allIn"){
					max=offset;
					min=offset-interval;				
				}
				else if(whenToLoad=="someIn"){
					max=offset+$(this).height();
					min=offset-$(window).height();
				}
				if(scrTop>=min && scrTop<=max){
						$(this).load(url,function(responseTxt,statusTxt,xhr){
							if (statusTxt=="success") {
								$(this).removeClass(loadingBgClass);
								$(this).unbind("lazyme");
							};
						});
					}
			});
		}
	};
	$.fn.lazyLoadDiv_cc=function(options){
		var llp=new lazyloadPlugin(this,options);
		return llp.bindLazy();
	};
})(jQuery);