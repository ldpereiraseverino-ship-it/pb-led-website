"use client";

import React, { useState, useRef, useEffect } from "react";
import { Upload, CheckCircle, Lightbulb, Building2, Ship, Ruler, Layers, Mail, Phone, MapPin, FileText, Globe } from "lucide-react";

// PB-LED One-Page Website inspired by colorful Curaçao houses
// TailwindCSS is available by default in this environment.

// ====== CONFIG ======
const UPLOAD_ENDPOINT = "/api/upload"; // Replace with your API route or signed-upload endpoint
const MAX_FILE_MB = 100; // Per file
const ACCEPTED_EXT = ["pdf", "xlsx", "xls", "zip"]; // Lowercase without dot

// ====== SIMPLE I18N ======
const STR = {
  nl: {
    logoTag: "Caribbean LED • B2B & projecten",
    nav: { home: "Home", about: "Over", services: "Diensten", catalog: "Catalogus", contact: "Contact" },
    ctaQuote: "Offerte aanvragen",
    heroBadge: "Officiële LED-leverancier voor het Caribisch gebied",
    heroTitleA: "Slimme LED-oplossingen",
    heroTitleB: "voor B2B & grootschalige projecten",
    heroLead:
      "PB-LED levert, ontwerpt en integreert professionele verlichting. Van import & logistiek tot lichtplannen en BIM-integratie – wij ontzorgen volledig.",
    ctaServices: "Onze diensten",
    ctaCatalog: "Catalogus uploaden",
    badgeB2B: "B2B focus",
    badgeProject: "Projectbegeleiding",
    badgeBIM: "BIM-ready",

    whoTitle: "Wie wij zijn",
    whoText:
      "PB-LED is dé leverancier voor professionele LED-verlichting in het Caribisch gebied. We richten ons op B2B en grootschalige projecten en werken nauw samen met aannemers, installateurs, architecten en gebouweigenaren. We geloven in heldere communicatie, betrouwbare leveringen en slimme engineering.",
    statYears: "+10",
    statYearsLbl: "jaar ervaring",
    statBim: "BIM",
    statBimLbl: "integratie gereed",
    statProj: ">100",
    statProjLbl: "projecten opgeleverd",
    promise: "Onze belofte",
    promiseList: [
      "Leverancier voor het hele Caribische gebied",
      "Import, voorraadbeheer & just-in-time levering",
      "Lichtplannen met lux-berekeningen",
      "Integratie in BIM (Revit/IFC)",
      "Volledige projectontzorging",
    ],

    servicesTitle: "Diensten",
    svc1Title: "Import & Levering",
    svc1Text:
      "Wij beheren de volledige keten – van internationale inkoop tot lokale distributie in het Caribisch gebied.",
    svc1Bullets: ["Douane & logistiek", "Voorraad op afroep", "Projectmatige uitlevering"],
    svc2Title: "Lichtplannen",
    svc2Text:
      "Professionele lichtberekeningen en armatuurkeuze voor comfort, duurzaamheid en normering.",
    svc2Bullets: ["Dialux/Relux", "NEN 12464-1", "Energie & onderhoud"],
    svc3Title: "BIM-integratie",
    svc3Text:
      "Integreer verlichting naadloos in BIM met Revit & IFC libraries voor razendsnelle coördinatie.",
    svc3Bullets: ["Familie-templates", "LOD & parameters", "Clash-avoidance"],

    catalogTitle: "Catalogus uploaden",
    catalogLead:
      "Upload hier jullie productcatalogus (PDF, XLSX of ZIP met BIM-families). Wij koppelen dit aan onze projectbibliotheek.",
    uploadGuidelines: "Uploadrichtlijnen (PDF)",
    dropTitle: "Sleep je bestanden hierheen of klik om te selecteren",
    dropHint: `Toegestane typen: PDF, XLSX, ZIP • Max ${MAX_FILE_MB}MB`,
    chooseFiles: "Bestanden kiezen",
    selected: "Geselecteerd",
    uploadBtn: "Uploaden",
    clearBtn: "Wissen",
    uploadDone: "Upload voltooid. Wij nemen contact op voor verifiëren & koppeling.",
    uploadErrType: "Bestandstype niet toegestaan",
    uploadErrSize: "Bestand is te groot",
    uploadErrNet: "Upload mislukt. Controleer je verbinding of probeer later opnieuw.",
    uploadProgress: (n, total) => `Uploaden… ${n}/${total}`,
    integrationNote:
      "Integratienoot: Koppel de upload-knop aan je backend (bijv. AWS S3, Supabase of SharePoint). Voeg een endpoint toe en verstuur bestanden via FormData. Voeg eventueel reCAPTCHA toe.",

    contactTitle: "Contact",
    contactLead: "Neem contact op voor B2B-prijzen, projectondersteuning of een lichtplan op maat.",
    contactAvail: "Beschikbaar voor: aannemers • installateurs • architecten • projectontwikkelaars.",
    formName: "Naam",
    formCompany: "Bedrijf",
    formEmail: "E-mail",
    formMsg: "Bericht",
    formMsgPh: "Vertel kort over je project…",
    formSend: "Versturen",
    formConsent: "Door te versturen ga je akkoord met onze privacyverklaring.",

    footerLinks: ["Algemene voorwaarden", "Privacy"],
    language: "Taal",
  },
  en: {
    logoTag: "Caribbean LED • B2B & projects",
    nav: { home: "Home", about: "About", services: "Services", catalog: "Catalogue", contact: "Contact" },
    ctaQuote: "Request a Quote",
    heroBadge: "Official LED supplier for the Caribbean",
    heroTitleA: "Smart LED solutions",
    heroTitleB: "for B2B & large-scale projects",
    heroLead:
      "PB-LED supplies, designs and integrates professional lighting. From import & logistics to lighting designs and BIM integration – we handle it all.",
    ctaServices: "Our services",
    ctaCatalog: "Upload catalogue",
    badgeB2B: "B2B focus",
    badgeProject: "Project support",
    badgeBIM: "BIM-ready",

    whoTitle: "Who we are",
    whoText:
      "PB-LED is the supplier for professional LED lighting in the Caribbean. We focus on B2B and large projects, working closely with contractors, installers, architects and asset owners. We value clear communication, reliable deliveries and smart engineering.",
    statYears: "+10",
    statYearsLbl: "years experience",
    statBim: "BIM",
    statBimLbl: "integration ready",
    statProj: ">100",
    statProjLbl: "projects delivered",
    promise: "Our promise",
    promiseList: [
      "Supplier for the entire Caribbean",
      "Import, stock & just-in-time delivery",
      "Lighting designs with lux calculations",
      "BIM integration (Revit/IFC)",
      "Full project unburdening",
    ],

    servicesTitle: "Services",
    svc1Title: "Import & Delivery",
    svc1Text:
      "We manage the full chain – from international procurement to local distribution across the Caribbean.",
    svc1Bullets: ["Customs & logistics", "Call-off stock", "Project-based fulfilment"],
    svc2Title: "Lighting Design",
    svc2Text:
      "Professional calculations and luminaire selection for comfort, sustainability and compliance.",
    svc2Bullets: ["Dialux/Relux", "EN 12464-1", "Energy & maintenance"],
    svc3Title: "BIM Integration",
    svc3Text:
      "Seamlessly integrate lighting in BIM with Revit & IFC libraries for fast coordination.",
    svc3Bullets: ["Family templates", "LOD & parameters", "Clash-avoidance"],

    catalogTitle: "Upload catalogue",
    catalogLead:
      "Upload your product catalogue (PDF, XLSX or ZIP with BIM families). We'll link it to our project library.",
    uploadGuidelines: "Upload guidelines (PDF)",
    dropTitle: "Drag files here or click to select",
    dropHint: `Allowed types: PDF, XLSX, ZIP • Max ${MAX_FILE_MB}MB`,
    chooseFiles: "Choose files",
    selected: "Selected",
    uploadBtn: "Upload",
    clearBtn: "Clear",
    uploadDone: "Upload complete. We'll contact you to verify & link.",
    uploadErrType: "File type not allowed",
    uploadErrSize: "File is too large",
    uploadErrNet: "Upload failed. Check your connection or try again later.",
    uploadProgress: (n, total) => `Uploading… ${n}/${total}`,
    integrationNote:
      "Integration note: Wire the upload button to your backend (e.g., AWS S3, Supabase or SharePoint). Post using FormData. Optionally add reCAPTCHA.",

    contactTitle: "Contact",
    contactLead: "Get in touch for B2B pricing, project support or a tailored lighting design.",
    contactAvail: "Available for: contractors • installers • architects • developers.",
    formName: "Name",
    formCompany: "Company",
    formEmail: "Email",
    formMsg: "Message",
    formMsgPh: "Tell us briefly about your project…",
    formSend: "Send",
    formConsent: "By sending you agree to our privacy policy.",

    footerLinks: ["Terms", "Privacy"],
    language: "Language",
  },
};

export default function PBLEDWebsite() {
  const [lang, setLang] = useState("nl");
  const t = (k) => {
    const path = k.split(".");
    return path.reduce((acc, cur) => (acc && acc[cur] !== undefined ? acc[cur] : k), STR[lang]);
  };

  // Detect browser language once
  useEffect(() => {
    const navLang = (navigator.language || "nl").slice(0, 2);
    if (navLang === "en") setLang("en");
  }, []);

  const [files, setFiles] = useState([]);
  const [uploaded, setUploaded] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const dropRef = useRef(null);

  const onFilesSelected = (newFiles) => {
    const list = Array.from(newFiles || []);
    // validate
    const ok = [];
    for (const f of list) {
      const ext = f.name.split(".").pop().toLowerCase();
      if (!ACCEPTED_EXT.includes(ext)) {
        setUploadError(`${f.name}: ${STR[lang].uploadErrType}`);
        continue;
      }
      if (f.size / 1024 / 1024 > MAX_FILE_MB) {
        setUploadError(`${f.name}: ${STR[lang].uploadErrSize}`);
        continue;
      }
      ok.push(f);
    }
    setFiles(ok);
    setUploaded(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onFilesSelected(e.dataTransfer.files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const doUpload = async () => {
    if (!files.length) return;
    setUploading(true);
    setUploadError("");
    setUploaded(false);
    try {
      // Upload files sequentially so we can show progress
      for (let i = 0; i < files.length; i++) {
        const fd = new FormData();
        fd.append("file", files[i]);
        // Optional: include meta
        fd.append("source", "pb-led-site");
        fd.append("lang", lang);
        const res = await fetch(UPLOAD_ENDPOINT, {
          method: "POST",
          body: fd,
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
      }
      setUploaded(true);
      setFiles([]);
    } catch (err) {
      console.error(err);
      setUploadError(STR[lang].uploadErrNet);
    } finally {
      setUploading(false);
    }
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen w-full text-gray-800 bg-gradient-to-b from-sky-50 via-white to-amber-50">
      {/* Top Bar */}
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/60 border-b border-black/5">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 via-amber-400 to-pink-500 shadow-md" />
            <div className="leading-tight">
              <h1 className="font-extrabold tracking-tight text-lg">PB-LED</h1>
              <p className="text-xs text-gray-600">{STR[lang].logoTag}</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <button onClick={() => scrollTo("home")} className="hover:text-sky-700">{t("nav.home")}</button>
            <button onClick={() => scrollTo("about")} className="hover:text-sky-700">{t("nav.about")}</button>
            <button onClick={() => scrollTo("diensten")} className="hover:text-sky-700">{t("nav.services")}</button>
            <button onClick={() => scrollTo("catalogus")} className="hover:text-sky-700">{t("nav.catalog")}</button>
            <button onClick={() => scrollTo("contact")} className="hover:text-sky-700">{t("nav.contact")}</button>
          </nav>
          <div className="flex items-center gap-2">
            {/* Language Toggle */}
            <div className="hidden sm:flex items-center gap-1 rounded-2xl border border-black/10 bg-white p-1">
              <Globe className="w-4 h-4 mx-1"/>
              {(["nl","en"]).map((code) => (
                <button
                  key={code}
                  onClick={() => setLang(code)}
                  className={`px-2 py-1 text-xs rounded-xl ${lang===code?"bg-sky-500 text-white":"hover:bg-sky-50"}`}
                >
                  {code.toUpperCase()}
                </button>
              ))}
            </div>
            <button onClick={() => scrollTo("contact")} className="ml-2 inline-flex items-center rounded-2xl px-4 py-2 text-sm font-semibold shadow-sm bg-gradient-to-r from-sky-500 to-emerald-400 text-white hover:opacity-95">
              {t("ctaQuote")}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          {/* stylized Curaçao houses skyline */}
          <svg className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[140%] max-w-none" viewBox="0 0 1440 240" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="roof" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor="#38bdf8"/>
                <stop offset="50%" stopColor="#f59e0b"/>
                <stop offset="100%" stopColor="#ec4899"/>
              </linearGradient>
            </defs>
            <rect x="0" y="160" width="1440" height="80" fill="#0ea5e9" opacity="0.12"/>
            {Array.from({length: 12}).map((_, i) => {
              const w = 90 + (i % 4) * 20;
              const h = 80 + (i % 5) * 16;
              const x = 40 + i * 115;
              const y = 160 - h;
              const hue = ["#60a5fa","#f472b6","#f59e0b","#34d399","#fca5a5","#fde047","#93c5fd"][i%7];
              return (
                <g key={i} opacity="0.85">
                  <rect x={x} y={y} width={w} height={h} rx="6" fill={hue} />
                  <polygon points={`${x},${y} ${x+w/2},${y-18} ${x+w},${y}`} fill="url(#roof)" />
                  {/* windows */}
                  {Array.from({length: 6}).map((__, j) => (
                    <rect key={j} x={x+10+(j%3)*((w-30)/3)} y={y+14+Math.floor(j/3)*30} width={(w-50)/3} height="16" rx="3" fill="#fff" opacity="0.8" />
                  ))}
                </g>
              );
            })}
          </svg>
        </div>
        <div className="max-w-6xl mx-auto px-4 pt-16 pb-28">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="relative">
              <span className="inline-flex items-center gap-2 text-xs font-semibold bg-white/70 backdrop-blur px-3 py-1 rounded-full border border-black/5 shadow-sm">
                <Lightbulb className="w-4 h-4"/> {t("heroBadge")}
              </span>
              <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
                {t("heroTitleA")}<br className="hidden md:block"/> {t("heroTitleB")}
              </h2>
              <p className="mt-4 text-gray-700 text-lg">
                {t("heroLead")}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button onClick={() => scrollTo("diensten")} className="rounded-2xl px-5 py-3 text-sm font-semibold shadow-sm bg-sky-500 text-white hover:bg-sky-600">{t("ctaServices")}</button>
                <button onClick={() => scrollTo("catalogus")} className="rounded-2xl px-5 py-3 text-sm font-semibold border border-sky-200 hover:border-sky-300 bg-white">{t("ctaCatalog")}</button>
              </div>
              <div className="mt-6 flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4"/> {t("badgeB2B")}</div>
                <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4"/> {t("badgeProject")}</div>
                <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4"/> {t("badgeBIM")}</div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl shadow-xl bg-gradient-to-br from-sky-400 via-amber-300 to-pink-400 p-1">
                <div className="w-full h-full rounded-3xl bg-white p-6 grid grid-cols-2 gap-4">
                  {[
                    { icon: <Building2 className="w-5 h-5"/>, title: lang==="nl"?"Utiliteitsbouw":"Commercial", text: lang==="nl"?"Kantoren, retail, hospitality":"Offices, retail, hospitality" },
                    { icon: <Ship className="w-5 h-5"/>, title: lang==="nl"?"Logistiek":"Logistics", text: lang==="nl"?"Import, voorraad, levering":"Import, stock, delivery" },
                    { icon: <Ruler className="w-5 h-5"/>, title: lang==="nl"?"Lichtplannen":"Lighting design", text: lang==="nl"?"NEN & lux-berekeningen":"EN & lux calculations" },
                    { icon: <Layers className="w-5 h-5"/>, title: lang==="nl"?"BIM-integratie":"BIM integration", text: lang==="nl"?"Revit & IFC workflows":"Revit & IFC workflows" },
                  ].map((c, i) => (
                    <div key={i} className="rounded-2xl border border-black/5 p-4 shadow-sm hover:shadow-md transition">
                      <div className="flex items-center gap-2 font-semibold">{c.icon} {c.title}</div>
                      <p className="mt-1 text-sm text-gray-600">{c.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Over Section */}
      <section id="about" className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 items-start">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-extrabold tracking-tight">{t("whoTitle")}</h3>
              <p className="mt-3 text-gray-700 leading-relaxed">
                {t("whoText")}
              </p>
              <div className="mt-6 grid sm:grid-cols-3 gap-4">
                <div className="rounded-2xl bg-white border border-black/5 p-4 shadow-sm">
                  <div className="text-2xl font-extrabold">{STR[lang].statYears}</div>
                  <div className="text-sm text-gray-600">{STR[lang].statYearsLbl}</div>
                </div>
                <div className="rounded-2xl bg-white border border-black/5 p-4 shadow-sm">
                  <div className="text-2xl font-extrabold">{STR[lang].statBim}</div>
                  <div className="text-sm text-gray-600">{STR[lang].statBimLbl}</div>
                </div>
                <div className="rounded-2xl bg-white border border-black/5 p-4 shadow-sm">
                  <div className="text-2xl font-extrabold">{STR[lang].statProj}</div>
                  <div className="text-sm text-gray-600">{STR[lang].statProjLbl}</div>
                </div>
              </div>
            </div>
            <div className="rounded-3xl bg-white border border-black/5 shadow-sm p-6">
              <h4 className="font-semibold">{STR[lang].promise}</h4>
              <ul className="mt-3 space-y-2 text-sm text-gray-700 list-disc list-inside">
                {STR[lang].promiseList.map((li, i)=>(<li key={i}>{li}</li>))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Diensten Section */}
      <section id="diensten" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-2xl font-extrabold tracking-tight">{t("servicesTitle")}</h3>
          <div className="mt-6 grid md:grid-cols-3 gap-6">
            {[{
              icon: <Ship className="w-5 h-5"/>,
              title: STR[lang].svc1Title,
              text: STR[lang].svc1Text,
              bullets: STR[lang].svc1Bullets,
            },{
              icon: <Lightbulb className="w-5 h-5"/>,
              title: STR[lang].svc2Title,
              text: STR[lang].svc2Text,
              bullets: STR[lang].svc2Bullets,
            },{
              icon: <Layers className="w-5 h-5"/>,
              title: STR[lang].svc3Title,
              text: STR[lang].svc3Text,
              bullets: STR[lang].svc3Bullets,
            }].map((d, i) => (
              <div key={i} className="rounded-3xl border border-black/5 bg-gradient-to-b from-white to-sky-50 p-6 shadow-sm hover:shadow-md transition">
                <div className="flex items-center gap-2 font-semibold">{d.icon} {d.title}</div>
                <p className="mt-2 text-sm text-gray-700">{d.text}</p>
                <ul className="mt-3 space-y-1 text-sm text-gray-700 list-disc list-inside">
                  {d.bullets.map((b, j) => <li key={j}>{b}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Catalogus Upload Section */}
      <section id="catalogus" className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between gap-6 flex-wrap">
            <div>
              <h3 className="text-2xl font-extrabold tracking-tight">{t("catalogTitle")}</h3>
              <p className="mt-2 text-gray-700 max-w-2xl">
                {t("catalogLead")}
              </p>
            </div>
            <a href="#" className="inline-flex items-center gap-2 text-sm font-semibold text-sky-700 hover:underline"><FileText className="w-4 h-4"/> {t("uploadGuidelines")}</a>
          </div>

          <div
            ref={dropRef}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="mt-6 rounded-3xl border-2 border-dashed border-sky-300 bg-sky-50/40 p-8 text-center hover:bg-sky-50 transition"
          >
            <Upload className="mx-auto w-8 h-8"/>
            <p className="mt-2 font-semibold">{t("dropTitle")}</p>
            <p className="text-sm text-gray-600">{t("dropHint")}</p>
            <div className="mt-4">
              <label className="inline-block cursor-pointer rounded-2xl px-4 py-2 text-sm font-semibold border border-sky-200 bg-white hover:border-sky-300">
                {t("chooseFiles")}
                <input type="file" className="hidden" multiple onChange={(e)=>onFilesSelected(e.target.files)} accept=".pdf,.xlsx,.xls,.zip"/>
              </label>
            </div>

            {files.length > 0 && (
              <div className="mt-6 text-left max-w-2xl mx-auto">
                <h4 className="font-semibold">{t("selected")}</h4>
                <ul className="mt-2 space-y-2 text-sm">
                  {files.map((f, i) => (
                    <li key={i} className="flex items-center justify-between rounded-xl border border-black/5 bg-white px-3 py-2">
                      <span className="truncate">{f.name}</span>
                      <span className="text-gray-500">{(f.size/1024/1024).toFixed(2)} MB</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex gap-3 items-center">
                  <button onClick={doUpload} disabled={uploading} className="rounded-2xl px-5 py-2 text-sm font-semibold shadow-sm bg-emerald-500 text-white disabled:opacity-60 hover:bg-emerald-600">
                    {uploading ? STR[lang].uploadProgress(Math.min(files.length,1), files.length) : t("uploadBtn")}
                  </button>
                  <button onClick={()=>{setFiles([]);setUploaded(false);setUploadError("");}} className="rounded-2xl px-5 py-2 text-sm font-semibold border bg-white">{t("clearBtn")}</button>
                  {uploaded && (
                    <div className="inline-flex items-center gap-2 text-emerald-600 text-sm font-semibold"><CheckCircle className="w-4 h-4"/> {t("uploadDone")}</div>
                  )}
                </div>
                {uploadError && <div className="mt-3 text-sm text-red-600">{uploadError}</div>}
              </div>
            )}
          </div>
          
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-extrabold tracking-tight">{t("contactTitle")}</h3>
              <p className="mt-2 text-gray-700">{t("contactLead")}</p>
              <div className="mt-6 space-y-3 text-sm">
                <div className="flex items-center gap-2"><Mail className="w-4 h-4"/> sales@pb-led.com</div>
                <div className="flex items-center gap-2"><Phone className="w-4 h-4"/> +599 9 000 0000</div>
                <div className="flex items-center gap-2"><MapPin className="w-4 h-4"/> Curaçao • Caribbean</div>
              </div>
              <div className="mt-6 text-xs text-gray-600">
                <p>{t("contactAvail")}</p>
              </div>
            </div>
            <form onSubmit={(e)=>{e.preventDefault(); alert('Bedankt! / Thank you!');}} className="rounded-3xl border border-black/5 bg-gradient-to-b from-white to-amber-50 p-6 shadow-sm">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold">{t("formName")}</label>
                  <input className="mt-1 w-full rounded-xl border border-black/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-300" required />
                </div>
                <div>
                  <label className="text-sm font-semibold">{t("formCompany")}</label>
                  <input className="mt-1 w-full rounded-xl border border-black/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-300" />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm font-semibold">{t("formEmail")}</label>
                  <input type="email" className="mt-1 w-full rounded-xl border border-black/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-300" required />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm font-semibold">{t("formMsg")}</label>
                  <textarea rows={4} className="mt-1 w-full rounded-xl border border-black/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-300" placeholder={t("formMsgPh")}></textarea>
                </div>
              </div>
              <button className="mt-4 w-full rounded-2xl px-5 py-3 text-sm font-semibold shadow-sm bg-sky-500 text-white hover:bg-sky-600">{t("formSend")}</button>
              <p className="mt-3 text-xs text-gray-600">{t("formConsent")}</p>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-600">
          <p>© {new Date().getFullYear()} PB-LED. Alle rechten voorbehouden.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:underline">{STR[lang].footerLinks[0]}</a>
            <a href="#" className="hover:underline">{STR[lang].footerLinks[1]}</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ============================================================================
// Next.js integratie — VOORBEELDEN (plak in je projectstructuur)
// ============================================================================

// ---------------------------------------------------------------------------
// FILE: pages/api/upload.ts  (Next.js Pages Router)
// Vereist:  npm i formidable @aws-sdk/client-s3 nodemailer  (of: npm i @supabase/supabase-js)
// Tip: Zet env vars in .env.local  (S3 of Supabase + SMTP/Resend)
// ---------------------------------------------------------------------------
/*
import type { NextApiRequest, NextApiResponse } from 'next'
import formidable from 'formidable'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import nodemailer from 'nodemailer'
// Supabase (optioneel alternatief)
// import { createClient } from '@supabase/supabase-js'

export const config = { api: { bodyParser: false } } // we parsen multipart zelf

const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

// Voorbeeld mailer (Nodemailer SMTP). Alternatief: Resend API.
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: false,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  try {
    const form = formidable({ multiples: false, maxFileSize: 100 * 1024 * 1024 })
    const { fields, files }: any = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err)
        else resolve({ fields, files })
      })
    })

    const file = files.file // key moet overeenkomen met client: fd.append('file', ...)
    if (!file) return res.status(400).json({ error: 'No file' })

    const lang = String(fields.lang || 'nl')
    const source = String(fields.source || 'pb-led-site')

    // Upload naar S3 bucket
    const fs = await import('fs')
    const fileStream = fs.createReadStream(file.filepath)
    const key = `uploads/${Date.now()}-${file.originalFilename}`

    await s3.send(new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET!,
      Key: key,
      Body: fileStream,
      ContentType: file.mimetype || 'application/octet-stream',
      ACL: 'private',
    }))

    // === Alternatief: Supabase Storage ===
    // const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
    // const buffer = await fs.promises.readFile(file.filepath)
    // const { data, error } = await supabase.storage.from('catalogues').upload(key, buffer, { contentType: file.mimetype })
    // if (error) throw error

    // E-mailnotificatie (pas aan naar jouw ontvanger)
    try {
      await transporter.sendMail({
        from: 'PB-LED Upload <no-reply@pb-led.com>',
        to: process.env.NOTIFY_EMAIL_TO!,
        subject: 'Nieuwe catalogus upload',
        text: `Bron: ${source}
Taal: ${lang}
Bestand: ${file.originalFilename}
Opslag-key: ${key}`,
      })
    } catch (e) {
      console.warn('Email failed', e)
    }

    return res.status(200).json({ ok: true, key })
  } catch (e: any) {
    console.error(e)
    return res.status(500).json({ error: 'Upload failed' })
  }
}
*/

// ---------------------------------------------------------------------------
// FILE: app/api/upload/route.ts  (Next.js App Router)
// Vereist dezelfde dependencies als hierboven. Multipart parsing met busboy.
// ---------------------------------------------------------------------------
/*
import { NextRequest, NextResponse } from 'next/server'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import nodemailer from 'nodemailer'
import Busboy from 'busboy'

export const runtime = 'nodejs'

const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

async function parseForm(req: NextRequest): Promise<{ fields: Record<string,string>, file?: { filename: string, mime: string, buffer: Buffer } }> {
  return new Promise((resolve, reject) => {
    const bb = Busboy({ headers: Object.fromEntries(req.headers) })
    const fields: Record<string,string> = {}
    let fileBufs: Buffer[] = []
    let filename = ''
    let mime = 'application/octet-stream'

    bb.on('file', (_name, file, info) => {
      filename = info.filename
      mime = info.mimeType
      file.on('data', (d: Buffer) => fileBufs.push(d))
    })
    bb.on('field', (name, val) => { fields[name] = val })
    bb.on('finish', () => resolve({ fields, file: filename ? { filename, mime, buffer: Buffer.concat(fileBufs) } : undefined }))
    bb.on('error', reject)

    req.body?.pipe(bb)
  })
}

export async function POST(req: NextRequest) {
  try {
    const { fields, file } = await parseForm(req)
    if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 })

    const key = `uploads/${Date.now()}-${file.filename}`
    await s3.send(new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET!,
      Key: key,
      Body: file.buffer,
      ContentType: file.mime,
      ACL: 'private',
    }))

    // Mail via Resend (optioneel)
    // const resendRes = await fetch('https://api.resend.com/emails', {
    //   method: 'POST',
    //   headers: { 'Authorization': `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     from: 'PB-LED <no-reply@pb-led.com>',
    //     to: [process.env.NOTIFY_EMAIL_TO!],
    //     subject: 'Nieuwe catalogus upload',
    //     text: `Bestand: ${file.filename}
Key: ${key}`,
    //   }),
    // })

    return NextResponse.json({ ok: true, key })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
*/

// ---------------------------------------------------------------------------
// SEO & hreflang — App Router (app/layout.tsx of per route)
// ---------------------------------------------------------------------------
/*
// app/layout.tsx
export const metadata = {
  title: {
    default: 'PB-LED — Caribbean LED B2B',
    template: '%s | PB-LED',
  },
  description: 'Leverancier van professionele LED-verlichting voor het Caribisch gebied. Import, lichtplannen en BIM-integratie voor B2B projecten.',
  alternates: {
    canonical: 'https://www.pb-led.com/',
    languages: {
      'nl': 'https://www.pb-led.com/?lang=nl',
      'en': 'https://www.pb-led.com/?lang=en',
    },
  },
  openGraph: {
    title: 'PB-LED — Caribbean LED B2B',
    description: 'Leverancier voor het Caribisch gebied. Lichtplannen & BIM.',
    url: 'https://www.pb-led.com/',
    siteName: 'PB-LED',
    images: [
      { url: 'https://www.pb-led.com/og.png', width: 1200, height: 630 },
    ],
    locale: 'nl_NL',
    type: 'website',
  },
}
*/

// ---------------------------------------------------------------------------
// SEO & hreflang — Pages Router (pages/_document.tsx)
// ---------------------------------------------------------------------------
/*
import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="nl">
        <Head>
          <meta name="description" content="Leverancier van professionele LED-verlichting voor het Caribisch gebied. Import, lichtplannen en BIM-integratie voor B2B projecten." />
          <link rel="alternate" hrefLang="nl" href="https://www.pb-led.com/?lang=nl" />
          <link rel="alternate" hrefLang="en" href="https://www.pb-led.com/?lang=en" />
          <link rel="alternate" hrefLang="x-default" href="https://www.pb-led.com/" />
          <meta property="og:title" content="PB-LED — Caribbean LED B2B" />
          <meta property="og:description" content="Leverancier voor het Caribisch gebied. Lichtplannen & BIM." />
          <meta property="og:image" content="https://www.pb-led.com/og.png" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
*/

// ---------------------------------------------------------------------------
// URL-parameter → taal (SEO-vriendelijk): ?lang=nl|en
// Plaats in je pagina-component (Next.js) om initieel de taal te bepalen uit URL.
// ---------------------------------------------------------------------------
/*
import { useSearchParams } from 'next/navigation'

const params = useSearchParams()
useEffect(() => {
  const p = params.get('lang')
  if (p === 'nl' || p === 'en') setLang(p)
}, [params])
*/
