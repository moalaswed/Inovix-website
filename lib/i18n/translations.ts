export type Language = "en" | "ar";

export interface ServiceItem {
  id: string;
  title: string;
  desc: string;
  deliverables: string[];
}

export interface ProcessStep {
  number: string;
  title: string;
  desc: string;
}

export interface Translations {
  nav: {
    tagline: string;
    services: string;
    projects: string;
    howWeWork: string;
    whyUs: string;
    contact: string;
    startProject: string;
    switchLang: string;
  };
  hero: {
    badge: string;
    headlineLead: string;
    headlineAccent: string;
    subheadline: string;
    primaryCta: string;
    secondaryCta: string;
    trust1: string;
    trust2: string;
    trust3: string;
  };
  sections: {
    whatWeBuild: string;
    advantage: string;
    collaborative: string;
    startJourney: string;
  };
  services: {
    title: string;
    subtitle: string;
    whatYouGet: string;
    items: ServiceItem[];
  };
  comparison: {
    title: string;
    subtitle: string;
    old: { title: string; points: string[] };
    new: { title: string; points: string[] };
  };
  process: {
    title: string;
    subtitle: string;
    steps: ProcessStep[];
  };
  cta: {
    title: string;
    desc: string;
    button: string;
  };
  footer: {
    services: string;
    whyUs: string;
    process: string;
    contact: string;
  };
  projects: {
    pageTitle: string;
    sectionLabel: string;
    subtitle: string;
    backHome: string;
    completedSuffix: string;
    autoUpdates: string;
    empty: string;
    viewProject: string;
  };
  modal: {
    title: string;
    subtitle: string;
    emailLabel: string;
    emailPlaceholder: string;
    requestTypeLabel: string;
    requestTypePlaceholder: string;
    requestTypes: {
      consultation: string;
      projectRequest: string;
      serviceRequest: string;
    };
    consultationTypeLabel: string;
    consultationTypePlaceholder: string;
    consultationTypes: {
      website: string;
      mobileApp: string;
      uiux: string;
      general: string;
    };
    serviceTypeLabel: string;
    serviceTypePlaceholder: string;
    serviceTypes: {
      website: string;
      mobileApp: string;
      design: string;
    };
    budgetLabel: string;
    budgetPlaceholder: string;
    submitButton: string;
    submitting: string;
    successTitle: string;
    successMessage: string;
    closeButton: string;
    errorMessage: string;
    errors: {
      emailRequired: string;
      emailInvalid: string;
      requestTypeRequired: string;
      consultationTypeRequired: string;
      serviceTypeRequired: string;
      budgetRequired: string;
    };
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      tagline: "Web & Mobile Studio",
      services: "Services",
      projects: "Our Projects",
      howWeWork: "How We Work",
      whyUs: "Why Us",
      contact: "Contact",
      startProject: "Start Your Project",
      switchLang: "العربية",
    },
    hero: {
      badge: "CREATIVE WEB & HYBRID MOBILE STUDIO",
      headlineLead:
        "We design and build fast, modern websites and hybrid mobile apps that help",
      headlineAccent: "your business grow.",
      subheadline:
        "From high-converting business websites to cross-platform mobile apps on iOS & Android, Inovix gives your brand a premium digital presence that attracts customers and drives real sales.",
      primaryCta: "Start Your Project",
      secondaryCta: "View Services",
      trust1: "Custom Modern Designs",
      trust2: "Fast Turnaround",
      trust3: "Continuous Support",
    },
    sections: {
      whatWeBuild: "// WHAT WE BUILD FOR YOU",
      advantage: "// THE INOVIX ADVANTAGE",
      collaborative: "// SIMPLE & COLLABORATIVE",
      startJourney: "// START YOUR JOURNEY",
    },
    services: {
      title: "Services Designed for Real Business Impact",
      subtitle:
        "Everything you need to launch, modernize, and grow your digital presence.",
      whatYouGet: "What You Get:",
      items: [
        {
          id: "web",
          title: "Website Design & Development",
          desc: "Fast, elegant websites tailored for your business. Designed to look stunning on all devices, load instantly, and turn casual visitors into loyal customers.",
          deliverables: [
            "Custom Modern Layouts",
            "Mobile-First Design",
            "Search Engine Friendly",
            "Fast Page Loading",
          ],
        },
        {
          id: "mobile",
          title: "Hybrid Mobile Apps",
          desc: "One app that works seamlessly on both iPhone (iOS) and Android phones. Save time and budget while delivering a smooth, native-feeling app for your customers.",
          deliverables: [
            "iOS & Android from One Codebase",
            "Push Notifications",
            "Smooth User Experience",
            "App Store Ready",
          ],
        },
        {
          id: "uiux",
          title: "UI/UX Product Design",
          desc: "Intuitive, human-centered designs where customers find what they need in seconds. We craft interactive prototypes so you see and test your product before launch.",
          deliverables: [
            "Figma Interactive Prototypes",
            "Clear User Journeys",
            "Modern Visual Aesthetics",
            "Conversion Optimization",
          ],
        },
        {
          id: "brand",
          title: "Brand Identity & Digital Assets",
          desc: "Stand out from your competitors with a cohesive visual identity. We craft logos, typography, color palettes, and digital assets that inspire trust.",
          deliverables: [
            "Logo & Brand Guidelines",
            "Visual Identity Systems",
            "Social & Web Assets",
            "Consistent Design System",
          ],
        },
      ],
    },
    comparison: {
      title: "Why Upgrade Your Digital Presence?",
      subtitle:
        "See the tangible difference between an outdated website and an Inovix digital experience.",
      old: {
        title: "The Outdated Website",
        points: [
          "Slow loading speed that frustrates mobile visitors",
          "Awkward navigation where customers get lost and leave",
          "Generic templates that look identical to competitors",
          "Difficult to update and broken on modern smartphones",
        ],
      },
      new: {
        title: "The Inovix Experience",
        points: [
          "Lightning-fast performance that keeps visitors engaged",
          "Clean, intuitive flow designed to generate leads and sales",
          "Bespoke, premium visual branding that builds instant trust",
          "Seamless responsive design across phones, tablets & desktops",
        ],
      },
    },
    process: {
      title: "How We Bring Your Idea to Life",
      subtitle:
        "A transparent, collaborative workflow with no technical headache for you.",
      steps: [
        {
          number: "01",
          title: "Discovery & Strategy",
          desc: "We discuss your business goals, target audience, and vision to map out the ideal website or app structure.",
        },
        {
          number: "02",
          title: "UI/UX Design Preview",
          desc: "You review interactive design prototypes in Figma. We refine the visual look until you love every screen.",
        },
        {
          number: "03",
          title: "Development & Testing",
          desc: "We build your fast website or hybrid mobile app with clean code, testing rigorously across all screen sizes.",
        },
        {
          number: "04",
          title: "Launch & Growth",
          desc: "We help deploy your website live or publish your app, ensuring everything runs smoothly with continuous support.",
        },
      ],
    },
    cta: {
      title: "Ready to build your new website or mobile app?",
      desc: "Let's turn your vision into a stunning digital product that attracts more customers and elevates your brand.",
      button: "Get a Free Project Quote",
    },
    footer: {
      services: "Services",
      whyUs: "Why Us",
      process: "Process",
      contact: "Contact",
    },
    modal: {
      title: "Start Your Project",
      subtitle: "Tell us about your idea and we'll get back to you shortly.",
      emailLabel: "Your Email",
      emailPlaceholder: "you@example.com",
      requestTypeLabel: "Request Type",
      requestTypePlaceholder: "Select a request type",
      requestTypes: {
        consultation: "Consultation",
        projectRequest: "Project Request",
        serviceRequest: "Service Request",
      },
      consultationTypeLabel: "Consultation Type",
      consultationTypePlaceholder: "Select consultation type",
      consultationTypes: {
        website: "Website Consultation",
        mobileApp: "Mobile App Consultation",
        uiux: "UI/UX Design Consultation",
        general: "General Consultation",
      },
      serviceTypeLabel: "Service Type",
      serviceTypePlaceholder: "Select service type",
      serviceTypes: {
        website: "Website",
        mobileApp: "Mobile App",
        design: "Design",
      },
      budgetLabel: "Estimated Budget",
      budgetPlaceholder: "Select a budget range",
      submitButton: "Send Request",
      submitting: "Sending…",
      successTitle: "Request Sent!",
      successMessage: "Thank you! We'll contact you as soon as possible.",
      closeButton: "Close",
      errorMessage: "Something went wrong. Please try again.",
      errors: {
        emailRequired: "Email is required.",
        emailInvalid: "Please enter a valid email address.",
        requestTypeRequired: "Please select a request type.",
        consultationTypeRequired: "Please select a consultation type.",
        serviceTypeRequired: "Please select a service type.",
        budgetRequired: "Please select an estimated budget.",
      },
    },
    projects: {
      pageTitle: "Our Projects",
      sectionLabel: "// OUR WORK",
      subtitle:
        "Explore our portfolio of websites, hybrid mobile apps, UI/UX designs, and brand identities built for clients across the region.",
      backHome: "Back to Home",
      completedSuffix: "projects completed",
      autoUpdates: "Auto-updated every minute",
      empty: "No projects yet.",
      viewProject: "View Project",
    },
  },

  ar: {
    nav: {
      tagline: "استوديو تصميم المواقع والتطبيقات",
      services: "الخدمات",
      projects: "مشاريعنا",
      howWeWork: "منهجية العمل",
      whyUs: "لماذا إنوفيكس",
      contact: "تواصل معنا",
      startProject: "ابدأ مشروعك",
      switchLang: "English",
    },
    hero: {
      badge: "استوديو تصميم وبناء المواقع وتطبيقات الجوال",
      headlineLead: "نصمم ونبني مواقع وتطبيقات جوال عصرية وسريعة تساعد",
      headlineAccent: "مشروعك على النمو والتفوق.",
      subheadline:
        "من المواقع التعريفية والتجارية الجذابة إلى تطبيقات الجوال الهجينة لأنظمة آيفون وأندرويد، نمنح نشاطك التجاري حضوراً رقمياً فائق الجودة يجذب العملاء ويحقق نتائج ملموسة.",
      primaryCta: "ابدأ مشروعك الآن",
      secondaryCta: "استكشف خدماتنا",
      trust1: "تصاميم عصرية مخصصة",
      trust2: "سرعة إنجاز وتسليم",
      trust3: "دعم فني مستمر",
    },
    sections: {
      whatWeBuild: "// ما نبنيه لك",
      advantage: "// ميزة إنوفيكس",
      collaborative: "// بسيط وتعاوني",
      startJourney: "// ابدأ رحلتك",
    },
    services: {
      title: "خدمات مصممة لتحقيق نتائج حقيقية لنشاطك",
      subtitle:
        "كل ما تحتاجه لإطلاق وتحديث حضورك الرقمي وجذب المزيد من العملاء.",
      whatYouGet: "ما تحصل عليه مع الخدمة:",
      items: [
        {
          id: "web",
          title: "تصميم وتطوير المواقع الإلكترونية",
          desc: "مواقع ويب سريعة وأنيقة تعكس احترافية شركتك، مصممة لتبدو مثالية على كافة الشاشات وتحول زوار الموقع إلى عملاء فعليين.",
          deliverables: [
            "تصاميم عصرية مخصصة",
            "توافق تام مع الهواتف",
            "مهيأ لمحركات البحث (SEO)",
            "سرعة تصفح فائقة",
          ],
        },
        {
          id: "mobile",
          title: "تطبيقات الجوال الهجينة (iOS & Android)",
          desc: "تطبيق واحد يعمل بسلاسة على أجهزة آيفون وأندرويد معاً، مما يوفر تكاليفك ووقتك مع منح عملائك تجربة استخدام مريحة وممتعة.",
          deliverables: [
            "تطبيق للآيفون والأندرويد معاً",
            "إشعارات فورية للعملاء",
            "أداء سلس وسريع",
            "جاهز للنشر في المتاجر",
          ],
        },
        {
          id: "uiux",
          title: "تصميم واجهات وتجربة المستخدم (UI/UX)",
          desc: "تصاميم ذكية وسلسة تجعل العميل يصل لما يريد في ثوانٍ معدودة. نجهز نماذج تفاعلية حية لتجربتها بنفسك قبل بدء البرمجة.",
          deliverables: [
            "نماذج تفاعلية على Figma",
            "تسهيل خطوات الشراء والتسجيل",
            "مظهر بصري مريح ومبهر",
            "زيادة معدل تحويل الزوار",
          ],
        },
        {
          id: "brand",
          title: "الهوية البصرية وتطوير العلامة",
          desc: "تميز عن منافسيك بهوية رقمية متناسقة وواضحة. نصمم الشعارات، أنظمة الألوان، والخطوط التي تبني الثقة لدى عملائك من أول نظرة.",
          deliverables: [
            "شعار وهوية متكاملة",
            "دليل إرشادي للألوان والخطوط",
            "تصاميم مخصصة للسوشيال ميديا",
            "تناغم بصري في كافة المنصات",
          ],
        },
      ],
    },
    comparison: {
      title: "لماذا يحتاج نشاطك إلى تحديث موقعه وتطبيقه؟",
      subtitle:
        "شاهد الفرق الواضح بين المواقع القديمة التقليدية وبين التجربة الرقمية الحديثة مع إنوفيكس.",
      old: {
        title: "المواقع والتطبيقات التقليدية القديمة",
        points: [
          "بطيئة التحميل مما يدفع العملاء لمغادرة الموقع فوراً",
          "صعبة التصفح وغير مريحة على شاشات الهواتف الذكية",
          "قوالب جاهزة ومكررة تشبه عشرات المنافسين في السوق",
          "صعبة التحديث وتفقد مشروعك مصداقيته أمام الزوار",
        ],
      },
      new: {
        title: "التجربة الرقمية الحديثة مع إنوفيكس",
        points: [
          "سرعة فائقة تضمن بقاء الزائر وتصفحه لخدماتك بارتياح",
          "تصميم ذكي وواضح يشجع العميل على التواصل والطلب",
          "هوية فريدة وخاصة تبرز قوة نشاطك التجاري واحترافيته",
          "توافق كامل وأنيق مع جميع شاشات الجوال والكمبيوتر",
        ],
      },
    },
    process: {
      title: "كيف نعمل معك خطوة بخطوة",
      subtitle: "منهجية عمل واضحة ومرنة دون أي تعقيدات تقنية من جانبك.",
      steps: [
        {
          number: "01",
          title: "الاستماع والتخطيط",
          desc: "نتعرف على نشاطك التجاري وعملائك المستهدفين لنحدد هيكل الموقع أو التطبيق المناسب لأهدافك.",
        },
        {
          number: "02",
          title: "تصميم ومعاينة الواجهات",
          desc: "نصمم واجهات عصرية ونماذج تفاعلية حية تراجعها وتعدل عليها حتى نصل للنتيجة التي ترضيك تماماً.",
        },
        {
          number: "03",
          title: "التطوير والاختبار الدقيق",
          desc: "نبرمج موقعك أو تطبيقك بأحدث المعايير مع اختباره على مختلف الهواتف والشاشات لضمان جودته.",
        },
        {
          number: "04",
          title: "الإطلاق والدعم المستمر",
          desc: "نطلق موقعك على الإنترنت أو نساعدك في نشر تطبيقك، مع توفير الدعم الفني لضمان نجاح مشروعك.",
        },
      ],
    },
    cta: {
      title: "هل أنت مستعد لتطوير موقعك أو تطبيقك؟",
      desc: "تواصل معنا اليوم لنحول أفكارك إلى منتج رقمي عصري يجذب العملاء ويرتقي بنشاطك التجاري.",
      button: "احجز استشارة مجانية لمشروعك",
    },
    footer: {
      services: "الخدمات",
      whyUs: "لماذا نحن",
      process: "منهجية العمل",
      contact: "تواصل معنا",
    },
    modal: {
      title: "ابدأ مشروعك",
      subtitle: "أخبرنا عن فكرتك وسنتواصل معك في أقرب وقت.",
      emailLabel: "بريدك الإلكتروني",
      emailPlaceholder: "example@email.com",
      requestTypeLabel: "نوع الطلب",
      requestTypePlaceholder: "اختر نوع الطلب",
      requestTypes: {
        consultation: "استشارة",
        projectRequest: "طلب مشروع",
        serviceRequest: "طلب خدمة",
      },
      consultationTypeLabel: "نوع الاستشارة",
      consultationTypePlaceholder: "اختر نوع الاستشارة",
      consultationTypes: {
        website: "استشارة موقع إلكتروني",
        mobileApp: "استشارة تطبيق جوال",
        uiux: "استشارة تصميم واجهات المستخدم",
        general: "استشارة عامة",
      },
      serviceTypeLabel: "نوع الخدمة",
      serviceTypePlaceholder: "اختر نوع الخدمة",
      serviceTypes: {
        website: "موقع إلكتروني",
        mobileApp: "تطبيق جوال",
        design: "تصميم",
      },
      budgetLabel: "الميزانية التقديرية",
      budgetPlaceholder: "اختر نطاق الميزانية",
      submitButton: "إرسال الطلب",
      submitting: "جارٍ الإرسال…",
      successTitle: "تم الإرسال!",
      successMessage: "شكرًا لك! سنتواصل معك في أقرب وقت ممكن.",
      closeButton: "إغلاق",
      errorMessage: "حدث خطأ ما. يرجى المحاولة مرة أخرى.",
      errors: {
        emailRequired: "البريد الإلكتروني مطلوب.",
        emailInvalid: "يرجى إدخال عنوان بريد إلكتروني صحيح.",
        requestTypeRequired: "يرجى اختيار نوع الطلب.",
        consultationTypeRequired: "يرجى اختيار نوع الاستشارة.",
        serviceTypeRequired: "يرجى اختيار نوع الخدمة.",
        budgetRequired: "يرجى اختيار نطاق الميزانية.",
      },
    },
    projects: {
      pageTitle: "مشاريعنا",
      sectionLabel: "// أعمالنا",
      subtitle:
        "اكتشف مجموعة من المواقع وتطبيقات الجوال وتصاميم واجهات المستخدم والهويات البصرية التي أنجزناها لعملائنا.",
      backHome: "العودة للرئيسية",
      completedSuffix: "مشروع منجز",
      autoUpdates: "يُحدَّث كل دقيقة تلقائياً",
      empty: "لا توجد مشاريع بعد.",
      viewProject: "عرض المشروع",
    },
  },
};
