function attachFormHandlers() {
  const newsletterForm = document.getElementById("newsletter-form");
  const emailElement = newsletterForm.querySelector("input[type='email']");
  const validationElement = newsletterForm.querySelector(".validation-message");
  const newsletterMain = document.querySelector(".newsletter-container");
  const newsletterSuccess = document.querySelector(".newsletter-success");
  const dismissBtn = document.getElementById("dismiss-btn");
  const userEmai = document.getElementById("user-email");

  newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();

    if(validateEmail(emailElement)) {
      userEmai.innerHTML = emailElement.value;
      validationElement.style.display = "none";
      newsletterMain.style.display = "none";
      newsletterSuccess.style.display = "block";
    } else {
      newsletterMain.style.display = "flex";
      newsletterSuccess.style.display = "none";
      validationElement.style.display = "block";
    }
  })

  dismissBtn.addEventListener("click", function() {
    newsletterMain.style.display = "flex";
    newsletterSuccess.style.display = "none";
    newsletterForm.reset();
  })
}

function validateEmail(emailElement) {
  const emailValue = emailElement.value.trim();
  if(!emailValue) {
    emailElement.classList.add("error");
    return false;
  }
  else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
    emailElement.classList.add("error");
    return false;
  } else {
    emailElement.classList.remove("error");
    return true;
  }
}

attachFormHandlers();