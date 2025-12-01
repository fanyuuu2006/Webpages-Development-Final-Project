//
//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//
//
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//
//               佛祖保佑         永无BUG
//

import { Carousel } from "./carousel.js";
import { MovieItem, NewsItem } from "./types/index.js";

const HERO_CAROUSEL_CONTAINER_SELECTOR = ".carousel__container";
const HERO_CAROUSEL_SLIDE_SELECTOR = ".carousel__slide";
const POPULAR_MOVIES_CONTAINER_SELECTOR = "#popular-movies";
const NEWS_CONTAINER_SELECTOR = "#latest-news";
const BOOKING_PAGE_URL = "http://35.189.180.230/user_search.php";

// 統一的電影數據 - 同時用於輪播和熱門電影區域
const moviesData: MovieItem[] = [
  {
    name: "飯魚奇遇記",
    slogan: "史上最神秘的奇幻冒險，超越時空的傳奇故事",
    src: "https://fanyu.vercel.app/api/album/item/1Zo_PjrXm-4TBrL2cLAeFkEl1el9kTR56?retry=0",
    genre: "奇幻/冒險",
    rating: "18+",
    releaseDate: "2025-12-31",
    director: "神秘導演",
    status: "12/31 上映",
    statusType: "upcoming",
  },
  {
    name: "鬼滅の刃 猗窩座再臨",
    slogan: "無限列車的續篇，炎柱煉獄杏壽郎與猗窩座的宿命對決",
    src: "https://www.vscinemas.com.tw/upload/film/film_20250428011.jpg",
    genre: "動畫/動作",
    rating: "輔12+",
    releaseDate: "2025-11-28",
    director: "外崎春雄",
    status: "熱映中",
    statusType: "current",
  },
  {
    name: "動物方程式2",
    slogan: "茱蒂與尼克回歸！全新的動物城市冒險等著你",
    src: "https://www.unicornpopcorn.com.tw/ForVsWeb/upload/film/film_20251103043.jpg",
    genre: "動畫/家庭",
    rating: "普0+",
    releaseDate: "2025-11-26",
    director: "拜倫·霍華德",
    status: "熱映中",
    statusType: "current",
  },
  {
    name: "劇場版 咒術迴戰 澀谷事變×死滅迴游 先行上映",
    slogan: "最強咒術師的宿命之戰，澀谷事變震撼登場",
    src: "https://www.unicornpopcorn.com.tw/ForVsWeb/upload/film/film_20251027008.jpg",
    genre: "動畫/動作",
    rating: "輔12+",
    releaseDate: "2025-11-14",
    director: "朴性厚",
    status: "熱映中",
    statusType: "current",
  },
  {
    name: "鏈鉅人：蕾潔篇",
    slogan: "進擊的巨人最終章，人類與巨人的最後戰役",
    src: "https://www.vscinemas.com.tw/upload/film/film_20250815002.jpg",
    genre: "動畫/劇情",
    rating: "輔12+",
    releaseDate: "2025-11-11",
    director: "荒木哲郎",
    status: "熱映中",
    statusType: "current",
  },
];

// 最新消息與活動數據
const newsData: NewsItem[] = [
  {
    id: "christmas-special",
    title: "聖誕特惠週 買二送一",
    content:
      "聖誕節期間，任選兩部電影即可免費獲得第三部電影票券，與家人朋友共享溫馨時光。",
    category: "活動",
    categoryType: "activity",
    date: "2025/11/29",
    image:
      "https://fanyu.vercel.app/api/album/item/11-SlewLvFImPDCP80UvfXmujlPb94eKw?retry=0",
    alt: "聖誕特惠活動",
  },
  {
    id: "membership-upgrade",
    title: "會員制度全新升級",
    content:
      "全新的會員積分制度上線，觀影累積積分可兌換免費票券、爆米花和飲料。",
    category: "公告",
    categoryType: "announcement",
    date: "2025/11/25",
    image:
      "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=400&h=200&fit=crop&crop=center",
    alt: "會員制度升級",
  },
  {
    id: "vip-hall-opening",
    title: "VIP豪華廳盛大開幕",
    content:
      "全新VIP豪華廳正式開放，提供頂級觀影體驗，包含專屬服務和精緻餐點。",
    category: "新聞",
    categoryType: "news",
    date: "2025/11/20",
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=200&fit=crop&crop=center",
    alt: "新廳開幕",
  },
];

// 輪播幻燈片模板
const slideTemplate = document.createElement("template");
slideTemplate.innerHTML = `
  <div class="w-full h-full relative">
    <img class="w-full h-full object-cover" />

    <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div class="flex flex-col items-center gap-3">
        <h2 class="movie-title text-4xl md:text-6xl font-bold"></h2>
        <span class="movie-slogan text-xl md:text-2xl"></span>
        <a href="${BOOKING_PAGE_URL}" class="btn-primary px-8 py-3 rounded-full text-lg mt-2">
          立即訂票
        </a>
      </div>
    </div>
  </div>
`;

// 新聞卡片模板
const newsCardTemplate = document.createElement("template");
newsCardTemplate.innerHTML = `
  <div class="card overflow-hidden transition-all duration-300 ease-linear hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(0,0,0,0.1)] cursor-pointer">
    <img class="news-image w-full h-48 object-cover" />
    <div class="p-6">
      <div class="flex items-center mb-2">
        <span class="news-category px-2 py-1 rounded text-xs font-semibold text-white"></span>
        <span class="news-date text-xs text-[var(--text-color-muted)] ml-2"></span>
      </div>
      <h3 class="news-title text-lg font-bold mb-3 text-[var(--text-color-primary)]"></h3>
      <p class="news-content text-sm text-[var(--text-color-muted)] mb-4"></p>
      <a href="https://fanyu.vercel.app" target="_blank" class="text-[var(--brand-primary)] font-semibold text-sm">
        了解更多 →
      </a>
    </div>
  </div>
`;

// 熱門電影卡片模板
const movieCardTemplate = document.createElement("template");
movieCardTemplate.innerHTML = `
  <div class="card group cursor-pointer transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:-translate-y-2 hover:shadow-[0_25px_50px_rgba(88,166,255,0.2)]">
    <div class="relative overflow-hidden rounded-t-lg">
      <img class="movie-poster w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300" />
      <div class="movie-status absolute top-2 right-2 px-2 py-1 rounded-full text-sm font-semibold text-white">
      </div>
    </div>
    <div class="p-4">
      <h3 class="movie-name text-lg font-bold mb-2 text-[var(--text-color-primary)]">
      </h3>
      <p class="movie-description text-sm text-[var(--text-color-muted)] mb-3">
      </p>
      <div class="flex justify-between items-center">
        <span class="movie-release-status text-sm text-[var(--text-color-quaternary)] font-semibold"></span>
        <a href="http://35.189.180.230/user_search.php" class="movie-booking-btn btn-tertiary px-4 py-2 rounded-full text-sm">
        </a>
      </div>
    </div>
  </div>
`;

function renderCarouselSlides(items: MovieItem[], wrapper: HTMLElement) {
  const fragment = document.createDocumentFragment();

  items.forEach((item) => {
    const slide = slideTemplate.content.cloneNode(true) as HTMLElement;

    const img = slide.querySelector("img")!;
    img.src = item.src || "";
    img.alt = `電影橫幅 - ${item.name}`;

    const title = slide.querySelector(".movie-title")!;
    title.textContent = item.name;

    const slogan = slide.querySelector(".movie-slogan")!;
    slogan.textContent = item.slogan || "";

    fragment.appendChild(slide);
  });

  wrapper.innerHTML = "";
  wrapper.appendChild(fragment);
}

function renderPopularMovies(movies: MovieItem[], container: HTMLElement) {
  const fragment = document.createDocumentFragment();

  movies.forEach((movie) => {
    const movieCard = movieCardTemplate.content.cloneNode(true) as HTMLElement;

    // 設置電影海報
    const poster = movieCard.querySelector(".movie-poster") as HTMLImageElement;
    poster.src = movie.src || "";
    poster.alt = movie.name;

    // 設置電影名稱
    const name = movieCard.querySelector(".movie-name")!;
    name.textContent = movie.name;

    // 設置電影描述
    const description = movieCard.querySelector(".movie-description")!;
    description.textContent = movie.slogan || "";

    // 設置上映狀態標籤
    const statusBadge = movieCard.querySelector(".movie-status") as HTMLElement;
    const statusType = (movie as any).statusType || "current";
    if (statusType === "current") {
      statusBadge.className += " bg-[var(--brand-accent)]";
      statusBadge.textContent = "熱映中";
    } else {
      statusBadge.className += " bg-[var(--brand-tertiary)]";
      statusBadge.textContent = "即將上映";
    }

    // 設置上映狀態文字
    const releaseStatus = movieCard.querySelector(".movie-release-status")!;
    releaseStatus.textContent = (movie as any).status || "上映中";

    // 設置訂票按鈕
    const bookingBtn = movieCard.querySelector(".movie-booking-btn")!;
    bookingBtn.textContent = statusType === "current" ? "訂票" : "預售";

    // 添加點擊事件
    const cardElement = movieCard.querySelector(".card") as HTMLElement;
    cardElement.addEventListener("click", () => {
      console.log(`點擊了電影: ${movie.name}`);
      // 這裡可以添加跳轉到電影詳情頁面的邏輯
    });

    fragment.appendChild(movieCard);
  });

  container.innerHTML = "";
  container.appendChild(fragment);
}

function renderLatestNews(news: NewsItem[], container: HTMLElement) {
  const fragment = document.createDocumentFragment();

  news.forEach((item) => {
    const newsCard = newsCardTemplate.content.cloneNode(true) as HTMLElement;

    // 設置新聞圖片
    const image = newsCard.querySelector(".news-image") as HTMLImageElement;
    image.src = item.image;
    image.alt = item.alt;

    // 設置新聞標題
    const title = newsCard.querySelector(".news-title")!;
    title.textContent = item.title;

    // 設置新聞內容
    const content = newsCard.querySelector(".news-content")!;
    content.textContent = item.content;

    // 設置日期
    const date = newsCard.querySelector(".news-date")!;
    date.textContent = item.date;

    // 設置分類標籤
    const category = newsCard.querySelector(".news-category") as HTMLElement;
    category.textContent = item.category;

    // 根據分類類型設置不同的顏色
    switch (item.categoryType) {
      case "activity":
        category.className += " bg-[var(--brand-accent)]";
        break;
      case "announcement":
        category.className += " bg-[var(--brand-primary)]";
        break;
      case "news":
        category.className += " bg-[var(--brand-tertiary)]";
        break;
      default:
        category.className += " bg-gray-500";
    }

    // 添加點擊事件
    const cardElement = newsCard.querySelector(".card") as HTMLElement;
    cardElement.addEventListener("click", () => {
      console.log(`點擊了新聞: ${item.title}`);
      // 這裡可以添加跳轉到新聞詳情頁面的邏輯
    });

    fragment.appendChild(newsCard);
  });

  container.innerHTML = "";
  container.appendChild(fragment);
}

// 初始化輪播 - 使用統一的電影數據
const carouselSlide = document.querySelector<HTMLElement>(
  HERO_CAROUSEL_SLIDE_SELECTOR
);

if (carouselSlide) {
  renderCarouselSlides(moviesData, carouselSlide);
}

const carousel = new Carousel(
  HERO_CAROUSEL_CONTAINER_SELECTOR,
  HERO_CAROUSEL_SLIDE_SELECTOR
);
carousel.autoPlay(5000);

// 初始化熱門電影區域 - 取前4部電影作為熱門電影
const popularMoviesContainer = document.querySelector<HTMLElement>(
  POPULAR_MOVIES_CONTAINER_SELECTOR
);

if (popularMoviesContainer) {
  // 取前4部電影作為熱門電影展示
  const featuredMovies = moviesData.slice(0, 4);
  renderPopularMovies(featuredMovies, popularMoviesContainer);
}

// 初始化最新消息區域
const newsContainer = document.querySelector<HTMLElement>(
  NEWS_CONTAINER_SELECTOR
);

if (newsContainer) {
  renderLatestNews(newsData, newsContainer);
}

// 添加 "查看更多電影" 按鈕的事件監聽
const viewMoreBtn = document.querySelector('a[href="/movie"]');
if (viewMoreBtn) {
  viewMoreBtn.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("跳轉到電影列表頁面");
    // 這裡可以添加路由邏輯或頁面跳轉
  });
}
