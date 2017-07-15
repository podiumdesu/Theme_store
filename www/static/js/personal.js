$(function(){
	$('form').submit(evt=>{
		evt.preventDefault();
		$.ajax({
			url: '/user/personal/update',
			type: 'POST',
			dataType: 'json',
			data: $('form').serialize(),
			success:res=>{
        		if(!res.errno) {
        			alert('更新成功！');
        			window.location.reload();
        		}
        		else alert(res.errmsg);
			}
		});
	});
});