let slideIndex = -1;
let dots = document.getElementsByClassName("dot");
const slideWidth = 600;
const slideshow = document.querySelector(".slideshow");
const totalSlides = document.querySelectorAll(".slides").length;
let slideshowInterval;

const main = document.querySelector('main')
showSlides();


function showSlides(){
    slideIndex++;
    if (slideIndex == (totalSlides)) {
        slideIndex = 0;
        //slideshow.style.transition = "none";
        slideshow.style.transform = `translateX(0)`;
        setTimeout(() => {
            slideshow.style.transition = "transform 0.5s";
        }, 10);
    }
    dotControl(slideIndex);
    slideshow.style.transform = `translateX(-${slideIndex * slideWidth}px)`;
    slideshowInterval = setTimeout(showSlides, 2000);
    main.innerHTML = `Index: ${slideIndex}`;
}

function manageSlide(direction){
    clearTimeout(slideshowInterval);
    slideIndex += direction;
    if(slideIndex < 0){
        slideIndex = (totalSlides-1);
    }else if(slideIndex == totalSlides){
        slideIndex = 0;
    }
    dotControl(slideIndex);
    main.innerHTML = `Index: ${slideIndex}`;
    slideshow.style.transform = `translateX(-${slideIndex * slideWidth}px)`;
    slideshowInterval = setTimeout(showSlides, 2000);
}

function currentSlide(slide){
    clearTimeout(slideshowInterval);
    slideIndex = slide;
    dotControl(slideIndex);
    main.innerHTML = `Index: ${slideIndex}`;
    slideshow.style.transform = `translateX(-${slideIndex * slideWidth}px)`;
    slideshowInterval = setTimeout(showSlides, 2000);
}

function dotControl(slideIndex){
    for(let i = 0; i < dots.length; i++){
        dots[i].className = dots[i].className.replace(" active", "");
    }
    dots[slideIndex].className += " active";
}