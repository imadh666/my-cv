// ================================================================
// data.js — مصدر البيانات الوحيد للموقع
// لتعديل أي شيء: غيّر هنا وارفع على GitHub
// ================================================================

exports.handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    "Cache-Control": "public, max-age=60",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  }

  if (event.httpMethod !== "GET") {
    return { statusCode: 405, headers, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  // ════════════════════════════════════════════════════════════
  // ✏️  البيانات — عدّل هنا مباشرة ثم ارفع على GitHub
  // ════════════════════════════════════════════════════════════

  const data = {

    // ── الملف الشخصي ─────────────────────────────────────────
    profile: {
      name:   "Dr. Heded Imad Eddine",
      title:  "Audiovisual Specialization | Researcher & Academic",
      bio:    "Holder of a PhD in Media and Communication Sciences, specializing in Audiovisual Studies. My research focuses on digital media transformations, audiovisual production, and media discourse analysis.",
      about1: "I am an academic researcher specializing in Media and Communication Sciences, holding a PhD with a focus on Audiovisual Studies. My scholarly interests center on the transformations of the media landscape in the digital age, the impact of technology on audiovisual production and reception, and methods of media discourse analysis.",
      about2: "I contribute to academic literature through peer-reviewed articles and participation in national and international conferences, with a consistent focus on bridging media theory and applied research.",
      years:  1,
    },

    // ── الوسوم ───────────────────────────────────────────────
    tags: [
      "Digital Media",
      "Audiovisual Production",
      "Media Discourse Analysis",
      "Scientific Research",
      "Online Journalism",
      "Mass Communication",
    ],

    // ── الأعمال البحثية ──────────────────────────────────────
    // type: "article" | "conference"
    works: [
      {
        type:    "article",
        title:   "Media Coverage of Human Rights Movements: Analyzing the Impact of Media on Social and Legal Policy Changes",
        journal: "مجلة الحقوق والعلوم الانسانية, 19(2), 59-72",
        year:    "2026",
        link:    "https://asjp.cerist.dz/en/article/296319",
        thumb:   "",
      },
      {
        type:    "article",
        title:   "The Legal Framework for Combating Hate Speech Online: Balancing Freedom of Expression and Addressing Incitement to Violence",
        journal: "مجلة صوت القانون, 13(1), 140-162",
        year:    "2026",
        link:    "https://asjp.cerist.dz/en/article/292036",
        thumb:   "",
      },
      {
        type:    "article",
        title:   "التسويق الاجتماعي عبر الاعلام الرقمي السمعي البصري للتوعية من حرائق الغابات: دراسة تحليلية لعينة من مقاطع الفيديو على صفحة الفيسبوك الرسمية لوزارة الداخلية والجماعات المحلية",
        journal: "المجلة الدولية للاتصال الاجتماعي, 12(4), 230-245",
        year:    "2025",
        link:    "https://asjp.cerist.dz/en/article/285654",
        thumb:   "",
      },
      {
        type:    "article",
        title:   "التوعية البيئية في الإعلام الرقمي السمعي البصري: دراسة تحليلية لعينة من مقاطع الفيديو الرقمية القصيرة على صفحة الفيسبوك صديق الشجرة",
        journal: "مجلة الإعلام والمجتمع, 9(2), 133-149",
        year:    "2025",
        link:    "https://asjp.cerist.dz/en/article/283805",
        thumb:   "",
      },
      {
        type:    "article",
        title:   "التسويق الاجتماعي عبر مقاطع الريلز: دراسة تحليلية لعينة من مقاطع الريلز للتوعية البيئية عبر صفحة الفيسبوك اغرس شجرة",
        journal: "مجلة الإعلام والمجتمع, 8(2), 67-94",
        year:    "2024",
        link:    "https://asjp.cerist.dz/en/article/257750",
        thumb:   "",
      },
      {
        type:    "article",
        title:   "The Impact of Short Digital Videos on Environmental Awareness among Students: A Field Study on a Sample of Students from the Faculty of Social and Human Sciences at the University of El Oued",
        journal: "ResearchGate",
        year:    "2025",
        link:    "https://www.researchgate.net/publication/396900009_The_Impact_of_Short_Digital_Videos_on_Environmental_Awareness_among_Students_A_Field_Study_on_a_Sample_of_Students_from_the_Faculty_of_Social_and_Human_Sciences_at_the_University_of_El_Oued",
        thumb:   "",
      },
    ],

    // ── المؤتمرات ─────────────────────────────────────────────
    // { name, place, date, link }
    conferences: [
      // مثال:
      // { name: "International Conference on Digital Media", place: "Algiers, Algeria", date: "October 2024", link: "" },
    ],

    // ── معلومات التواصل ───────────────────────────────────────
    contact: {
      phone:   "",
      email:   "",
      email2:  "",
      fb:      "",
      website: "",
    },

    // ── رابط السيرة الذاتية PDF ───────────────────────────────
    cvLink: "",

  };

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify(data),
  };
};
