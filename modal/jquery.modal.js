;(function($) {
	
  $.fn.setModal = function(options) {
  	
		var elem = this;
		
		elem.each(function(){
			
			options = $.extend({
				delayTime: 200,						//表示までの待ち時間
				fadeTime : 500,						//表示のフェード時間
				alpha : 0.5,							//レイヤーの透明度
				
				limitMin : 1,							//何分経過後に再度表示するか
				
				easing: 'linear',					//イージング
				
				limitCookie : 1	 					//cookie保存期間
			}, options);
							
				
			var limitSec = options.limitMin * 60; //秒数に変換
						
						
			if ($.cookie('setModalTime') == null) {
				
				/*----------------------------------------
					cookieがない場合
				 ----------------------------------------*/
				setModalFunc ();
				
				//cookieに現在の時間をセット
				var start = new Date();
				$.cookie('setModalTime', start.getTime(), { expires: options.limitCookie,path: '/' });
				
				
			} else {
				
				/*----------------------------------------
					cookieがある場合
				 ----------------------------------------*/
				
				//現在のミリ秒を取得し、秒数に変換
				var now = new Date();
				secDiff = now.getTime() - $.cookie('setModalTime');
				secTime = Math.floor( secDiff / 1000);
				
				
				//指定時間を経過していた場合は、setModalを表示
				//cookieを削除後、再度cookieに現在のミリ秒をセット
				if (secTime >= limitSec) {
					
					setModalFunc ();
					
					$.cookie('setModalTime', null, { expires:-1,path: '/' });
					
					var start = new Date();
					$.cookie('setModalTime', start.getTime(), { expires:options.limitCookie,path: '/' });
					
				}
				
			}
			
			
			/*----------------------------------------
				表示処理
			 ----------------------------------------*/
			function setModalFunc () {
				
				
				$('.md-modal', elem).show().animate({opacity: 0},0).delay(options.delayTime).animate({opacity: options.alpha},options.fadeTime,function(){
					$('.md-modal-content', elem).fadeIn(options.fadeTime);																																					
				})
					
			}
			
			
			/*----------------------------------------
				非表示処理
			 ----------------------------------------*/
			$('.md-modal', elem).click(function() {
				
				$('.md-modal-content', elem).fadeOut(options.fadeTime);
				$(this).fadeOut(options.fadeTime);
				
				
			});
			
			
			//closeボタンの場合
			$('.md-button-close', elem).click(function() {
				
				$('.md-modal-content', elem).fadeOut(options.fadeTime);
				$('.md-modal', elem).fadeOut(options.fadeTime);
				
				
			});

			
			
			/*----------------------------------------
				ボタンによる表示処理
			 ----------------------------------------*/
			$('.md-modal-content_btn').click(function() {
				
				$('.md-modal', elem).show().animate({opacity: 0},0).delay(options.delayTime).animate({opacity: options.alpha},options.fadeTime,function(){
					$('.md-modal-content', elem).fadeIn(options.fadeTime);																																					
				});
				
			});
	
		});
		
		return this;
		
	};
	
})( jQuery );


