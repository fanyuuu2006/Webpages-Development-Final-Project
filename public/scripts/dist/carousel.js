var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _Carousel_currentIndex;
/**
 * Carousel 輪播元件
 * @description 一個簡單的 Carousel 輪播元件，支援自動播放與手動導航功能。
 * @example
 * ```ts
 * const carousel = new Carousel(".carousel__container", ".carousel__slide");
 * carousel.autoPlay(5000);
 * ```
 */
export class Carousel {
    constructor(containerSelector = ".carousel__container", slideSelector = ".carousel__slide") {
        _Carousel_currentIndex.set(this, 0);
        this.items = [];
        this.dots = [];
        this.carouselContainer =
            document.querySelector(containerSelector);
        if (!this.carouselContainer) {
            throw new Error(`找不到選擇器為 "${containerSelector}" 的輪播容器`);
        }
        this.carouselSlide =
            this.carouselContainer.querySelector(slideSelector);
        if (!this.carouselSlide) {
            throw new Error(`找不到選擇器為 "${slideSelector}" 的輪播幻燈片`);
        }
        this.wrapItem(); // 先包裝 + 建立 dots
        this.initNavigation(); // 再綁定左右按鈕
        this.layout(); // 再 layout
        this.carouselSlide.classList.remove("hidden");
    }
    /** 綁定左右按鈕 **/
    initNavigation() {
        if (!this.carouselContainer)
            return;
        const nextButton = this.carouselContainer.querySelector(".carousel__nav.next");
        const prevButton = this.carouselContainer.querySelector(".carousel__nav.prev");
        nextButton && (nextButton.onclick = () => this.nextItem());
        prevButton && (prevButton.onclick = () => this.prevItem());
    }
    /** 包裝每個 item 並生成 dots **/
    wrapItem() {
        if (!this.carouselSlide || !this.carouselContainer)
            return;
        const children = Array.from(this.carouselSlide.children);
        this.items = []; // 清掉舊資料
        children.forEach((child, index) => {
            const wrapper = document.createElement("div");
            wrapper.classList.add("carousel__item");
            this.carouselSlide.replaceChild(wrapper, child);
            wrapper.appendChild(child);
            this.items.push(wrapper);
            const dot = document.createElement("button");
            dot.classList.add("carousel__nav", "dot");
            dot.onclick = () => {
                if (index === this.currentIndex)
                    return;
                this.currentIndex = index;
            };
            this.dots.push(dot);
            this.carouselContainer.appendChild(dot);
        });
    }
    layout() {
        var _a;
        const len = this.items.length;
        const fixedIndex = ((__classPrivateFieldGet(this, _Carousel_currentIndex, "f") % len) + len) % len;
        this.items.forEach((item, index) => {
            const offset = index - fixedIndex;
            item.style.transform = `translateX(${offset * 100}%)`;
        });
        this.dots.forEach((dot, index) => {
            const offset = index - fixedIndex;
            dot.style.transform = `translateX(${offset * 1}rem)`;
            dot.style.opacity = `${1 - Math.min(Math.abs(offset) * 0.3, 0.7)}`;
        });
        (_a = this.carouselContainer) === null || _a === void 0 ? void 0 : _a.setAttribute("data-index", fixedIndex.toString());
    }
    nextItem() {
        var _a;
        __classPrivateFieldSet(this, _Carousel_currentIndex, (_a = __classPrivateFieldGet(this, _Carousel_currentIndex, "f"), _a++, _a), "f");
        this.layout();
    }
    prevItem() {
        var _a;
        __classPrivateFieldSet(this, _Carousel_currentIndex, (_a = __classPrivateFieldGet(this, _Carousel_currentIndex, "f"), _a--, _a), "f");
        this.layout();
    }
    set currentIndex(index) {
        __classPrivateFieldSet(this, _Carousel_currentIndex, index, "f");
        this.layout();
    }
    get currentIndex() {
        return __classPrivateFieldGet(this, _Carousel_currentIndex, "f");
    }
    autoPlay(interval = 3000, reverse = false) {
        setInterval(() => {
            if (reverse) {
                this.prevItem();
            }
            else {
                this.nextItem();
            }
        }, interval);
    }
}
_Carousel_currentIndex = new WeakMap();
