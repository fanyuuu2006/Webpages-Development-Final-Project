import { Carousel } from "./carousel.js";
// 初始化carousel
const carousel = new Carousel(".carousel__container", ".carousel__slide");
carousel.autoPlay(5000);
