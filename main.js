const textarea = document.getElementById("text");
const ruOut = document.getElementById("ru");
const enOut = document.getElementById("en");
const esOut = document.getElementById("es");
const speakBtn = document.getElementById("speakBtn");

// Tugma bosilganda tarjima + ovoz chiqarish
speakBtn.addEventListener("click", async () => {
  let text = textarea.value.trim();
  if (text === "") return;

  // Har bir tilga tarjima va ovoz chiqarish
  await translateAndSpeak(text, "ru", ruOut);
  await translateAndSpeak(text, "en", enOut);
  await translateAndSpeak(text, "es", esOut);
});

// Tarjima + ovoz chiqarish
async function translateAndSpeak(text, lang, outputElement) {
  try {
    let res = await fetch("https://libretranslate.de/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        q: text,
        source: "uz",   // Uzbek manba tili
        target: 'ru',   // Qaysi tilga tarjima
        format: "text"
      })
    });

    let data = await res.json();
    outputElement.textContent = data.translatedText;

    // Tarjima bo'lgan matnni ovoz chiqarish
    speakText(data.translatedText, langCode(lang));
  } catch (err) {
    outputElement.textContent = "Xato!";
  }
}

// Ovoz chiqarish funksiyasi
function speakText(text, langCode = "en-US") {
  let utter = new SpeechSynthesisUtterance(text);
  utter.lang = langCode;
  speechSynthesis.speak(utter);
}

// Til kodlari (ovoz chiqarish uchun)
function langCode(lang) {
  switch (lang) {
    case "ru": return "ru-RU";
    case "en": return "en-US";
    case "es": return "es-ES";
    default: return "uz-UZ";
  }
}
