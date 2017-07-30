// $(function(){
// 	$('#download').click(function(){
// 		let obj={
// 			themename:$(this).data('themename'),
// 			times:$(this).data('downloadtimes')
// 		},
// 			str = $.param(obj);
// 		$.ajax({
// 			url: '/themestore/mytheme/download',
// 			type: 'GET',
// 			dataType: 'json',
// 			data:str,
// 			success:res=>{
//         		if(!res.errno) {
//         		}
//         		else alert('Please log in before downloading');
// 			}
// 		});
// 	})
// });