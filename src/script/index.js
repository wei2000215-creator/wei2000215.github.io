console.log("index.js");
const banner = document.querySelector("section.banner");
const img = banner.querySelector("img");
const bannerLink = document.querySelector("#banner-link");
const arrowIcon = document.querySelector("div.arrow-icon");

console.log(arrowIcon);

const banners = [
  { src: "/banner/rosa-topbn.jpg", href: "/pages/rosa.html" },
  { src: "/banner/black-clam.jpg", href: "/pages/blackclam.html" },
  { src: "/banner/ac-topbn.jpg", href: "/pages/anychicken.html" },
  { src: "/banner/mid-topbn.jpg", href: "/pages/midnightcayon.html" },
  { src: "/banner/kawa-topbn.jpg", href: "/pages/kawa.html" },
];

function updateBanner(index) {
  const currentBanner = banners[index];
  img.setAttribute("src", currentBanner.src);
  bannerLink.setAttribute("href", currentBanner.href);
  img.dataset.num = index;
}

function swipe() {
  const now = Number(img.dataset.num);
  const next = now === banners.length - 1 ? 0 : now + 1;
  updateBanner(next);
  setTimeout(swipe, 3000);
}

updateBanner(0);
setTimeout(swipe, 3000);

window.addEventListener("scroll", () => {
  const bannerTop = banner.getBoundingClientRect().top;
  if (bannerTop == 0) {
    arrowIcon.classList.add("animated");
  } else {
    arrowIcon.classList.remove("animated");
  }
});
