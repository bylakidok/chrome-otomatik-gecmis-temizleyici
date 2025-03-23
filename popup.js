document.addEventListener("DOMContentLoaded", async function () {
    let intervalInput = document.getElementById("interval");  
    let saveButton = document.getElementById("saveSettings"); 
    let clearButton = document.getElementById("clearNow");    

    // Önceki ayarı yükle
    try {
        let data = await chrome.storage.sync.get("cleanInterval");
        if (data.cleanInterval) {
            intervalInput.value = data.cleanInterval;
        }
    } catch (error) {
        console.error("Ayarları yüklerken hata oluştu:", error);
    }

    // Kullanıcı "Kaydet" butonuna bastığında
    saveButton.addEventListener("click", async function () {
        let interval = parseInt(intervalInput.value);
        if (interval < 1) {
            alert("Süre en az 1 dakika olmalıdır.");
            return;
        }

        try {
            await chrome.storage.sync.set({ cleanInterval: interval });
            alert("Ayarlar kaydedildi!");
            chrome.runtime.sendMessage({ action: "updateAlarm" });
        } catch (error) {
            console.error("Ayarları kaydederken hata oluştu:", error);
        }
    });

    // Kullanıcı "Şimdi Temizle" butonuna bastığında
    clearButton.addEventListener("click", function () {
        chrome.runtime.sendMessage({ action: "clearHistory" });
    });
});
