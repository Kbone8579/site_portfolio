// 페이지이동(portfolio, contents)
$(document).ready(function(){
    // 탑바 버튼튼
    document
    .querySelector(".button1")
    .addEventListener("click", (e) => {
      document.querySelector(".page.p4").scrollIntoView({ behavior: "smooth" });
    });
    document
    .querySelector(".button2")
    .addEventListener("click", (e) => {
      document.querySelector(".page.p3").scrollIntoView({ behavior: "smooth" });
    });
    document
    .querySelector(".button3")
    .addEventListener("click", (e) => {
      document.querySelector(".page.p2").scrollIntoView({ behavior: "smooth" });
    });

    // controller
    document
    .querySelector(".box.b1")
    .addEventListener("click", (e) => {
      document.querySelector(".page.p2").scrollIntoView({ behavior: "smooth" });
    });
    document
    .querySelector(".box.b2")
    .addEventListener("click", (e) => {
      document.querySelector(".page.p3").scrollIntoView({ behavior: "smooth" });
    });
    document
    .querySelector(".box.b3")
    .addEventListener("click", (e) => {
      document.querySelector(".page.p4").scrollIntoView({ behavior: "smooth" });
    });
});

// svg 애니매이션션
$(document).ready(function () {
  const content0 = document.querySelector(".page.p1");
  const content1 = document.querySelector(".page.p2");
  const content2 = document.querySelector(".page.p3");
  const content3 = document.querySelector(".page.p4");
  const path0 = document.querySelector(".path1");
  const path1 = document.querySelector(".path2");
  const path2 = document.querySelector(".path3");
  const path3 = document.querySelector(".path4");
  const path0Length = path0.getTotalLength();
  const path1Length = path1.getTotalLength();
  const path2Length = path2.getTotalLength();
  const path3Length = path3.getTotalLength();
  path0.style.strokeDasharray = path0Length;
  path2.style.strokeDashoffset = path0Length;

  path1.style.strokeDasharray = path1Length;
  path1.style.strokeDashoffset = calcDashoffset(
    window.innerHeight * 0.8,
    content1,
    path1Length
  );

  path2.style.strokeDasharray = path2Length;
  path2.style.strokeDashoffset = path2Length;

  path3.style.strokeDasharray = path3Length;
  path3.style.strokeDashoffset = calcDashoffset(
    window.innerHeight * 1.0,
    content3,
    path3Length
  );

  function calcDashoffset(scrollY, element, length) {
    const ratio = (scrollY - element.offsetTop) / element.offsetHeight;
    const value = length - length * ratio;
    return value < 0 ? 0 : value > length ? length : value;
  }

  function scrollHandler() {
    const scrollY0 = window.scrollY + window.innerHeight * 0.88;
    const scrollY1 = window.scrollY + window.innerHeight * 0.8;
    const scrollY2 = window.scrollY + window.innerHeight * 1.0;
    path0.style.strokeDashoffset = calcDashoffset(
      scrollY0,
      content0,
      path0Length
    );
    path1.style.strokeDashoffset = calcDashoffset(
      scrollY1,
      content1,
      path1Length
    );
    path2.style.strokeDashoffset = calcDashoffset(
      scrollY1,
      content2,
      path2Length
    );
    path3.style.strokeDashoffset = calcDashoffset(
      scrollY2,
      content3,
      path3Length
    );
  }

  window.addEventListener("scroll", scrollHandler);
});

$(document).ready(function () {
  var typingBool = false;
  var typingBool1 = false;
  var typingIdx = 0;
  var liIndex = 0;
  var liIndex2 = 0;
  var liLength = $(".typing-txt1>ul>li").length;
  var liLength2 = $(".typing-txt2>ul>li").length;
  var del = -1;
  var repeatInt = null;
  var tyInt = null;

  // 타이핑될 텍스트를 가져온다
  var typingTxt = $(".typing-txt1>ul>li").eq(liIndex).text();
  typingTxt = typingTxt.split(""); // 한글자씩 자른다.

  if (typingBool == false) {
    // 타이핑이 진행되지 않았다면
    typingBool = true;
    tyInt = setInterval(typing, 100); // 첫번재 반복동작
  }

  function typing() {
    if (typingIdx < typingTxt.length) {
      // 타이핑될 텍스트 길이만큼 반복
      $(".typing>ul>li").removeClass("on");
      $(".typing ul li").eq(liIndex).addClass("on");
      $(".typing ul li").eq(liIndex).append(typingTxt[typingIdx]);
      // 한글자씩 이어준다.
      typingIdx++;
      if (typingIdx == typingTxt.length) {
        if (liIndex == 2) {
          clearInterval(tyInt);
          setTimeout(function () {
            $(".typing>ul>li").removeClass("on");
          }, 100);
        } else {
          //첫번째 단어가 써지면 5초쉰다.

          clearInterval(tyInt);
          setTimeout(function () {
            tyInt = setInterval(typing, 200);
          }, 800);
        }
      }
    } else {
      //한문장이끝나면
      if (liIndex == 1 && typingBool1 == false) {
        if (-typingTxt.length - 1 < del) {
          //한글자씩 지운다.
          $(".typing ul li").eq(liIndex).html(typingTxt.slice(0, del));
          del--;
        } else {
          //변수초기화
          typingIdx = 0;
          del = -1;
          typingTxt = $(".typing-txt2>ul>li").eq(liIndex2).text();
          liIndex2++;
          if (liIndex2 == liLength2) {
            typingBool1 = true;
          }

          //1초후 다음문장 타이핑
          clearInterval(tyInt);
          setTimeout(function () {
            tyInt = setInterval(typing, 100);
          }, 100);
        }
      } else {
        typingIdx = 0;
        if (liIndex <= liLength - 1) {
          liIndex++;
        }
        typingTxt = $(".typing-txt1>ul>li").eq(liIndex).text();
      }
    }
  }
});

// 부드러운 스크롤 애니매이션션
$(document).ready(function(){
  class Scrooth {
    constructor({element = window, strength=10, acceleration = 1.2,deceleration = 0.975}={}) {
      this.element = element;
      this.distance = strength;
      this.acceleration = acceleration;
      this.deceleration = deceleration;
      this.running = false;
  
      this.element.addEventListener('wheel', this.scrollHandler.bind(this), {passive: false});
      this.element.addEventListener('mousewheel', this.scrollHandler.bind(this), {passive: false});
      this.scroll = this.scroll.bind(this);
    }
  
    scrollHandler(e) {
      e.preventDefault();
  
      if (!this.running) {
        this.top = this.element.pageYOffset || this.element.scrollTop || 0;
        this.running = true;
        this.currentDistance = e.deltaY > 0 ? 0.1 : -0.1;
        this.isDistanceAsc = true;
        this.scroll();
      } else {
        this.isDistanceAsc = false;
        this.currentDistance = e.deltaY > 0 ? this.distance : -this.distance;
      }
    }
  
    scroll() {
      if (this.running) {
        this.currentDistance *= this.isDistanceAsc === true ? this.acceleration : this.deceleration;
        Math.abs(this.currentDistance) < 0.1 && this.isDistanceAsc === false ? this.running = false : 1;
        Math.abs(this.currentDistance) >= Math.abs(this.distance) ? this.isDistanceAsc = false : 1;
  
        this.top += this.currentDistance;
        this.element.scrollTo(0, this.top);
        
        requestAnimationFrame(this.scroll);
      }
    }
  }
  
  const scroll = new Scrooth({
    element: window,
    strength: 24,
    acceleration: 1.8,
    deceleration: 0.945,
  });
});

// 탑버튼
$(document).ready(function(){
  $(".contents-navigation").hide();
  $(window).scroll(function(){
    if($(this).scrollTop() > 500){$(".contents-navigation").fadeIn();}
    else{$(".contents-navigation").fadeOut();}
  });

  $('.top-btn').click(function(){
    $('html, body').animate({scrollTop : 0}, 800);
      return false;
  });
});

// remote-control 스크립트트
// JavaScript for animating the controller
document.addEventListener('DOMContentLoaded', function() {
  const remoteControl = document.querySelector('.remote-control');
  const controller = document.querySelector('.controller');
  
  // Initially hide the controller off-screen
  controller.style.transform = 'translateX(100%)';
  controller.style.transition = 'transform 0.5s ease-in-out';
  controller.style.visibility = 'hidden';
  
  let isControllerVisible = false;
  
  remoteControl.addEventListener('click', function() {
    if (!isControllerVisible) {
      // Show controller
      controller.style.visibility = 'visible';
      setTimeout(() => {
        controller.style.transform = 'translateX(0)';
      }, 10); // Small delay to ensure visibility is applied first
    } else {
      // Hide controller
      controller.style.transform = 'translateX(100%)';
      setTimeout(() => {
        controller.style.visibility = 'hidden';
      }, 500); // Wait for the animation to complete
    }
    
    isControllerVisible = !isControllerVisible;
  });
});