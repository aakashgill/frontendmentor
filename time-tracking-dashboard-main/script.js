(function() {
  let fetchedData = [];
  const dashboardStatsEl = document.getElementById("dashboard-stats");

  async function fetchAndSaveData() {
    const response = await fetch('./data.json');
    const responseData = await response.json();
    fetchedData = responseData;
  }

  function fetchAndAppendStats(currentStat) {
    let finalHTML = '';
    fetchedData.map(data => {
      let className = data.title.toLowerCase().replace(" ", "-");

      finalHTML += `
        <div class="stats-container stats-${className}">
          <div class="stats">
            <div class="stats-name">${data.title}</div>
            <div class="stats-numbers">
              <div class="stats-hrs">${data.timeframes[currentStat].current}hrs</div>
              <div class="stats-last-week">Last Week - ${data.timeframes[currentStat].previous}hrs</div>
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
