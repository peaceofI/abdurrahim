/* ================================================
   NOOR AL-HIKMA v2 — app.js
   Full-Featured Islamic Literary Archive
   ================================================ */

'use strict';

// ── CONSTANTS ──────────────────────────────────────
const ADMIN_PASS_KEY = 'noor_admin_pass';
const DATA_KEY       = 'noor_data_v2';
const SETTINGS_KEY   = 'noor_settings';
const DEFAULT_PASS   = '501in0ed';

const HERO_VERSES = [
  { ar:'إِنَّ مَعَ الْعُسْرِ يُسْرًا',                en:'"Indeed, with hardship will be ease."',                 ref:'— Al-Inshirah 94:6' },
  { ar:'وَاللَّهُ يُحِبُّ الصَّابِرِينَ',            en:'"And Allah loves those who are patient."',              ref:'— Aal-Imran 3:146' },
  { ar:'فَاذْكُرُونِي أَذْكُرْكُمْ',                  en:'"So remember Me; I will remember you."',               ref:'— Al-Baqarah 2:152' },
  { ar:'وَهُوَ مَعَكُمْ أَيْنَ مَا كُنتُمْ',         en:'"And He is with you wherever you are."',               ref:'— Al-Hadid 57:4' },
  { ar:'حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ',      en:'"Sufficient for us is Allah, and He is the best Trustee."', ref:'— Aal-Imran 3:173' },
  { ar:'رَبِّ زِدْنِي عِلْمًا',                      en:'"My Lord, increase me in knowledge."',                  ref:'— Ta-Ha 20:114' },
];

const TICKER_TEXTS = [
  'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ','الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
  'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ','لَا إِلَهَ إِلَّا اللَّهُ مُحَمَّدٌ رَسُولُ اللَّهِ',
  'اللَّهُ أَكْبَرُ','وَمَا تَوْفِيقِي إِلَّا بِاللَّهِ','اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ',
  'أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ','تَوَكَّلْتُ عَلَى اللَّهِ',
];

const PRAYER_NAMES = ['Fajr','Sunrise','Dhuhr','Asr','Maghrib','Isha'];

const SEED = {
  poems:[
    { id:'p1', color:'gold',
      title_en:'The Light of Sabr', title_bn:'সবরের আলো', title_ar:'نور الصبر',
      excerpt_en:'A meditation on patience as the lantern that guides through darkness.',
      excerpt_bn:'ধৈর্য্যকে আলো হিসেবে ভাবা — যা অন্ধকারের মধ্যে পথ দেখায়।',
      verse:'وَاللَّهُ يُحِبُّ الصَّابِرِينَ',
      content_en:`<div class="v-content"><p>In every storm, a stillness dwells,<br>Where the heart of the believer compels<br>Itself to bow before the One Who knows<br>The weight of every tear that flows.</p><br><p>Sabr is not the silence of defeat,<br>But the thunder that softens into wheat—<br>A fire that refines without consuming,<br>A river patient in its blooming.</p><br><p>So when the world grows cold and stark,<br>Light one candle in your heart,<br>For Allah has promised, clear and true:<br>With every hardship, ease comes too.</p></div>`,
      content_bn:`<div class="v-content-bn"><p>প্রতিটি ঝড়ের মধ্যে একটি স্থিরতা থাকে,<br>যেখানে মুমিনের হৃদয় মাথা নত করে সেই সত্তার সামনে<br>যিনি জানেন প্রতিটি অশ্রুর ভার।</p><br><p>সবর পরাজয়ের নীরবতা নয়,<br>এটি সেই বজ্রপাত যা গমের মতো নরম হয়ে যায়—<br>এক আগুন যা পরিশোধ করে কিন্তু পোড়ায় না।</p><br><p>তাই যখন পৃথিবী ঠান্ডা হয়ে যায়,<br>তোমার হৃদয়ে একটি মোমবাতি জ্বালাও,<br>কারণ আল্লাহ ওয়াদা করেছেন: কষ্টের সাথে সহজও আসে।</p></div>`
    },
    { id:'p2', color:'teal',
      title_en:'Dusk at the Kaaba', title_bn:'কাবার সন্ধ্যা', title_ar:'غروب عند الكعبة',
      excerpt_en:'A poem of longing and return at the doorstep of the sacred house.',
      excerpt_bn:'পবিত্র গৃহের দোরগোড়ায় আকুলতা ও প্রত্যাবর্তনের কবিতা।',
      verse:'وَلِلَّهِ الْمَشْرِقُ وَالْمَغْرِبُ',
      content_en:`<div class="v-content"><p>When dusk paints the Haram in amber and gold,<br>And thousands circle in the ancient fold,<br>I understand what prophets felt before—<br>That love is motion, and God is its core.</p><br><p>The Kaaba stands dressed in night and silk,<br>The air around it white as mother's milk—<br>Each step a prayer, each breath a name,<br>No heart arrives here quite the same.</p></div>`,
      content_bn:`<div class="v-content-bn"><p>যখন সন্ধ্যা হারামকে সোনালি রঙে রাঙায়,<br>হাজারো মানুষ প্রাচীন বৃত্তে তাওয়াফ করে,<br>আমি বুঝি নবীরা কী অনুভব করতেন—<br>ভালোবাসা হলো গতি, আর আল্লাহ তার কেন্দ্র।</p><br><p>কাবা দাঁড়িয়ে আছে রাত ও রেশমে মোড়া,<br>চারপাশের বায়ু মায়ের দুধের মতো শুভ্র।</p></div>`
    },
    { id:'p3', color:'violet',
      title_en:'Whispers of Fajr', title_bn:'ফজরের ফিসফিসানি', title_ar:'همسات الفجر',
      excerpt_en:'On the sacred silence before dawn and the mercy that descends with it.',
      excerpt_bn:'ভোরের আগের পবিত্র নীরবতা এবং সেই সময়ে নাজিল হওয়া রহমতের কথা।',
      verse:'أَقِمِ الصَّلَاةَ لِدُلُوكِ الشَّمْسِ إِلَى غَسَقِ اللَّيْلِ',
      content_en:`<div class="v-content"><p>Before the world remembers to breathe,<br>There is a space where angels weave—<br>Between the dark and the first call to prayer,<br>Allah descends to the lower air.</p><br><p>Rise, O soul, from your blanket of sleep,<br>The promises of Fajr are yours to keep.<br>Two rak'aat worth more than all the earth,<br>Stand before Him—you have always known your worth.</p></div>`,
      content_bn:`<div class="v-content-bn"><p>পৃথিবী শ্বাস নেওয়ার কথা মনে করার আগেই,<br>ফেরেশতারা বুনে চলে এক অদৃশ্য জাল—<br>অন্ধকার ও প্রথম আজানের মাঝখানে,<br>আল্লাহ নিচের আকাশে নেমে আসেন।</p><br><p>হে আত্মা, ঘুমের চাদর থেকে উঠে দাঁড়াও,<br>ফজরের ওয়াদা তোমার জন্যই।</p></div>`
    },
  ],
  novels:[
    { id:'n1', color:'emerald',
      title_en:'The Road to Medina', title_bn:'মদিনার পথে', title_ar:'طريق المدينة',
      excerpt_en:'A historical novel tracing a family\'s journey during the Hijra — the great migration.',
      excerpt_bn:'হিজরতের সময় একটি পরিবারের যাত্রার ঐতিহাসিক উপন্যাস।',
      verse:'إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ',
      content_en:`<div class="v-content"><h3>Chapter One: Leaving Mecca</h3><p>The night Umm Khalid wrapped her children in shawls and stepped beyond the city gates, the stars above Mecca seemed unnaturally still. Behind her, the city that had always been her world—its jasmine alleys, its muezzin echoes, its familiar sorrow—grew smaller with each step.</p><p>Her husband walked ahead, his back straight as a date palm. He had sold everything: the shop, the two donkeys, even the copper pot his mother had given them on their wedding day. "We carry only what cannot be taken," he had said. She understood now what he meant. Faith weighs nothing and everything.</p><p>The journey to Yathrib—Medina, as the Prophet ﷺ had named it—would take eleven days. But for Umm Khalid, it would take the rest of her life to fully understand what she had carried there in her chest, unseen and unbreakable.</p></div>`,
      content_bn:`<div class="v-content-bn"><h3>প্রথম অধ্যায়: মক্কা ছেড়ে</h3><p>যে রাতে উম্মু খালিদ তার সন্তানদের শাল মুড়িয়ে শহরের ফটক পার হলেন, মক্কার উপরের তারাগুলো অদ্ভুতভাবে স্থির মনে হচ্ছিল। পেছনে ফেলে আসা শহর — তার জুঁই ফুলের গলি, মুয়াজ্জিনের প্রতিধ্বনি — প্রতিটি পদক্ষেপে ছোট হয়ে যাচ্ছিল।</p><p>তার স্বামী সামনে হাঁটছিলেন, খেজুর গাছের মতো সোজা। তিনি সব বিক্রি করে দিয়েছিলেন। "আমরা শুধু সেটাই বহন করি যা কেউ নিতে পারবে না," তিনি বলেছিলেন। ঈমান — যার ওজন নেই, অথচ সব কিছু।</p></div>`
    },
    { id:'n2', color:'rose',
      title_en:'Letters from Andalusia', title_bn:'আন্দালুসিয়ার চিঠি', title_ar:'رسائل من الأندلس',
      excerpt_en:'A scholar in medieval Cordoba writes letters to his son about knowledge, beauty, and faith.',
      excerpt_bn:'মধ্যযুগীয় কর্ডোবার একজন আলেম তার পুত্রকে জ্ঞান, সৌন্দর্য ও ঈমান নিয়ে চিঠি লেখেন।',
      verse:'اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ',
      content_en:`<div class="v-content"><h3>First Letter</h3><p>My son, Yusuf — I am writing this from the library at Cordoba, where twenty thousand books hold their breath in the candlelight. You asked me once how one knows when they have found the truth. I have been thinking about this for thirty years.</p><p>Here is what I know: the truth does not announce itself loudly. It arrives the way Fajr arrives—gradually, then suddenly, and you realize the darkness was never the point. The point was always the light coming.</p><p>Study everything, my son. The stars and the grasses. For every road of knowledge, if you walk it far enough with sincerity, leads you back to the same door—the door at which Ibrahim stood, and Muhammad ﷺ stood, and we, God willing, will one day stand together.</p></div>`,
      content_bn:`<div class="v-content-bn"><h3>প্রথম চিঠি</h3><p>আমার পুত্র ইউসুফ — আমি কর্ডোবার পাঠাগার থেকে লিখছি, যেখানে বিশ হাজার বই মোমবাতির আলোয় শ্বাস আটকে বসে আছে। তুমি একবার জিজ্ঞেস করেছিলে: সত্য কীভাবে চেনা যায়? আমি ত্রিশ বছর ধরে এটা ভাবছি।</p><p>সত্য জোরে ঘোষণা দেয় না। এটি আসে যেভাবে ফজর আসে — ধীরে, তারপর হঠাৎ। সব পথ যদি আন্তরিকতায় হাঁটো, একই দরজায় পৌঁছাবে।</p></div>`
    },
  ],
  thoughts:[
    { id:'t1', color:'gold',
      title_en:'On Gratitude & Sight', title_bn:'কৃতজ্ঞতা ও দৃষ্টিভঙ্গি', title_ar:'الشكر والبصيرة',
      excerpt_en:'Shukr is not merely a feeling but a way of seeing the world differently.',
      excerpt_bn:'শোকর শুধু অনুভূতি নয় — এটি জগৎকে ভিন্নভাবে দেখার পদ্ধতি।',
      verse:'لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ',
      content_en:`<div class="v-content"><p>Shukr is not the reflex of saying "Alhamdulillah" when something good happens. That is a beginning, but gratitude in Islam is a <em>mode of perception</em>.</p><p>When Allah says "If you are grateful, I will surely increase you," the increase is not just blessings — it is the <em>capacity to perceive blessings.</em></p><p>The ungrateful person moves through a world of continuous gift and sees only transaction. The grateful person begins to see things as they actually are: everything borrowed, everything grace, everything return.</p><p>Start where you are. Look at your hands. Consider how many people have no hands. Not to feel guilty — to feel <em>awake</em>.</p></div>`,
      content_bn:`<div class="v-content-bn"><p>শোকর মানে শুধু ভালো কিছু হলে "আলহামদুলিল্লাহ" বলা নয়। ইসলামে কৃতজ্ঞতা হলো এক ধরনের <em>উপলব্ধির পদ্ধতি</em>।</p><p>যখন আল্লাহ বলেন "তোমরা কৃতজ্ঞ হলে আমি অবশ্যই বাড়িয়ে দেব" — এই বৃদ্ধি শুধু নেয়ামত নয়, বরং নেয়ামত অনুভব করার ক্ষমতা।</p><p>তোমার হাতের দিকে তাকাও। ভাবো কতজন মানুষের হাত নেই। এটা অপরাধবোধের জন্য নয় — <em>জাগ্রত</em> হওয়ার জন্য।</p></div>`
    },
    { id:'t2', color:'teal',
      title_en:'Why We Struggle to Pray', title_bn:'কেন নামাজে অনিয়মিত হই', title_ar:'لماذا نتعثر في الصلاة',
      excerpt_en:'An honest look at the spiritual difficulty many face with consistency in salah.',
      excerpt_bn:'নামাজে নিয়মিততার ক্ষেত্রে আমরা যে আত্মিক কষ্টের মুখোমুখি হই তার সৎ পর্যালোচনা।',
      verse:'وَاسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ',
      content_en:`<div class="v-content"><p>Nobody talks honestly about this: salah is difficult. Not because it is long or complicated, but because it requires the one thing our age has systematically destroyed: the capacity to be still and present without distraction.</p><p>When we stand in salah, we are doing something countercultural. We are insisting, five times a day, that <em>this moment</em> is where we actually are.</p><p>If you are struggling, do not conclude that you are a bad Muslim. Conclude instead that you are a human being in a world designed to fragment your attention. Then, gently, one prayer at a time, begin the work of coming home to yourself.</p></div>`,
      content_bn:`<div class="v-content-bn"><p>কেউ এটা সৎভাবে বলে না: নামাজ কঠিন। দীর্ঘ বা জটিল বলে নয়, বরং এটার জন্য দরকার সেই জিনিস যা আমাদের যুগ ধ্বংস করে দিয়েছে — বিক্ষিপ্ততা ছাড়া স্থির থাকার ক্ষমতা।</p><p>তুমি যদি সংগ্রাম করছ, মনে করো না তুমি খারাপ মুসলিম। বরং বোঝো: তুমি এমন এক পৃথিবীতে আছ যা তোমার মনোযোগ ভাঙার জন্য ডিজাইন করা হয়েছে। তারপর ধীরে ধীরে, এক নামাজ করে, নিজের কাছে ফিরে আসার কাজ শুরু করো।</p></div>`
    },
  ],
  faq:[
    { id:'f1', color:'gold',
      title_en:'What is Tawakkul?', title_bn:'তাওয়াক্কুল কী?', title_ar:'ما هو التوكل؟',
      excerpt_en:'Trusting completely in Allah after taking all the necessary means.',
      excerpt_bn:'সকল উপায় অবলম্বনের পর আল্লাহর উপর সম্পূর্ণ ভরসা রাখা।',
      verse:'وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ',
      content_en:`<div class="v-content"><p><strong>Tawakkul (التوكل)</strong> means complete reliance on Allah — trust in His plan and confidence in His wisdom — while still taking the necessary steps within your ability.</p><p>The Prophet ﷺ clarified this when asked about tying one's camel: <em>"Tie it, then put your trust in Allah."</em></p><p>Tawakkul is not passivity. It is the combination of sincere effort with sincere detachment from outcome — knowing results belong to Allah alone.</p></div>`,
      content_bn:`<div class="v-content-bn"><p><strong>তাওয়াক্কুল (التوكل)</strong> মানে আল্লাহর উপর সম্পূর্ণ ভরসা — তাঁর পরিকল্পনায় আস্থা — কিন্তু নিজের সাধ্যমতো চেষ্টা করার পরে।</p><p>রাসূলুল্লাহ ﷺ বলেছেন: <em>"উটটি বাঁধো, তারপর আল্লাহর উপর তাওয়াক্কুল করো।"</em></p><p>তাওয়াক্কুল নিষ্ক্রিয়তা নয়। এটি আন্তরিক প্রচেষ্টা ও ফলাফলের ব্যাপারে আল্লাহর উপর নির্ভরতার সমন্বয়।</p></div>`
    },
  ],
};

// ── STATE ────────────────────────────────────────
let data     = JSON.parse(localStorage.getItem(DATA_KEY) || 'null') || deepCopy(SEED);
let settings = JSON.parse(localStorage.getItem(SETTINGS_KEY) || '{}');
let adminPass = localStorage.getItem(ADMIN_PASS_KEY) || DEFAULT_PASS;
let curLang  = 'en';
let curTheme = 'dark';
let curVerseIdx = 0;
let selectedColor = 'gold';
let curViewerItem = null;
let curViewerLang = 'en';
let lightParticles = [];

// ── INIT ─────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initCanvas();
  initTicker();
  initHeroVerse();
  renderAllGrids();
  updateStats();
  animateStats();
  loadHijriDate();
  loadPrayerTimes();
  updateLangUI();
});

function deepCopy(o) { return JSON.parse(JSON.stringify(o)); }
function save() { localStorage.setItem(DATA_KEY, JSON.stringify(data)); }

// ── CANVAS LIGHTING ───────────────────────────────
function initCanvas() {
  const canvas = document.getElementById('bgCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H;
  function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
  resize();
  window.addEventListener('resize', resize);

  // Spawn particles
  lightParticles = Array.from({length:120}, () => ({
    x: Math.random()*window.innerWidth, y: Math.random()*window.innerHeight,
    vx:(Math.random()-0.5)*0.3, vy:(Math.random()-0.5)*0.3,
    r: Math.random()*1.5+0.3,
    a: Math.random(),
    da: (Math.random()-0.5)*0.005,
    color: Math.random()<0.6 ? `rgba(201,168,76,` : Math.random()<0.5 ? `rgba(45,212,191,` : `rgba(255,255,255,`,
  }));

  function frame() {
    ctx.clearRect(0,0,W,H);
    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    if (!isDark) { requestAnimationFrame(frame); return; }

    // draw gradient base
    const bg = ctx.createRadialGradient(W*0.3,H*0.2,0,W*0.3,H*0.2,W*0.7);
    bg.addColorStop(0,'rgba(15,25,55,0.6)');
    bg.addColorStop(1,'rgba(2,8,23,0.9)');
    ctx.fillStyle = bg;
    ctx.fillRect(0,0,W,H);

    lightParticles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      p.a += p.da;
      if (p.a < 0) p.da = Math.abs(p.da);
      if (p.a > 1) p.da = -Math.abs(p.da);
      if (p.x < 0||p.x > W) p.vx *= -1;
      if (p.y < 0||p.y > H) p.vy *= -1;

      const g = ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r*4);
      g.addColorStop(0, p.color + Math.min(p.a*0.8, 0.7) + ')');
      g.addColorStop(1, p.color + '0)');
      ctx.beginPath();
      ctx.arc(p.x,p.y,p.r*4,0,Math.PI*2);
      ctx.fillStyle = g;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle = p.color + Math.min(p.a*0.9, 0.9) + ')';
      ctx.fill();
    });

    // draw connections
    for(let i=0;i<lightParticles.length;i++) {
      for(let j=i+1;j<lightParticles.length;j++) {
        const dx = lightParticles[i].x-lightParticles[j].x;
        const dy = lightParticles[i].y-lightParticles[j].y;
        const dist = Math.sqrt(dx*dx+dy*dy);
        if (dist < 80) {
          ctx.beginPath();
          ctx.moveTo(lightParticles[i].x,lightParticles[i].y);
          ctx.lineTo(lightParticles[j].x,lightParticles[j].y);
          ctx.strokeStyle = `rgba(201,168,76,${(1-dist/80)*0.04})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(frame);
  }
  frame();

  // Mouse light interaction
  document.addEventListener('mousemove', (e) => {
    lightParticles.forEach(p => {
      const dx = e.clientX - p.x, dy = e.clientY - p.y;
      const d = Math.sqrt(dx*dx+dy*dy);
      if (d < 150) {
        p.vx += dx/d*0.08;
        p.vy += dy/d*0.08;
        const max = 1.5;
        const sp = Math.sqrt(p.vx*p.vx+p.vy*p.vy);
        if (sp > max) { p.vx = p.vx/sp*max; p.vy = p.vy/sp*max; }
      }
    });
  });
}

// ── THEME TOGGLE ──────────────────────────────────
function toggleTheme() {
  curTheme = curTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', curTheme);
  document.getElementById('themeIcon').textContent = curTheme === 'dark' ? '🌙' : '☀️';
}

// ── LANGUAGE ──────────────────────────────────────
const I18N = {
  en:{ siteTitle:'Noor Al-Hikma', siteSub:'Islamic Literary Archive', admin:'Admin', poems:'Poems', novels:'Novels', thoughts:'Thoughts', faq:'FAQ', prayerTimes:'Prayer Times', islamicDate:'Islamic Date', archive:'Archive', ask:'Ask', tryAsking:'Try:', adminAccess:'Admin Access', addEntry:'Add Entry', manage:'Manage', settings:'Settings', poemsSub:'A treasury of divine poetry', novelsSub:'Stories of faith and wisdom', thoughtsSub:'Reflections on Islamic life', faqSub:'Ask anything — powered by AI' },
  bn:{ siteTitle:'নূরুল হিকমাহ', siteSub:'ইসলামিক সাহিত্য আর্কাইভ', admin:'এডমিন', poems:'কবিতা', novels:'উপন্যাস', thoughts:'চিন্তা', faq:'প্রশ্নোত্তর', prayerTimes:'নামাজের সময়', islamicDate:'ইসলামিক তারিখ', archive:'আর্কাইভ', ask:'জিজ্ঞেস করুন', tryAsking:'চেষ্টা করুন:', adminAccess:'এডমিন প্রবেশ', addEntry:'এন্ট্রি যোগ করুন', manage:'পরিচালনা', settings:'সেটিংস', poemsSub:'দিব্য কবিতার ভাণ্ডার', novelsSub:'ঈমানের গল্প', thoughtsSub:'ইসলামিক জীবনের প্রতিফলন', faqSub:'যেকোনো প্রশ্ন করুন — AI দ্বারা পরিচালিত' },
  ar:{ siteTitle:'نور الحكمة', siteSub:'الأرشيف الأدبي الإسلامي', admin:'المشرف', poems:'قصائد', novels:'روايات', thoughts:'أفكار', faq:'أسئلة', prayerTimes:'مواقيت الصلاة', islamicDate:'التاريخ الهجري', archive:'الأرشيف', ask:'اسأل', tryAsking:'جرب:', adminAccess:'وصول المشرف', addEntry:'إضافة مقال', manage:'إدارة', settings:'إعدادات', poemsSub:'كنز الشعر الإلهي', novelsSub:'قصص الإيمان والحكمة', thoughtsSub:'تأملات في الحياة الإسلامية', faqSub:'اسأل أي شئ' },
};

function setLang(lang) {
  curLang = lang;
  document.documentElement.setAttribute('lang', lang);
  document.documentElement.setAttribute('data-lang', lang);
  document.querySelectorAll('.lt-btn').forEach(b => b.classList.toggle('active', b.dataset.lang === lang));
  applyI18N(lang);
}

function applyI18N(lang) {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const k = el.getAttribute('data-i18n');
    if (I18N[lang] && I18N[lang][k]) el.textContent = I18N[lang][k];
  });
}

function updateLangUI() { applyI18N(curLang); }

// ── TICKER ────────────────────────────────────────
function initTicker() {
  const el = document.getElementById('ticker');
  const items = [...TICKER_TEXTS, ...TICKER_TEXTS];
  el.innerHTML = items.map(t => `<span>${t}</span>`).join('');
}

// ── HERO VERSES ───────────────────────────────────
function initHeroVerse() {
  const dots = document.getElementById('hvDots');
  dots.innerHTML = HERO_VERSES.map((_,i) =>
    `<div class="hvd${i===0?' active':''}" onclick="goVerse(${i})"></div>`
  ).join('');
  renderVerse();
  setInterval(() => { curVerseIdx=(curVerseIdx+1)%HERO_VERSES.length; renderVerse(); }, 7000);
}
function renderVerse() {
  const v = HERO_VERSES[curVerseIdx];
  const fade = el => { el.style.opacity=0; };
  const show = (el,t) => setTimeout(()=>{ el.textContent=t; el.style.transition='opacity 0.6s'; el.style.opacity=1; },220);
  const ar=document.getElementById('hArabic'), tr=document.getElementById('hTrans'), rf=document.getElementById('hRef');
  fade(ar); fade(tr); fade(rf);
  show(ar, v.ar); show(tr, v.en); show(rf, v.ref);
  document.querySelectorAll('.hvd').forEach((d,i)=>d.classList.toggle('active',i===curVerseIdx));
}
function prevVerse(){ curVerseIdx=(curVerseIdx-1+HERO_VERSES.length)%HERO_VERSES.length; renderVerse(); }
function nextVerse(){ curVerseIdx=(curVerseIdx+1)%HERO_VERSES.length; renderVerse(); }
function goVerse(i){ curVerseIdx=i; renderVerse(); }

// ── HIJRI DATE ────────────────────────────────────
function loadHijriDate() {
  const now = new Date();
  const greg = now.toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'});
  document.getElementById('hijriGreg').textContent = greg;
  document.getElementById('hijriDate').textContent = `☽ ${greg}`;

  fetch(`https://api.aladhan.com/v1/gToH/${now.getDate()}-${now.getMonth()+1}-${now.getFullYear()}`)
    .then(r=>r.json()).then(d=>{
      if(d.code===200){
        const h = d.data.hijri;
        const hStr = `${h.day} ${h.month.en} ${h.year} AH`;
        const hAr  = `${h.day} ${h.month.ar} ${h.year}`;
        document.getElementById('hijriBig').textContent = hAr;
        document.getElementById('hijriGreg').textContent = greg;
        document.getElementById('hijriDate').textContent = `☽ ${hStr}`;
      }
    }).catch(()=>{
      document.getElementById('hijriBig').textContent = computeHijriApprox();
    });
}
function computeHijriApprox() {
  const jd = Date.now()/86400000 + 2440587.5;
  const y = Math.floor((jd-1948438.5)/354.367);
  return `~${1444+Math.floor((new Date().getFullYear()-2023))} AH`;
}

// ── PRAYER TIMES ──────────────────────────────────
function loadPrayerTimes() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(pos => {
      fetchPrayers(pos.coords.latitude, pos.coords.longitude);
    }, () => {
      // Default to Dhaka
      fetchPrayers(23.8103, 90.4125, 'Dhaka, BD');
    }, {timeout:5000});
  } else {
    fetchPrayers(23.8103, 90.4125, 'Dhaka, BD');
  }
}

function fetchPrayers(lat, lng, label) {
  const d = new Date();
  const url = `https://api.aladhan.com/v1/timings/${d.getDate()}-${d.getMonth()+1}-${d.getFullYear()}?latitude=${lat}&longitude=${lng}&method=2`;
  fetch(url).then(r=>r.json()).then(res=>{
    if(res.code===200){
      const t = res.data.timings;
      const city = label || (res.data.meta.city || 'Your City');
      renderPrayerTimes({
        Fajr:t.Fajr, Sunrise:t.Sunrise, Dhuhr:t.Dhuhr,
        Asr:t.Asr, Maghrib:t.Maghrib, Isha:t.Isha
      }, city);
    }
  }).catch(()=>{
    document.getElementById('ptGrid').innerHTML = '<div class="pt-loading">Unable to load prayer times</div>';
  });
}

function renderPrayerTimes(times, city) {
  document.getElementById('hwLoc').textContent = city;
  const now = new Date();
  const nowMin = now.getHours()*60+now.getMinutes();
  const entries = Object.entries(times);
  let nextIdx = -1;

  const grid = document.getElementById('ptGrid');
  grid.innerHTML = entries.map(([name,time], i) => {
    const [h,m] = time.split(':').map(Number);
    const pMin = h*60+m;
    let fmt = formatTime(h,m);
    const isNext = pMin > nowMin && nextIdx === -1 ? (nextIdx=i,true) : false;
    const cls = isNext ? ' next' : '';
    return `<div class="pt-item${cls}"><span class="pt-name">${name}</span><span class="pt-time">${fmt}</span></div>`;
  }).join('');

  if (nextIdx !== -1) {
    const [nm,nt] = entries[nextIdx];
    const [h,m] = nt.split(':').map(Number);
    document.getElementById('prayerNext').textContent = `🕌 Next: ${nm} at ${formatTime(h,m)}`;
  }
}
function formatTime(h,m) {
  const ampm = h>=12?'PM':'AM';
  const hr = h%12||12;
  return `${hr}:${String(m).padStart(2,'0')} ${ampm}`;
}

// ── SECTION SWITCHING ─────────────────────────────
function showSection(sec) {
  document.querySelectorAll('.csec').forEach(s=>s.classList.remove('active'));
  document.getElementById('sec-'+sec).classList.add('active');
  document.querySelectorAll('.nav-btn').forEach(b=>b.classList.toggle('active', b.dataset.sec===sec));
}

// ── RENDER GRIDS ──────────────────────────────────
const CAT_ICON = {poems:'📜',novels:'📚',thoughts:'🌙',faq:'🤲'};

function renderAllGrids() {
  ['poems','novels','thoughts','faq'].forEach(c=>renderGrid(c));
}
function renderGrid(cat) {
  const grid = document.getElementById('grid-'+cat);
  if (!grid) return;
  const items = data[cat]||[];
  if (!items.length) {
    grid.innerHTML = `<div class="empty-st"><span>✦</span>No entries yet. Admin can add some.</div>`;
    return;
  }
  grid.innerHTML = items.map((item,i) => buildCard(item, cat, i)).join('');
}

function buildCard(item, cat, i) {
  const c = item.color||'gold';
  const titleEn = item.title_en||item.title||'Untitled';
  const titleBn = item.title_bn||'';
  const titleAr = item.title_ar||'';
  const excEn   = item.excerpt_en||item.excerpt||'';
  const excBn   = item.excerpt_bn||'';
  return `<div class="content-card card-${c}" style="animation-delay:${i*0.06}s" onclick="openViewer('${cat}','${item.id}')">
    <div class="cc-bar"></div>
    <span class="cc-icon">${CAT_ICON[cat]}</span>
    <div class="cc-title">${titleEn}</div>
    ${titleAr?`<div class="cc-sub">${titleAr}</div>`:''}
    ${titleBn?`<div class="cc-sub-bn">${titleBn}</div>`:''}
    <div class="cc-excerpt">${excEn}</div>
    ${excBn?`<div class="cc-excerpt-bn">${excBn}</div>`:''}
    <div class="cc-foot">
      <span class="cc-read">READ ›</span>
      <span class="cc-tag tag-${c}">${cat.toUpperCase()}</span>
    </div>
  </div>`;
}

// ── VIEWER MODAL ──────────────────────────────────
function openViewer(cat, id) {
  const item = (data[cat]||[]).find(x=>x.id===id);
  if (!item) return;
  curViewerItem = {item, cat};
  curViewerLang = 'en';

  // Set header
  document.getElementById('vpTitle').textContent = item.title_en || item.title || '—';
  const sub = [item.title_ar, item.title_bn].filter(Boolean).join('  ·  ');
  document.getElementById('vpSub').textContent = sub;

  // Reset lang buttons to EN
  document.querySelectorAll('.vls').forEach(b => b.classList.toggle('active', b.dataset.vl === 'en'));

  renderViewerBody();
  document.getElementById('viewerOv').classList.add('open');
}

function renderViewerBody() {
  if (!curViewerItem) return;
  const {item} = curViewerItem;
  const bodyDiv = document.getElementById('vpBody');
  const isBn = curViewerLang === 'bn';

  // Build verse block (always shown)
  const verseHtml = item.verse
    ? `<div class="v-arabic">${item.verse}</div>`
    : '';

  // Strip any wrapper divs from stored content so we render cleanly
  function stripWrapper(html) {
    if (!html) return '';
    // Remove outer <div class="v-content..."> wrapper if present, keep inner HTML
    return html.replace(/^<div[^>]*class="v-content[^"]*"[^>]*>([\s\S]*)<\/div>$/i, '$1').trim();
  }

  let mainContent = '';

  if (isBn) {
    const rawBn = item.content_bn || '';
    if (rawBn.trim()) {
      mainContent = `
        <div class="viewer-lang-label">🇧🇩 বাংলা</div>
        <div class="v-text bn-text" style="font-family:'Hind Siliguri',sans-serif;line-height:2;font-size:1.05rem;">
          ${stripWrapper(rawBn)}
        </div>`;
    } else {
      // No Bengali content — offer AI translation
      mainContent = `
        <div class="viewer-lang-label">🇧🇩 বাংলা</div>
        <div class="no-bn-msg">
          <p>এই লেখাটির বাংলা অনুবাদ এখনো পাওয়া যায়নি।</p>
          <button class="glass-btn auto-translate-btn" onclick="autoTranslate()">
            <span>✦ AI দিয়ে বাংলায় অনুবাদ করুন</span>
            <div class="btn-shine"></div>
          </button>
        </div>`;
    }
  } else {
    const rawEn = item.content_en || item.content || '';
    mainContent = `
      <div class="viewer-lang-label">🇬🇧 English</div>
      <div class="v-text en-text">
        ${rawEn.trim() ? stripWrapper(rawEn) : `<p>${item.excerpt_en || ''}</p>`}
      </div>`;
  }

  bodyDiv.innerHTML = verseHtml + mainContent;
}

// Auto-translate using AI when no Bengali content exists
async function autoTranslate() {
  if (!curViewerItem) return;
  const {item, cat} = curViewerItem;
  const btn = document.querySelector('.auto-translate-btn');
  if (btn) { btn.disabled = true; btn.querySelector('span').textContent = '⏳ অনুবাদ হচ্ছে…'; }

  const srcText = item.content_en || item.excerpt_en || item.title_en || '';
  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514', max_tokens: 1000,
        system: 'Translate the following Islamic literary content into beautiful, literary Bangla (Bengali). Preserve the poetic and spiritual tone. Return only the translated text with paragraph tags <p>...</p>, no extra explanation.',
        messages: [{role:'user', content: srcText.replace(/<[^>]+>/g,' ').trim()}]
      })
    });
    const d = await res.json();
    const translated = d.content?.map(b=>b.text||'').join('') || '';
    if (translated) {
      // Save the translation back into the data
      const idx = data[cat].findIndex(x => x.id === item.id);
      if (idx !== -1) {
        data[cat][idx].content_bn = `<div class="v-content-bn">${translated}</div>`;
        data[cat][idx].excerpt_bn = translated.replace(/<[^>]+>/g,'').slice(0,120)+'…';
        curViewerItem.item = data[cat][idx];
        save();
        renderGrid(cat);
      }
      renderViewerBody();
      showToast('✦ বাংলা অনুবাদ সম্পন্ন!');
    }
  } catch(e) {
    showToast('⚠ অনুবাদ ব্যর্থ হয়েছে। পরে চেষ্টা করুন।');
    if (btn) { btn.disabled = false; btn.querySelector('span').textContent = '✦ AI দিয়ে বাংলায় অনুবাদ করুন'; }
  }
}

function vLang(l, el) {
  curViewerLang = l;
  document.querySelectorAll('.vls').forEach(b => b.classList.toggle('active', b.dataset.vl === l));
  renderViewerBody();
}

function closeViewer(e) {
  if (!e || e.target === document.getElementById('viewerOv'))
    document.getElementById('viewerOv').classList.remove('open');
}

// ── STATS ─────────────────────────────────────────
function updateStats() {
  document.getElementById('s1').textContent = data.poems.length;
  document.getElementById('s2').textContent = data.novels.length;
  document.getElementById('s3').textContent = data.thoughts.length;
  document.getElementById('s4').textContent = data.faq.length;
}
function animateStats() {
  ['s1','s2','s3','s4'].forEach(id=>{
    const el=document.getElementById(id), target=parseInt(el.textContent)||0;
    let cur=0; const step=setInterval(()=>{cur=Math.min(cur+1,target);el.textContent=cur;if(cur>=target)clearInterval(step);},60);
  });
}

// ── SEARCH ────────────────────────────────────────
function openSearch() {
  document.getElementById('searchOv').classList.add('open');
  setTimeout(()=>document.getElementById('srchInput').focus(), 100);
}
function closeSearch(e) {
  if (!e||e.target===document.getElementById('searchOv'))
    document.getElementById('searchOv').classList.remove('open');
}
function liveSearch(q) {
  const res = document.getElementById('srchResults');
  if (!q.trim()) { res.innerHTML=''; return; }
  const all = [];
  ['poems','novels','thoughts','faq'].forEach(cat=>{
    (data[cat]||[]).forEach(item=>{
      const haystack = [(item.title_en||''), (item.title_bn||''), (item.excerpt_en||''), (item.excerpt_bn||'')].join(' ').toLowerCase();
      if (haystack.includes(q.toLowerCase())) all.push({item,cat});
    });
  });
  if (!all.length) {
    res.innerHTML='<div class="sr-empty">No results found.</div>'; return;
  }
  res.innerHTML = all.map(({item,cat})=>`
    <div class="sr-item" onclick="document.getElementById('searchOv').classList.remove('open');showSection('${cat}');setTimeout(()=>openViewer('${cat}','${item.id}'),200)">
      <span class="sr-icon">${CAT_ICON[cat]}</span>
      <div><div class="sr-title">${item.title_en||item.title}</div><div class="sr-excerpt">${(item.excerpt_en||'').slice(0,80)}…</div></div>
    </div>`).join('');
}

// ── ADMIN GATE ────────────────────────────────────
function openAdminGate() {
  document.getElementById('gateErr').textContent='';
  document.getElementById('gatePass').value='';
  document.getElementById('adminGate').classList.add('open');
  setTimeout(()=>document.getElementById('gatePass').focus(),100);
}
function closeAdminGate(e) {
  if (!e||e.target===document.getElementById('adminGate'))
    document.getElementById('adminGate').classList.remove('open');
}
function verifyPass() {
  const pass = document.getElementById('gatePass').value;
  if (pass === adminPass) {
    document.getElementById('adminGate').classList.remove('open');
    openAdmin();
  } else {
    const err = document.getElementById('gateErr');
    err.textContent = 'Incorrect password. Try again.';
    document.getElementById('gatePass').value='';
    document.getElementById('gatePass').focus();
    err.style.animation='none'; requestAnimationFrame(()=>{ err.style.animation='shake 0.4s'; });
  }
}

// ── ADMIN PANEL ───────────────────────────────────
function openAdmin() {
  apTab('add', document.querySelector('.ap-t'));
  document.getElementById('adminOv').classList.add('open');
}
function closeAdmin(e) {
  if (!e||e.target===document.getElementById('adminOv'))
    document.getElementById('adminOv').classList.remove('open');
}
function apTab(tab, el) {
  document.querySelectorAll('.ap-t').forEach(t=>t.classList.remove('active'));
  document.querySelectorAll('.ap-content').forEach(c=>c.classList.remove('active'));
  if (el) el.classList.add('active');
  const tc = document.getElementById('tab-'+tab);
  if (tc) tc.classList.add('active');
  if (tab==='manage') renderManageList('all');
}
function pickColor(el) {
  document.querySelectorAll('.cp').forEach(c=>c.classList.remove('active'));
  el.classList.add('active');
  selectedColor = el.dataset.c;
}

function saveEntry() {
  const cat   = document.getElementById('aCat').value;
  const tEn   = document.getElementById('aTitleEn').value.trim();
  if (!tEn) { showToast('⚠ English title is required.'); return; }
  const entry = {
    id: cat[0]+Date.now(),
    color: selectedColor,
    title_en: tEn,
    title_bn: document.getElementById('aTitleBn').value.trim(),
    title_ar: document.getElementById('aTitleAr').value.trim(),
    excerpt_en: document.getElementById('aExcEn').value.trim(),
    excerpt_bn: document.getElementById('aExcBn').value.trim(),
    content_en: document.getElementById('aConEn').value.trim(),
    content_bn: document.getElementById('aConBn').value.trim(),
    verse: document.getElementById('aVerse').value.trim(),
  };
  data[cat].unshift(entry);
  save();
  renderGrid(cat);
  updateStats();
  closeAdmin();
  showToast('✦ Entry saved successfully!');
  ['aTitleEn','aTitleBn','aTitleAr','aExcEn','aExcBn','aConEn','aConBn','aVerse'].forEach(id=>{
    const el=document.getElementById(id); if(el) el.value='';
  });
}

function saveFaqAdmin() {
  const qEn = document.getElementById('qfaqQEn').value.trim();
  const aEn = document.getElementById('qfaqAEn').value.trim();
  if (!qEn||!aEn) { showToast('⚠ Question and English answer required.'); return; }
  const qBn = document.getElementById('qfaqQBn').value.trim();
  const aBn = document.getElementById('qfaqABn').value.trim();
  const v   = document.getElementById('qfaqV').value.trim();
  const id  = 'f'+Date.now();
  data.faq.unshift({
    id, color:'gold',
    title_en: qEn, title_bn: qBn||qEn, title_ar:'سؤال وجواب',
    excerpt_en: aEn.slice(0,120)+'…',
    excerpt_bn: aBn ? aBn.slice(0,120)+'…' : '',
    verse: v,
    content_en: `<div class="v-content"><p><strong>Q:</strong> ${qEn}</p><br><p>${aEn.replace(/\n/g,'</p><p>')}</p></div>`,
    content_bn: aBn ? `<div class="v-content-bn"><p><strong>প্রশ্ন:</strong> ${qBn||qEn}</p><br><p>${aBn.replace(/\n/g,'</p><p>')}</p></div>` : '',
  });
  save();
  renderGrid('faq');
  updateStats();
  closeAdmin();
  showToast('✦ FAQ added!');
}

function saveSettings() {
  const oldP = document.getElementById('setOld').value;
  const newP = document.getElementById('setNew').value;
  const ticker = document.getElementById('setTicker').value.trim();
  if (oldP && newP) {
    if (oldP !== adminPass) { showToast('⚠ Current password incorrect.'); return; }
    adminPass = newP;
    localStorage.setItem(ADMIN_PASS_KEY, adminPass);
    showToast('✦ Password changed!');
  }
  if (ticker) {
    TICKER_TEXTS.push(ticker);
    initTicker();
  }
  closeAdmin();
  if (!oldP&&!ticker) showToast('✦ Settings saved.');
}

function filterManage(cat, el) {
  document.querySelectorAll('.mf').forEach(b=>b.classList.remove('active'));
  el.classList.add('active');
  renderManageList(cat);
}
function renderManageList(filter) {
  const list = document.getElementById('manageList');
  const cats = filter==='all' ? ['poems','novels','thoughts','faq'] : [filter];
  let html='';
  cats.forEach(cat=>{
    (data[cat]||[]).forEach(item=>{
      html+=`<div class="mi" id="mi-${item.id}">
        <div class="mi-info">
          <span class="mi-title">${item.title_en||item.title}</span>
          <span class="mi-meta">${cat.toUpperCase()} · ${item.title_bn||''} · ${item.title_ar||''}</span>
        </div>
        <button class="mi-del" onclick="deleteEntry('${cat}','${item.id}')">Delete</button>
      </div>`;
    });
  });
  if (!html) html='<div style="color:var(--text3);padding:20px;text-align:center;font-style:italic;">No entries.</div>';
  list.innerHTML=html;
}
function deleteEntry(cat, id) {
  data[cat] = data[cat].filter(x=>x.id!==id);
  save();
  renderGrid(cat);
  updateStats();
  const el=document.getElementById('mi-'+id);
  if(el){el.style.transition='all 0.3s';el.style.opacity='0';el.style.transform='translateX(20px)';setTimeout(()=>el.remove(),300);}
  showToast('Entry deleted.');
}

// ── FAQ / AI ──────────────────────────────────────
function setQ(q){ document.getElementById('faqInput').value=q; askFAQ(); }

async function askFAQ() {
  const q = document.getElementById('faqInput').value.trim();
  if (!q) return;
  const box = document.getElementById('faq-answer-box');
  box.innerHTML=`<div class="faq-answer"><div class="fa-loading"><div class="fa-spin"></div><span>Seeking wisdom through knowledge…</span></div></div>`;
  try {
    const isBn = /[\u0980-\u09FF]/.test(q);
    const systemPrompt = `You are an Islamic scholar embedded in "Noor Al-Hikma" (Light of Wisdom). Answer questions about Islam with depth, compassion, and scholarly accuracy. Cite relevant Quranic verses (Arabic with translation) or authentic hadith. Write in an elevated, literary style. Format: 1) Relevant Arabic verse if applicable, 2) Your explanation in ${isBn?'Bangla/Bengali':'English'}. Keep answers 200-300 words. End with a brief du'a or reflection. If the question is in Bangla, answer in Bangla. Always use proper Islamic terminology.`;
    const res = await fetch('https://api.anthropic.com/v1/messages',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        model:'claude-sonnet-4-20250514', max_tokens:1000,
        system:systemPrompt,
        messages:[{role:'user',content:q}]
      })
    });
    const d=await res.json();
    const ans=d.content?.map(b=>b.text||'').join('')||'No response.';
    const fmtAns = ans.replace(/\n\n/g,'</p><p>').replace(/\n/g,'<br>').replace(/\*\*(.*?)\*\*/g,'<strong style="color:var(--gold-l)">$1</strong>');
    box.innerHTML=`<div class="faq-answer"><div class="fa-q">❓ ${q}</div><div class="fa-a"><p>${fmtAns}</p></div></div>`;

    // Auto-save as FAQ card
    const saved={
      id:'ai'+Date.now(), color:['gold','teal','emerald','violet'][Math.floor(Math.random()*4)],
      title_en:q.length>65?q.slice(0,62)+'…':q,
      title_bn:isBn?q:'',
      title_ar:'سؤال وجواب',
      excerpt_en:ans.slice(0,120)+'…',
      excerpt_bn:isBn?ans.slice(0,120)+'…':'',
      verse:'',
      content_en:`<div class="v-content"><p style="color:var(--gold-l);font-weight:600;">Q: ${q}</p><br><p>${fmtAns}</p></div>`,
      content_bn:isBn?`<div class="v-content-bn"><p>${fmtAns}</p></div>`:'',
    };
    data.faq.unshift(saved);
    if (data.faq.length>30) data.faq.pop();
    save(); renderGrid('faq'); updateStats();
  } catch(e) {
    box.innerHTML=`<div class="faq-answer"><div class="fa-q">❓ ${q}</div><div class="fa-a" style="color:var(--text3);font-style:italic">Unable to connect. Please check your connection.<br><br><em style="color:var(--gold-d)">"And say: My Lord, increase me in knowledge." — Ta-Ha 20:114</em></div></div>`;
  }
  document.getElementById('faqInput').value='';
}

// ── TOAST ─────────────────────────────────────────
function showToast(msg) {
  const t=document.getElementById('toast');
  t.textContent=msg; t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),3000);
}

// ── KEYBOARD ──────────────────────────────────────
document.addEventListener('keydown', e=>{
  if(e.key==='Escape'){
    ['adminGate','adminOv','viewerOv','searchOv'].forEach(id=>document.getElementById(id).classList.remove('open'));
  }
});

// CSS for shake animation
const st=document.createElement('style');
st.textContent=`@keyframes shake{0%,100%{transform:translateX(0);}25%{transform:translateX(-6px);}75%{transform:translateX(6px);}}`;
document.head.appendChild(st);

// Orb parallax
document.addEventListener('mousemove',e=>{
  const mx=(e.clientX/window.innerWidth-0.5)*30;
  const my=(e.clientY/window.innerHeight-0.5)*30;
  document.querySelectorAll('.orb').forEach((o,i)=>{
    const f=(i+1)*0.2;
    o.style.transform=`translate(${mx*f}px,${my*f}px)`;
  });
});
