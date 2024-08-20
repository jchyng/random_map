import Swiper from "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs";

function createSwiper() {
  return new Swiper(".swiper", {
    slidesPerView: 5,
    spaceBetween: 10,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
}

function destorySwiper() {
  const swiperContainer = document.querySelector(".swiper");

  if (swiperContainer.swiper) {
    swiperContainer.swiper.destroy(true, true);
  }

  clearHtml(swiperContainer, ".swiper-wrapper");
  clearHtml(swiperContainer, ".swiper-pagination");
}

function clearHtml(baseTag = document, selector) {
  const tag = baseTag.querySelector(selector);

  if (tag) {
    tag.innerHTML = "";
  }
}

export { createSwiper, destorySwiper };
