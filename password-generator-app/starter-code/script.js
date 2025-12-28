(function() {
  init();

  function init () {
    attachSubmitHandler();
    updateCharacterLength();
    copyToClipboard();
  }
  
  function attachSubmitHandler() {
    const passwordFormEl = document.getElementById("password-generator-form");
    let finalPassword = document.getElementById("final-password");
  
    passwordFormEl.addEventListener("submit", function(e) {
      e.preventDefault();
      const formValues = new FormData(passwordFormEl);
      const formData = Object.fromEntries(formValues);
      finalPassword.textContent = generateRandomPassword(formData);
      setStrengthMeter(formData);
    })
  }
  
  function generateRandomPassword(formData) {
    let password = "";
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    let allChars = uppercaseChars + lowercaseChars
    let numbers, symbols;
    const passwordLength = formData.range;
  
  
    const selectedCharTypes = [];
  
    if (formData.uppercase) {
      selectedCharTypes.push(uppercaseChars);
    }
    if (formData.lowercase) {
      selectedCharTypes.push(lowercaseChars);
    }
    if (formData.numbers) {
      numbers = "0123456789";
      selectedCharTypes.push(numbers);
    }
    if (formData.symbols) {
      symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";
      selectedCharTypes.push(symbols);
    }
  
    allChars = uppercaseChars + lowercaseChars + numbers + symbols;
    
    for (let chars of selectedCharTypes) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
  
    for (let i = password.length; i < passwordLength; i++) {
      password += allChars.charAt(Math.floor(Math.random() * allChars.length));
    }
  
    password = password.split('').sort(() => Math.random() - 0.5).join('');
    
    return password;
  }
  
  function updateCharacterLength() {
    let characterLength = document.getElementById("character-length");
    document.getElementById("password-range").addEventListener('change', function() {
      characterLength.innerHTML = this.value;
    })
  }
  
  function setStrengthMeter(formData) {
    let activeTypes = Object.keys(formData).length - 1;
    const length = parseInt(formData.range);
  
    let score = 0;
  
    if (length >= 4 && activeTypes > 0) {
      if (length >= 12) {
        score += 2;
      } else if (length >= 8) {
        score += 1;
      }
      if (activeTypes === 4) {
        score += 2;
      } else if (activeTypes === 3) {
        score += 1;
      }
    } else if (length >= 20 && activeTypes == 0) {
      score += 2;
    }
  
    let meterValue = 1;
    if (activeTypes === 0 && length < 4 && score >= 2) {
      meterValue = 1; // Too weak
    } else if (score <= 1) {
      meterValue = 1; // Weak
    } else if (score === 2) {
      meterValue = 2; // Medium
    } else if (score === 3) {
      meterValue = 3; // Good
    } else if (score >= 4) {
      meterValue = 4; // Strong
    }
    setMeterAndText(meterValue);
  }
  
  function setMeterAndText(meterLength) {
    const meterInfo = {
      1: "Weak",
      2: "Medium",
      3: "Medium",
      4: "Strong"
    };
    const strengthBarMeterText = document.getElementById("strength-bar-meter-text");
    const allStrengthBar = document.querySelectorAll(".strength-bar");
  
    allStrengthBar.forEach(bar => bar.classList.remove('strength-bar--active'));
    for(let i = 0; i < meterLength; i++) {
      allStrengthBar[i].classList.add("strength-bar--active");
    }
    strengthBarMeterText.textContent = meterInfo[meterLength];
  }
  
  function copyToClipboard() {
    const copyBtn = document.getElementById("btn-copy");
    const copiedText = document.getElementById("copied-text");
    const finalPassword = document.getElementById("final-password");
    copyBtn.addEventListener('click', function() {
      const password = finalPassword.textContent;
  
      if (password) {
        navigator.clipboard.writeText(password)
          .then(() => {
            copiedText.style.opacity = "1";
            setTimeout(() => {
              copiedText.style.opacity = "0";
            }, 1500);
          });
      }
    });
  }  
})();