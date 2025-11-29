import { Carousel } from "./carousel.js";

const HERO_CAROUSEL_CONTAINER_SELECTOR = ".carousel__container";
const HERO_CAROUSEL_SLIDE_SELECTOR = ".carousel__slide";

const data: {
  name: string;
  slogan?: string;
  src?: string;
  genre?: string;
  rating?: string;
  releaseDate?: string;
  director?: string;
}[] = [
  {
    name: "范余振富：叫我做什麼",
    slogan: "震撼期末專案，即將被當",
    src: "https://fanyu.vercel.app/api/album/item/1Zo_PjrXm-4TBrL2cLAeFkEl1el9kTR56?retry=0",
    genre: "喜劇/動作",
    rating: "PG-13",
    releaseDate: "2025-12-01",
    director: "范余導演",
  },
  {
    name: "雷神索爾：愛與雷電",
    slogan: "英雄歸來，愛情與戰鬥並存",
    src: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=1920&h=800&fit=crop&crop=center",
    genre: "動作/冒險",
    rating: "PG-13",
    releaseDate: "2025-12-05",
    director: "塔伊加·維迪提",
  },
  {
    name: "不可能的任務：致命清算",
    slogan: "極限動作，絕地求生",
    src: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=1920&h=800&fit=crop&crop=center",
    genre: "動作/驚悚",
    rating: "PG-13",
    releaseDate: "2025-12-10",
    director: "克里斯多福·麥奎里",
  },
  {
    name: "蜘蛛人：穿越新宇宙",
    slogan: "多重宇宙，無限可能",
    src: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=1920&h=800&fit=crop&crop=center",
    genre: "動畫/動作",
    rating: "PG",
    releaseDate: "2025-12-15",
    director: "華金·多斯·桑托斯",
  },
  {
    name: "玩具總動員：巴斯光年",
    slogan: "星際冒險，友情無價",
    src: "https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?w=1920&h=800&fit=crop&crop=center",
    genre: "動畫/家庭",
    rating: "G",
    releaseDate: "2025-12-22",
    director: "安格斯·麥克萊恩",
  },
  {
    name: "星際大戰：新希望重燃",
    slogan: "原力覺醒，銀河系的最後希望",
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=800&fit=crop&crop=center",
    genre: "科幻/冒險",
    rating: "PG-13",
    releaseDate: "2025-12-25",
    director: "瑞安·約翰遜",
  },
];
const carouselSlide = document.querySelector<HTMLElement>(
  HERO_CAROUSEL_SLIDE_SELECTOR
);
if (carouselSlide) {
  carouselSlide.innerHTML = data
    .map(
      (item) => `
    <div class="w-full h-full relative">
        <img
        src="${item.src || ""}"
        class="w-full h-full object-cover"
        alt="電影橫幅 - ${item.name}"
        />
        <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
        <div class="text-center text-white">
            <h2 class="text-4xl md:text-6xl font-bold mb-4">${item.name}</h2>
            <p class="text-xl md:text-2xl mb-6">${item.slogan || ""}</p>
            <button class="btn-primary px-8 py-3 rounded-full text-lg">立即訂票</button>
        </div>
        </div>
    </div>
    `
    )
    .join("");
}

// 初始化carousel
const carousel = new Carousel(
  HERO_CAROUSEL_CONTAINER_SELECTOR,
  HERO_CAROUSEL_SLIDE_SELECTOR
);
carousel.autoPlay(5000);
