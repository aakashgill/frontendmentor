(function(){
  const customBtnEl = document.querySelector(".js-custom-btn");
  const customInputEl = document.querySelector(".custom-input");
  const validationZeroEl = document.querySelector(".validation-zero");

  const billInputEl = document.querySelector("#bill");
  const peopleInputEl = document.querySelector("#people");
  const customInputTipEl = document.querySelector("#custom-input-tip");
  const tipButtonEl = document.querySelectorAll("button[data-tip]");

  const resultTipPerPerson = document.getElementById("tip-pp");
  const resultTotalPerPerson = document.getElementById("total-pp");
  const resetBtn = document.getElementById("reset-btn");
  

  function areAllInputsValid() {
    // Exit the execution if these values are not present
    let isValid = true;
    const activeTip = document.querySelector(".tip-btn--active");
    if(billInputEl == '') {
      isValid = false;
    }
    if(!activeTip && customInputTipEl.value == '') {
      isValid = false;
    }
    if(peopleInputEl.value == '') {
      isValid = false;
    }
    return isValid;
  }

  function calculateSplitPerPerson() {
    if(!areAllInputsValid()) {
      return;
    }
    const activeTip = document.querySelector(".tip-btn--active");
    const billValue = parseFloat(billInputEl.value);
    const numberOfPeople = parseInt(peopleInputEl.value);
    
    const customTip = parseFloat(customInputTipEl.value);
    let activeTipValue = null;

    if(numberOfPeople == 0) {
      validationZeroEl.style.display = "block";
      peopleInputEl.classList.add("input--error");
      return;
    } else {
      validationZeroEl.style.display = "none";
      peopleInputEl.classList.remove("input--error");
    }
  
    if(activeTip) {
      activeTipValue = Number(activeTip.getAttribute("data-tip"));
    }
    if(customTip) {
      activeTipValue = customTip;
    }

    const tipAmount = (billValue * activeTipValue / 100);
    let totalAmountPerPerson = truncateUpto2Decimal((tipAmount + billValue) / numberOfPeople);
    let tipAmountPerPerson =  truncateUpto2Decimal((tipAmount / numberOfPeople));

    resultTipPerPerson.textContent = `$${tipAmountPerPerson}`;
    resultTotalPerPerson.textContent = `$${totalAmountPerPerson}`;
  }

  function setActiveTipButton(activeBtn) {
    customInputEl.style.display = "none";
    customBtnEl.style.display = "block";
    tipButtonEl.forEach(btn => btn.classList.remove("tip-btn--active"));
    activeBtn.classList.add("tip-btn--active");
  }

  function attachEventOnTipButton() {
    tipButtonEl.forEach(tipBtn => {
      tipBtn.addEventListener('click', function() {
        setActiveTipButton(this);
      });
    });
  }

  function attachEventsOnInput() {
    billInputEl.addEventListener('input', calculateSplitPerPerson);
    peopleInputEl.addEventListener('input', calculateSplitPerPerson);
    customInputTipEl.addEventListener('input', calculateSplitPerPerson);
    tipButtonEl.forEach(tipBtn => {
      tipBtn.addEventListener('click', calculateSplitPerPerson);
    });
  }

  function attachEventOnCustomTipButton() {
    customBtnEl.addEventListener('click', function() {
      tipButtonEl.forEach(btn => btn.classList.remove("tip-btn--active"));
      customInputEl.style.display = "block";
      customBtnEl.style.display = "none";
      customInputTipEl.focus();
    })
  }

  function truncateUpto2Decimal(value) {
    return Number(value.toString().match(/^\d+(\.\d{0,2})?/)[0]);
  }

  function resetEverything() {
    resetBtn.addEventListener("click", function() {
      const activeTip = document.querySelector(".tip-btn--active");
      if(activeTip) {
        activeTip.classList.remove("tip-btn--active");
      } else {
        customInputEl.style.display = "none";
        customBtnEl.style.display = "block";
        customInputTipEl.value = null;   
      }
      billInputEl.value = null;
      peopleInputEl.value = null;
      customInputTipEl.value = null;
      resultTipPerPerson.textContent = "$0.00";
      resultTotalPerPerson.textContent = "$0.00";
      billInputEl.focus();
    })
  }

  function sanitizeInputOnType() {
    document.querySelectorAll('input').forEach(input => {
      input.addEventListener('keydown', function(e) {
        if(e.key === "." || e.key === "-" || e.key === "+") {
          e.preventDefault();
        }
      });
    })
  }

  function init() {
    attachEventOnTipButton();
    attachEventsOnInput();
    sanitizeInputOnType();
    attachEventOnCustomTipButton();
    calculateSplitPerPerson();
    resetEverything();
  }

  init();
})();