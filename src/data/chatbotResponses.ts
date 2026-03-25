export interface ChatOption {
  label: string;
  value: string;
  emoji?: string;
}

export interface BotResponse {
  text: string;
  options?: ChatOption[];
  links?: { label: string; url: string }[];
}

export const MAIN_MENU_OPTIONS: ChatOption[] = [
  { label: "Admissions", value: "admissions", emoji: "🎓" },
  { label: "Courses", value: "courses", emoji: "📚" },
  { label: "Fees & Payment", value: "fees", emoji: "💰" },
  { label: "Timetable & Lesson Hours", value: "timetable", emoji: "🕐" },
  { label: "Academic Calendar & Semesters", value: "calendar", emoji: "📅" },
  { label: "Hostel & Accommodation", value: "hostel", emoji: "🏠" },
  { label: "Library & Resources", value: "library", emoji: "📖" },
  { label: "Exams & Graduation", value: "exams", emoji: "🎓" },
  { label: "Student Services & Clubs", value: "clubs", emoji: "⚽" },
  { label: "Contact Support / Talk to Human", value: "contact", emoji: "📞" },
];

export const GREETING = "Hi 🔔, This is AIU Chatbot. How may I assist you today?";

function matchKeywords(input: string, keywords: string[]): boolean {
  const lower = input.toLowerCase();
  return keywords.some(k => lower.includes(k));
}

export function getResponse(input: string, context?: string): BotResponse {
  const lower = input.toLowerCase().trim();

  // Main menu trigger
  if (lower === "menu" || lower === "main menu" || lower === "back" || lower === "go back") {
    return { text: "Sure! Here are the main options:", options: MAIN_MENU_OPTIONS };
  }

  // Specific value matches FIRST (before broad keyword matches)
  if (lower === "how_to_apply" || matchKeywords(lower, ["how do i apply", "how to apply", "application process"])) {
    return {
      text: "You can apply online or at the admissions office. Here's the step-by-step process:\n\n1️⃣ Check requirements for your program level\n2️⃣ Explore and select a program\n3️⃣ Fill in the online application form\n4️⃣ Upload required documents\n5️⃣ Pay the application fee (KES 1,000/USD 10 for Diplomas; KES 1,500/USD 15 for Bachelors)\n6️⃣ Submit and wait for your admission letter by email\n\n📎 Apply online here:",
      options: [
        { label: "Entry requirements", value: "entry_requirements", emoji: "📋" },
        { label: "Documents required", value: "documents_required", emoji: "📄" },
        { label: "Go back to menu", value: "menu", emoji: "↩️" },
      ],
      links: [{ label: "Apply Now", url: "https://apply.aiu.ac.ke/" }],
    };
  }

  // ADMISSIONS (broad match - after specific values)
  if (lower === "admissions" || matchKeywords(lower, ["admission", "apply", "application", "enroll", "enrol"])) {
    return {
      text: "Great! What would you like to know about admissions?",
      options: [
        { label: "How to apply", value: "how_to_apply", emoji: "📝" },
        { label: "Entry requirements", value: "entry_requirements", emoji: "📋" },
        { label: "Intake dates", value: "intake_dates", emoji: "📅" },
        { label: "International students", value: "international", emoji: "🌍" },
        { label: "Documents required", value: "documents_required", emoji: "📄" },
        { label: "KUCCPS students", value: "kuccps", emoji: "🎯" },
        { label: "Scholarships", value: "scholarships", emoji: "🏆" },
        { label: "Go back to menu", value: "menu", emoji: "↩️" },
      ],
    };
  }

  if (lower === "entry_requirements" || matchKeywords(lower, ["entry requirement", "requirements", "minimum grade", "qualification"])) {
    return {
      text: "Entry requirements depend on your level of study. Which level are you applying for?",
      options: [
        { label: "Certificate", value: "req_certificate", emoji: "📜" },
        { label: "Diploma", value: "req_diploma", emoji: "📜" },
        { label: "Undergraduate (Degree)", value: "req_undergrad", emoji: "🎓" },
        { label: "Postgraduate Diploma", value: "req_pgd", emoji: "📋" },
        { label: "Masters", value: "req_masters", emoji: "🎓" },
        { label: "Doctoral (PhD)", value: "req_doctoral", emoji: "🏆" },
        { label: "Go back to menu", value: "menu", emoji: "↩️" },
      ],
    };
  }

  if (lower === "req_diploma" || matchKeywords(lower, ["diploma requirement"])) {
    return {
      text: "📋 Diploma Admission Requirements:\n\n• KCSE Mean Grade C- or equivalent, OR\n• KCSE Mean Grade D- with a recognized post-secondary certificate, OR\n• KCE/EACE Division I or II or equivalent, OR\n• KCE/EACE Division III + post-secondary certificate, OR\n• KACE with at least one principal pass and a subsidiary.\n\nWould you like to apply now?",
      options: [
        { label: "Apply now", value: "how_to_apply", emoji: "📝" },
        { label: "View other levels", value: "entry_requirements", emoji: "📋" },
        { label: "Go back to menu", value: "menu", emoji: "↩️" },
      ],
      links: [{ label: "Apply Now", url: "https://apply.aiu.ac.ke/" }],
    };
  }

  if (lower === "req_undergrad" || matchKeywords(lower, ["degree requirement", "undergraduate requirement", "bachelors requirement"])) {
    return {
      text: "📋 Undergraduate (Degree) Requirements:\n\n• Minimum KCSE Grade C+ or equivalent\n• Additional requirements per program\n• OR a relevant diploma from a recognized institution\n\nWould you like to apply?",
      options: [
        { label: "Apply now", value: "how_to_apply", emoji: "📝" },
        { label: "View other levels", value: "entry_requirements", emoji: "📋" },
        { label: "Go back to menu", value: "menu", emoji: "↩️" },
      ],
      links: [{ label: "Apply Now", url: "https://apply.aiu.ac.ke/" }],
    };
  }

  if (lower === "req_pgd" || matchKeywords(lower, ["postgraduate diploma requirement"])) {
    return {
      text: "📋 Postgraduate Diploma Requirements:\n\n• Bachelor's degree from a recognized university\n• Duration: 12–24 months\n\nWould you like to apply?",
      options: [
        { label: "Apply now", value: "how_to_apply", emoji: "📝" },
        { label: "View other levels", value: "entry_requirements", emoji: "📋" },
        { label: "Go back to menu", value: "menu", emoji: "↩️" },
      ],
    };
  }

  if (lower === "req_masters" || matchKeywords(lower, ["masters requirement", "master's requirement"])) {
    return {
      text: "📋 Masters Admission Requirements:\n\n• Bachelor's degree (Second Class Upper or higher), OR\n• Second Class Lower + 2 years relevant experience, OR\n• Postgraduate diploma (credit level or higher)\n• Exceptional cases may be considered by Senate\n\nWould you like to apply?",
      options: [
        { label: "Apply now", value: "how_to_apply", emoji: "📝" },
        { label: "View other levels", value: "entry_requirements", emoji: "📋" },
        { label: "Go back to menu", value: "menu", emoji: "↩️" },
      ],
    };
  }

  if (lower === "req_doctoral" || matchKeywords(lower, ["phd requirement", "doctoral requirement"])) {
    return {
      text: "📋 Doctoral (PhD) Requirements:\n\n• Master's degree recognized by AIU Senate\n• Minimum GPA 3.0 or mean grade B in Masters\n• Must demonstrate research ability\n• Exceptional cases may be considered by Senate\n\nWould you like to apply?",
      options: [
        { label: "Apply now", value: "how_to_apply", emoji: "📝" },
        { label: "View other levels", value: "entry_requirements", emoji: "📋" },
        { label: "Go back to menu", value: "menu", emoji: "↩️" },
      ],
    };
  }

  if (lower === "req_certificate") {
    return {
      text: "📋 Certificate programs have flexible entry requirements. Please confirm specific requirements with the admissions office or check the official website.",
      options: [
        { label: "Apply now", value: "how_to_apply", emoji: "📝" },
        { label: "View other levels", value: "entry_requirements", emoji: "📋" },
        { label: "Go back to menu", value: "menu", emoji: "↩️" },
      ],
      links: [{ label: "AIU Website", url: "https://www.aiu.ac.ke/" }],
    };
  }

  if (lower === "intake_dates" || matchKeywords(lower, ["intake", "when to apply", "when can i apply"])) {
    return {
      text: "📅 Application Intakes:\n\n• Regular programs: January, May, and September\n• School-based programs: April, August, and December (holiday sessions)\n\nInternational students should apply well in advance for visa processing.\n\nApplications are accepted throughout the year!",
      options: [
        { label: "Apply now", value: "how_to_apply", emoji: "📝" },
        { label: "International students", value: "international", emoji: "🌍" },
        { label: "Go back to menu", value: "menu", emoji: "↩️" },
      ],
    };
  }

  if (lower === "international" || matchKeywords(lower, ["international student", "foreign student", "visa", "overseas"])) {
    return {
      text: "🌍 Yes! AIU accepts international students.\n\nYou will need:\n• Academic transcripts & certificates\n• Passport copy (bio-data page)\n• Student visa\n• KNQA recognition for foreign qualifications\n\nApply early for visa processing.\n\n📮 Documents can be mailed to:\nThe Registrar, Africa International University,\nPO Box 24686, Karen 00502, Nairobi, Kenya\n📧 Email: registrar@aiu.ac.ke",
      options: [
        { label: "Apply now", value: "how_to_apply", emoji: "📝" },
        { label: "Documents required", value: "documents_required", emoji: "📄" },
        { label: "Go back to menu", value: "menu", emoji: "↩️" },
      ],
    };
  }

  if (lower === "documents_required" || matchKeywords(lower, ["documents needed", "what documents", "required documents"])) {
    return {
      text: "📄 Documents Required for Application & Registration:\n\n• Application fee (KES 1,000/USD 10 for Diplomas; KES 1,500/USD 15 for Bachelors)\n• Copies of all academic transcripts and certificates\n• Recent passport-size photo (less than 2MB)\n• National ID or Birth Certificate (Kenyan applicants)\n• Passport bio-data page (International applicants)\n• Secondary school leaving certificate or recommendation letter\n• KNQA recognition certificate for foreign qualifications\n\n⚠️ Only complete applications will be processed.\n\n💡 Having trouble applying online? Send documents via WhatsApp: +254725841885 or email Admissions Office.",
      options: [
        { label: "Apply now", value: "how_to_apply", emoji: "📝" },
        { label: "Go back to menu", value: "menu", emoji: "↩️" },
      ],
    };
  }

  if (lower === "kuccps" || matchKeywords(lower, ["kuccps"])) {
    return {
      text: "🎯 KUCCPS Students:\n\n1. Ensure you have received a KUCCPS invitation to AIU\n2. Log in with your KCSE Index Number (e.g., 11111111111/2024)\n3. Fill in all mandatory fields (marked with *)\n4. Accept the conditions and submit\n5. Download your Admission Letter\n\nVisit the AIU admissions portal to get started!",
      options: [
        { label: "Go back to menu", value: "menu", emoji: "↩️" },
      ],
      links: [{ label: "Apply Now", url: "https://apply.aiu.ac.ke/" }],
    };
  }

  if (lower === "scholarships" || matchKeywords(lower, ["scholarship", "financial aid", "founders scholarship", "bursary"])) {
    return {
      text: "🏆 Scholarships & Financial Aid:\n\n🎉 Founders Scholarship — Covers 50% of fees for BACHELOR'S level programs!\n\nApplications are open. Apply early for the September intake to secure your spot.\n\nVisit the AIU website for more details and to start your application.",
      options: [
        { label: "Apply now", value: "how_to_apply", emoji: "📝" },
        { label: "Go back to menu", value: "menu", emoji: "↩️" },
      ],
      links: [{ label: "AIU Website", url: "https://www.aiu.ac.ke/" }],
    };
  }

  // Specific course value matches FIRST
  if (lower === "courses_doctoral") {
    return {
      text: "🏆 Doctoral Programs:\n\n• PhD in Translation Studies\n• PhD in Theological Studies (World Christianity, Theology & Development, Theology & Culture, Systematic Theology, Practical Theology, Mission Studies, Biblical Studies)\n• PhD in Leadership and Governance\n• PhD in Interreligious Studies\n• PhD in Education (Curriculum & Instruction, Church Education, Child Development & Family Studies)\n• PhD in Clinical Psychology\n• PhD in Business Administration and Management\n• Doctor of Ministry\n\nWould you like to apply for any of these?",
      options: [
        { label: "Apply now", value: "how_to_apply", emoji: "📝" },
        { label: "PhD requirements", value: "req_doctoral", emoji: "📋" },
        { label: "View other levels", value: "courses", emoji: "📚" },
        { label: "Go back to menu", value: "menu", emoji: "↩️" },
      ],
    };
  }

  if (lower === "courses_masters") {
    return {
      text: "🎓 Graduate Programs (Masters):\n\n• Master of Education (Educational Leadership & Admin, Curriculum & Instruction, Church Education, Child Development)\n• Master of Divinity (Theological Studies, Pastoral, Missions, Church History, Biblical Studies, General)\n• Master of Development Studies\n• Master of Business Administration\n• Master of Arts (Translation Studies, Theological Studies, Public Policy & Admin, Pastoral Studies, Organizational Leadership, Mission Studies, Counselling Psychology, Church History, Biblical Studies)\n\nWould you like more details?",
      options: [
        { label: "Apply now", value: "how_to_apply", emoji: "📝" },
        { label: "Masters requirements", value: "req_masters", emoji: "📋" },
        { label: "View other levels", value: "courses", emoji: "📚" },
        { label: "Go back to menu", value: "menu", emoji: "↩️" },
      ],
    };
  }

  if (lower === "courses_undergrad") {
    return {
      text: "📖 Undergraduate Programs (Bachelors):\n\n• BSc in Information Technology\n• Bachelor of Theology\n• BSc in Entrepreneurship\n• BSc in Accounting & Financial Management\n• Bachelor of Education (Secondary)\n• Bachelor of Education (ECD)\n• Bachelor of Business Administration\n• BA in Development Studies\n• BA in Counselling Psychology\n• BA in Communication, Translation & Linguistics (Translation, Descriptive Linguistics, Communications)\n\nMost degree programs take 4 years to complete.",
      options: [
        { label: "Apply now", value: "how_to_apply", emoji: "📝" },
        { label: "Degree requirements", value: "req_undergrad", emoji: "📋" },
        { label: "Fee structure", value: "fees", emoji: "💰" },
        { label: "View other levels", value: "courses", emoji: "📚" },
        { label: "Go back to menu", value: "menu", emoji: "↩️" },
      ],
    };
  }

  if (lower === "courses_diploma") {
    return {
      text: "📜 Diploma Programs:\n\n• Wholistic Community Development\n• Translation Studies\n• Theology\n• School Chaplaincy\n• Sales & Marketing\n• Procurement Management\n• Missions (Islam & General)\n• Investment Management\n• Information Technology\n• Human Resource Management\n• Health Systems Management\n• General Linguistics\n• Entrepreneurship\n• Education (Secondary, ECD)\n• Disaster Management\n• Development Studies\n• Counselling Psychology\n• Christian Counseling\n• Business Management\n• AI & Cybersecurity",
      options: [
        { label: "Apply now", value: "how_to_apply", emoji: "📝" },
        { label: "Diploma requirements", value: "req_diploma", emoji: "📋" },
        { label: "View other levels", value: "courses", emoji: "📚" },
        { label: "Go back to menu", value: "menu", emoji: "↩️" },
      ],
    };
  }

  if (lower === "courses_pgd") {
    return {
      text: "📋 Postgraduate Diploma Programs:\n\n• Postgraduate Diploma in Theology\n• Postgraduate Diploma in Education\n\nDuration: 12–24 months",
      options: [
        { label: "Apply now", value: "how_to_apply", emoji: "📝" },
        { label: "PGD requirements", value: "req_pgd", emoji: "📋" },
        { label: "View other levels", value: "courses", emoji: "📚" },
        { label: "Go back to menu", value: "menu", emoji: "↩️" },
      ],
    };
  }

  if (lower === "courses_certificate") {
    return {
      text: "📃 Certificate Programs:\n\n• Certificate in Theology\n• Certificate in Missions\n• Certificate in Creative Animation & Robotics\n• Certificate in Community Development\n• Certificate in Artificial Intelligence & Cybersecurity",
      options: [
        { label: "Apply now", value: "how_to_apply", emoji: "📝" },
        { label: "View other levels", value: "courses", emoji: "📚" },
        { label: "Go back to menu", value: "menu", emoji: "↩️" },
      ],
    };
  }

  // COURSES (broad match - after specific values)
  if (lower === "courses" || matchKeywords(lower, ["course", "program", "what do you offer"])) {
    return {
      text: "📚 We offer programs across multiple levels and departments. Which category interests you?",
      options: [
        { label: "Doctoral Programs (PhD)", value: "courses_doctoral", emoji: "🏆" },
        { label: "Graduate Programs (Masters)", value: "courses_masters", emoji: "🎓" },
        { label: "Undergraduate (Bachelors)", value: "courses_undergrad", emoji: "📖" },
        { label: "Diploma Programs", value: "courses_diploma", emoji: "📜" },
        { label: "Postgraduate Diploma", value: "courses_pgd", emoji: "📋" },
        { label: "Certificate Programs", value: "courses_certificate", emoji: "📃" },
        { label: "Language Courses", value: "courses_languages", emoji: "🗣️" },
        { label: "Go back to menu", value: "menu", emoji: "↩️" },
      ],
    };
  }


  // IT specific
  if (matchKeywords(lower, ["it course", "information technology", "do you offer it", "bsc it"])) {
    return {
      text: "💻 Yes! We offer IT programs at multiple levels:\n\n• BSc in Information Technology (4 years)\n• Diploma in Information Technology\n• Diploma in AI & Cybersecurity\n• Certificate in Artificial Intelligence & Cybersecurity\n\nWhich level interests you?",
      options: [
        { label: "Apply now", value: "how_to_apply", emoji: "📝" },
        { label: "Fee structure", value: "fees", emoji: "💰" },
        { label: "Go back to menu", value: "menu", emoji: "↩️" },
      ],
    };
  }

  if (matchKeywords(lower, ["how long", "duration", "years", "how many years"])) {
    return {
      text: "⏱️ Program Duration:\n\n• Certificate: 6–12 months\n• Diploma: 2 years\n• Degree (Bachelors): 4 years\n• Postgraduate Diploma: 12–24 months\n• Masters: 2 years\n• Doctoral (PhD): 3–5 years\n\nDuration may vary by program. Would you like details for a specific course?",
      options: [
        { label: "View courses", value: "courses", emoji: "📚" },
        { label: "Go back to menu", value: "menu", emoji: "↩️" },
      ],
    };
  }

  // FEES
  if (lower === "fees" || matchKeywords(lower, ["fee", "payment", "cost", "how much", "price", "tuition", "installment"])) {
    return {
      text: "💰 Fees & Payment:\n\nFees vary by course and level of study. For the official fee structure, please check the downloads page.\n\n💳 Payment Methods:\n• Bank deposit\n• Mobile money\n• University payment portal\n\n✅ Yes, you can pay in installments according to the university payment policy.\n\nFor specific fee amounts, please confirm with the Finance Office: +254 726 759 193",
      options: [
        { label: "View courses", value: "courses", emoji: "📚" },
        { label: "Scholarships", value: "scholarships", emoji: "🏆" },
        { label: "Go back to menu", value: "menu", emoji: "↩️" },
      ],
      links: [{ label: "Download Fee Structure", url: "https://www.aiu.ac.ke/downloads/" }],
    };
  }

  // TIMETABLE
  if (lower === "timetable" || matchKeywords(lower, ["timetable", "lesson hour", "lesson duration", "how many hours", "class time", "schedule"])) {
    return {
      text: "🕐 Timetable & Lesson Hours:\n\n• Each lesson is 3 hours per session\n• There are 1–3 lessons per day\n• Typical lesson blocks:\n  📌 7:00 AM – 10:00 AM\n  📌 11:00 AM – 2:00 PM\n  📌 2:00 PM – 5:00 PM\n\n🌙 Evening and weekend classes are available for some programs.\n\nYour specific timetable depends on your program and year of study.",
      options: [
        { label: "View courses", value: "courses", emoji: "📚" },
        { label: "Academic calendar", value: "calendar", emoji: "📅" },
        { label: "Go back to menu", value: "menu", emoji: "↩️" },
      ],
    };
  }

  // CALENDAR
  if (lower === "calendar" || matchKeywords(lower, ["semester", "academic calendar", "when does semester", "academic year"])) {
    return {
      text: "📅 Academic Calendar & Semesters:\n\n• There are 2 main semesters per academic year\n• Intakes: January, May, and September\n• School-based intakes: April, August, December (holiday sessions)\n\nFor exact semester dates, exam periods, and holidays, please check with the registrar or visit the AIU website.",
      options: [
        { label: "Intake dates", value: "intake_dates", emoji: "📅" },
        { label: "Exams info", value: "exams", emoji: "📝" },
        { label: "Go back to menu", value: "menu", emoji: "↩️" },
      ],
      links: [{ label: "AIU Website", url: "https://www.aiu.ac.ke/" }],
    };
  }

  // HOSTEL
  if (lower === "hostel" || matchKeywords(lower, ["hostel", "accommodation", "housing", "room", "stay on campus"])) {
    return {
      text: "🏠 Hostel & Accommodation:\n\nAIU provides on-campus accommodation for students.\n\n• Accommodation is optional — students can live on or off-campus\n• Various room types are available\n\nFor hostel fees, availability, and rules, please contact the Student Affairs office or visit the AIU website.",
      options: [
        { label: "Fee structure", value: "fees", emoji: "💰" },
        { label: "Contact support", value: "contact", emoji: "📞" },
        { label: "Go back to menu", value: "menu", emoji: "↩️" },
      ],
      links: [{ label: "AIU Website", url: "https://www.aiu.ac.ke/" }],
    };
  }

  // LIBRARY
  if (lower === "library" || matchKeywords(lower, ["library", "books", "study space", "journal", "reading"])) {
    return {
      text: "📖 Library & Resources:\n\nThe AIU library offers:\n• Physical books & textbooks\n• Online journals & e-resources\n• Study spaces\n\nThe library is open on weekdays and weekends during semester time.\n\n📞 Library Contact: +254 712 866 000",
      options: [
        { label: "Go back to menu", value: "menu", emoji: "↩️" },
      ],
    };
  }

  // EXAMS
  if (lower === "exams" || matchKeywords(lower, ["exam", "graduation", "graduate", "convocation"])) {
    return {
      text: "🎓 Exams & Graduation:\n\n📝 Exams are held at the end of each semester.\n🎉 Graduation is held once per year after the academic cycle.\n\nFor exam timetables and graduation requirements, please check with the Exams & Records office.\n\n📞 Exams & Records: 0101 059 910",
      options: [
        { label: "Academic calendar", value: "calendar", emoji: "📅" },
        { label: "Go back to menu", value: "menu", emoji: "↩️" },
      ],
    };
  }

  // CLUBS
  if (lower === "clubs" || matchKeywords(lower, ["club", "student service", "sports", "fellowship", "counseling", "counselling", "organization"])) {
    return {
      text: "⚽ Student Services & Clubs:\n\nAIU has student clubs and organizations including:\n• Sports teams\n• Christian fellowship\n• Tech clubs\n• Leadership groups\n\n🧑‍⚕️ Student counseling services are also available for academic and personal support.\n\nWould you like to know more about any specific service?",
      options: [
        { label: "Contact support", value: "contact", emoji: "📞" },
        { label: "Go back to menu", value: "menu", emoji: "↩️" },
      ],
    };
  }

  // CONTACT
  if (lower === "contact" || matchKeywords(lower, ["contact", "phone", "email", "human", "talk to someone", "help", "support", "call"])) {
    return {
      text: "📞 Contact AIU:\n\n• Enquiries: +254 796 352 397 / +254 748 759 496\n• Admissions: +254 725 841 885\n• Recruitment: +254 715 247 540\n• Finance Office: +254 726 759 193\n• ICT Office: +254 758 793 874\n• ODeL Support: +254 701 701 466\n• Library: +254 712 866 000\n• Exams & Records: 0101 059 910\n\n📧 Email Registrar: registrar@aiu.ac.ke\n\n🌐 Visit: https://www.aiu.ac.ke/",
      options: [
        { label: "Go back to menu", value: "menu", emoji: "↩️" },
      ],
      links: [{ label: "AIU Official Website", url: "https://www.aiu.ac.ke/" }],
    };
  }

  // Downloads
  if (matchKeywords(lower, ["download", "forms", "fee structure document"])) {
    return {
      text: "📥 You can download forms, fee structures, and other documents from the AIU downloads page.",
      options: [
        { label: "Go back to menu", value: "menu", emoji: "↩️" },
      ],
      links: [{ label: "AIU Downloads", url: "https://www.aiu.ac.ke/downloads/" }],
    };
  }

  // Greetings
  if (matchKeywords(lower, ["hello", "hi", "hey", "good morning", "good afternoon", "good evening"])) {
    return {
      text: "Hello! 👋 Welcome to AIU Chatbot. How can I help you today?",
      options: MAIN_MENU_OPTIONS,
    };
  }

  // Thank you
  if (matchKeywords(lower, ["thank", "thanks", "asante"])) {
    return {
      text: "You're welcome! 😊 Is there anything else I can help you with?",
      options: [
        { label: "Go back to menu", value: "menu", emoji: "↩️" },
      ],
    };
  }

  // Yes
  if (lower === "yes" || lower === "yeah" || lower === "yep") {
    return {
      text: "Great! What would you like to know? Choose from the options below:",
      options: MAIN_MENU_OPTIONS,
    };
  }

  // No
  if (lower === "no" || lower === "nope" || lower === "not now") {
    return {
      text: "Okay! Feel free to come back anytime. 😊 Have a great day!",
      options: [
        { label: "Go back to menu", value: "menu", emoji: "↩️" },
      ],
    };
  }

  // FALLBACK
  return {
    text: "Sorry 😅, I didn't quite understand that. Please choose one of these options or rephrase your question.\n\nYou can say things like:\n\"Admissions\", \"How much is IT fees?\", \"How many hours is a lesson?\", \"Hostel info\", \"Graduation date\"",
    options: MAIN_MENU_OPTIONS,
  };
}
