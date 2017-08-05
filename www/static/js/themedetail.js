$(function(){
  //判断此主题是否为当前排序下的最前或最后
  let step = firstOrLast.value;
  if(step != 'first'){
    $('#stepBefore').removeAttr("disabled");
    stepBefore.setAttribute('href',`/themestore/theme/step/id/${themeid.value}/themename/${themename.value}/step/before`);
  }
  if(step != 'last'){
    $('#stepNext').removeAttr("disabled");
    stepNext.setAttribute('href',`/themestore/theme/step/id/${themeid.value}/themename/${themename.value}/step/next`);
  }
  let sr = new StarRank({
    container:'#star',
    rank:marking.innerText,
    rankCustom(index){
      let str = $.param({rank:index,themename:themename.value,mmuid:thememmuid.value});
      let rank;
      $.ajax({
          url:'/themestore/mytheme/rank',
          type:'POST',
          dataType:'JSON',
          data:str,
          async:false,
          success:function(res){
            if(!res.errno) {
              rank = Math.round(res.data.rank);
              marking.innerText = res.data.rank;
              num.innerText = res.data.markingnum;
            }
            else{
              alert(res.errmsg);
              rank = 'orRank';
            }
          }
        });
      return rank;
    }
  });
  $('#download').click(function(){
      let filename = $(this).data('filename'),
          times = $(this).data('times');
      let str = $.param({filename:filename,times:times});
      $.ajax({
        url:'/themestore/theme/download',
        type:'POST',
        dataType:'JSON',
        data:str
      });
  });
  $('#deleteTheme').click(function(){
    if(confirm('Are you sure to delete this theme?')){
      let filesrc = encodeURIComponent($(this).data('filesrc'));
      let str = $.param({filesrc:filesrc});
      $.ajax({
        url:'/themestore/mytheme/delete',
        type:'POST',
        dataType:'JSON',
        data:str,
        success:function(e){
          if(!e.errno) {
            alert('Delete successfully!');
            window.location.pathname='/themestore/theme/index';
          }
          else alert('Delete failed, please try again！');
        }
      });
    }
  });
});