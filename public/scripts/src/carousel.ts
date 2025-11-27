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
  #currentIndex: number = 0;
  private carouselContainer: HTMLElement | null;
  private carouselSlide: HTMLElement | null;
  private items: HTMLElement[] = [];
  private dots: HTMLButtonElement[] = [];

  constructor(
    containerSelector: string = ".carousel__container",
    slideSelector: string = ".carousel__slide"
  ) {
    this.carouselContainer =
      document.querySelector<HTMLElement>(containerSelector);
    if (!this.carouselContainer) {
      throw new Error(`找不到選擇器為 "${containerSelector}" 的輪播容器`);
    }

    this.carouselSlide =
      this.carouselContainer.querySelector<HTMLElement>(slideSelector);
    if (!this.carouselSlide) {
      throw new Error(`找不到選擇器為 "${slideSelector}" 的輪播幻燈片`);
    }

    this.wrapItem(); // 先包裝 + 建立 dots
    this.initNavigation(); // 再綁定左右按鈕
    this.layout(); // 再 layout
    this.carouselSlide.classList.remove("hidden");
  }

  /** 綁定左右按鈕 **/
  private initNavigation() {
    if (!this.carouselContainer) return;
    const nextButton = this.carouselContainer.querySelector<HTMLButtonElement>(
      ".carousel__nav.next"
    );
    const prevButton = this.carouselContainer.querySelector<HTMLButtonElement>(
      ".carousel__nav.prev"
    );

    nextButton && (nextButton.onclick = () => this.nextItem());
    prevButton && (prevButton.onclick = () => this.prevItem());
  }

  /** 包裝每個 item 並生成 dots **/
  private wrapItem() {
    if (!this.carouselSlide || !this.carouselContainer) return;

    const children = Array.from(this.carouselSlide.children);
    this.items = []; // 清掉舊資料

    children.forEach((child, index) => {
      const wrapper = document.createElement("div");
      wrapper.classList.add("carousel__item");

      this.carouselSlide!.replaceChild(wrapper, child);
      wrapper.appendChild(child);

      this.items.push(wrapper as HTMLElement);

      const dot = document.createElement("button");
      dot.classList.add("carousel__nav", "dot");
      dot.onclick = () => {
        if (index === this.currentIndex) return;
        this.currentIndex = index;
      };

      this.dots.push(dot);
      this.carouselContainer!.appendChild(dot);
    });
  }

  private layout(): void {
    const len = this.items.length;
    const fixedIndex = ((this.#currentIndex % len) + len) % len;

    this.items.forEach((item, index) => {
      const offset = index - fixedIndex;
      item.style.transform = `translateX(${offset * 100}%)`;
    });

    this.dots.forEach((dot, index) => {
      const offset = index - fixedIndex;
      dot.style.transform = `translateX(${offset * 1}rem)`;
      dot.style.opacity = `${1 - Math.min(Math.abs(offset) * 0.3, 0.7)}`;
    });

    this.carouselContainer?.setAttribute("data-index", fixedIndex.toString());
  }

  public nextItem() {
    this.#currentIndex++;
    this.layout();
  }

  public prevItem() {
    this.#currentIndex--;
    this.layout();
  }

  set currentIndex(index: number) {
    this.#currentIndex = index;
    this.layout();
  }
  get currentIndex() {
    return this.#currentIndex;
  }
  public autoPlay(interval: number = 3000, reverse: boolean = false) {
    setInterval(() => {
      if (reverse) {
        this.prevItem();
      } else {
        this.nextItem();
      }
    }, interval);
  }
}
