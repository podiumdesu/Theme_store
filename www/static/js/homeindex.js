$(function(){
	$('#logout').click(function(){
		$.ajax({
			url:'/user/login/logout',
			type:'POST',
			dataType:'JSON',
			success:function(e){
				if(!e.errno) window.location.reload();
			}
		});
	});
});