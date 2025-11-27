/**
 * 輪播圖元件類別
 * 提供圖片或內容的循環播放功能
 */
export class Carousel {
  /** 目前顯示項目的索引 */
  #currentIndex: number = 0;
  /** 輪播容器元素 */
  private carouselContainer: Element | null;
  /** 所有輪播項目的節點列表 */
  private items: NodeListOf<Element>;

  /**
   * 建立輪播圖實例
   * @param containerSelector 輪播容器的CSS選擇器，預設為".carousel-container"
   * @throws {Error} 當找不到指定的輪播容器時拋出錯誤
   */
  constructor(containerSelector: string = ".carousel-container") {
    this.carouselContainer = document.querySelector(containerSelector);
    if (!this.carouselContainer) {
      throw new Error(`找不到選擇器為 "${containerSelector}" 的輪播容器`);
    }
    this.items = this.carouselContainer.querySelectorAll(".carousel-item");
    
    this.layoutItems();
    this.bindEvents();
  }
  /**
   * 佈局輪播項目
   * 根據當前索引設置每個項目的位置
   * @private
   */
  private layoutItems(): void {
    const fixedIndex = this.#currentIndex % this.items.length;
    this.items.forEach((item, index) => {
      const offset = index - fixedIndex;
      (item as HTMLElement).style.transform = `translateX(${offset * 100}%)`;
    });
    this.carouselContainer?.setAttribute("data-index", fixedIndex.toString());
  }

  /**
   * 綁定事件監聽器
   * 為上一個和下一個按鈕添加點擊事件
   * @private
   */
  private bindEvents(): void {
    const nextButton =
      document.querySelector<HTMLButtonElement>(".carousel-next");
    const prevButton =
      document.querySelector<HTMLButtonElement>(".carousel-prev");

    if (nextButton) {
      nextButton.onclick = () => this.nextItem();
    }
    if (prevButton) {
      prevButton.onclick = () => this.prevItem();
    }
  }

  /**
   * 切換到下一個項目
   * 將當前索引增加1並重新佈局
   * @public
   */
  public nextItem(): void {
    this.#currentIndex = this.#currentIndex + 1;
    this.layoutItems();
  }

  /**
   * 切換到上一個項目
   * 將當前索引減少1並重新佈局
   * @public
   */
  public prevItem(): void {
    this.#currentIndex = this.#currentIndex - 1 + this.items.length;
    this.layoutItems();
  }

  set currentIndex(index: number) {
    this.#currentIndex = index;
    this.layoutItems();
    return;
  }
  get currentIndex() {
    return this.#currentIndex;
  }
}