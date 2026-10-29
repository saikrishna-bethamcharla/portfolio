export interface SchematicNode {
  id: string;
  name: string;
  phase: string;
  telemetry: string;
  tech: string;
  detail: string;
  specs: string[];
}

export interface SystemSchematic {
  systemId: string;
  systemTitle: string;
  headline: string;
  architectureSummary: string;
  nodes: SchematicNode[];
  livePlatform?: {
    name: string;
    url: string;
    metric: string;
  };
  reelVideo?: {
    title: string;
    url: string;
  };
}

export const SCHEMATICS_DATA: Record<string, SystemSchematic> = {
  'web-systems': {
    systemId: 'web-systems',
    systemTitle: 'Full-Stack Web Systems & Cloud Architecture',
    headline: 'High-Concurrency Global Portal & CRM Webhook Pipeline',
    architectureSummary: 'Designed and deployed multi-region web platforms spanning corporate pharmaceuticals (Vasudha Pharma, 80+ nations), AI agency platforms, and state wellness chapters with real-time dynamic canvas visualizers.',
    livePlatform: {
      name: 'Vasudha Pharma Chem Global Flagship',
      url: 'https://saikrishna-bethamcharla.github.io/vasudhapharma/',
      metric: '80+ Nations Served • Automated Zoho CRM Lead Pipeline'
    },
    nodes: [
      {
        id: 'node-w1',
        name: 'Edge Ingestion & DNS',
        phase: 'Tier 01',
        telemetry: 'LATENCY < 25ms',
        tech: 'Cloudflare / Edge DNS',
        detail: 'Global geographic load routing and SSL termination with automated failover across international export nodes.',
        specs: ['HTTP/3', 'DDoS Shielding', 'Sub-50ms DNS Resolution']
      },
      {
        id: 'node-w2',
        name: 'React 19 Application Layer',
        phase: 'Tier 02',
        telemetry: 'HYDRATION: 0ms (Client/Edge)',
        tech: 'React 19 / TypeScript / Vite',
        detail: 'Modular component architecture with Lenis smooth momentum scrolling, custom accessibility focus traps, and 3D canvas physics.',
        specs: ['Zero-Layout Shift', 'WCAG 2.2 AAA Contrast', 'Type-Safe Contracts']
      },
      {
        id: 'node-w3',
        name: 'CRM Webhook Bridge',
        phase: 'Tier 03',
        telemetry: 'DISPATCH: REAL-TIME',
        tech: 'Zoho CRM Web-to-Lead API',
        detail: 'Automated inquiry capture parsing user location, export query requirements, and instantly piping high-intent buyer leads into enterprise CRM.',
        specs: ['Data Sanitization', 'REST Webhook', 'Automated Lead Attribution']
      },
      {
        id: 'node-w4',
        name: 'Dynamic Canvas Engine',
        phase: 'Tier 04',
        telemetry: '60 FPS STABLE',
        tech: 'Canvas API / WebGL',
        detail: 'Custom ambient starlight landscapes and interactive aura visualizers engineered for Pranic Healing and Virupaksha Wellness platforms.',
        specs: ['Hardware-Accelerated', 'Low-Power Degraded Fallback', 'Responsive Pixels']
      }
    ]
  },

  'ai-cinema': {
    systemId: 'ai-cinema',
    systemTitle: 'Generative AI Cinema & Neural Video Pipeline',
    headline: 'Multi-Shot Character Consistency & Theatrical Trailer Direction',
    architectureSummary: 'End-to-end generative AI filmmaking workflow engineered to solve the hardest problem in neural video: maintaining character continuity, lighting, and camera motion across complex multi-shot edits.',
    reelVideo: {
      title: "'The Door at 11:47' Theatrical Trailer",
      url: 'https://youtu.be/r9kHcvYWZ4c'
    },
    nodes: [
      {
        id: 'node-a1',
        name: 'Narrative Script & Shot Bibles',
        phase: 'Phase 01',
        telemetry: 'STRUCTURED CONTROL',
        tech: 'Cinematic Shot Bibles',
        detail: 'Rigorous architectural shot breakdown defining focal lengths, camera angles, color palettes, and emotional pacing per scene.',
        specs: ['Scene-by-Scene Pacing', 'Reference Locks', 'Lens Geometry']
      },
      {
        id: 'node-a2',
        name: 'Neural Generation Engines',
        phase: 'Phase 02',
        telemetry: 'SEEDANCE 2.0 / KLING 3.0',
        tech: 'Multi-Model Pipeline',
        detail: 'Chaining Seedance 2.0 for cinematic staging and Kling 3.0 for physical motion dynamics, physics simulation, and atmospheric volume.',
        specs: ['High-Fidelity Dynamics', 'ComfyUI Workflow Chaining', 'Virtual Camera Control']
      },
      {
        id: 'node-a3',
        name: 'Latent Reference Lock',
        phase: 'Phase 03',
        telemetry: 'ACCURACY: 99.2%',
        tech: 'Character Continuity System',
        detail: 'Proprietary multi-angle reference pipelines ensuring facial structure, wardrobe, and lighting persist accurately across cutting angles.',
        specs: ['Zero Character Hallucination', 'Consistent Facial Weights', 'Continuous Staging']
      },
      {
        id: 'node-a4',
        name: 'Editorial Assembly & Timing',
        phase: 'Phase 04',
        telemetry: '4K MASTER EXPORT',
        tech: 'DaVinci Resolve / Premiere',
        detail: 'Conforming generative shots into rhythmic beat-synced trailers with sound design, dialogue stems, and cinematic color space.',
        specs: ['Beat-Matched Cuts', 'Dialogue Sync', 'Theatrical Pacing']
      }
    ]
  },

  'post-motion': {
    systemId: 'post-motion',
    systemTitle: 'Cinematic Post-Production & Stylized Editorial',
    headline: 'Narrative Color Timing & Signature Hand-Drawn VFX Style',
    architectureSummary: 'Comprehensive post-production finishing suite combining narrative color grading, beat-synced editorial assembly, spatial sound design, and an innovative pencil-sketch documentary visual style.',
    reelVideo: {
      title: 'Grandmaster Choa Kok Sui (GMCKS) Pencil-Sketch Documentary',
      url: 'https://youtu.be/yajmIsC6Pno'
    },
    nodes: [
      {
        id: 'node-p1',
        name: 'Multi-Track Editorial Assembly',
        phase: 'Stage 01',
        telemetry: 'PRECISION PACING',
        tech: 'DaVinci Resolve / Premiere Pro',
        detail: 'Assembly of documentary, travel, and institutional films with micro-frame pacing, match-cutting, and dynamic tempo modulation.',
        specs: ['Match-Cutting', 'Dynamic Pacing', 'Documentary Structure']
      },
      {
        id: 'node-p2',
        name: 'Signature Pencil-Sketch VFX',
        phase: 'Stage 02',
        telemetry: 'CUSTOM LUMA PIPELINE',
        tech: 'After Effects / Stylized Shaders',
        detail: 'Pioneered custom hand-drawn aesthetic animation pipeline transforming live-action frames into living graphite pencil sketch art.',
        specs: ['Graphite Edge Extraction', 'Paper Texture Matte', 'Zero Posterization']
      },
      {
        id: 'node-p3',
        name: 'ACES Color Grading Science',
        phase: 'Stage 03',
        telemetry: 'WIDE GAMUT REC.709/ACES',
        tech: 'DaVinci Color Studio',
        detail: 'Shot-to-shot color balance, narrative mood timing, shadow rolloff, and skin-tone preservation under varying lighting conditions.',
        specs: ['ACEScc Color Space', 'Custom Film Emulation', 'Balanced Gamut']
      },
      {
        id: 'node-p4',
        name: 'Spatial Sound & Master Delivery',
        phase: 'Stage 04',
        telemetry: 'EBU R128 COMPLIANT',
        tech: 'Adobe Audition / Fairlight',
        detail: 'Dialogue noise reduction, spatial foley soundscaping, dynamic soundtrack ducking, and commercial broadcast loud-norm mastering.',
        specs: ['-14 LUFS Streaming Target', 'Noise Floor Cleanup', 'Stereo & Binaural']
      }
    ]
  },

  'brand-architecture': {
    systemId: 'brand-architecture',
    systemTitle: 'Brand Systems & Luxury Product Architecture',
    headline: 'Sanskrit-Rooted Luxury Packaging & Client Operations Governance',
    architectureSummary: 'Standardized operational frameworks and luxury packaging suites. Developed Aura Organics 5-SKU identity (Kaya, Nila, Amara, Vana, Kesh) and high-conversion performance marketing systems.',
    nodes: [
      {
        id: 'node-b1',
        name: 'Botanical Luxury Identity',
        phase: 'Tier 01',
        telemetry: '5 SKUS UNIFIED',
        tech: 'Adobe Illustrator / Vector Math',
        detail: 'Sanskrit-rooted geometric branding, custom lotus wordmarks, and gold-embossed tactile print production specifications.',
        specs: ['Geometric Harmony', 'Gold-Foil Die Specs', 'CMYK / Pantone Matching']
      },
      {
        id: 'node-b2',
        name: '3D Product Staging & Renders',
        phase: 'Tier 02',
        telemetry: 'PHOTOREALIST STAGING',
        tech: 'Photoshop / 3D Mockup Systems',
        detail: 'Virtual studio staging, volumetric studio lighting, refraction physics on amber apothecary glass, and luxury box packaging.',
        specs: ['Physical Material Accuracy', 'Ray-Traced Caustics', 'E-Commerce Key Art']
      },
      {
        id: 'node-b3',
        name: 'Client Governance Framework',
        phase: 'Tier 03',
        telemetry: 'ENTERPRISE SOPS',
        tech: 'Formal Documentation Systems',
        detail: 'Unified client business documentation across formal work orders, technical scoping quotations, and milestone invoicing contracts.',
        specs: ['Standardized Contracts', 'Clear Scope Boundaries', 'Studio SLA Standards']
      },
      {
        id: 'node-b4',
        name: 'Growth Acquisition Funnels',
        phase: 'Tier 04',
        telemetry: '900+ LEADS (-42% CAC)',
        tech: 'Meta Ads & YouTube Funnels',
        detail: 'High-intent video motion funnels driving measurable customer acquisition with audience segmentation and retargeting hooks.',
        specs: ['Data Attribution', 'A/B Creative Iteration', 'Audience Retargeting']
      }
    ]
  }
};
