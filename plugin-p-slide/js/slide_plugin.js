/**
 * xq 2015-08-14
 */
var slide=function(){
	function slide_fh(){
		
	};
	slide_fh.prototype={
		constructor:slide_fh,
		innerHtml:"<div class="floor-show-middle">
            <a class="floor-show-middle-arrow arrow-left"  title="上一个幻灯片"></a>
            <a  class="floor-show-middle-arrow  arrow-right"   title="下一个幻灯片"></a>
            <div class="brand-slide-content">
                <div class="brand-slide-bg" is-animating="false">                   
                    <p class="pt-page page-current">
                        <a href=""><img src="images/1-1.jpg"></a>
                        <a href=""><img src="images/1-2.jpg"></a>
                        <a href=""><img src="images/1-3.jpg"></a>
                    </p>
                    <p class="pt-page">
                        <a href=""><img src="images/2-1.jpg"></a>
                        <a href=""><img src="images/2-2.jpg"></a>
                        <a href=""><img src="images/2-3.jpg"></a>
                    </p>
                    <p class="pt-page">
                        <a href=""><img src="images/3-1.jpg"></a>
                        <a href=""><img src="images/3-2.jpg"></a>
                        <a href=""><img src="images/3-3.jpg"></a>
                    </p>
                </div>
            </div>
        </div>",
	};
	return slide_fh;
};