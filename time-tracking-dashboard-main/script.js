(function() {
  let fetchedData = [];
  const dashboardStatsEl = document.getElementById("dashboard-stats");
  const timeframeText = {
    daily: "Yesterday",
    weekly: "Last Week",
    monthly: "Last Month",
  };

  async function fetchAndSaveData() {
    const response = await fetch('./data.json');
    const responseData = await response.json();
    fetchedData = responseData;
  }

  function fetchAndAppendStats(currentStat) {
    let finalHTML = '';
    fetchedData.map(data => {
      let className = data.title.toLowerCase().replace(" ", "-");
      let timeFrameText = timeframeText[currentStat];

      finalHTML += `
        <div class="stats-container stats-${className}">
          <div class="stats">
            <div class="stats-name">${data.title}</div>
            <div class="stats-numbers">
              <div class="stats-hrs">${data.timeframes[currentStat].current}hrs</div>
              <div class="stats-last-week">${timeFrameText} - ${data.timeframes[currentStat].previous}hrs</div>
            </div>
          </div>
        </div>
      `;
    });
    dashboardStatsEl.innerHTML = finalHTML;
  }

  function handleClickBtn() {
    const allButtons = document.querySelectorAll(".button-container button");
    allButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        allButtons.forEach(currentBtn => {
          currentBtn.classList.remove('btn--active');
        })
        this.classList.add('btn--active');
        let btnStat = e.target.getAttribute("data-btn-stat");
        fetchAndAppendStats(btnStat);
      })
    })
  }

  function init() {
    handleClickBtn();
    fetchAndSaveData().then(() => {
      fetchAndAppendStats("weekly");
    });
  }

  init();
})();
