// document.body.id = "skrollr-body"
// var s = skrollr.init()

// 頁面滑動
$("navbar.navbar").on('click', 'a', function(event){
  event.preventDefault();
  $('html, body').animate({
      scrollTop: $( $.attr(this, 'href') ).offset().top
  }, 300);
  if(clicknum%2!=0){$("button.navbar-toggler").click()}
});

// 控制navbar
$(window).scroll(function(){
  if($(window).scrollTop()>0){
    $("navbar.navbar, header h5, .block_container").removeClass("at_top")
  }else if($(window).scrollTop()==0 && clicknum%2!=0){
    $("navbar.navbar, header h5").removeClass("at_top")
  }else{
    $("navbar.navbar, header h5, .block_container").addClass("at_top")
  }
})

var clicknum=0;
function clicked(count){ 
  clicknum+=count
  if(clicknum%2!=0 && $(window).scrollTop()==0){
    $("button.navbar-toggler").addClass("click")
    $("navbar.navbar").removeClass("at_top")
  }else if(clicknum%2==0 && $(window).scrollTop()==0){
    $("button.navbar-toggler").removeClass("click")
    $("navbar.navbar").addClass("at_top")
  }else if(clicknum%2!=0){
    $("button.navbar-toggler").addClass("click")
  }else if(clicknum%2==0){
    $("button.navbar-toggler").removeClass("click")
  }
}

// CREA偵測移動
$(window).mousemove(function(evt){
  var x=evt.pageX-$("section#creator").offset().left;
  var y=evt.pageY-$("section#creator").offset().top;
  var width=$(".movepotato").width()/2;
  
  if(x<width){
    $(".movepotato").css("left",0)
  }else if($("section#creator").width()-x<width){
    $(".movepotato").css("left",$("section#creator").width()-width*2)
  }else{
    $(".movepotato").css("left",x-width)
  }
  
  $(".team img").mouseover(function(){
    $(".movepotato").css("transform","translateY(-60px)")
    $("img.up").css("opacity",1)
  })
  $(".team").mouseout(function(){
    $(".movepotato").css("transform","translateY(0px)")
    $("img.up").css("opacity",0)
  })
  
  $(".block_container .block1").css("transform","rotate(40deg) translateX("+x/100+"px)")
  $(".block_container .block2").css("transform","rotate(40deg) translateY("+x/90+"px)")
  $(".block_container .block3").css("transform","rotate(40deg) translateX("+x/-70+"px)")
  $(".block_container .block4").css("transform","rotate(40deg) translateX("+x/75+"px)")
  $(".block_container .block5").css("transform","rotate(40deg) translateY("+x/85+"px)")
  $(".block_container .block6").css("transform","rotate(40deg) translateY("+x/-90+"px)")
  $(".block_container .block7").css("transform","rotate(40deg) translateX("+x/100+"px)")
  
  $("section#attractions img.margin").css("transform","translateY("+x/-90+"px)")
})

// CREA載入name&url
var creatordata=[{name:"不只是旅行",imgurl:"https://github.com/chan2159991/travelpotato/blob/main/img/creator_picture1.jpg?raw=true",channel:"https://www.youtube.com/channel/UCtDL1RpW8r_Fg7D0aoFAqQw/featured"},{name:"Aiky一點GO愛旅遊",imgurl:"https://github.com/chan2159991/travelpotato/blob/main/img/creator_picture2.jpg?raw=true",channel:"https://www.youtube.com/channel/UCqDD7eYOdfFzVULKtJ4CZKA"},{name:"肉比頭Zoebitalk",imgurl:"https://github.com/chan2159991/travelpotato/blob/main/img/creator_picture3.jpg?raw=true",channel:"https://www.youtube.com/c/Zoebitalk"}]


// ATTR載入JSON
var vm = Vue.createApp({
  data: function(){
    return{
      attrdatas:'',
      pagedata:'',
      currentIndex:1,
      creatordatas:creatordata
    }
  },
  methods: {
    showinfo: function(id){
      $(".moreinfos"+id).show('fast')
      $(".moreinfos_bg").show()
    },
    switchpage: function(num){
      this.currentIndex=num
      this.attrdatas=this.pagedata.slice(num*10-10,num*10)
    },
    pluspage: function(id){
      this.currentIndex+=id
      if(this.currentIndex<1){
        this.currentIndex=1
      }else if(this.currentIndex>10){
        this.currentIndex=10
      }
      this.attrdatas=this.pagedata.slice(this.currentIndex*10-10,this.currentIndex*10) 
    }
  },
  mounted: function(){
    var obj=this
    $.ajax({
      url:'https://raw.githubusercontent.com/chan2159991/travelpotato/main/scenic.json',
      dataType:'json',
      success:function(res){
        var datas=res;
        // console.log(datas.XML_Head.Infos.Info.slice(0,10))
        origindata=datas.XML_Head.Infos.Info
        let current=[]
        for(var i=0;i<origindata.length;i++){
          if(origindata[i].Picture1!=""){
            current.push(origindata[i])
          }
        }
        // console.log(current)
        obj.attrdatas=current.slice(0,10)
        obj.pagedata=current.slice(0,100)
      }      
    })
  }
}).mount("#app")

function closeinfo(){
  $(".moreinfos").hide('fast')
       $(".moreinfos_bg").hide()
}


// ABOUT圖片輪播
let index=0;

function showslide(n){
  let slides=document.getElementsByClassName("mySlides");
  let dots=document.getElementsByClassName("dot");
  if(n>slides.length-1){
    index=0;
  }
  if(n<0){
    index=slides.length-1
  }
  for(var i=0;i<slides.length;i++){
    slides[i].style.display="none";
    $(dots[i]).removeClass("active")
  }
  slides[index].style.display="block"
  $(dots[index]).addClass("active")
}

function plus(n){
  showslide(index+=n)
}

function currentSlide(n){
  showslide(index=n)
}

showslide(index)
timer=setInterval('showslide(index+=1)',8000)
$(".slideshow_container .mySlides, .slideshow_container a, .dots").mouseover(function(){
  clearInterval(timer)
})
$(".slideshow_container .mySlides, .slideshow_container a, .dots").mouseout(function(){
  timer=setInterval('showslide(index+=1)',8000)
})