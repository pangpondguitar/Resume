export type Lang = "en" | "th";

type Localized = Record<Lang, string>;

export const profile = {
  name: "Srattra Songrit",
  role: "Web Developer Fullstack",
  phone: "080-684-5221",
  phoneHref: "tel:0806845221",
  email: "srattra321@gmail.com",
  summary: {
    en: "My name is Srattra Songrit, and I am 24 years old. I am seeking a Web Developer position, with a strong interest in Frontend, Backend, and Full-Stack Development. I am eager to learn new technologies, improve my skills, solve problems, and contribute to developing high-quality software.",
    th: "สวัสดีครับ ผมมีความสนใจและมุ่งมั่นในการทำงานด้านการพัฒนาเว็บไซต์ ทั้งฝั่ง Frontend, Backend และ Full-Stack Development พร้อมเรียนรู้เทคโนโลยีใหม่ ๆ พัฒนาทักษะอย่างต่อเนื่อง แก้ไขปัญหาทางเทคนิค และมีส่วนร่วมในการพัฒนาซอฟต์แวร์ที่มีคุณภาพ เพื่อให้ระบบสามารถทำงานได้อย่างมีประสิทธิภาพและตอบโจทย์ความต้องการของผู้ใช้งาน",
  } satisfies Localized,
};

export type ProjectImage = {
  src: string;
  width: number;
  height: number;
  caption: Localized;
};

export type Project = {
  title: Localized;
  url?: string;
  images?: ProjectImage[];
  tags: string[];
  points: Localized[];
};

export type Job = {
  company: string;
  position: string;
  period: Localized;
  current?: boolean;
  projects: Project[];
};

export const experience: Job[] = [
  {
    company: "GBY Digital Tech Co., Ltd.",
    position: "Frontend Developer",
    period: { en: "May 2, 2024 – Present", th: "02 พ.ค. 2567 – ปัจจุบัน" },
    current: true,
    projects: [
      {
        title: {
          en: "School Management System",
          th: "ระบบบริหารจัดการโรงเรียน (School Management System)",
        },
        tags: ["Vue.js", "RESTful API", "AWS EC2"],
        points: [
          {
            en: "Developed responsive frontend interfaces using Vue.js, focusing on usability and cross-device compatibility.",
            th: "พัฒนาและออกแบบส่วนติดต่อผู้ใช้งาน (Frontend) ด้วย Vue.js โดยเน้นความง่ายในการใช้งานและการรองรับการทำงานบนอุปกรณ์ที่หลากหลาย",
          },
          {
            en: "Integrated frontend and backend systems via RESTful APIs to manage student, teacher, and activity data.",
            th: "เชื่อมต่อระบบกับส่วนหลังบ้าน (Backend) ผ่าน RESTful APIs เพื่อบริหารจัดการข้อมูลนักเรียน ครู และกิจกรรมต่าง ๆ",
          },
          {
            en: "Configured and maintained AWS EC2 infrastructure to deploy frontend and backend applications.",
            th: "ออกแบบและตั้งค่าโครงสร้างพื้นฐานบน AWS EC2 สำหรับรันแอปพลิเคชันทั้งในส่วน Frontend และ Backend",
          },
        ],
      },
      {
        title: {
          en: "Hipsbook — Online Learning Platform",
          th: "Hipsbook — แพลตฟอร์มการเรียนรู้ออนไลน์",
        },
        url: "https://hipsbook.gbydigitaltech.co.th/",
        tags: ["Next.js", "TypeScript", "Tailwind CSS", "React", "Bootstrap", "CI/CD"],
        points: [
          {
            en: "Developed responsive, SEO-friendly frontend interfaces using Next.js, Tailwind CSS, and TypeScript.",
            th: "พัฒนาส่วน Frontend ด้วย Next.js, Tailwind CSS และ TypeScript เพื่อสร้าง UI ที่รวดเร็ว ตอบสนองต่อการใช้งานได้ดี (Responsive) และเป็นมิตรต่อ SEO",
          },
          {
            en: "Built a backoffice system using React and Bootstrap to manage courses and users.",
            th: "พัฒนาระบบหลังบ้าน (Backoffice) สำหรับบริหารจัดการหลักสูตรและผู้ใช้งาน โดยใช้ React และ Bootstrap",
          },
          {
            en: "Collaborated with the backend team to design and integrate APIs for course purchases, video content, user registration, payment processing, and shopping cart functionality.",
            th: "ทำงานร่วมกับทีม Backend เพื่อออกแบบและเชื่อมต่อ API สำหรับการจัดการเข้าซื้อคอร์สเรียน เนื้อหาวิดีโอ การลงทะเบียนผู้ใช้งาน ระบบการชำระเงิน และตะกร้าสินค้า",
          },
          {
            en: "Helped implement CI/CD pipelines for the frontend and backoffice to streamline deployments and accelerate feature updates and bug fixes.",
            th: "ช่วยตั้งค่ากระบวนการ CI/CD มาใช้กับทั้ง Frontend และ Backoffice เพื่อให้สามารถอัปเดตฟีเจอร์และแก้ไขข้อผิดพลาด (Bug) ได้รวดเร็วยิ่งขึ้นในกระบวนการ Deploy งาน",
          },
        ],
      },
    ],
  },
  {
    company: "STS System & Development Company Limited",
    position: "Programmer",
    period: { en: "Oct 12, 2023 – Mar 30, 2024", th: "12 ต.ค. 2566 – 30 มี.ค. 2567" },
    projects: [
      {
        title: {
          en: "Website Management System & Online Waste Fee Payment System",
          th: "ระบบบริหารจัดการเว็บไซต์และระบบชำระค่าธรรมเนียมขยะออนไลน์",
        },
        url: "https://trash.in.th/users/homepage.php?id=1",
        images: [
          {
            src: "/projects/trash/home.png",
            width: 2557,
            height: 1191,
            caption: { en: "Homepage", th: "หน้าแรกของระบบ" },
          },
          {
            src: "/projects/trash/address.png",
            width: 2543,
            height: 1302,
            caption: { en: "Select address", th: "ค้นหาและเลือกที่อยู่" },
          },
          {
            src: "/projects/trash/months.png",
            width: 2539,
            height: 1297,
            caption: { en: "Choose months to pay", th: "เลือกเดือนที่ต้องการชำระ" },
          },
          {
            src: "/projects/trash/summary.png",
            width: 2539,
            height: 1215,
            caption: { en: "Fee summary", th: "สรุปรายการค่าธรรมเนียม" },
          },
          {
            src: "/projects/trash/slip.png",
            width: 2537,
            height: 1297,
            caption: { en: "Upload payment slip", th: "แนบหลักฐานการชำระเงิน" },
          },
          {
            src: "/projects/trash/history.png",
            width: 2544,
            height: 1180,
            caption: { en: "Payment history", th: "ตรวจสอบประวัติการชำระ" },
          },
          {
            src: "/projects/trash/receipt.png",
            width: 2537,
            height: 1263,
            caption: { en: "Online receipt", th: "ใบเสร็จรับเงินออนไลน์" },
          },
        ],
        tags: ["PHP", "Laravel", "MySQL", "Bootstrap 4"],
        points: [
          {
            en: "Developed and maintained website management systems using PHP, Laravel, and MySQL.",
            th: "พัฒนาและดูแลรักษาระบบจัดการเว็บไซต์โดยใช้ PHP, Laravel และ MySQL",
          },
          {
            en: "Developed an online waste fee payment system that enables residents to pay fees and view their payment history.",
            th: "พัฒนาระบบชำระค่าธรรมเนียมขยะมูลฝอย เปิดให้ประชาชนชำระเงินผ่านระบบออนไลน์และตรวจสอบประวัติการชำระเงินได้",
          },
          {
            en: "Built a backoffice system for managing website menus, content, and file and image uploads.",
            th: "พัฒนาระบบหลังบ้าน (Backoffice) สำหรับจัดการเมนูเว็บไซต์ เนื้อหา และการอัปโหลดไฟล์หรือรูปภาพ",
          },
          {
            en: "Developed responsive website interfaces using Bootstrap 4 to improve usability and visual consistency.",
            th: "พัฒนาส่วนติดต่อผู้ใช้งาน (UI) ของเว็บไซต์ให้รองรับการแสดงผลแบบ Responsive โดยใช้ Bootstrap 4",
          },
          {
            en: "Provided technical support and troubleshooting for website-related issues.",
            th: "ให้การสนับสนุนทางเทคนิคและแก้ไขปัญหาการใช้งานเว็บไซต์ให้กับลูกค้า",
          },
          {
            en: "Updated website content and modified website functionality through the backoffice based on client requirements.",
            th: "ดำเนินการปรับปรุงเนื้อหาและแก้ไขเว็บไซต์ตามความต้องการของลูกค้าผ่านระบบหลังบ้าน",
          },
        ],
      },
    ],
  },
];

export const skills: { label: Localized; items: string[] }[] = [
  {
    label: { en: "Programming Languages", th: "ภาษาโปรแกรม" },
    items: ["JavaScript", "TypeScript", "PHP", "CSS", "C"],
  },
  {
    label: { en: "Frameworks & Libraries", th: "เฟรมเวิร์กและไลบรารี" },
    items: [
      "React.js",
      "React Native",
      "Flutter",
      "Next.js",
      "Angular",
      "Vue.js",
      "Tailwind CSS",
      "Bootstrap",
      "PrimeVue",
      "Node.js",
      "Laravel",
      "RESTful API Integration",
    ],
  },
  {
    label: { en: "Databases", th: "ฐานข้อมูล" },
    items: ["PostgreSQL", "MySQL", "Microsoft Access"],
  },
  {
    label: { en: "DevOps & Infrastructure", th: "DevOps และโครงสร้างพื้นฐาน" },
    items: ["AWS EC2", "Docker", "Linux", "CI/CD"],
  },
];

export const education = {
  university: { en: "Suratthani Rajabhat University", th: "มหาวิทยาลัยราชภัฏสุราษฎร์ธานี" },
  degree: {
    en: "Bachelor of Science – Computer Science",
    th: "วิทยาศาสตรบัณฑิต (วิทยาการคอมพิวเตอร์)",
  },
  faculty: { en: "Faculty of Science and Technology", th: "คณะวิทยาศาสตร์และเทคโนโลยี" },
  period: { en: "2020 – 2024", th: "พ.ศ. 2563 – 2567" },
  gpa: "3.61",
  honors: { en: "First Class Honors", th: "เกียรตินิยมอันดับ 1" },
};

export const ui = {
  nav: {
    about: { en: "About", th: "เกี่ยวกับ" },
    experience: { en: "Experience", th: "ประสบการณ์" },
    skills: { en: "Skills", th: "ทักษะ" },
    education: { en: "Education", th: "การศึกษา" },
    contact: { en: "Contact", th: "ติดต่อ" },
  },
  summary: { en: "Summary", th: "สรุปประวัติส่วนตัว" },
  experience: { en: "Work Experience", th: "ประสบการณ์ทำงาน" },
  skills: { en: "Technical Skills", th: "ทักษะและความสามารถ" },
  education: { en: "Education", th: "ประวัติการศึกษา" },
  contact: { en: "Let's work together", th: "ติดต่อผม" },
  contactText: {
    en: "Open to Frontend, Backend and Full-Stack opportunities. Feel free to reach out.",
    th: "พร้อมรับโอกาสงานด้าน Frontend, Backend และ Full-Stack ติดต่อได้เลยครับ",
  },
  position: { en: "Position", th: "ตำแหน่ง" },
  present: { en: "Current", th: "ปัจจุบัน" },
  gpa: { en: "GPA", th: "เกรดเฉลี่ยสะสม" },
  print: { en: "Download PDF", th: "ดาวน์โหลด PDF" },
  visitSite: { en: "Visit site", th: "ดูเว็บไซต์" },
  emailMe: { en: "Email me", th: "ส่งอีเมล" },
  callMe: { en: "Call", th: "โทร" },
  stats: {
    years: { en: "Years experience", th: "ปีประสบการณ์" },
    projects: { en: "Major projects", th: "โปรเจกต์หลัก" },
    gpa: { en: "GPA", th: "เกรดเฉลี่ย" },
  },
} satisfies Record<string, Localized | Record<string, Localized>>;
