const imageBase = "https://mars.tikimojo.com/Arnold-browser-assets/";
const textFileUrl = imageBase + "arnold-speaks.txt";

async function getRandomImage() {
  try {
    const response = await fetch(imageBase);
    const html = await response.text();
    const matches = [...html.matchAll(/href="([^"]+\.(?:jpg|jpeg|png))"/gi)];
    const files = matches.map(m => m[1]);
    if (files.length === 0) return null;
    const randomFile = files[Math.floor(Math.random() * files.length)];
    return imageBase + randomFile;
  } catch (err) {
    console.error("Error fetching image list:", err);
    return null;
  }
}

async function getRandomQuote() {
  try {
    const response = await fetch(textFileUrl);
    const text = await response.text();
    const lines = text.split(/\r?\n/).filter(line => line.trim() !== "");
    return lines[Math.floor(Math.random() * lines.length)];
  } catch (err) {
    console.error("Error fetching quote:", err);
    return "I'll be back...";
  }
}

async function loadArnold() {
  const img = await getRandomImage();
  const quote = await getRandomQuote();

  document.getElementById("arnoldImage").src = img || "";
  document.getElementById("quote").textContent = quote;
}

document.getElementById("testNow").addEventListener("click", loadArnold);

// Load once on startup
loadArnold();
