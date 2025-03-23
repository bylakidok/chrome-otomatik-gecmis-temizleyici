chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "clearHistory") {
      chrome.browsingData.remove({ since: 0 }, {
          "history": true
      }, () => {
          console.log("Geçmiş temizlendi.");
      });
  }

  if (message.action === "updateAlarm") {
      chrome.storage.sync.get("cleanInterval", (data) => {
          chrome.alarms.clear("clearHistoryAlarm"); // Önceki alarmı temizle
          chrome.alarms.create("clearHistoryAlarm", { periodInMinutes: data.cleanInterval });
          console.log("Alarm güncellendi: " + data.cleanInterval + " dakika");
      });
  }
});

// Alarm çalıştığında geçmişi temizle
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "clearHistoryAlarm") {
      chrome.browsingData.remove({ since: 0 }, { "history": true }, () => {
          console.log("Zamanlanmış geçmiş temizleme tamamlandı.");
      });
  }
});
