$(function(){
    //文件上传
    $('#fileUpload').submit(function (e) {
        e.preventDefault();
        var data = new FormData($(this)[0]);
    	$.ajax({
            url: '/themestore/upload/theme',
            type: 'POST',
            data: data,
            async: false,  
            cache: false,  
            contentType: false,  
            processData: false,
            success:function (res) {
        		if(!res.errno) alert('上传成功！');
        		else alert(res.errmsg);
        	}
    	});
    });
}); 