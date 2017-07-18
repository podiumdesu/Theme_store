$(function(){
	$('.delete-theme').click(function(){
		let filesrc = $(this).data('filesrc');
		let str = $.param({filesrc:filesrc});
		$.ajax({
			url:'/themestore/mytheme/delete',
			type:'POST',
			dataType:'JSON',
			data:str,
			success:function(e){
				if(!e.errno) {
					alert('删除成功！');
					window.location.reload();
				}
				else alert('删除失败，请重试！');
			}
		});
	});
});