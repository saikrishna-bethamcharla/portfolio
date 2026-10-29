export interface Deployment {
  id: string;
  title: string;
  discipline: string;
  year: string;
  tagline: string;
  summary: string;
  metrics: { label: string; value: string }[];
  stack: string[];
  deliverables: string[];
  liveUrl?: string;
  videoUrl?: string;
  category: 'web' | 'ai-video' | 'post-production' | 'brand-systems';
}

export interface TrajectoryMilestone {
  year: string;
  phaseCode: string;
  title: string;
  designation: string;
  timeframe: string;
  overview: string;
  breakdown: {
    nodeId: string;
    headline: string;
    context: string;
    specs: string[];
  }[];
}

export interface TechnicalCapability {
  group: string;
  capabilities: {
    identifier: string;
    name: string;
    proficiency: string;
    score: number; // 0 - 100 for visual telemetry bar
    description: string;
  }[];
}

export interface ProvenImpact {
  id: string;
  index: string;
  domain: string;
  title: string;
  metric: string;
  detail: string;
  verifiedLink?: string;
}

export const PORTFOLIO_DATA = {
  profile: {
    name: "Sai Krishna Bethamcharla",
    title: "Creative & Technical Lead",
    organization: "Zai Labs Private Limited",
    orgUrl: "https://zailabs.co.in/",
    location: "Hyderabad, India",
    availability: "Available for High-End AI Filmmaking & Enterprise Web Direction",
    email: "saikrishnabethamcharla@gmail.com",
    degree: "Postgraduate Diploma (PGD)",
    institution: "Kingston University, London (2022)",
    socials: {
      github: "https://github.com/saikrishna-bethamcharla",
      linkedin: "https://linkedin.com/in/sai-krishna-bethamcharla",
      instagram: "https://www.instagram.com/saikrishna_bethamcharla"
    },
    statement: "Directing the convergence of generative AI filmmaking pipelines, high-performance web systems, and luxury brand architecture. Leading cross-functional technical and creative teams from concept to global deployment.",
    resumeUrl: "./assets/Sai_Krishna_Bethamcharla_Resume.pdf"
  },

  deployments: [
    {
      id: "web-systems",
      title: "Enterprise Web Systems & Platforms",
      discipline: "Full-Stack Architecture & Cloud",
      year: "2026",
      tagline: "Enterprise Architecture • CRM Integrations • High-Concurrency Platforms",
      summary: "Full-scope architecture, engineering, and deployment of mission-critical web applications — including the Vasudha Pharma Chem Limited Global Flagship (80+ export markets, automated Zoho CRM lead pipeline), the Zai Labs Corporate AI Platform, and the Pranic Healing AP & Telangana Chapter Web Portal.",
      metrics: [
        { label: "Production Platforms", value: "04" },
        { label: "Global Reach", value: "80+ Nations" }
      ],
      stack: ["React 19", "TypeScript", "Tailwind CSS", "Canvas Physics", "Lenis Momentum", "Zoho CRM", "Edge Cloud"],
      deliverables: [
        "Vasudha Pharma Chem Global Flagship (80+ Export Markets)",
        "Zai Labs Corporate AI Agency Platform",
        "Pranic Healing AP & Telangana Chapter Web Portal",
        "Dr. Rashmi Katari — Virupaksha Niramayata Living Sanctuary"
      ],
      liveUrl: "https://saikrishna-bethamcharla.github.io/vasudhapharma/",
      category: "web"
    },
    {
      id: "ai-cinema",
      title: "Generative AI Cinema & Multi-Shot Direction",
      discipline: "Generative AI Pipelines & Neural Video",
      year: "2026",
      tagline: "Neural Video Generation • Character Continuity • Cinematic Camera Staging",
      summary: "Directing complete multi-shot generative AI film pipelines. Engineering precision character continuity, virtual camera movement, shot continuity bibles, and theatrical-grade trailer editing.",
      metrics: [
        { label: "Cinematic Productions", value: "04" },
        { label: "Generative Pipeline", value: "100% AI" }
      ],
      stack: ["Seedance 2.0", "Kling 3.0", "Higgsfield", "ComfyUI", "DaVinci Resolve", "Character Consistency Engine"],
      deliverables: [
        "The Door at 11:47 (Theatrical Trailer)",
        "Odyssey (Sci-Fi Narrative)",
        "Neo Belva Institutional Film",
        "Abacus Campus Showcase"
      ],
      videoUrl: "https://youtu.be/r9kHcvYWZ4c",
      category: "ai-video"
    },
    {
      id: "post-motion",
      title: "Cinematic Post-Production & Motion Design",
      discipline: "Editorial, Color Timing & Visual Effects",
      year: "2025 – 2026",
      tagline: "Beat-Synced Editorial • Narrative Color Grading • Signature Hand-Drawn VFX",
      summary: "Editorial assembly, visual effects compositing, narrative color grading, and spatial sound design. Pioneer of a signature pencil-sketch visual documentary aesthetic for high-profile client productions.",
      metrics: [
        { label: "Completed Films", value: "05" },
        { label: "Signature Visual Art", value: "Hand-Drawn Stylization" }
      ],
      stack: ["DaVinci Resolve", "Adobe Premiere Pro", "After Effects", "Adobe Audition", "CapCut Pro", "Color Grading"],
      deliverables: [
        "Grandmaster Choa Kok Sui (GMCKS) Pencil-Sketch Documentary",
        "Green Field School International Commercial",
        "Neo Belva Commercial Reel",
        "Char Dham Yatra Travel Documentary",
        "Godavari Ghee Heritage Film"
      ],
      videoUrl: "https://youtu.be/yajmIsC6Pno",
      category: "post-production"
    },
    {
      id: "brand-architecture",
      title: "Brand Systems & Client Operations",
      discipline: "Brand Architecture & Packaging Design",
      year: "2026",
      tagline: "Sanskrit-Rooted Luxury Packaging • Client Operations • Growth Funnels",
      summary: "Standardized enterprise client operations frameworks, Sanskrit-rooted luxury packaging suites (Aura Organics 5 SKUs), 3D product staging, and high-conversion Meta/YouTube customer acquisition funnels.",
      metrics: [
        { label: "Packaging Suite", value: "05 SKUs" },
        { label: "Acquisition Funnels", value: "900+ Leads (-42% CAC)" }
      ],
      stack: ["Adobe Illustrator", "Adobe Photoshop", "Luxury Packaging", "3D Staging", "Performance Funnels", "Studio SOPs"],
      deliverables: [
        "Aura Organics Botanical Luxury Suite (Kaya, Nila, Amara, Vana, Kesh)",
        "Standardized Client Business Framework (SOPs, Work Orders, Quotes)",
        "High-Intent Meta & YouTube Acquisition Campaigns"
      ],
      category: "brand-systems"
    }
  ] as Deployment[],

  trajectory: [
    {
      year: "2026",
      phaseCode: "PHASE 05",
      title: "Creative & Technical Lead",
      designation: "Lead Creative & Technical Director",
      timeframe: "August 2026 – Present",
      overview: "Directing multi-shot generative AI film pipelines, enterprise web platforms, and operational governance at Zai Labs Private Limited.",
      breakdown: [
        {
          nodeId: "SYS-01",
          headline: "AI Film Direction & Pipelines",
          context: "Directing multi-shot AI cinematic productions with Seedance 2.0, Kling 3.0, and strict character reference continuity.",
          specs: ["Seedance 2.0", "Kling 3.0", "Continuity Engine", "DaVinci Resolve"]
        },
        {
          nodeId: "SYS-02",
          headline: "Full-Scope Platform Engineering",
          context: "Architecting end-to-end client web systems, CRM integrations, and edge cloud hosting for corporate clients.",
          specs: ["React 19", "Edge Deployments", "CRM Pipeline", "Team Leadership"]
        },
        {
          nodeId: "SYS-03",
          headline: "Operational Systems & Governance",
          context: "Instituting formal business documentation templates across work orders, technical scoping, and standardized team pipelines.",
          specs: ["Enterprise SOPs", "Scoping Frameworks", "Production Standards"]
        }
      ]
    },
    {
      year: "2025",
      phaseCode: "PHASE 04",
      title: "Web Systems & Platform Architecture",
      designation: "Lead Web Technologist",
      timeframe: "2025",
      overview: "Engineering large-scale web applications, custom CRM data pipelines, and interactive canvas visualizers.",
      breakdown: [
        {
          nodeId: "SYS-04",
          headline: "Pharma Global Infrastructure",
          context: "Architected Vasudha Pharma Chem Limited's global web platform serving 80+ export nations with automated Zoho CRM routing.",
          specs: ["React 19", "Zoho CRM", "Global Routing"]
        },
        {
          nodeId: "SYS-05",
          headline: "Interactive Health & Wellness Portals",
          context: "Engineered official state chapter platform for Pranic Healing with real-time aura visualizers and Virupaksha Wellness interactive living landscape.",
          specs: ["Interactive Canvas", "RSVP Bridge", "Lenis Momentum"]
        }
      ]
    },
    {
      year: "2024",
      phaseCode: "PHASE 03",
      title: "Brand Systems & Motion Design",
      designation: "Brand & Motion Architect",
      timeframe: "2024",
      overview: "Architecting luxury packaging suites, 3D product visualizations, and performance growth funnels.",
      breakdown: [
        {
          nodeId: "SYS-06",
          headline: "Aura Organics Botanical Suite",
          context: "Designed end-to-end brand identity and 5-SKU luxury botanical packaging architecture.",
          specs: ["Luxury Packaging", "Illustrator", "Brand Identity"]
        },
        {
          nodeId: "SYS-07",
          headline: "Performance Acquisition Motion",
          context: "Created high-velocity video motion assets generating over 900+ qualified client leads.",
          specs: ["Motion Ads", "After Effects", "Growth Funnels"]
        }
      ]
    },
    {
      year: "2023",
      phaseCode: "PHASE 02",
      title: "Post-Production Craft & Color Timing",
      designation: "Editorial & Color Specialist",
      timeframe: "2023",
      overview: "Mastering color timing, beat-synced editorial assembly, and documentary post-production across commercial and narrative formats.",
      breakdown: [
        {
          nodeId: "SYS-08",
          headline: "Signature Hand-Drawn Documentary Aesthetic",
          context: "Developed specialized pencil-sketch animation technique for the GMCKS historical documentary.",
          specs: ["DaVinci Resolve", "Stylized VFX", "Sound Design"]
        }
      ]
    },
    {
      year: "2022",
      phaseCode: "PHASE 01",
      title: "Academic Foundation",
      designation: "Postgraduate Scholar",
      timeframe: "2022",
      overview: "Postgraduate Diploma (PGD) at Kingston University, London. Specialized in multidisciplinary creative direction, digital arts, and design theory.",
      breakdown: [
        {
          nodeId: "SYS-09",
          headline: "Postgraduate Honors (London)",
          context: "Completed rigorous postgraduate study, combining technological execution with classical design methodology.",
          specs: ["Kingston University", "London", "PGD"]
        }
      ]
    }
  ] as TrajectoryMilestone[],

  capabilities: [
    {
      group: "Generative AI Video & Neural Engines",
      capabilities: [
        { identifier: "SD2", name: "Seedance 2.0", proficiency: "Expert", score: 98, description: "Multi-shot scene orchestration & dynamic camera control" },
        { identifier: "KL3", name: "Kling 3.0", proficiency: "Expert", score: 96, description: "Fluid motion physics & high-fidelity simulation" },
        { identifier: "HGF", name: "Higgsfield", proficiency: "Advanced", score: 92, description: "Virtual camera staging & dynamic perspective angles" },
        { identifier: "CUI", name: "ComfyUI", proficiency: "Advanced", score: 90, description: "Node-based generative pipeline chaining" },
        { identifier: "REF", name: "Continuity Architecture", proficiency: "Proprietary", score: 95, description: "Strict character and lighting persistence across multi-shot sequences" }
      ]
    },
    {
      group: "Cinematic Post & Motion Engineering",
      capabilities: [
        { identifier: "DVR", name: "DaVinci Resolve Studio", proficiency: "Mastery", score: 96, description: "Color timing, beat-synced timeline assembly & Fairlight audio" },
        { identifier: "PRM", name: "Adobe Premiere Pro", proficiency: "Mastery", score: 95, description: "Commercial multi-track editorial & broadcast pacing" },
        { identifier: "AEX", name: "Adobe After Effects", proficiency: "Advanced", score: 92, description: "VFX compositing, visual cleanup & kinetic typography" },
        { identifier: "AUD", name: "Adobe Audition", proficiency: "Advanced", score: 88, description: "Spatial audio design, dialogue cleanup & soundscaping" },
        { identifier: "CCP", name: "CapCut Pro", proficiency: "Advanced", score: 90, description: "High-tempo social velocity & mobile-first editorial" }
      ]
    },
    {
      group: "Full-Stack Software & Web Architecture",
      capabilities: [
        { identifier: "TSX", name: "TypeScript & ES6+", proficiency: "Advanced", score: 92, description: "Type-safe robust application architecture" },
        { identifier: "R19", name: "React 19 & Vite", proficiency: "Mastery", score: 95, description: "Modern reactive paradigms & sub-millisecond bundling" },
        { identifier: "TW4", name: "Tailwind CSS & CSS3", proficiency: "Mastery", score: 96, description: "Hyper-modern utility-first design systems" },
        { identifier: "WGL", name: "Canvas & WebCodecs", proficiency: "Advanced", score: 88, description: "Real-time canvas rendering, particle physics & media APIs" },
        { identifier: "CRM", name: "CRM & Edge Cloud", proficiency: "Advanced", score: 90, description: "Zoho CRM automation, DNS, SSL & cloud edge deployment" }
      ]
    },
    {
      group: "Brand Systems & Luxury Product Design",
      capabilities: [
        { identifier: "AIL", name: "Adobe Illustrator", proficiency: "Mastery", score: 95, description: "Vector identity, precision typography & luxury packaging" },
        { identifier: "APS", name: "Adobe Photoshop", proficiency: "Mastery", score: 94, description: "Commercial key art, digital matte painting & staging" },
        { identifier: "PKG", name: "Luxury Packaging Design", proficiency: "Specialist", score: 92, description: "Multi-SKU structural and botanical aesthetic design" },
        { identifier: "SOP", name: "Studio Operations & SOPs", proficiency: "Lead", score: 94, description: "Formal work orders, quotations, client contracts & pipelines" }
      ]
    }
  ] as TechnicalCapability[],

  impactTelemetry: [
    { id: "imp-1", index: "01", domain: "LEADERSHIP", title: "Creative & Technical Lead", metric: "August 2026 – Present", detail: "Directing creative and technical delivery across AI video, web development, and brand systems at Zai Labs Private Limited." },
    { id: "imp-2", index: "02", domain: "AI CINEMA", title: "Multi-Shot AI Film Direction", metric: "100% Neural Pipeline", detail: "Directed 'The Door at 11:47' theatrical trailer and multi-scene sci-fi narratives with strict character continuity." },
    { id: "imp-3", index: "03", domain: "GLOBAL WEB", title: "Vasudha Pharma Flagship", metric: "80+ Export Markets", detail: "Engineered global export portal with automated Zoho CRM web-to-lead routing.", verifiedLink: "https://saikrishna-bethamcharla.github.io/vasudhapharma/" },
    { id: "imp-4", index: "04", domain: "CREDENTIAL", title: "Kingston University, London", metric: "PGD (Honors)", detail: "Postgraduate Diploma qualification in multidisciplinary creative direction and digital design methodology." },
    { id: "imp-5", index: "05", domain: "INTERACTIVE WEB", title: "Pranic Healing State Portal", metric: "AP & Telangana Chapter", detail: "Engineered official chapter portal featuring dynamic aura visualizers and WhatsApp RSVP bridge.", verifiedLink: "https://www.pranichealingaptelangana.com/" },
    { id: "imp-6", index: "06", domain: "POST-PRODUCTION", title: "Signature Stylized Documentary", metric: "DaVinci Resolve", detail: "Pioneered hand-drawn pencil-sketch visual style for the Grandmaster Choa Kok Sui documentary film." },
    { id: "imp-7", index: "07", domain: "LIVING CANVAS", title: "Dr. Rashmi Katari Holistic Sanctuary", metric: "Virupaksha Niramayata", detail: "Engineered serene wellness sanctuary with React 19, Lenis momentum, and ambient starlight canvas.", verifiedLink: "https://virupakshawellness.com/" },
    { id: "imp-8", index: "08", domain: "LUXURY BRAND", title: "Aura Organics Botanical Suite", metric: "05 Packaging SKUs", detail: "Architected Sanskrit-rooted identity, gold-embossed marks, and 5-SKU luxury packaging language." },
    { id: "imp-9", index: "09", domain: "GROWTH FUNNELS", title: "Performance Motion Marketing", metric: "900+ Qualified Leads", detail: "Engineered high-velocity motion creative resulting in a -42% reduction in customer acquisition cost." },
    { id: "imp-10", index: "10", domain: "GOVERNANCE", title: "Standardized Studio Framework", metric: "Enterprise SOPs", detail: "Unified client scoping, technical quotations, and operational governance into standardized formal frameworks." }
  ] as ProvenImpact[]
};
