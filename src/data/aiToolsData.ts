import { AITool } from '../types';

export const INITIAL_AI_TOOLS: AITool[] = [
  // 1. Education - ChatGPT
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    slug: 'chatgpt',
    category: 'Education',
    secondaryCategories: ['Chat Bot'],
    tagline: 'Versatile conversational AI for learning, tutoring, and complex problem solving.',
    description: 'OpenAI’s flagship generative conversational intelligence. Used globally by students, researchers, and educators for conceptual explanations, step-by-step math tutoring, coding education, language translation, and research synthesis.',
    workItDoes: [
      'Interactive Socratic tutoring and customized explanations on any educational subject.',
      'Code writing, debugging, and step-by-step computer science concept breakdown.',
      'Essay structuring, grammar coaching, and foreign language fluency training.',
      'Complex academic document analysis with voice-mode real-time interactive lectures.'
    ],
    pricing: {
      model: 'Freemium',
      freeTier: 'Free access to GPT-4o mini & limited GPT-4o with standard speeds',
      startingPrice: '$20 / month (ChatGPT Plus with GPT-4o, Advanced Voice & reasoning models)',
      proTier: '$200 / month (ChatGPT Pro for unlimited highest-tier reasoning o1/o3)',
      enterprise: 'Custom Team & Enterprise licensing with administrative data privacy'
    },
    url: 'https://chatgpt.com',
    rating: 4.9,
    reviewCount: 4820,
    strengths: [
      'Industry-leading general reasoning and broad subject comprehension',
      'Ultra-fluid real-time voice mode for oral study and foreign language practice',
      'Massive custom GPT plugin ecosystem for academic specialties'
    ],
    weaknesses: [
      'Occasional hallucinations in niche academic citations without web search active',
      'Free tier has usage throttling during peak hours'
    ],
    bestFor: 'Students, educators, software learners, and multidisciplinary academic research.',
    platforms: ['Web Browser', 'iOS App', 'Android App', 'macOS & Windows Desktop'],
    verified: true,
    companyName: 'OpenAI',
    releaseYear: 2022,
    badge: 'Popular for Study',
    colorTheme: {
      accent: '#10a37f',
      border: 'border-emerald-500/30',
      bgGlow: 'from-emerald-500/10'
    },
    reviews: [
      {
        id: 'rev-cgt-1',
        author: 'Dr. Marcus Vance',
        role: 'Computer Science Professor',
        rating: 5,
        date: '2026-06-14',
        comment: 'ChatGPT has revolutionized how my undergrads grasp algorithm design. Using it as a 24/7 teaching assistant to explain complex dynamic programming problems has elevated average lab scores significantly.',
        pros: 'Adaptive explanations, rapid Python code walkthroughs.',
        cons: 'Students need training to verify mathematical proofs independently.',
        verified: true
      },
      {
        id: 'rev-cgt-2',
        author: 'Elena Rostova',
        role: 'Medical Graduate Student',
        rating: 5,
        date: '2026-07-02',
        comment: 'The voice mode allows me to quiz myself while commuting. It breaks down biochemical pathways step-by-step without getting frustrated.',
        pros: 'Voice comprehension and rapid synthesis of lecture notes.',
        cons: 'Plus tier is necessary for heavy daily question loads.',
        verified: true
      }
    ]
  },

  // 1. Education - Claude
  {
    id: 'claude',
    name: 'Claude',
    slug: 'claude',
    category: 'Education',
    secondaryCategories: ['Chat Bot'],
    tagline: 'Deep analytical AI with exceptional reading comprehension, nuanced writing, and large context windows.',
    description: 'Anthropic’s Claude (powered by Claude 3.5 Sonnet & Claude 3.7) is celebrated in education and research for its nuanced writing tone, rigorous factual analysis, massive context window (200k+ tokens), and interactive artifact rendering.',
    workItDoes: [
      'Deep reading and comparative analysis of 100+ page academic textbooks and research papers in one prompt.',
      'Live code generation and visual interactive flashcards / pedagogical simulators via Artifacts.',
      'Nuanced thesis drafting, academic style editing, and logic critique.',
      'Structured curriculum design and rubric grading assistance for teachers.'
    ],
    pricing: {
      model: 'Freemium',
      freeTier: 'Free web access to Claude 3.5 Sonnet with message limits',
      startingPrice: '$20 / month (Claude Pro with 5x usage, priority access during peak)',
      proTier: '$30 / user/month (Claude Team with 200k context collaboration)',
      enterprise: 'Claude Enterprise with dedicated workspace security & HIPAA compliance'
    },
    url: 'https://claude.ai',
    rating: 4.9,
    reviewCount: 3640,
    strengths: [
      'Superb natural writing tone that sounds scholarly rather than robotic',
      'Interactive visual Artifacts for live diagrams, simulators, and code execution',
      'Vast 200k token context window easily ingesting entire theses and datasets'
    ],
    weaknesses: [
      'No native audio voice mode on web compared to competitors',
      'Strict message caps on the free tier during high-demand hours'
    ],
    bestFor: 'Academic researchers, university students, essay drafting, and complex literature reviews.',
    platforms: ['Web Browser', 'iOS App', 'Android App'],
    verified: true,
    companyName: 'Anthropic',
    releaseYear: 2023,
    badge: 'Research & Writing Pick',
    colorTheme: {
      accent: '#d97706',
      border: 'border-amber-500/30',
      bgGlow: 'from-amber-500/10'
    },
    reviews: [
      {
        id: 'rev-cld-1',
        author: 'Prof. David Sterling',
        role: 'Literature & Philosophy Faculty',
        rating: 5,
        date: '2026-05-19',
        comment: 'Claude’s ability to parse complex 80-page philosophical treatises and highlight contradictions in ethical arguments is superior to any other tool. The Artifacts feature lets me generate interactive logic trees on the fly.',
        pros: 'Intellectual rigor, unmatched writing prose, Artifacts.',
        cons: 'Strict hourly limit on heavy queries.',
        verified: true
      },
      {
        id: 'rev-cld-2',
        author: 'Maya Lin',
        role: 'PhD Candidate in Economics',
        rating: 5,
        date: '2026-08-01',
        comment: 'I feed entire econometric survey PDFs into Claude. It cross-references statistical tables with 99% accuracy and helps structure my dissertation draft.',
        pros: 'Massive context window, precise citation synthesis.',
        cons: 'No direct voice conversation on desktop.',
        verified: true
      }
    ]
  },

  // 1. Education - NotebookLM
  {
    id: 'notebooklm',
    name: 'NotebookLM',
    slug: 'notebooklm',
    category: 'Education',
    tagline: 'Google’s AI-first notebook grounded strictly in your course notes, PDFs, and Audio Overviews.',
    description: 'NotebookLM turns your uploaded study materials, PDF textbooks, Google Docs, and YouTube lectures into a customized personal tutor grounded strictly in your sources with zero hallucinations, complete with AI-generated Audio Overview podcast conversations.',
    workItDoes: [
      'Grounded source-backed answering with clickable citations pointing to exact page numbers in your notes.',
      'Generating two-host interactive Audio Overview "podcasts" discussing your study guides and complex topics.',
      'Auto-generating study guides, FAQs, timelines, glossaries, and practice quiz questions from uploaded course materials.',
      'Synthesizing multiple conflicting research articles into cohesive study outlines.'
    ],
    pricing: {
      model: 'Free',
      freeTier: '100% Free for all Google account users with up to 50 sources per notebook (500,000 words each)',
      startingPrice: 'Free ($0.00)',
      proTier: 'Integrated with Google Workspace / Google One AI Premium for extended storage limits',
      enterprise: 'Available under Google Workspace for Education and Enterprise security'
    },
    url: 'https://notebooklm.google.com',
    rating: 4.8,
    reviewCount: 2910,
    strengths: [
      'Strict source grounding prevents hallucinations; every claim links to exact citation text',
      'Viral Audio Overviews turn dense medical or law textbooks into engaging podcasts',
      'Completely free to use with generous Google Drive & PDF integration'
    ],
    weaknesses: [
      'Cannot browse the open web independently without user-provided source documents',
      'Audio Overview voice output cannot be directly edited on a sentence-by-sentence basis'
    ],
    bestFor: 'College students, law students, exam preparation, and medical study note synthesis.',
    platforms: ['Web Browser', 'Mobile Responsive Web'],
    verified: true,
    companyName: 'Google',
    releaseYear: 2023,
    badge: '100% Free Study AI',
    colorTheme: {
      accent: '#3b82f6',
      border: 'border-blue-500/30',
      bgGlow: 'from-blue-500/10'
    },
    reviews: [
      {
        id: 'rev-nlm-1',
        author: 'Samantha Wright',
        role: '2nd Year Law Student',
        rating: 5,
        date: '2026-07-28',
        comment: 'The Audio Overview podcast feature changed how I study for bar prep. I upload 40 case briefs, and listen to the two AI hosts debate the legal nuances during my gym sessions. The citations are 100% accurate.',
        pros: 'Zero hallucination source grounding, insane audio podcast generation.',
        cons: 'Needs your own source documents to start.',
        verified: true
      },
      {
        id: 'rev-nlm-2',
        author: 'Arjun Patel',
        role: 'High School AP Biology Educator',
        rating: 5,
        date: '2026-06-20',
        comment: 'I create custom notebooks for each unit of my AP Bio class and share them with students. It creates practice quizzes with instant feedback grounded directly in our state syllabus.',
        pros: 'Reliable study guide generation, free for all students.',
        cons: 'Interface is minimal, but very focused.',
        verified: true
      }
    ]
  },

  // 2. Agriculture - Agri AI
  {
    id: 'agri-ai',
    name: 'Agri AI',
    slug: 'agri-ai',
    category: 'Agriculture',
    tagline: 'Intelligent crop diagnostic, soil analysis, and yield optimization platform for modern farms.',
    description: 'Agri AI leverages computer vision, agronomic neural models, and drone imagery to identify crop diseases, detect nutrient deficiencies, schedule precision irrigation, and forecast farm yield in real-time.',
    workItDoes: [
      'Instant disease and pest identification from smartphone and drone field photos with treatment remedies.',
      'Precision soil nutrient mapping (NPK ratios) and customized fertilizer prescription schedules.',
      'Weather-adaptive irrigation automation to conserve water while maximizing harvest yields.',
      'Multi-hectare farm management telemetry and predictive harvest scheduling.'
    ],
    pricing: {
      model: 'Freemium',
      freeTier: 'Free tier for smallholder farmers (up to 5 field scans/week & basic pest library)',
      startingPrice: '$15 / month (Grower Plan for up to 50 acres with continuous satellite monitoring)',
      proTier: '$79 / month (Commercial Ag with drone telemetry and multi-crop yield prediction)',
      enterprise: 'Custom Agri-Enterprise for cooperatives, food conglomerates & agronomy consultants'
    },
    url: 'https://agri-ai.com',
    rating: 4.7,
    reviewCount: 1420,
    strengths: [
      'Instant visual diagnosis of over 450+ plant diseases and invasive pests',
      'Optimizes fertilizer and pesticide costs by up to 28% via spot-application mapping',
      'Works offline in low-connectivity rural farm environments with local caching'
    ],
    weaknesses: [
      'Drone hyperspectral integration requires compatible hardware',
      'Niche rare localized crop varieties may require manual agronomist validation'
    ],
    bestFor: 'Farmers, agronomists, commercial crop growers, and agricultural cooperatives.',
    platforms: ['Web Browser', 'Android Mobile App', 'iOS Mobile App', 'Drone Telemetry API'],
    verified: true,
    companyName: 'AgriAI Technologies',
    releaseYear: 2024,
    badge: 'Top AgTech Innovation',
    colorTheme: {
      accent: '#22c55e',
      border: 'border-green-500/30',
      bgGlow: 'from-green-500/10'
    },
    reviews: [
      {
        id: 'rev-agri-1',
        author: 'Harrison Miller',
        role: 'Vineyard & Corn Farm Operator',
        rating: 5,
        date: '2026-06-11',
        comment: 'Agri AI detected an early fungal blight on my south 40-acre plot 4 days before it was visible to the naked eye. That single alert saved us over $35,000 in lost yield.',
        pros: 'Extremely accurate photo diagnostics, soil moisture prediction.',
        cons: 'Requires steady phone camera lighting for micro-insects.',
        verified: true
      },
      {
        id: 'rev-agri-2',
        author: 'Dr. Sunita Deshmukh',
        role: 'Agricultural Extension Officer',
        rating: 4,
        date: '2026-07-15',
        comment: 'We recommend Agri AI to over 600 smallholder grain farmers in our district. The offline capability in rural zones makes it a game-changer.',
        pros: 'Works offline, multilingual advice for local farmers.',
        cons: 'More support needed for indigenous millet strains.',
        verified: true
      }
    ]
  },

  // 2. Agriculture - Climate.ai
  {
    id: 'climate-ai',
    name: 'Climate.ai',
    slug: 'climate-ai',
    category: 'Agriculture',
    tagline: 'Climate resilience and predictive weather intelligence for agricultural supply chains.',
    description: 'Climate.ai applies machine learning and atmospheric physics to forecast extreme weather risks, pest outbreak windows, and crop suitability decades into the future. It empowers agribusinesses to climate-proof supply chains and optimize seed genetics.',
    workItDoes: [
      'Hyper-local seasonal climate forecasting (1 to 6 months out) for planting and harvesting planning.',
      'Climate risk assessment for crop portfolios against drought, frost, heat stress, and flood events.',
      'Long-term land suitability modeling for shifting agricultural growing zones through 2050.',
      'Supply chain vulnerability alerts for food processors, seed breeders, and commodity traders.'
    ],
    pricing: {
      model: 'Commercial',
      freeTier: 'Free demo evaluation and climate vulnerability whitepapers for qualified farms',
      startingPrice: '$120 / month (Agri-Business Pro Tier for regional crop risk mapping)',
      proTier: '$450 / month (Enterprise Farm Intelligence with multi-location risk simulation)',
      enterprise: 'Custom Global Supply Chain Enterprise licensing for multinational food brands'
    },
    url: 'https://climate.ai',
    rating: 4.8,
    reviewCount: 980,
    strengths: [
      'Unmatched seasonal forecasting accuracy powered by climate physics ML models',
      'Enables proactive seed variety selection based on expected 90-day moisture anomalies',
      'Integrated enterprise risk reporting trusted by leading global food companies'
    ],
    weaknesses: [
      'Tailored primarily for medium-to-large agricultural enterprises rather than backyard gardeners',
      'Requires historical yield data upload to unlock maximum calibration precision'
    ],
    bestFor: 'Agricultural enterprises, food supply chain managers, seed companies, and grain commodity traders.',
    platforms: ['Web Cloud Portal', 'Enterprise REST API', 'GIS Data Connectors'],
    verified: true,
    companyName: 'Climate.ai Inc.',
    releaseYear: 2021,
    badge: 'Enterprise Climate Ag',
    colorTheme: {
      accent: '#06b6d4',
      border: 'border-cyan-500/30',
      bgGlow: 'from-cyan-500/10'
    },
    reviews: [
      {
        id: 'rev-clim-1',
        author: 'Rebecca Thorne',
        role: 'Director of Agronomy, Global Grains Co.',
        rating: 5,
        date: '2026-05-30',
        comment: 'Climate.ai accurately alerted our procurement team about an upcoming 6-week drought cycle in the Midwest 45 days in advance. We shifted our seed varieties and protected our margins.',
        pros: 'Superb medium-range seasonal forecasting, actionable risk dashboards.',
        cons: 'Onboarding takes a few days with our GIS datasets.',
        verified: true
      },
      {
        id: 'rev-clim-2',
        author: 'Carlos Mendes',
        role: 'Coffee Plantation General Manager',
        rating: 5,
        date: '2026-08-04',
        comment: 'Evaluating future coffee plot suitability under 2030 temperature curves was straightforward. Essential tool for any sustainable agri enterprise.',
        pros: 'Decadal climate projections, pest risk forecasting.',
        cons: 'High price point for individual smallholders.',
        verified: true
      }
    ]
  },

  // 3. Image Generator - LEO AI (Leonardo AI)
  {
    id: 'leo-ai',
    name: 'LEO AI',
    slug: 'leo-ai',
    category: 'Image Generator',
    tagline: 'Production-grade generative art, character consistency, and graphic asset studio.',
    description: 'Leonardo AI (LEO AI) is a powerhouse generative image platform engineered for creators, game designers, concept artists, and visual storytellers. Features include fine-tuned custom model training, Realtime Canvas, and high-fidelity prompt adherence.',
    workItDoes: [
      'Ultra-photorealistic and cinematic image rendering across 50+ artistic styles and models.',
      'Realtime Canvas sketch-to-image painting with instant feedback as you brush.',
      'Training custom LoRA fine-tuned models on your own characters, brand assets, and art style.',
      'AI Canvas generative inpainting, outpainting, background removal, and 3D texture synthesis.'
    ],
    pricing: {
      model: 'Freemium',
      freeTier: '150 free daily tokens renewed every 24 hours (generates ~30 images daily)',
      startingPrice: '$12 / month (Apprentice plan: 8,500 fast tokens / month, custom model training)',
      proTier: '$30 / month (Artisan plan: 25,000 fast tokens, unlimited relaxed queue, private generations)',
      enterprise: '$60 / month (Maestro plan: 60,000 tokens, team collaboration, priority support)'
    },
    url: 'https://leonardo.ai',
    rating: 4.8,
    reviewCount: 3890,
    strengths: [
      'Unrivaled control over character consistency across multiple poses and scenes',
      'Generous 150 daily free tokens for creators without forced paid upfront trials',
      'Realtime Canvas allows interactive drawing that turns strokes into finished art in milliseconds'
    ],
    weaknesses: [
      'Complex dashboard can have a steep learning curve for beginner prompt writers',
      'High-resolution upscaling consumes tokens rapidly on base plans'
    ],
    bestFor: 'Game asset designers, concept artists, marketing illustrators, and character creators.',
    platforms: ['Web Studio', 'iOS App', 'Android App', 'Developer API'],
    verified: true,
    companyName: 'Leonardo.Ai (Canva)',
    releaseYear: 2022,
    badge: 'Creator Favorite',
    colorTheme: {
      accent: '#ec4899',
      border: 'border-pink-500/30',
      bgGlow: 'from-pink-500/10'
    },
    reviews: [
      {
        id: 'rev-leo-1',
        author: 'Jonas Richter',
        role: 'Indie Game Art Director',
        rating: 5,
        date: '2026-06-25',
        comment: 'LEO AI cut our game asset prototype cycle from 3 weeks to 2 days. The ability to train a custom model on our studio’s isometric style and generate 50 consistent weapon icons is unmatched.',
        pros: 'Custom model training, character consistency, Realtime Canvas.',
        cons: 'Token management requires planning on big batch runs.',
        verified: true
      },
      {
        id: 'rev-leo-2',
        author: 'Sofia Morales',
        role: 'Digital Concept Illustrator',
        rating: 5,
        date: '2026-07-31',
        comment: 'The Alchemy rendering pipeline gives lighting and texture depth that surpasses standard text-to-image tools. Best UI for serious digital artists.',
        pros: 'Layered canvas, fine-tuned style control, daily free tokens.',
        cons: 'UI has lots of sliders for newcomers.',
        verified: true
      }
    ]
  },

  // 3 & 4. Image Generator & Video Generation - Google Gemini
  {
    id: 'google-gemini',
    name: 'Google Gemini',
    slug: 'google-gemini',
    category: 'Image Generator',
    secondaryCategories: ['Video Generation', 'Education', 'Chat Bot'],
    tagline: 'Google’s next-generation multimodal AI with Imagen 3 image generation and Veo video synthesis.',
    description: 'Google Gemini is a multimodal intelligence engine spanning text reasoning, ultra-detailed Imagen 3 photorealistic image generation, and cinematic Veo video synthesis. Deeply connected to Google Workspace, YouTube, Maps, and Flights.',
    workItDoes: [
      'High-definition image generation with Imagen 3 rendering photorealistic textures, typography, and complex lighting.',
      'Multimodal video analysis and Veo cinematic video generation from text prompts and still imagery.',
      'Large 1M–2M context window for processing 1-hour videos, audio lectures, and codebases.',
      'Real-time live multimodal video grounding and reasoning via camera feed.'
    ],
    pricing: {
      model: 'Freemium',
      freeTier: 'Free access to Gemini 1.5 / 2.0 Flash with Imagen 3 image generation',
      startingPrice: '$19.99 / month (Google One AI Premium with Gemini Advanced 2.0 Pro & 2TB Drive)',
      proTier: '$19.99 / month (includes Deep Research & full Imagen 3 / Veo studio tools)',
      enterprise: 'Google Workspace Gemini add-on ($24/user/month) & Google Cloud Vertex AI API'
    },
    url: 'https://gemini.google.com',
    rating: 4.9,
    reviewCount: 5120,
    strengths: [
      'Imagen 3 handles complex text rendering inside images with remarkable legibility',
      'Massive 2-million-token context window capable of ingesting entire books or hour-long video files',
      'Seamlessly integrated with Google Drive, Docs, Gmail, YouTube, and real-time Search'
    ],
    weaknesses: [
      'Veo video generation availability rolls out in phased tiers by region',
      'Content guardrails can be cautious on stylized fantasy battle descriptions'
    ],
    bestFor: 'Content creators, video producers, image designers, researchers, and Google Workspace users.',
    platforms: ['Web Browser', 'Android App (System Assistant)', 'iOS Google App', 'Google Cloud API'],
    verified: true,
    companyName: 'Google DeepMind',
    releaseYear: 2023,
    badge: 'Top Multimodal AI',
    colorTheme: {
      accent: '#6366f1',
      border: 'border-indigo-500/30',
      bgGlow: 'from-indigo-500/10'
    },
    reviews: [
      {
        id: 'rev-gem-1',
        author: 'Claire Beaumont',
        role: 'Creative Advertising Producer',
        rating: 5,
        date: '2026-08-10',
        comment: 'Imagen 3 inside Gemini is the first AI image generator where text on billboards and product packaging looks crisp and correctly spelled without weird artifacts. Pairing that with Veo video clips streamlines our storyboard pitches.',
        pros: 'Flawless text-in-image rendering, immense 2M context, video reasoning.',
        cons: 'Video generation queue can be busy during launch peaks.',
        verified: true
      },
      {
        id: 'rev-gem-2',
        author: 'Tariq Al-Mansoor',
        role: 'Media Strategist',
        rating: 5,
        date: '2026-07-22',
        comment: 'I can upload a 45-minute keynote video, and Gemini summarizes the exact timestamps, creates promo image banners, and writes the recap in 30 seconds. Unbelievably fast.',
        pros: 'Fast multimodal processing, high image fidelity.',
        cons: 'Advanced features require AI Premium subscription.',
        verified: true
      }
    ]
  },

  // 4. Video Generation - Meta AI
  {
    id: 'meta-ai',
    name: 'Meta AI',
    slug: 'meta-ai',
    category: 'Video Generation',
    secondaryCategories: ['Image Generator', 'Chat Bot'],
    tagline: 'Instant animation, video generation, and creative studio built right into WhatsApp, IG, and Web.',
    description: 'Meta AI (powered by Llama 3 and Meta Movie Gen / Emu Video research models) brings instant text-to-video generation, image animation, and conversational multimodal assistance directly to billions of users across web and messaging ecosystems for free.',
    workItDoes: [
      'Generating short video animations and dynamic motion loops directly from text prompts ("Animate this").',
      'High-speed text-to-image generation that updates live in real-time as you type each letter.',
      'Re-styling existing video clips and generating synchronized ambient sound effects.',
      'Social media content creation, Reels ideation, and conversational assistance on WhatsApp & Instagram.'
    ],
    pricing: {
      model: 'Free',
      freeTier: '100% Free with no subscription required on meta.ai, WhatsApp, Instagram, and Messenger',
      startingPrice: 'Free ($0.00)',
      proTier: 'Free tier with unlimited standard generation queues',
      enterprise: 'Llama 3 open weights available for commercial enterprise deployment on cloud'
    },
    url: 'https://www.meta.ai',
    rating: 4.7,
    reviewCount: 3410,
    strengths: [
      'Completely free with no credit card or paid paywall',
      'Real-time image generation generates visuals in sub-second latency as you type',
      'Integrated natively into WhatsApp, Messenger, and Instagram Direct Messages'
    ],
    weaknesses: [
      'Video generation clip lengths are capped at short social loop durations (3–10 seconds)',
      'Availability restricted in certain European regulatory zones'
    ],
    bestFor: 'Social media creators, mobile-first users, quick video animators, and casual designers.',
    platforms: ['Web Portal', 'WhatsApp', 'Instagram', 'Messenger', 'Ray-Ban Meta Smart Glasses'],
    verified: true,
    companyName: 'Meta',
    releaseYear: 2023,
    badge: '100% Free Video & Chat',
    colorTheme: {
      accent: '#0284c7',
      border: 'border-sky-500/30',
      bgGlow: 'from-sky-500/10'
    },
    reviews: [
      {
        id: 'rev-meta-1',
        author: 'Chloe Simmons',
        role: 'Social Media & Reels Creator',
        rating: 5,
        date: '2026-07-18',
        comment: 'Meta AI’s "Animate" button turns my static travel photos into smooth 4-second video reels in 5 seconds flat. Having it right inside WhatsApp with zero subscription fees is unbeatable.',
        pros: 'Completely free, instantaneous real-time rendering, easy sharing.',
        cons: 'Video lengths are short loops rather than full-length films.',
        verified: true
      },
      {
        id: 'rev-meta-2',
        author: 'Kenji Takahashi',
        role: 'Digital Brand Marketer',
        rating: 4,
        date: '2026-08-02',
        comment: 'The real-time image updates as you type characters are mesmerizing. Great for brainstorming quick ad concepts during client meetings.',
        pros: 'Blazing fast, no paywall, good motion physics.',
        cons: 'Limited advanced video timeline controls.',
        verified: true
      }
    ]
  },

  // 5. Chat Bot - Grok AI
  {
    id: 'grok-ai',
    name: 'Grok AI',
    slug: 'grok-ai',
    category: 'Chat Bot',
    secondaryCategories: ['Education'],
    tagline: 'Real-time X pulse, candid wit, and unfiltered deep reasoning engine by xAI.',
    description: 'Developed by xAI, Grok (Grok 2 & Grok 3) provides real-time access to breaking global news on X, candid and humorous conversational modes, powerful Aurora image generation, and deep mathematical reasoning.',
    workItDoes: [
      'Analyzing breaking global events, trending news, and real-time public sentiment on X in seconds.',
      'Switching between "Fun Mode" (witty, irreverent, candid) and "Normal Mode" (rigorous technical logic).',
      'Unrestricted text-to-image generation powered by FLUX / Aurora diffusion engines.',
      'Complex coding analysis, LaTeX mathematical breakdown, and deep document reasoning.'
    ],
    pricing: {
      model: 'Freemium',
      freeTier: 'Limited free queries for eligible X users on grok.com and X web',
      startingPrice: '$8 / month (X Premium subscription with full Grok access & image generation)',
      proTier: '$16 / month (X Premium+ with highest query priority and Grok 3 reasoning)',
      enterprise: 'xAI Enterprise API with per-token developer pricing'
    },
    url: 'https://x.ai',
    rating: 4.7,
    reviewCount: 3180,
    strengths: [
      'Zero latency on breaking world news thanks to direct real-time X ingestion pipeline',
      'Less sanitized, more candid answers with witty conversational options',
      'Uncensored creative image generation with high photorealism'
    ],
    weaknesses: [
      'Real-time social feeds can sometimes reflect fast-developing unverified reports',
      'Best experience requires an X Premium / xAI account'
    ],
    bestFor: 'News junkies, tech innovators, real-time trend analysts, and conversationalists wanting unfiltered answers.',
    platforms: ['Web Browser (grok.com)', 'X Web & Mobile App (iOS / Android)', 'xAI API'],
    verified: true,
    companyName: 'xAI',
    releaseYear: 2023,
    badge: 'Real-Time News AI',
    colorTheme: {
      accent: '#8b5cf6',
      border: 'border-purple-500/30',
      bgGlow: 'from-purple-500/10'
    },
    reviews: [
      {
        id: 'rev-grok-1',
        author: 'Liam O’Connor',
        role: 'Financial News Analyst',
        rating: 5,
        date: '2026-07-12',
        comment: 'When earnings announcements drop or market rumors start, Grok synthesizes hundreds of live tweets and verified filings in 10 seconds. Traditional search engines can’t match that real-time speed.',
        pros: 'Real-time live news integration, candid tone, fast generation.',
        cons: 'Must cross-check breaking breaking rumors for final confirmation.',
        verified: true
      },
      {
        id: 'rev-grok-2',
        author: 'Zoe K.',
        role: 'Product Strategist',
        rating: 4,
        date: '2026-08-08',
        comment: 'Fun Mode is genuinely entertaining, but under the hood the reasoning benchmarks on coding and logic are serious. Very impressed with the Aurora image integration.',
        pros: 'Fun mode humor, sharp coding analysis, uncensored image prompts.',
        cons: 'Interface is closely tied to X ecosystem.',
        verified: true
      }
    ]
  },

  // 5. Chat Bot - Perplexity AI
  {
    id: 'perplexity-ai',
    name: 'Perplexity AI',
    slug: 'perplexity-ai',
    category: 'Chat Bot',
    secondaryCategories: ['Education'],
    tagline: 'Conversational answer engine with live verified web citations and multi-source Pro Search.',
    description: 'Perplexity AI replaces traditional cluttered search engine result pages with synthesized, direct conversational answers backed by numbered live web citations, interactive follow-up questions, and deep multi-step Pro Search reasoning.',
    workItDoes: [
      'Synthesizing web search queries into clear, concise answers with numbered hyperlinked citations for every sentence.',
      'Pro Search executing multi-step research plans, querying multiple databases and evaluating conflicting claims.',
      'Focus search filters (Academic papers, YouTube, Reddit, Wolfram Alpha, Computational Knowledge).',
      'Perplexity Pages to publish rich, research-grade articles and shareable interactive knowledge digests.'
    ],
    pricing: {
      model: 'Freemium',
      freeTier: 'Unlimited standard searches with basic live web citations + 5 Pro Searches every 4 hours',
      startingPrice: '$20 / month (Perplexity Pro: 300+ Pro searches/day, toggle GPT-4o, Claude 3.5 & Sonar)',
      proTier: '$200 / year (Annual Pro with file uploads and image generation credits)',
      enterprise: 'Perplexity Enterprise Pro with SOC2 compliance, data privacy, and team workspaces'
    },
    url: 'https://www.perplexity.ai',
    rating: 4.9,
    reviewCount: 4670,
    strengths: [
      'Every single sentence has a direct clickable citation to source websites and papers',
      'Freedom to switch between underlying models (Claude 3.5, GPT-4o, Sonar Large)',
      'Academic Focus mode searches peer-reviewed journals on ArXiv and PubMed directly'
    ],
    weaknesses: [
      'Pro Search requires paid tier for heavy daily research workflows',
      'Occasional paywalled news articles cannot be fully scraped without personal logins'
    ],
    bestFor: 'Researchers, journalists, students, fact-checkers, and everyday web searchers replacing legacy engines.',
    platforms: ['Web Browser', 'iOS App', 'Android App', 'Chrome Extension', 'Mac Desktop App'],
    verified: true,
    companyName: 'Perplexity AI, Inc.',
    releaseYear: 2022,
    badge: 'Top Search & Fact AI',
    colorTheme: {
      accent: '#14b8a6',
      border: 'border-teal-500/30',
      bgGlow: 'from-teal-500/10'
    },
    reviews: [
      {
        id: 'rev-prp-1',
        author: 'Dr. Evelyn Reed',
        role: 'Biomedical Researcher',
        rating: 5,
        date: '2026-06-18',
        comment: 'I have completely replaced Google with Perplexity Pro. The Academic focus filter searches PubMed and gives me summarized clinical trial findings with clickable citations right to the DOI. It saves me 10 hours of literature search every week.',
        pros: 'Exact numbered citations, academic mode, multi-model selector.',
        cons: 'Some paywalled journal PDFs need manual uploads.',
        verified: true
      },
      {
        id: 'rev-prp-2',
        author: 'Nathaniel Cole',
        role: 'Investigative Tech Journalist',
        rating: 5,
        date: '2026-07-29',
        comment: 'Pro Search is like having a junior research assistant who scours 20 websites at once and writes a neutral summary with sources. Essential daily tool.',
        pros: 'Speed, source transparency, Perplexity Pages publishing.',
        cons: 'Free tier has daily Pro limits.',
        verified: true
      }
    ]
  }
];

export const CATEGORIES_LIST = [
  'All',
  'Education',
  'Agriculture',
  'Image Generator',
  'Video Generation',
  'Chat Bot',
  'Registered Innovation'
] as const;
