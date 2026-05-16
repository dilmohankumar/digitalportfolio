import { useState, useEffect, useRef } from "react";

const SKILLS = {
  "Digital Marketing": ["Social Media Marketing","Meta Ads (FB & IG)","PPC Advertising","Content Marketing","Lead Generation","Campaign Optimization","Audience Targeting","Marketing Analytics"],
  "Creative": ["Graphic Designing","Video Editing","Reel Creation","AI Video Creation","Canva Design","Ad Creatives","Copywriting","Content Writing"],
  "Tools": ["Meta Ads Manager","Canva","ChatGPT & AI Tools","Facebook Business Suite","Instagram Marketing","Basic SEO","Google Workspace","Microsoft Office"],
};

const PROJECTS = [
  { title:"Bakery Brand Campaign", category:"Food & Beverage", desc:"End-to-end reels, creatives & Meta Ads for a specialty bakery. Grew page organically and boosted in-store footfall through engaging short-form content.", tags:["Meta Ads","Reels","Content"], metrics:[{v:"50K+",l:"Reach"},{v:"3×",l:"Engagement"}], accent:"#2563eb" },
  { title:"Restaurant Promotion", category:"Hospitality", desc:"Social media management and buffet campaign for a multi-location restaurant. Drove online orders through targeted Instagram Stories and Reels.", tags:["SMM","Content","Strategy"], metrics:[{v:"+2K",l:"Followers"},{v:"40%",l:"Orders Up"}], accent:"#16a34a" },
  { title:"Real Estate Lead Gen", category:"Real Estate", desc:"Lead generation campaigns on Meta for a real estate developer — audience segmentation, ad copy, and creative that cut cost-per-lead significantly.", tags:["Lead Gen","Meta Ads","Copy"], metrics:[{v:"↓35%",l:"Cost Per Lead"},{v:"200+",l:"Leads"}], accent:"#9333ea" },
  { title:"Digital Course Launch", category:"EdTech", desc:"Full social campaign to promote a digital marketing course — reels, stories, and paid ads that drove a significant enrollment spike.", tags:["Campaign","Reels","Ads"], metrics:[{v:"+60%",l:"Enrollments"},{v:"4.2%",l:"CTR"}], accent:"#ea580c" },
];

const TESTIMONIALS = [
  { quote:"Danish transformed our bakery's social media presence. Our page blew up and customers kept saying they found us on Instagram!", name:"Priya S.", role:"Bakery Owner" },
  { quote:"His Meta Ads campaigns brought quality real estate leads at nearly half our previous cost. Very data-focused and professional.", name:"Rohit M.", role:"Real Estate Developer" },
  { quote:"Creative, punctual, and genuinely invested in our brand. The reels he made are still our top-performing posts.", name:"Aman K.", role:"Restaurant Manager" },
];

function useInView() {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect(); } }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, v];
}

function Reveal({ children, delay = 0, style = {}, className = "" }) {
  const [ref, v] = useInView();
  return (
    <div ref={ref} className={className} style={{ ...style, opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(22px)", transition: `opacity 0.55s ease ${delay}s, transform 0.55s ease ${delay}s` }}>
      {children}
    </div>
  );
}

export default function Portfolio() {
  const [mobileNav, setMobileNav] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [skillTab, setSkillTab] = useState("Digital Marketing");
  const [tIdx, setTIdx] = useState(0);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setTIdx(i => (i + 1) % TESTIMONIALS.length), 4800);
    return () => clearInterval(t);
  }, []);

  const goto = id => { setMobileNav(false); document.getElementById(id)?.scrollIntoView({ behavior:"smooth" }); };

  const T = ({ children, style = {} }) => <span style={{ fontFamily:"'Bricolage Grotesque',sans-serif", ...style }}>{children}</span>;

  return (
    <div style={{ fontFamily:"'Inter','Segoe UI',sans-serif", background:"#ffffff", color:"#0f172a", lineHeight:1.65, overflowX:"hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Bricolage+Grotesque:wght@600;700;800&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        body{-webkit-font-smoothing:antialiased;}
        ::selection{background:#dbeafe;color:#1e3a8a;}
        @keyframes ticker{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        @keyframes fadein{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
        .fadein{animation:fadein .65s ease both;}
        .fadein-2{animation:fadein .65s .12s ease both;}
        .fadein-3{animation:fadein .65s .24s ease both;}
        ::-webkit-scrollbar{width:4px;}
        ::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:4px;}
        select{appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%2394a3b8' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 14px center;}
      `}</style>

      {/* NAV */}
      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:200, background: scrolled ? "rgba(255,255,255,0.96)" : "#fff", borderBottom:`1px solid ${scrolled ? "#f1f5f9" : "transparent"}`, backdropFilter: scrolled ? "blur(12px)" : "none", transition:"all .3s ease" }}>
        <div style={{ maxWidth:1140, margin:"0 auto", padding:"0 24px", height:64, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div style={{ fontFamily:"'Bricolage Grotesque',sans-serif", fontSize:20, fontWeight:800, color:"#0f172a", letterSpacing:"-0.5px", cursor:"pointer" }} onClick={() => goto("about")}>
            Danish<span style={{ color:"#2563eb" }}>.</span>
          </div>

          {/* Desktop */}
          <div style={{ display:"flex", alignItems:"center", gap:36 }} id="desknav">
            {["about","skills","work","contact"].map(l => (
              <button key={l} onClick={() => goto(l)} style={{ background:"none", border:"none", cursor:"pointer", fontSize:14, fontWeight:500, color:"#64748b", textTransform:"capitalize", padding:0, transition:"color .2s" }}
                onMouseEnter={e=>e.target.style.color="#0f172a"} onMouseLeave={e=>e.target.style.color="#64748b"}>
                {l}
              </button>
            ))}
            <button onClick={() => goto("contact")} style={{ background:"#0f172a", color:"#fff", border:"none", padding:"9px 22px", borderRadius:100, fontSize:14, fontWeight:600, cursor:"pointer", transition:"background .2s" }}
              onMouseEnter={e=>e.target.style.background="#1e293b"} onMouseLeave={e=>e.target.style.background="#0f172a"}>
              Hire Me
            </button>
          </div>

          {/* Mobile burger */}
          <button onClick={() => setMobileNav(!mobileNav)} style={{ background:"none", border:"none", cursor:"pointer", padding:4, display:"none" }} id="burger">
            <svg width="22" height="18" viewBox="0 0 22 18" fill="none">
              {mobileNav ? <>
                <line x1="2" y1="2" x2="20" y2="16" stroke="#0f172a" strokeWidth="2" strokeLinecap="round"/>
                <line x1="20" y1="2" x2="2" y2="16" stroke="#0f172a" strokeWidth="2" strokeLinecap="round"/>
              </> : <>
                <line x1="0" y1="3" x2="22" y2="3" stroke="#0f172a" strokeWidth="2" strokeLinecap="round"/>
                <line x1="0" y1="9" x2="22" y2="9" stroke="#0f172a" strokeWidth="2" strokeLinecap="round"/>
                <line x1="0" y1="15" x2="22" y2="15" stroke="#0f172a" strokeWidth="2" strokeLinecap="round"/>
              </>}
            </svg>
          </button>
        </div>

        {mobileNav && (
          <div style={{ background:"#fff", borderTop:"1px solid #f1f5f9", padding:"16px 24px 24px" }}>
            {["about","skills","work","contact"].map(l => (
              <button key={l} onClick={() => goto(l)} style={{ display:"block", width:"100%", textAlign:"left", background:"none", border:"none", fontSize:16, fontWeight:500, color:"#334155", cursor:"pointer", textTransform:"capitalize", padding:"10px 0", borderBottom:"1px solid #f8fafc" }}>{l}</button>
            ))}
            <button onClick={() => goto("contact")} style={{ marginTop:16, width:"100%", background:"#0f172a", color:"#fff", border:"none", padding:"13px 0", borderRadius:100, fontSize:15, fontWeight:600, cursor:"pointer" }}>Hire Me</button>
          </div>
        )}
      </nav>

      {/* Responsive style block */}
      <style>{`
        @media(max-width:768px){
          #desknav{display:none!important;}
          #burger{display:block!important;}
          #hero-grid{grid-template-columns:1fr!important;}
          #projects-grid{grid-template-columns:1fr!important;}
          #services-grid{grid-template-columns:repeat(2,1fr)!important;}
          #contact-grid{grid-template-columns:1fr!important;}
          #exp-line{padding-left:20px!important;}
          #hero-stats{gap:20px!important;}
          #hero-btns{flex-direction:column!important;align-items:flex-start!important;}
        }
        @media(max-width:480px){
          #services-grid{grid-template-columns:1fr!important;}
          #hero-stats{grid-template-columns:repeat(2,1fr)!important;display:grid!important;}
          #name-field-grid{grid-template-columns:1fr!important;}
        }
      `}</style>

      {/* HERO */}
      <section id="about" style={{ paddingTop:112, paddingBottom:80, padding:"112px 24px 80px" }}>
        <div style={{ maxWidth:1140, margin:"0 auto" }}>
          <div id="hero-grid" style={{ display:"grid", gridTemplateColumns:"1fr 400px", gap:56, alignItems:"center" }}>

            {/* Left */}
            <div>
              {/* Badge */}
              <div className="fadein" style={{ display:"inline-flex", alignItems:"center", gap:8, background:"#f0fdf4", border:"1px solid #bbf7d0", borderRadius:100, padding:"5px 14px", marginBottom:24 }}>
                <span style={{ width:7, height:7, borderRadius:"50%", background:"#16a34a", display:"inline-block", boxShadow:"0 0 0 3px #dcfce7", animation:"ping 2s infinite" }}></span>
                <span style={{ fontSize:12, fontWeight:600, color:"#15803d", letterSpacing:"0.05em", textTransform:"uppercase" }}>Available for Work</span>
              </div>

              <p className="fadein" style={{ fontSize:13, fontWeight:600, color:"#2563eb", letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:14 }}>
                Digital Marketing Executive · Chandigarh, India
              </p>

              <h1 className="fadein fadein-2" style={{ fontFamily:"'Bricolage Grotesque',sans-serif", fontSize:"clamp(40px,5.5vw,68px)", fontWeight:800, lineHeight:1.08, letterSpacing:"-2.5px", color:"#0f172a", marginBottom:22 }}>
                I help brands<br/>
                <span style={{ color:"#2563eb" }}>grow & convert</span><br/>
                online.
              </h1>

              <p className="fadein fadein-3" style={{ fontSize:17, color:"#64748b", maxWidth:500, lineHeight:1.72, marginBottom:32 }}>
                Creative digital marketer specialising in <strong style={{ color:"#0f172a", fontWeight:600 }}>Meta Ads</strong>, social media growth, and AI-powered content — turning clicks into loyal customers.
              </p>

              <div id="hero-btns" className="fadein fadein-3" style={{ display:"flex", gap:12, marginBottom:48, flexWrap:"wrap" }}>
                <button onClick={() => goto("work")} style={{ background:"#0f172a", color:"#fff", border:"none", padding:"13px 28px", borderRadius:100, fontSize:14, fontWeight:600, cursor:"pointer", transition:"transform .15s,background .2s" }}
                  onMouseEnter={e=>e.target.style.background="#1e293b"} onMouseLeave={e=>e.target.style.background="#0f172a"}>
                  View My Work
                </button>
                <button onClick={() => goto("contact")} style={{ background:"#fff", color:"#0f172a", border:"1px solid #e2e8f0", padding:"13px 28px", borderRadius:100, fontSize:14, fontWeight:600, cursor:"pointer", transition:"border-color .2s" }}
                  onMouseEnter={e=>e.target.style.borderColor="#94a3b8"} onMouseLeave={e=>e.target.style.borderColor="#e2e8f0"}>
                  Let's Talk →
                </button>
              </div>

              {/* Stats */}
              <div id="hero-stats" className="fadein fadein-3" style={{ display:"flex", gap:36, flexWrap:"wrap" }}>
                {[["2+","Years Exp."],["10+","Clients"],["200+","Leads Generated"],["4","Industries"]].map(([v,l]) => (
                  <div key={l}>
                    <div style={{ fontFamily:"'Bricolage Grotesque',sans-serif", fontSize:30, fontWeight:800, color:"#0f172a", lineHeight:1 }}>{v}</div>
                    <div style={{ fontSize:12, color:"#94a3b8", marginTop:5, fontWeight:500 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — profile card */}
            <div className="fadein fadein-3">
              <div style={{ background:"#f8fafc", borderRadius:24, padding:28, border:"1px solid #f1f5f9", position:"relative" }}>
                {/* Avatar */}
                <div style={{ width:72, height:72, borderRadius:"50%", background:"#2563eb", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:18 }}>
                  <span style={{ fontFamily:"'Bricolage Grotesque',sans-serif", fontSize:28, fontWeight:800, color:"#fff" }}>D</span>
                </div>
                <div style={{ fontFamily:"'Bricolage Grotesque',sans-serif", fontSize:20, fontWeight:800, color:"#0f172a", marginBottom:3 }}>Danish</div>
                <div style={{ fontSize:13, color:"#64748b", fontWeight:500, marginBottom:22 }}>Digital Marketing Executive</div>

                {[
                  { icon:"📍", label:"Location", val:"Himachal Pradesh / Chandigarh" },
                  { icon:"🎓", label:"Education", val:"BCA — Computer Applications" },
                  { icon:"🌐", label:"Languages", val:"English · Hindi · Punjabi" },
                ].map(r => (
                  <div key={r.label} style={{ display:"flex", alignItems:"flex-start", gap:12, padding:"12px 0", borderTop:"1px solid #f1f5f9" }}>
                    <span style={{ fontSize:15, marginTop:1, flexShrink:0 }}>{r.icon}</span>
                    <div>
                      <div style={{ fontSize:10, fontWeight:700, color:"#94a3b8", textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:2 }}>{r.label}</div>
                      <div style={{ fontSize:13, color:"#334155", fontWeight:500 }}>{r.val}</div>
                    </div>
                  </div>
                ))}

                {/* Floating chips */}
                <div style={{ position:"absolute", top:-14, right:16, background:"#fff", border:"1px solid #e2e8f0", borderRadius:12, padding:"9px 14px", boxShadow:"0 4px 20px rgba(0,0,0,.08)", display:"flex", alignItems:"center", gap:8 }}>
                  <span style={{ fontSize:15 }}>📣</span>
                  <div><div style={{ fontSize:11, fontWeight:700, color:"#0f172a" }}>Meta Ads</div><div style={{ fontSize:10, color:"#94a3b8" }}>Specialist</div></div>
                </div>
                <div style={{ position:"absolute", bottom:-14, right:16, background:"#fff", border:"1px solid #e2e8f0", borderRadius:12, padding:"9px 14px", boxShadow:"0 4px 20px rgba(0,0,0,.08)", display:"flex", alignItems:"center", gap:8 }}>
                  <span style={{ fontSize:15 }}>🎬</span>
                  <div><div style={{ fontSize:11, fontWeight:700, color:"#0f172a" }}>Reels Creator</div><div style={{ fontSize:10, color:"#94a3b8" }}>Video & AI</div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div style={{ overflow:"hidden", borderTop:"1px solid #f1f5f9", borderBottom:"1px solid #f1f5f9", padding:"13px 0", background:"#fafafa" }}>
        <div style={{ display:"flex", gap:48, whiteSpace:"nowrap", animation:"ticker 32s linear infinite" }}>
          {[...Array(2)].flatMap(() => ["Meta Ads","Social Media Marketing","Lead Generation","Video & Reels","Canva Design","Content Strategy","Brand Growth","AI Content","Copywriting","Marketing Analytics","PPC Advertising"].map((item, i) => (
            <span key={`${item}-${i}`} style={{ display:"inline-flex", alignItems:"center", gap:14, color:"#94a3b8", fontSize:12, fontWeight:600, letterSpacing:"0.06em", textTransform:"uppercase", flexShrink:0 }}>
              <span style={{ width:4, height:4, borderRadius:"50%", background:"#cbd5e1", display:"inline-block" }}></span>
              {item}
            </span>
          )))}
        </div>
      </div>

      {/* SKILLS */}
      <section id="skills" style={{ padding:"96px 24px" }}>
        <div style={{ maxWidth:1140, margin:"0 auto" }}>
          <Reveal style={{ textAlign:"center", marginBottom:52 }}>
            <div style={{ fontSize:12, fontWeight:700, color:"#2563eb", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:12 }}>Expertise</div>
            <h2 style={{ fontFamily:"'Bricolage Grotesque',sans-serif", fontSize:"clamp(30px,4.5vw,46px)", fontWeight:800, letterSpacing:"-1.5px", color:"#0f172a", marginBottom:14 }}>Skills & capabilities</h2>
            <p style={{ fontSize:16, color:"#64748b", maxWidth:460, margin:"0 auto" }}>A blend of creative and analytical skills to drive real, measurable results for your brand.</p>
          </Reveal>

          {/* Tabs */}
          <Reveal delay={0.1} style={{ display:"flex", gap:8, justifyContent:"center", flexWrap:"wrap", marginBottom:36 }}>
            {Object.keys(SKILLS).map(tab => (
              <button key={tab} onClick={() => setSkillTab(tab)} style={{ padding:"9px 22px", borderRadius:100, fontSize:14, fontWeight:500, cursor:"pointer", transition:"all .2s", border: skillTab===tab ? "1px solid #0f172a" : "1px solid #e2e8f0", background: skillTab===tab ? "#0f172a" : "#fff", color: skillTab===tab ? "#fff" : "#64748b" }}>
                {tab}
              </button>
            ))}
          </Reveal>

          <div style={{ display:"flex", flexWrap:"wrap", gap:8, justifyContent:"center", marginBottom:72 }}>
            {SKILLS[skillTab].map((sk, i) => (
              <Reveal key={sk} delay={i * 0.035}>
                <span style={{ display:"inline-block", padding:"9px 18px", background:"#f8fafc", border:"1px solid #e2e8f0", borderRadius:100, fontSize:13, color:"#334155", fontWeight:500, cursor:"default", transition:"all .2s" }}
                  onMouseEnter={e => { e.target.style.background="#0f172a"; e.target.style.color="#fff"; e.target.style.borderColor="#0f172a"; }}
                  onMouseLeave={e => { e.target.style.background="#f8fafc"; e.target.style.color="#334155"; e.target.style.borderColor="#e2e8f0"; }}>
                  {sk}
                </span>
              </Reveal>
            ))}
          </div>

          {/* Services grid */}
          <div id="services-grid" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16 }}>
            {[
              { icon:"📣", title:"Paid Advertising", desc:"High-converting Meta Ads campaigns for awareness, leads, and retargeting." },
              { icon:"🎬", title:"Content & Reels", desc:"Short-form videos and AI-powered reels that stop the scroll and grow accounts." },
              { icon:"📊", title:"Strategy & Analytics", desc:"Data-driven decisions to optimize ad spend and consistently improve ROI." },
              { icon:"🎨", title:"Creative Design", desc:"Branded visuals and ad creatives that tell your story and convert audiences." },
            ].map((s, i) => (
              <Reveal key={s.title} delay={i * 0.07}>
                <div style={{ background:"#f8fafc", border:"1px solid #f1f5f9", borderRadius:16, padding:22, height:"100%", transition:"border-color .2s,transform .2s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor="#e2e8f0"; e.currentTarget.style.transform="translateY(-3px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor="#f1f5f9"; e.currentTarget.style.transform="none"; }}>
                  <div style={{ fontSize:26, marginBottom:14 }}>{s.icon}</div>
                  <div style={{ fontSize:15, fontWeight:700, color:"#0f172a", marginBottom:8 }}>{s.title}</div>
                  <div style={{ fontSize:13, color:"#64748b", lineHeight:1.65 }}>{s.desc}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WORK */}
      <section id="work" style={{ padding:"96px 24px", background:"#f8fafc", borderTop:"1px solid #f1f5f9" }}>
        <div style={{ maxWidth:1140, margin:"0 auto" }}>
          <Reveal style={{ textAlign:"center", marginBottom:52 }}>
            <div style={{ fontSize:12, fontWeight:700, color:"#2563eb", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:12 }}>Portfolio</div>
            <h2 style={{ fontFamily:"'Bricolage Grotesque',sans-serif", fontSize:"clamp(30px,4.5vw,46px)", fontWeight:800, letterSpacing:"-1.5px", color:"#0f172a", marginBottom:14 }}>Selected work</h2>
            <p style={{ fontSize:16, color:"#64748b", maxWidth:440, margin:"0 auto" }}>Real campaigns, real results — across food, real estate, education, and more.</p>
          </Reveal>

          <div id="projects-grid" style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:18 }}>
            {PROJECTS.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.07}>
                <div style={{ background:"#fff", border:"1px solid #e2e8f0", borderRadius:18, overflow:"hidden", transition:"box-shadow .25s,transform .25s", cursor:"default" }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow="0 8px 32px rgba(15,23,42,.09)"; e.currentTarget.style.transform="translateY(-3px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow="none"; e.currentTarget.style.transform="none"; }}>
                  <div style={{ height:4, background:p.accent }}></div>
                  <div style={{ padding:26 }}>
                    <div style={{ fontSize:11, fontWeight:700, color:"#94a3b8", letterSpacing:"0.07em", textTransform:"uppercase", marginBottom:6 }}>{p.category}</div>
                    <h3 style={{ fontSize:19, fontWeight:700, color:"#0f172a", letterSpacing:"-0.4px", marginBottom:12 }}>{p.title}</h3>
                    <p style={{ fontSize:14, color:"#64748b", lineHeight:1.65, marginBottom:18 }}>{p.desc}</p>

                    {/* Tags */}
                    <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:20 }}>
                      {p.tags.map(t => <span key={t} style={{ fontSize:12, fontWeight:500, color:"#475569", background:"#f1f5f9", padding:"4px 10px", borderRadius:100 }}>{t}</span>)}
                    </div>

                    {/* Metrics */}
                    <div style={{ display:"flex", gap:10, paddingTop:16, borderTop:"1px solid #f8fafc" }}>
                      {p.metrics.map(m => (
                        <div key={m.l} style={{ background:p.accent + "0f", border:`1px solid ${p.accent}25`, borderRadius:10, padding:"10px 16px" }}>
                          <div style={{ fontFamily:"'Bricolage Grotesque',sans-serif", fontSize:20, fontWeight:800, color:p.accent, lineHeight:1 }}>{m.v}</div>
                          <div style={{ fontSize:11, color:"#64748b", marginTop:4, fontWeight:500 }}>{m.l}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section style={{ padding:"96px 24px" }}>
        <div style={{ maxWidth:800, margin:"0 auto" }}>
          <Reveal style={{ marginBottom:52 }}>
            <div style={{ fontSize:12, fontWeight:700, color:"#2563eb", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:12 }}>Journey</div>
            <h2 style={{ fontFamily:"'Bricolage Grotesque',sans-serif", fontSize:"clamp(30px,4.5vw,46px)", fontWeight:800, letterSpacing:"-1.5px", color:"#0f172a" }}>Experience</h2>
          </Reveal>

          <div id="exp-line" style={{ paddingLeft:28, borderLeft:"2px solid #f1f5f9", display:"flex", flexDirection:"column", gap:28 }}>
            {[
              { period:"2026 – Present", title:"Digital Marketing Executive", company:"VKS Hytech Pvt Ltd", type:"Full-time", color:"#2563eb", points:["Managing social media campaigns and digital brand presence","Running Meta Ads for lead generation and brand engagement","Creating ad creatives, copies, and visual marketing content","Supporting online growth strategy across all channels"] },
              { period:"2024 – Present", title:"Freelance Digital Marketer & SMM", company:"Self-Employed", type:"Freelance", color:"#9333ea", points:["Managed 10+ clients across food, real estate, edtech & travel","Designed and executed high-performing Meta Ads campaigns","Produced reels, creatives, and short-form video content","Built complete social media growth strategies from scratch"] },
            ].map((exp, i) => (
              <Reveal key={exp.title} delay={i * 0.1}>
                <div style={{ position:"relative", marginLeft:"-41px" }}>
                  <div style={{ position:"absolute", left:0, top:22, width:14, height:14, borderRadius:"50%", background:exp.color, border:"3px solid #fff", boxShadow:`0 0 0 3px ${exp.color}30`, zIndex:1 }}></div>
                  <div style={{ marginLeft:28, background:"#fff", border:"1px solid #e2e8f0", borderRadius:16, padding:26 }}>
                    <div style={{ display:"flex", flexWrap:"wrap", alignItems:"flex-start", justifyContent:"space-between", gap:10, marginBottom:16 }}>
                      <div>
                        <div style={{ fontSize:17, fontWeight:700, color:"#0f172a", marginBottom:4 }}>{exp.title}</div>
                        <div style={{ fontSize:14, color:exp.color, fontWeight:600 }}>{exp.company}</div>
                      </div>
                      <div style={{ display:"flex", gap:6 }}>
                        <span style={{ fontSize:12, fontWeight:500, background:"#f1f5f9", color:"#475569", padding:"4px 12px", borderRadius:100 }}>{exp.period}</span>
                        <span style={{ fontSize:12, fontWeight:600, background:exp.color+"15", color:exp.color, padding:"4px 12px", borderRadius:100 }}>{exp.type}</span>
                      </div>
                    </div>
                    <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:7 }}>
                      {exp.points.map(pt => (
                        <li key={pt} style={{ display:"flex", alignItems:"flex-start", gap:10, fontSize:14, color:"#64748b" }}>
                          <span style={{ width:5, height:5, borderRadius:"50%", background:"#cbd5e1", flexShrink:0, marginTop:7 }}></span>
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding:"96px 24px", background:"#f8fafc", borderTop:"1px solid #f1f5f9" }}>
        <div style={{ maxWidth:680, margin:"0 auto", textAlign:"center" }}>
          <Reveal>
            <div style={{ fontSize:12, fontWeight:700, color:"#2563eb", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:12 }}>Social Proof</div>
            <h2 style={{ fontFamily:"'Bricolage Grotesque',sans-serif", fontSize:"clamp(30px,4.5vw,46px)", fontWeight:800, letterSpacing:"-1.5px", color:"#0f172a", marginBottom:44 }}>What clients say</h2>
          </Reveal>

          <Reveal>
            <div style={{ position:"relative", minHeight:230 }}>
              {TESTIMONIALS.map((t, i) => (
                <div key={i} style={{ position:"absolute", inset:0, transition:"opacity .55s ease, transform .55s ease", opacity: tIdx===i ? 1 : 0, transform: tIdx===i ? "none" : "translateY(10px)", pointerEvents: tIdx===i ? "auto" : "none" }}>
                  <div style={{ background:"#fff", border:"1px solid #e2e8f0", borderRadius:20, padding:36 }}>
                    <div style={{ fontSize:44, color:"#dbeafe", fontFamily:"Georgia,serif", lineHeight:1, marginBottom:10, textAlign:"left" }}>"</div>
                    <p style={{ fontSize:17, color:"#334155", lineHeight:1.72, fontStyle:"italic", marginBottom:28 }}>{t.quote}</p>
                    <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:12 }}>
                      <div style={{ width:40, height:40, borderRadius:"50%", background:"#eff6ff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:15, fontWeight:700, color:"#2563eb", fontFamily:"'Bricolage Grotesque',sans-serif" }}>{t.name[0]}</div>
                      <div style={{ textAlign:"left" }}>
                        <div style={{ fontSize:14, fontWeight:700, color:"#0f172a" }}>{t.name}</div>
                        <div style={{ fontSize:12, color:"#94a3b8", marginTop:2 }}>{t.role}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display:"flex", gap:6, justifyContent:"center", marginTop:228 }}>
              {TESTIMONIALS.map((_, i) => (
                <button key={i} onClick={() => setTIdx(i)} style={{ height:6, border:"none", borderRadius:100, cursor:"pointer", transition:"all .25s", background: tIdx===i ? "#0f172a" : "#cbd5e1", width: tIdx===i ? 22 : 6, padding:0 }} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding:"96px 24px" }}>
        <div style={{ maxWidth:1140, margin:"0 auto" }}>
          <Reveal style={{ textAlign:"center", marginBottom:52 }}>
            <div style={{ fontSize:12, fontWeight:700, color:"#2563eb", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:12 }}>Contact</div>
            <h2 style={{ fontFamily:"'Bricolage Grotesque',sans-serif", fontSize:"clamp(30px,4.5vw,46px)", fontWeight:800, letterSpacing:"-1.5px", color:"#0f172a", marginBottom:14 }}>Let's work together</h2>
            <p style={{ fontSize:16, color:"#64748b", maxWidth:400, margin:"0 auto" }}>Ready to grow your brand? Let's talk strategy and make it happen.</p>
          </Reveal>

          <div id="contact-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:28, alignItems:"start" }}>
            {/* Info cards */}
            <Reveal>
              <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
                {[
                  { icon:"✉️", label:"Email", val:"your@email.com" },
                  { icon:"📞", label:"Phone", val:"+91 XXXXXXXXXX" },
                  { icon:"📍", label:"Location", val:"Himachal Pradesh / Chandigarh, India" },
                ].map(r => (
                  <div key={r.label} style={{ display:"flex", alignItems:"center", gap:16, background:"#f8fafc", border:"1px solid #f1f5f9", borderRadius:14, padding:18, transition:"border-color .2s" }}
                    onMouseEnter={e => e.currentTarget.style.borderColor="#e2e8f0"} onMouseLeave={e => e.currentTarget.style.borderColor="#f1f5f9"}>
                    <div style={{ width:44, height:44, borderRadius:12, background:"#eff6ff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:19, flexShrink:0 }}>{r.icon}</div>
                    <div>
                      <div style={{ fontSize:10, fontWeight:700, color:"#94a3b8", textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:3 }}>{r.label}</div>
                      <div style={{ fontSize:14, fontWeight:600, color:"#0f172a" }}>{r.val}</div>
                    </div>
                  </div>
                ))}

                <div style={{ background:"#f8fafc", border:"1px solid #f1f5f9", borderRadius:14, padding:18 }}>
                  <div style={{ fontSize:10, fontWeight:700, color:"#94a3b8", textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:12 }}>Connect with me</div>
                  <div style={{ display:"flex", gap:8 }}>
                    {["LinkedIn","Instagram","Facebook","Behance"].map(s => (
                      <div key={s} title={s} style={{ width:40, height:40, borderRadius:10, background:"#fff", border:"1px solid #e2e8f0", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700, color:"#64748b", cursor:"pointer", transition:"all .2s" }}
                        onMouseEnter={e => { e.currentTarget.style.background="#0f172a"; e.currentTarget.style.color="#fff"; }} onMouseLeave={e => { e.currentTarget.style.background="#fff"; e.currentTarget.style.color="#64748b"; }}>
                        {s.slice(0,2).toUpperCase()}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Form */}
            <Reveal delay={0.1}>
              <div style={{ background:"#fff", border:"1px solid #e2e8f0", borderRadius:20, padding:30 }}>
                <h3 style={{ fontSize:18, fontWeight:700, color:"#0f172a", marginBottom:22 }}>Send a message</h3>
                <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
                  <div id="name-field-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                    {[{l:"Name",t:"text",ph:"Your name"},{l:"Email",t:"email",ph:"your@email.com"}].map(f => (
                      <div key={f.l}>
                        <label style={{ fontSize:12, fontWeight:600, color:"#475569", display:"block", marginBottom:6 }}>{f.l}</label>
                        <input type={f.t} placeholder={f.ph} style={{ width:"100%", padding:"11px 14px", border:"1px solid #e2e8f0", borderRadius:10, fontSize:14, fontFamily:"inherit", color:"#0f172a", outline:"none", transition:"border-color .2s" }}
                          onFocus={e => e.target.style.borderColor="#2563eb"} onBlur={e => e.target.style.borderColor="#e2e8f0"} />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label style={{ fontSize:12, fontWeight:600, color:"#475569", display:"block", marginBottom:6 }}>Service Needed</label>
                    <select style={{ width:"100%", padding:"11px 14px", border:"1px solid #e2e8f0", borderRadius:10, fontSize:14, fontFamily:"inherit", color:"#0f172a", outline:"none", background:"#fff", cursor:"pointer" }}>
                      <option>Meta Ads Campaign</option>
                      <option>Social Media Management</option>
                      <option>Content & Reels</option>
                      <option>Full Brand Strategy</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize:12, fontWeight:600, color:"#475569", display:"block", marginBottom:6 }}>Message</label>
                    <textarea rows={5} placeholder="Tell me about your project or goal..." style={{ width:"100%", padding:"11px 14px", border:"1px solid #e2e8f0", borderRadius:10, fontSize:14, fontFamily:"inherit", color:"#0f172a", outline:"none", resize:"vertical", transition:"border-color .2s" }}
                      onFocus={e => e.target.style.borderColor="#2563eb"} onBlur={e => e.target.style.borderColor="#e2e8f0"} />
                  </div>
                  <button style={{ width:"100%", background:"#0f172a", color:"#fff", border:"none", padding:"14px", borderRadius:100, fontSize:15, fontWeight:600, cursor:"pointer", transition:"background .2s" }}
                    onMouseEnter={e => e.target.style.background="#1e293b"} onMouseLeave={e => e.target.style.background="#0f172a"}>
                    Send Message →
                  </button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop:"1px solid #f1f5f9", padding:"24px 24px" }}>
        <div style={{ maxWidth:1140, margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:12 }}>
          <div style={{ fontFamily:"'Bricolage Grotesque',sans-serif", fontSize:16, fontWeight:800, color:"#0f172a" }}>Danish<span style={{ color:"#2563eb" }}>.</span></div>
          <div style={{ fontSize:13, color:"#94a3b8" }}>© 2026 Danish · Digital Marketing Executive</div>
          <div style={{ display:"flex", gap:20 }}>
            {["About","Skills","Work","Contact"].map(l => (
              <button key={l} onClick={() => goto(l.toLowerCase())} style={{ fontSize:13, color:"#94a3b8", background:"none", border:"none", cursor:"pointer", transition:"color .2s" }}
                onMouseEnter={e => e.target.style.color="#0f172a"} onMouseLeave={e => e.target.style.color="#94a3b8"}>
                {l}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}