function scheduleNextPopup() {
  const minMinutes = 30;
  const maxMinutes = 120;
  const delay = Math.floor(Math.random() * (maxMinutes - minMinutes + 1) + minMinutes);
  chrome.alarms.create("arnoldPopup", { delayInMinutes: delay });
}

function openPopup() {
  const width = 500;
  const height = 500;

  chrome.system.display.getInfo((displays) => {
    const primary = displays.find(d => d.isPrimary) || displays[0];
    const screenWidth = primary.workArea.width;
    const screenHeight = primary.workArea.height;

    const left = Math.floor((screenWidth - width) / 2);
    const top = Math.floor((screenHeight - height) / 2);

    chrome.windows.create({
      url: "popup.html",
      type: "popup",
      width,
      height,
      left,
      top
    });
  });
}

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "arnoldPopup") {
    openPopup();
    scheduleNextPopup();
  }
});

// When installed: open immediately and start the cycle
chrome.runtime.onInstalled.addListener(() => {
  openPopup();
  scheduleNextPopup();
});

// When toolbar icon clicked → open immediately
chrome.action.onClicked.addListener(() => {
  openPopup();
});
