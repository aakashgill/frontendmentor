const customBtnEl = document.querySelector(".js-custom-btn");
const customInputEl = document.querySelector(".custom-input");
customBtnEl.addEventListener('click', function() {
  customInputEl.style.display = "block";
  customBtnEl.style.display = "none";
})

