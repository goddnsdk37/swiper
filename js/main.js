const menu = ["SYNOPSIS","CHARACTER","TRAILER","GALLERY"];

const swiper = new Swiper("#wrap", {
    loop:true, //무한 반복
    slidesPerView: "auto", //동시에 보여줄 슬라이드 갯수
    centeredSlides: true, //true시 슬라이드가 가운데로 배치
    spaceBetween: 100, //슬라이드간 간격
    mousewheel:true,

    navigation:{
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
    },

    pagination:{ //페이지 버튼 사용자 설정
        el:".swiper-pagination", //페이지 버튼을 담을 태그설정
        type:"bullets", //버튼 모양 결정 "bullets","fraction"
        clickable:true, //버튼 클릭 여부
        // className이 기본값이 들어가게 필수 설정 
        renderBullet:function(index,className){ 
            return `<span class="${className}">${menu[index]}</span>`
        }
    },

    /*
    effect: "coverflow",
    coverflowEffect: {
        rotate:50,
        stretch:0,
        depth:400,
        slideShadows:false
    }
    */
});

//Dom Caching
const bgs = document.querySelectorAll(".bg li");
const prev = document.querySelector(".swiper-button-prev");
const next = document.querySelector(".swiper-button-next");
const navi = document.querySelectorAll(".swiper-pagination span");

next.addEventListener("click",activation);
prev.addEventListener("click",activation);
window.addEventListener("mousewheel",activation);
swiper.on("slideChangeTransitionEnd",activation);

for(let el of navi) {
    el.addEventListener("click", e=>{
        const isOn = e.currentTarget.classList.contains("swiper-pagination-bullet-active");

        if(isOn) return;
        swiper.on("slideChangeTransitionEnd",activation);
    })
}

function activation() {
    //속성값을 구할때는 getAttribute
    let item = document.querySelector(".swiper-slide-active");
    let i = item.getAttribute("data-swiper-slide-index");

    for(let el of bgs) {
        el.classList.remove("on");
    }
    bgs[i].classList.add("on");
}