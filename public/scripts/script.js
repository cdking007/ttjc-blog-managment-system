console.log("hello world");

const ham = document.getElementById("bars");
const ul = document.querySelector("nav ul");
ham.addEventListener("click", e => {
  ul.classList.toggle("showNav");
});
