import cloneDeep from "lodash";

// const main = document.querySelector(".main");
// let image2;

// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// const createImage = function (imgPath) {
//   return new Promise(function (resolve, reject) {
//     const image = document.createElement("img");
//     image.src = imgPath;
//     image.addEventListener("load", function () {
//       resolve(image);
//       main.insertAdjacentElement("afterbegin", image);
//     });
//     image.addEventListener("error", function () {
//       reject(new Error(`failed to load image at ${imgPath}`));
//     });
//   });
// };

// const loadNPause = async function () {
//   try {
//     image = await createImage("1.jpg");
//     await wait(2);
//     main.insertAdjacentElement("afterbegin", image);
//     await wait(2);
//     main.innerHTML = "";
//     image2 = await createImage("2.png");
//     await wait(2);
//     main.insertAdjacentElement("afterbegin", image2);
//     await wait(2);
//     main.innerHTML = "";
//   } catch (error) {
//     console.log(error);
//   }
// };

// loadNPause();

// createImage("1.jpg")
//   .then(function () {
//     return wait(2);
//   })
//   .then(function () {
//     main.insertAdjacentElement("afterbegin", image);
//   })
//   .then(function () {
//     return wait(2);
//   })
//   .then(function () {
//     main.innerHTML = "";
//     return createImage("2.png");
//   })
//   .then(function () {
//     return wait(2);
//   })
//   .then(function () {
//     main.insertAdjacentElement("afterbegin", image);
//     return wait(2);
//   })
//   .then(function () {
//     main.innerHTML = "";
//   })
//   .catch((err) => console.log(err));

// const loadAll = async function (imgArr) {
//   try {
//     const imgs = imgArr.map(async (ele) => await createImage(ele));
//     console.log(imgs);
//     const imgsEl = await Promise.all(imgs);
//     console.log(imgsEl);
//   } catch (error) {
//     console.log(error);
//   }
// };

// loadAll(["1.jpg", "2.png"]);

const state = {
  cart: [
    { product: "bread", quantity: 5 },
    { product: "pizza", quantity: 5 },
  ],
  user: { loggedIn: true },
};

const stateClone = Object.assign({}, state);
const stateDeepClone = cloneDeep(state);
state.user.loggedIn = false;
console.log(stateDeepClone);
