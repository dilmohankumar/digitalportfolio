import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["About", "Skills", "Work", "Contact"];

const SKILLS = {
  "Digital Marketing": [
    "Social Media Marketing",
    "Meta Ads (FB & IG)",
    "PPC Advertising",
    "Content Marketing",
    "Lead Generation",
    "Campaign Optimization",
    "Audience Targeting",
    "Marketing Analytics",
  ],
  "Creative": [
    "Graphic Designing",
    "Video Editing",
    "Reel Creation",
    "AI Video Creation",
    "Canva Design",
    "Ad Creatives",
    "Copywriting",
    "Content Writing",
  ],
  "Tools & Tech": [
    "Meta Ads Manager",
    "Canva",
    "ChatGPT & AI Tools",
    "Facebook Business Suite",
    "Instagram Marketing",
    "Basic SEO",
    "Google Workspace",
    "Microsoft Office",
  ],
};

const PROJECTS = [
  {
    title: "Bakery Brand Campaign",
    category: "Food & Beverage",
    tag: "Meta Ads",
    color: "#ff6b35",
    desc: "End-to-end promotional campaigns for a bakery specializing in Black Forest cakes — reels, creatives, and paid ads.",
    metrics: [{ label: "Reach", val: "50K+" }, { label: "Engagement↑", val: "3×" }],
    icon: "🎂",
  },
  {
    title: "Restaurant Promotion",
    category: "F&B / Hospitality",
    tag: "SMM",
    color: "#6c63ff",
    desc: "Social media management and reel production for buffet and cheese burst campaigns — driving footfall and online orders.",
    metrics: [{ label: "Followers↑", val: "2K" }, { label: "Orders↑", val: "40%" }],
    icon: "🍕",
  },
  {
    title: "Real Estate Leads",
    category: "Real Estate",
    tag: "Lead Gen",
    color: "#00c896",
    desc: "Meta lead generation campaigns with targeted audience segmentation, ad copy, and creative for real estate developers.",
    metrics: [{ label: "CPL", val: "↓35%" }, { label: "Leads", val: "200+" }],
    icon: "🏡",
  },
  {
    title: "Digital Marketing Course",
    category: "EdTech",
    tag: "Content",
    color: "#f7b731",
    desc: "Full social media campaign to promote a digital marketing course — reels, stories, creatives and ad strategy.",
    metrics: [{ label: "Enrollments", val: "+60%" }, { label: "CTR", val: "4.2%" }],
    icon: "📚",
  },
];

const TESTIMONIALS = [
  {
    text: "Danish has an incredible eye for what works on social media. Our bakery page blew up after he took over!",
    name: "Priya S.",
    role: "Bakery Owner",
  },
  {
    text: "The Meta Ads campaigns he ran brought in quality leads at almost half the cost we were spending before.",
    name: "Rohit M.",
    role: "Real Estate Developer",
  },
  {
    text: "Creative, punctual, and genuinely invested in our brand growth. Would recommend him to anyone.",
    name: "Aman K.",
    role: "Restaurant Manager",
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function FadeIn({ children, delay = 0, className = "" }) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// Marquee ticker
function Ticker() {
  const items = ["Social Media Marketing", "Meta Ads", "Content Creation", "Lead Generation", "Video Editing", "Branding", "Reels", "AI Content", "Canva Design", "PPC Ads"];
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-gray-800 py-4 bg-black relative">
      <div className="flex gap-12 whitespace-nowrap animate-marquee">
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-4 text-sm font-medium tracking-widest text-gray-400 uppercase shrink-0">
            <span className="text-orange-400 text-lg">✦</span> {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSkill, setActiveSkill] = useState("Digital Marketing");
  const [tIdx, setTIdx] = useState(0);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setTIdx(i => (i + 1) % TESTIMONIALS.length), 4000);
    return () => clearInterval(t);
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-black text-white min-h-screen font-sans antialiased">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
        * { font-family: 'DM Sans', sans-serif; box-sizing: border-box; }
        h1,h2,h3,.display { font-family: 'Syne', sans-serif; }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .animate-marquee { animation: marquee 28s linear infinite; }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        .float { animation: float 4s ease-in-out infinite; }
        @keyframes ping-slow { 0%{transform:scale(1);opacity:1}70%{transform:scale(2);opacity:0}100%{transform:scale(2);opacity:0} }
        .ping-slow { animation: ping-slow 2s cubic-bezier(0,0,0.2,1) infinite; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-thumb { background: #f97316; border-radius: 4px; }
        .card-hover { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .card-hover:hover { transform: translateY(-6px); box-shadow: 0 20px 60px rgba(249,115,22,0.15); }
        .skill-pill { transition: all 0.25s ease; }
        .skill-pill:hover { background: #f97316; color: #000; transform: scale(1.05); }
        .nav-link { position: relative; }
        .nav-link::after { content:''; position:absolute; bottom:-2px; left:0; width:0; height:2px; background:#f97316; transition: width 0.3s ease; }
        .nav-link:hover::after { width:100%; }
      `}</style>

      {/* NAV */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-black/90 backdrop-blur-md border-b border-gray-800" : ""}`}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-xl font-bold display tracking-tight">
            <span className="text-orange-400">D</span>anish
          </span>
          {/* Desktop */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(l => (
              <button key={l} onClick={() => scrollTo(l.toLowerCase())} className="nav-link text-sm text-gray-300 hover:text-white transition-colors capitalize">
                {l}
              </button>
            ))}
            <button onClick={() => scrollTo("contact")} className="bg-orange-500 hover:bg-orange-400 text-black text-sm font-semibold px-5 py-2 rounded-full transition-colors">
              Hire Me
            </button>
          </div>
          {/* Mobile hamburger */}
          <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
              {menuOpen
                ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
                : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>}
            </svg>
          </button>
        </div>
        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-black border-t border-gray-800 px-6 py-6 flex flex-col gap-5">
            {NAV_LINKS.map(l => (
              <button key={l} onClick={() => scrollTo(l.toLowerCase())} className="text-gray-300 hover:text-orange-400 text-left text-lg transition-colors">{l}</button>
            ))}
            <button onClick={() => scrollTo("contact")} className="bg-orange-500 text-black font-semibold py-3 rounded-full mt-2">Hire Me</button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="about" className="min-h-screen flex items-center pt-24 pb-16 px-6">
        <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
          <div>
            {/* Available badge */}
            <div className="inline-flex items-center gap-2 bg-gray-900 border border-gray-700 rounded-full px-4 py-2 mb-8">
              <span className="relative flex h-2.5 w-2.5">
                <span className="ping-slow absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400"></span>
              </span>
              <span className="text-xs text-gray-300 tracking-widest uppercase">Available for Work</span>
            </div>

            <p className="text-orange-400 text-sm font-medium tracking-widest uppercase mb-3">Digital Marketing Executive · Chandigarh</p>
            <h1 className="display text-5xl sm:text-6xl md:text-7xl font-extrabold leading-none mb-6">
              Hello,<br/>I'm <span className="text-orange-400">Danish</span>
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-md">
              Creative & result-driven marketer with expertise in <strong className="text-white">Meta Ads</strong>, social media growth, and AI-powered content — helping brands tell their story and scale.
            </p>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => scrollTo("work")} className="bg-orange-500 hover:bg-orange-400 text-black font-semibold px-7 py-3 rounded-full transition-all hover:scale-105">
                View My Work
              </button>
              <button onClick={() => scrollTo("contact")} className="border border-gray-600 hover:border-orange-400 hover:text-orange-400 text-gray-300 font-medium px-7 py-3 rounded-full transition-all">
                Let's Talk
              </button>
            </div>

            {/* Socials */}
            <div className="flex gap-4 mt-10">
              {[
                { label: "LinkedIn", icon: "in" },
                { label: "Instagram", icon: "ig" },
                { label: "Email", icon: "✉" },
              ].map(s => (
                <div key={s.label} className="w-10 h-10 rounded-full border border-gray-700 hover:border-orange-400 hover:text-orange-400 flex items-center justify-center text-gray-400 text-xs font-bold cursor-pointer transition-all hover:scale-110">
                  {s.icon}
                </div>
              ))}
            </div>
          </div>

          {/* Right visual */}
          <div className="flex justify-center md:justify-end">
            <div className="relative">
              {/* Decorative rings */}
              <div className="absolute inset-0 rounded-3xl border border-orange-400/20 scale-110"></div>
              <div className="absolute inset-0 rounded-3xl border border-orange-400/10 scale-125"></div>

              <div className="w-72 h-80 sm:w-80 sm:h-96 rounded-3xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 flex flex-col items-center justify-center relative overflow-hidden float">
                {/* BG decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl"></div>

                {/* Avatar placeholder */}
                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-5xl font-extrabold text-black display mb-6 shadow-lg shadow-orange-500/30">
                  D
                </div>
                <p className="text-white font-semibold text-lg display">Danish</p>
                <p className="text-gray-400 text-sm mt-1">Digital Marketing Executive</p>

                {/* Floating stats */}
                <div className="absolute top-5 -left-8 bg-black border border-gray-700 rounded-xl px-4 py-2 shadow-xl">
                  <p className="text-orange-400 font-bold text-lg display">50K+</p>
                  <p className="text-gray-400 text-xs">Reach Generated</p>
                </div>
                <div className="absolute bottom-8 -right-8 bg-black border border-gray-700 rounded-xl px-4 py-2 shadow-xl">
                  <p className="text-green-400 font-bold text-lg display">200+</p>
                  <p className="text-gray-400 text-xs">Leads Driven</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TICKER */}
      <Ticker />

      {/* STATS */}
      <section className="py-16 px-6 border-b border-gray-800">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { val: "2+", label: "Years Experience" },
            { val: "10+", label: "Clients Served" },
            { val: "200+", label: "Leads Generated" },
            { val: "4", label: "Industries" },
          ].map((s, i) => (
            <FadeIn key={s.label} delay={i * 0.1}>
              <div className="text-center p-6 rounded-2xl bg-gray-900 border border-gray-800 hover:border-orange-400/50 transition-colors">
                <p className="text-3xl sm:text-4xl font-extrabold text-orange-400 display">{s.val}</p>
                <p className="text-gray-400 text-sm mt-2">{s.label}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <p className="text-orange-400 text-sm font-medium tracking-widest uppercase mb-3 text-center">Expertise</p>
            <h2 className="display text-4xl sm:text-5xl font-extrabold text-center mb-4">My Skill Set</h2>
            <p className="text-gray-400 text-center mb-12 max-w-xl mx-auto">A blend of creative and analytical skills to drive real results for your brand.</p>
          </FadeIn>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {Object.keys(SKILLS).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveSkill(tab)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${activeSkill === tab ? "bg-orange-500 text-black" : "border border-gray-700 text-gray-400 hover:border-orange-400 hover:text-orange-400"}`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            {SKILLS[activeSkill].map((sk, i) => (
              <FadeIn key={sk} delay={i * 0.05}>
                <span className="skill-pill px-5 py-2.5 rounded-full border border-gray-700 text-gray-300 text-sm cursor-default">
                  {sk}
                </span>
              </FadeIn>
            ))}
          </div>

          {/* What I do */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-20">
            {[
              { icon: "📣", title: "Paid Advertising", desc: "High-converting Meta Ads campaigns tailored to your goals and audience." },
              { icon: "🎬", title: "Content Creation", desc: "Reels, creatives, and AI-powered videos that stop the scroll." },
              { icon: "📊", title: "Strategy & Analytics", desc: "Data-driven decisions to optimize campaigns and maximize ROI." },
              { icon: "🎨", title: "Brand Design", desc: "Visual identity and ad creatives that communicate your brand story." },
            ].map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.1}>
                <div className="card-hover p-6 rounded-2xl bg-gray-900 border border-gray-800 hover:border-orange-400/40 h-full">
                  <div className="text-3xl mb-4">{item.icon}</div>
                  <h3 className="display font-bold text-white text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* WORK */}
      <section id="work" className="py-24 px-6 bg-gray-950">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <p className="text-orange-400 text-sm font-medium tracking-widest uppercase mb-3 text-center">Portfolio</p>
            <h2 className="display text-4xl sm:text-5xl font-extrabold text-center mb-4">Selected Work</h2>
            <p className="text-gray-400 text-center mb-16 max-w-xl mx-auto">Real campaigns, real results — across diverse industries.</p>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-6">
            {PROJECTS.map((p, i) => (
              <FadeIn key={p.title} delay={i * 0.1}>
                <div className="card-hover rounded-2xl bg-gray-900 border border-gray-800 overflow-hidden group cursor-pointer">
                  {/* Color band */}
                  <div className="h-2" style={{ background: p.color }}></div>
                  <div className="p-7">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <span className="text-xs font-medium tracking-widest uppercase text-gray-500">{p.category}</span>
                        <h3 className="display text-xl font-bold text-white mt-1">{p.title}</h3>
                      </div>
                      <div className="text-4xl">{p.icon}</div>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6">{p.desc}</p>

                    <div className="flex items-center gap-4">
                      {p.metrics.map(m => (
                        <div key={m.label} className="rounded-xl px-4 py-2 border border-gray-700" style={{ borderColor: p.color + "40" }}>
                          <p className="font-bold text-lg display" style={{ color: p.color }}>{m.val}</p>
                          <p className="text-gray-500 text-xs">{m.label}</p>
                        </div>
                      ))}
                      <span className="ml-auto text-xs px-3 py-1 rounded-full font-medium border" style={{ color: p.color, borderColor: p.color + "50" }}>{p.tag}</span>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <p className="text-orange-400 text-sm font-medium tracking-widest uppercase mb-3 text-center">Journey</p>
            <h2 className="display text-4xl sm:text-5xl font-extrabold text-center mb-16">Experience</h2>
          </FadeIn>

          <div className="relative">
            <div className="absolute left-5 top-0 bottom-0 w-px bg-gray-800 hidden sm:block"></div>
            <div className="flex flex-col gap-10">
              {[
                {
                  date: "2026 – Present",
                  title: "Digital Marketing Executive",
                  company: "VKS Hytech Pvt Ltd",
                  desc: "Managing social media campaigns, running Meta Ads for lead generation, creating ad creatives and copies, and supporting online growth strategies.",
                  tags: ["Meta Ads", "SMM", "Content"],
                },
                {
                  date: "2024 – Present",
                  title: "Freelance Digital Marketer & SMM",
                  company: "Self-Employed",
                  desc: "Managed campaigns for 10+ clients across food, real estate, education, and travel. Created high-performing Meta Ads, reels, and content strategies.",
                  tags: ["Freelance", "Multi-industry", "Strategy"],
                },
              ].map((exp, i) => (
                <FadeIn key={exp.title} delay={i * 0.15}>
                  <div className="sm:pl-14 relative">
                    <div className="absolute left-3 top-2 w-4 h-4 rounded-full bg-orange-500 border-2 border-black hidden sm:block shadow-md shadow-orange-500/40"></div>
                    <div className="p-6 rounded-2xl bg-gray-900 border border-gray-800 hover:border-orange-400/30 transition-colors">
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                        <div>
                          <h3 className="display font-bold text-white text-xl">{exp.title}</h3>
                          <p className="text-orange-400 text-sm font-medium">{exp.company}</p>
                        </div>
                        <span className="text-gray-500 text-sm bg-gray-800 px-3 py-1 rounded-full">{exp.date}</span>
                      </div>
                      <p className="text-gray-400 text-sm leading-relaxed mb-4">{exp.desc}</p>
                      <div className="flex flex-wrap gap-2">
                        {exp.tags.map(t => (
                          <span key={t} className="text-xs px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 px-6 bg-gray-950 overflow-hidden">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <p className="text-orange-400 text-sm font-medium tracking-widest uppercase mb-3">Social Proof</p>
            <h2 className="display text-4xl sm:text-5xl font-extrabold mb-16">What Clients Say</h2>
          </FadeIn>
          <div className="relative min-h-48">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className="absolute inset-0 transition-all duration-700"
                style={{ opacity: tIdx === i ? 1 : 0, transform: tIdx === i ? "translateY(0)" : "translateY(20px)", pointerEvents: tIdx === i ? "auto" : "none" }}
              >
                <div className="p-8 rounded-3xl bg-gray-900 border border-gray-800">
                  <p className="text-2xl text-orange-400 mb-4">"</p>
                  <p className="text-gray-200 text-lg leading-relaxed mb-6 italic">"{t.text}"</p>
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center font-bold text-black display">{t.name[0]}</div>
                    <div className="text-left">
                      <p className="text-white font-semibold text-sm">{t.name}</p>
                      <p className="text-gray-500 text-xs">{t.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Dots */}
          <div className="flex justify-center gap-2 mt-52 sm:mt-48">
            {TESTIMONIALS.map((_, i) => (
              <button key={i} onClick={() => setTIdx(i)} className={`w-2 h-2 rounded-full transition-all ${tIdx === i ? "bg-orange-400 w-6" : "bg-gray-600"}`} />
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <p className="text-orange-400 text-sm font-medium tracking-widest uppercase mb-3 text-center">Get In Touch</p>
            <h2 className="display text-4xl sm:text-5xl font-extrabold text-center mb-4">Let's Connect</h2>
            <p className="text-gray-400 text-center mb-16 max-w-md mx-auto">Ready to grow your brand? I'd love to hear about your project.</p>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Info */}
            <FadeIn>
              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-gray-900 border border-gray-800 flex items-center gap-4 hover:border-orange-400/40 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 text-xl">✉</div>
                  <div>
                    <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">Email</p>
                    <p className="text-white font-medium">uxdeepen@gmail.com</p>
                  </div>
                </div>
                <div className="p-6 rounded-2xl bg-gray-900 border border-gray-800 flex items-center gap-4 hover:border-orange-400/40 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 text-xl">📞</div>
                  <div>
                    <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">Phone</p>
                    <p className="text-white font-medium">+91 XXXXXXXXXX</p>
                  </div>
                </div>
                <div className="p-6 rounded-2xl bg-gray-900 border border-gray-800 flex items-center gap-4 hover:border-orange-400/40 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 text-xl">📍</div>
                  <div>
                    <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">Location</p>
                    <p className="text-white font-medium">Himachal Pradesh / Chandigarh, India</p>
                  </div>
                </div>
                {/* Languages */}
                <div className="p-6 rounded-2xl bg-gray-900 border border-gray-800">
                  <p className="text-gray-500 text-xs uppercase tracking-widest mb-3">Languages</p>
                  <div className="flex gap-2">
                    {["English", "Hindi", "Punjabi"].map(l => (
                      <span key={l} className="text-sm px-3 py-1 rounded-full bg-gray-800 text-gray-300 border border-gray-700">{l}</span>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* CTA card */}
            <FadeIn delay={0.15}>
              <div className="p-8 rounded-3xl bg-gradient-to-br from-orange-500 to-orange-600 h-full flex flex-col justify-between">
                <div>
                  <h3 className="display text-3xl font-extrabold text-black mb-4">Ready to scale your brand?</h3>
                  <p className="text-orange-950 text-sm leading-relaxed mb-8">
                    Whether you need Meta Ads, content strategy, reels, or full social media management — let's make it happen together.
                  </p>
                </div>
                <div className="space-y-3">
                  <a href="mailto:uxdeepen@gmail.com" className="block w-full text-center bg-black text-white font-semibold py-4 rounded-2xl hover:bg-gray-900 transition-colors text-sm">
                    Send Me an Email
                  </a>
                  <div className="flex gap-3 justify-center">
                    {["LinkedIn", "Instagram", "Behance"].map(s => (
                      <button key={s} className="flex-1 text-center border border-orange-400/50 text-black text-xs py-2 rounded-xl hover:bg-black/10 transition-colors">{s}</button>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-800 py-8 px-6 text-center">
        <p className="text-gray-600 text-sm">
          © 2026 <span className="text-orange-400">Danish</span> · Digital Marketing Executive · Made with ❤️
        </p>
      </footer>
    </div>
  );
}