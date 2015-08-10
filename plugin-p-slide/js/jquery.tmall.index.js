$(document).ready(function(){
	lazyload_cc("floor_loading",0);
	changePic("#banner-women-clothes-div");//大幻灯片默认展示
	$(document).scroll(function(){
		/*固定的搜索栏*/
		if($(window).scrollTop()>=716){//还可以指定滚动条滚动到哪里
			$("#J_AttachedSearchContainer form").show();
			$("#J_AttachedSearchContainer").slideDown("fast");
		}else{
			$("#J_AttachedSearchContainer form").hide();
			$("#J_AttachedSearchContainer").slideUp("fast");
		}
	});

	$(".drop-down-list").hover(function(){
		$(this).children(".toggle-div").toggle();
	});
	$(".menu-nav-container-ul li").mouseenter(function(){
		$(this).children(".prosmore").stop();
		$(this).children(".prosmore").fadeIn();
		$(this).addClass("bg-red");
		$(this).css("padding-left","55px");

		var li_id=$(this).attr("id");
		if(li_id){
			/*图片从大变小的动画效果*/
			var div_id="#"+li_id+"-div";
			changePic(div_id);
		}
	});
	$(".menu-nav-container-ul li").mouseleave(function(){
		$(this).children(".prosmore").stop();
		$(this).children(".prosmore").fadeOut();
		$(this).removeClass("bg-red");
		$(this).css("padding-left","50px");

	});

	$(".brand-rec-nav li").hover(function(){
		$(this).toggleClass("selected");
	});
	autoMove();
});
	/*自定义函数*/

function changePic(div_id){
/*切换首页大幻灯片*/
	$("div .banner-father").hide();
	var BC=$(div_id).children("div.banner-container");//只是图片部分
	var BCImg=BC.find("img");
	var BCEm=BC.find("em");
	if (BCImg.length==0) {//容错
		console.warn(div_id+" .banner-container.img not exsits");
		return;
	};
	/*展示前样式准备*/
	var father_bgColor = $(div_id).attr("bgColor");
	$("#fp-category-menu").css("background-color",father_bgColor);
	//BCImg.css("display","none");
	BCImg.css("width","840px");/*为了有缩小效果，设置为超宽超长的值*/
	BCImg.css("height","510px");

	/*展示div*/
	$(div_id).show();//small-banner先展示
	/*图片从打变小*/
	BCImg.stop();//jquery的动画容易造成排列现象，导致图片切换不流畅或者出bug，记得清除队列.stop和animate的区别。animate还是会执行回调函数，stop连回调函数都不执行了
	BCImg.animate({
		width:'810px',//这里如果换成-=30px,那么我乱晃的时候就会有bug，why
		height:'480px'
	},2500);
	/*右边小图片进入*/
	if(BCEm.length>0){
		BCEm.stop();
		BCEm.hide();
		BCEm.fadeIn(800);
	}
}
function autoMove(){
	$(".brand-slide-bg").each(function(){
		moveLittlePage($(this),"right","moveFromLeft","moveToRight");     
	});
	autoTask=setTimeout("autoMove()",4000);
}
/*入参：slide_div 要滑动的元素所在的父元素
		   way： left或者right左边活着右边
		   from_css:上一个元素怎么做
		   to_css: 本元素怎么做
	  作用：左侧图片轮播效果
*/
function moveLittlePage(slide_div,way,from_css,to_css){
    if(slide_div.attr("is-animating")=="true") {
    	return;
    	//动画未结束不能开始
    }
    var current_css="page-current";
    var current_p=slide_div.children(".page-current").first();
    current_p.addClass(to_css);
    if(way=="left"){
        if (current_p.next().length<=0) {        	
            slide_div.children().first().addClass(from_css);
            slide_div.children().first().addClass(current_css);
        }else{        	
            current_p.next().addClass(from_css);
            current_p.next().addClass(current_css);
        }  
    }else if(way=="right"){
        if (current_p.prev().length<=0) {
            slide_div.children().last().addClass(from_css);
            slide_div.children().last().addClass(current_css);
        }else{
            current_p.prev().addClass(from_css);
            current_p.prev().addClass(current_css);
        }  
    } 
}
/*懒加载小插件*/
//功能：当div完整出现在屏幕时，加载。
//参数className，需要进行懒加载的元素的类名，要取一样的名字
//参数beginHeight，滚动条滚到哪里，开始监听
//request-url属性，loading的图片自己准备。可以卸载.loading中。
function lazyload_cc(className,beginHeight){
	lazyDivList=$("."+className);
	$(window).scroll(function(){
		srcTop=$(window).scrollTop();
		if(srcTop>=beginHeight){
			lazyDivList.trigger("lazyme",$(window).scrollTop());
		}				
	});
	lazyDivList.bind("lazyme",function(e,scrTop){
		var offset=$(this).offset().top;
		var interval=$(window).height()-$(this).height();//当前页面可视高度
		var sumB=offset;
		var sumS=offset-interval;
		var url=$(this).attr("request-url");

		if(scrTop>=sumS && scrTop<=sumB){
			$(this).load(url,function(responseTxt,statusTxt,xhr){
				if (statusTxt=="success") {
					$(this).hide();
					/**自定义函数begin**/
					$(this).find(".arrow-left").click(function() {
			        	slide_div=$(this).siblings(".brand-slide-content").children(".brand-slide-bg");
			       	 	moveLittlePage(slide_div,"left","moveFromRight","moveToLeft");   
			    	});
			    	$(this).find(".arrow-right").click(function() {
					        slide_div=$(this).siblings(".brand-slide-content").children(".brand-slide-bg");
					        moveLittlePage(slide_div,"right","moveFromLeft","moveToRight");       
					 });
			    	$(this).find(".floor-show-third ul li").mouseenter(function(){
						$(this).children("img").clearQueue();
						$(this).children("img").animate({padding:'0px'},300);
					});
					$(this).find(".floor-show-third ul li").mouseleave(function(){
						$(this).children("img").clearQueue();
						$(this).children("img").animate({padding:'0px 0px 0px 4px'},300);
					});
					
					/*小的滑动的幻灯片begin*/
					var brandSlideBg=$(this).find(".brand-slide-bg");
					brandSlideBg.children().bind('webkitAnimationStart', function() {
				       brandSlideBg.attr("is-animating","true");     
				    });
				    brandSlideBg.children().bind('webkitAnimationEnd', function() {
				        if($(this).hasClass("moveToLeft")){
				        	$(this).removeClass("page-current");
				    		$(this).removeClass("moveToLeft");
				    	}
				    	if($(this).hasClass("moveToRight")){
				    		$(this).removeClass("page-current");
				    		$(this).removeClass("moveToRight");
				    	}
						if($(this).hasClass("moveFromRight")){
				    		$(this).addClass("page-current");
				    		$(this).removeClass("moveFromRight");
				    	}
				        if($(this).hasClass("moveFromLeft")){

				        	$(this).addClass("page-current");
				    		$(this).removeClass("moveFromLeft");
				    	}
				        brandSlideBg.attr("is-animating","false"); 
				    });
				    /**自定义函数end**/
				    $(this).fadeIn(500);
					$(this).removeClass(className);
					$(this).unbind("lazyme");
				};
			});
		}
	});
}
