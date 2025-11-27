const carouselContainer = document.querySelector(".carousel-container");
if (carouselContainer) {
  let currentIndex = 0;
  const items = carouselContainer.querySelectorAll(".carousel-item");
  const layoutItems = () => {
    items.forEach((item, index) => {
      const offset = index - currentIndex;
      item.setAttribute("style", `transform: translateX(${offset * 100}%)`);
    });
  };
  layoutItems();
  const nextItem = () => {
    currentIndex = (currentIndex + 1) % items.length;
    layoutItems();
  };
  const prevItem = () => {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    layoutItems();
  };
  const nextButton =
    document.querySelector<HTMLButtonElement>(".carousel-next");
  const prevButton =
    document.querySelector<HTMLButtonElement>(".carousel-prev");
  if (nextButton) {
    nextButton.onclick = nextItem;
  }
  if (prevButton) {
    prevButton.onclick = prevItem;
  }
}
