export const coreValues = [
  {
    id: "excellence",
    label: "Excellence",
    definition:
      "Strive to exceed expectations and consistently deliver exceptional results.",
    x: -2,
    y: 0,
  },
  {
    id: "leadership",
    label: "Leadership",
    definition:
      "Inspire and guide others with empathy and kindness to achieve collective success.",
    x: -1,
    y: 0,
  },
  {
    id: "collaboration",
    label: "Collaboration",
    definition:
      "Achieve shared goals through teamwork, communication, and mutual respect.",
    x: 0,
    y: 0,
  },
  {
    id: "community",
    label: "Community",
    definition:
      "Foster a sense of belonging by creating spaces where people feel supported, valued, and connected.",
    x: 1,
    y: 0,
  },
  {
    id: "innovation",
    label: "Innovation",
    definition:
      "Challenge conventional thinking to find creative solutions and drive continuous improvement.",
    x: 2,
    y: 0,
  },
];

export const activities = [
  {
    id: "ubc-cs",
    title: "Computer Science, BSc",
    location: "University of British Columbia",
    duration: "September 2020 – May 2026 (expected)",
    description: "KMILOT Scholar | Dean's List | cGPA: 84.3%",
    x: -2,
    y: 1,
  },
  {
    id: "wics",
    title: "Co-President",
    location: "UBC Women in Computer Science",
    duration: "May 2024 – Present",
    description: "Previous VP External(24/25), External Events Director(23/24)",
    x: 0,
    y: -1,
  },
  {
    id: "sap",
    title: "Technical Project Coordinator",
    location: "SAP Labs, Vancouver BC",
    duration: "September 2022 – April 2023",
    description: "",
    x: -2,
    y: -1,
  },
  {
    id: "feral-freedom",
    title: "Frontend Dev & Product Manager",
    location: "Feral Freedom (Game)",
    duration: "September 2024 – November 2024",
    description: "CPSC427 Course Project",
    x: 2,
    y: -1,
  },
  {
    id: "pocket-pelvis",
    title: "Developer & Project Manager",
    location: "Pocket Pelvis: AR Birth Animation",
    duration: "January 2024 ‑ March 2024",
    description: "MDIA470 Course Project",
    x: 2,
    y: 1,
  },
  {
    id: "youcode",
    title: "Hackathon Attendee & Designer",
    location: "youCode Hackathon, UBC",
    duration: "April 6–7, 2024",
    description:
      "Organized by UBC WiCS & WiDS@UBC, in partnership with Arc'teryx",
    x: 0,
    y: 1,
  },
];

export const connections = [
  // UBC CS
  {
    from: "ubc-cs",
    to: "excellence",
    text: "Consistently maintained high academic performance, earning Dean's List recognition.",
  },
  {
    from: "ubc-cs",
    to: "leadership",
    text: "Awarded the KMILOT Award for exceptional leadership and academic achievement.",
  },

  // WiCS
  {
    from: "wics",
    to: "community",
    text: "Organized events to foster a sense of belonging and support for underrepresented genders in computer science.",
  },
  {
    from: "wics",
    to: "collaboration",
    text: "Worked closely with a team of five and tech sponsors to ensure smooth event execution.",
  },
  {
    from: "wics",
    to: "leadership",
    text: "Led a team of 5 and managed relationships with sponsors, facilitating successful partnerships.",
  },

  // SAP
  {
    from: "sap",
    to: "innovation",
    text: "Automated overdue notifications in Jira, optimizing workflows and enhancing productivity.",
  },
  {
    from: "sap",
    to: "excellence",
    text: "Created an SAP Analytics Cloud dashboard to maintain platform consistency.",
  },
  {
    from: "sap",
    to: "collaboration",
    text: "Coordinated with 8 interns and a full-time team member on an internal LMS platform.",
  },

  // Pocket Pelvis
  {
    from: "pocket-pelvis",
    to: "innovation",
    text: "Integrated AR features with a 3D-printed model to enhance learning and engagement.",
  },
  {
    from: "pocket-pelvis",
    to: "collaboration",
    text: "Collaborated with a team of six using Agile methodologies to deliver the project.",
  },

  // Feral Freedom
  {
    from: "feral-freedom",
    to: "community",
    text: "Developed a game inspired by a true story from your hometown, creating a meaningful connection.",
  },
  {
    from: "feral-freedom",
    to: "collaboration",
    text: "Worked with a team of six using Agile methods to design and implement the game.",
  },
  {
    from: "feral-freedom",
    to: "innovation",
    text: "Built a fully playable game in three months using OpenGL and creative gameplay mechanics.",
  },

  // YouCode
  {
    from: "youcode",
    to: "excellence",
    text: "Learned to use Figma as a drawing tool and applied this knowledge to web design.",
  },
  {
    from: "youcode",
    to: "innovation",
    text: "Developed a fully functional website from scratch within 24 hours, showcasing creativity under time pressure.",
  },
  {
    from: "youcode",
    to: "collaboration",
    text: "Worked with a team of five to deliver a high-quality project within tight deadlines.",
  },
];
