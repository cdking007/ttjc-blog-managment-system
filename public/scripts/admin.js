console.log("hello world");

const ham = document.getElementById("bars");
const ul = document.querySelector("nav");
const body = document.querySelector(".container");

ham.addEventListener("click", e => {
  ul.classList.toggle("showNav");
});

body.addEventListener("click", () => {
  console.log();
  if (ul.classList.contains("showNav")) {
    ul.classList.remove("showNav");
  }
});
