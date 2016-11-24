function Location(){//不得不提，我就因为一开始给这个函数起名location,用到了关键字，怎么都不出结果，调了一晚上没找出原因
	if(navigator.geolocation)   //检测当前设备是否支持H5Geolocation API
		{
			navigator.geolocation.getCurrentPosition(showPosition,error); 
			  //检测结果存在地理定位对象的话，navigator.geolocation调用将返回该对象
			 //第一个参数获取当前地理信息成功是执行的回调函数，带3个参数，
			 //第一个参数是必写的，表示获取当前地理位置信息成功时所执行的回调函数，该函数参数position也是必须。
			 //第二个参数是获取地理位置信息失败的回调函数，该函数的参数error也是必写的，第三个参数是一些可选属性列表（2、3个参数可省略）
			}                                                       
	else{
			alert("该浏览器不支持获取地理位置");
		}
	}

function showPosition(position){
	var latlng=position.coords.latitude+","+position.coords.longitude;

		var url = 'http://maps.google.cn/maps/api/geocode/json?latlng='+latlng+'&language=CN';
	
		$.ajax({
			type:"GET",	
			url:url,
			beforeSend:function(){
				document.getElementById("google_street").innerHTML="正在定位...";
				},			

			success:function(json){
				if(json.status=='OK'){
				$.each(json.results,function(index,item){
					//当地理编码器返回结果时，会将其放在一个 (JSON) results 数组中。即使未返回任何结果（例如，如果地址不存在），
					//地理编码器仍然会返回一个空的 results 数组。
				if(index==0){ //数组的第一项是formatted_adress	
				//$("#google_street").html(item['formatted_address']);
				document.getElementById("google_street").innerHTML=item['formatted_address'];
				//formatted_address 是一个字符串，其中包含该位置的可人工读取地址。通常该地址就相当于“邮政地址”，有时会因国家/地区的不同而存在差异。
				}
				});
				}
				},
			error:function(XMLHttpRequest,textStatus,errorThrown){
				document.getElementById("google_street").innerHTML="获取地址失败";
				}
			});
	}
	
function error(error){           //强调code有3个返回值，分别代表不同的错误
	var err = error.code;
	switch(err){
		case 1:alert("用户拒绝了位置服务");
		case 2:alert("获取不到位置信息");
		case 3:alert("获取信息超时");
		}
	}
Location(); //记得在最后执行一下调用就好了

var mousecount1=0;
var mousecount2=0;
function lidown1(obj){
	mousecount1+=1;
	var x=obj.parentNode;//获取当前span标签的父节点，也就是div
	var y=x.getElementsByTagName('ul')[0];//获取div里的第一个标签名为ul的标签
	judge1(mousecount1,y);
}
function judge1(mousecount1,y){
if(mousecount1%2==1){//判断当前ul是展开还是隐藏
	y.style.display="block";//将这个ul的可见性设为block
	}
	else{y.style.display="none";}
	}
function chio1(obj){
	var t=document.getElementById("boxtext1");
	var v=obj.value;	
	v=v.replace("✔","");	
	t.value=v;
	var x=obj.parentNode;
	var y=x.parentNode;
	y.style.display="none";
	mousecount1=0;
	}	


function Ohover(obj){
	obj.value="✔"+obj.value;
	obj.style.paddingLeft="20px";<!--这个数看着你的（对勾）符号大小改-->	
	}
function Ole(obj){
	var x=obj.value;	
	x=x.replace("✔","");	
	obj.value=x;
	obj.style.paddingLeft="30px";<!--鼠标离开后距离改回来-->
	}
function lidown2(obj){
	mousecount2+=1;
	var x=obj.parentNode;//获取当前span标签的父节点，也就是div
	var y=x.getElementsByTagName('ul')[0];//获取div里的第一个标签名为ul的标签
	judge2(mousecount2,y);	
}
function judge2(mousecount2,y){
if(mousecount2%2==1){//判断当前ul是展开还是隐藏
	y.style.display="block";//将这个ul的可见性设为block
	}
	else{y.style.display="none";}
	}

function chio2(obj){
	var t=document.getElementById("boxtext2");//数字要改
	var v=obj.value;	
	v=v.replace("✔","");	
	t.value=v;
	var x=obj.parentNode;
	var y=x.parentNode;
	y.style.display="none";
	mousecount2=0;;//数字要改	
	}

  
$(function(){ 
 var k=0;
 var clone=$( ".carousel .img li" ).first().clone();
 $( ".carousel .img" ).append(clone)
 var j=$( ".carousel .img li" ).size()   //克隆后再求长度
/* alert(j)*/

 
// 利用js根据图片个数为num类添加<li>标签
// for (i=0;i<j-1;i++){
// $( ".carousel .num" ).append( "<li></li>" )
// }
// 
// $( ".carousel .num li" ).first().addClass( "dot" )
   
//    //鼠标悬浮圆点
// $( ".carousel .num li" ).hover(function(){
//  var index=$(this).index();
//  k=index;
//  $( ".carousel .img" ).animate({left:-index*350},500)
//  $(this).addClass( "dot" ).siblings().removeClass( "dot" ) 
//  })
 //自动轮播
 var t=setInterval(moveL,2000);
  
 //鼠标悬浮page1-main-center是定时器停止运行
// $( ".carousel" ).hover(function(){
//  clearInterval(t);
//  },function(){
//   var t=setInterval(moveL,2000)
//  })
  //鼠标悬浮btn时定时器停止运行
// $( ".btn" ).hover(function(){
//  clearInterval(t);
//  },function(){
//   var t=setInterval(moveL,2000)
//  })
 //向左
 $( ".carousel .button_L" ).click(function(){  
            moveL();
  })
  

 //向右
 $( ".carousel .button_R" ).click(function(){  
              moveR();
  })
    
    
 function moveL(){
     k++;
/*  if(k==j)
  {alert(k)
   $(".carousel .img").css({left:0})
   k=1;
   
   }
   $(".carousel .img").animate({left:-k*392},500)
   $(".carousel .num li").eq(k).addClass("dot").siblings().removeClass("dot")
   })*/
  if(k<j)
  {
   $( ".carousel .img" ).animate({left:-k*350},500)
   if(k==j-1){$( ".carousel .num li" ).eq(0).addClass( "dot" ).siblings().removeClass( "dot" )}
      $( ".carousel .num li" ).eq(k).addClass( "dot" ).siblings().removeClass( "dot" )
  }
  else
  {
      /*k=0; */
      $( ".carousel .img " ).css({left:0})   
     k=1;   
   $( ".carousel .img" ).animate({left:-k*350},500)
      $( ".carousel .num li" ).eq(k).addClass( "dot" ).siblings().removeClass( "dot" )}

   }
  
  function moveR(){
  k--;
  if(k>=0)
  {$( ".carousel .img" ).animate({left:-k*350},500)
   $( ".carousel .num li" ).eq(k).addClass( "dot" ).siblings().removeClass( "dot" )}
  else
  {
    
     $( ".carousel .img" ).css({left:-(j-1)*700})   
     k=j-2;
     $( ".carousel .img" ).animate({left:-k*350},500)
     $( ".carousel .num li" ).eq(k).addClass( "dot" ).siblings().removeClass( "dot" )}
      
   }
  
 })