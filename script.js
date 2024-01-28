const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");
let photosArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let imageCount = 5;
const apiKey = "Aw3R5IBk4MbK3mVbaimN3-dvGG73_jd2Uqdb54DkWUs";

const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${imageCount}`;

function setAttributes(element, attribute) {
  for (const key in attribute) {
    element.setAttribute(key, attribute[key]);
  }
}
function imageLoaded() {
  // This code will execute for each image when it finishes loading

  imagesLoaded++;
  // console.log(imagesLoaded);
  if (imagesLoaded === totalImages) {
    loader.hidden = true;
    ready = true;
    imageCount = 15;
    // console.log("ready=", ready);
  }
}
const displayPhotos = function () {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  // console.log("totalImages=", totalImages);
  photosArray.forEach((e) => {
    const item = document.createElement("a");
    // item.setAttribute("href", e.links.html);
    // item.setAttribute("target", "_blank");
    setAttributes(item, {
      href: e.links.html,
      target: "_blank",
    });
    const img = document.createElement("img");
    // img.setAttribute("src", e.urls.regular);
    // img.setAttribute("title", e.alt_description);
    // img.setAttribute("alt", e.alt_description);
    setAttributes(img, {
      src: e.urls.regular,
      title: e.alt_description,
      alt: e.alt_description,
    });
    //This is listening event that occur when each image loaded
    img.addEventListener("load", imageLoaded);
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
};

async function getPictures() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
    // console.log(photosArray);
  } catch (e) {
    console.error(e);
    // console.log(e);
  }
}
getPictures();
window.addEventListener("scroll", () => {
  // OffsetHeight is the height of everyThing + what is not in the view means UI
  // In our case everything is images height so it is images height + what is not in the view means UI
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPictures();
  }
});
