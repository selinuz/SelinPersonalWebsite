export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  employmentType: string;
  duration: string;
  startDate: string; // Format: YYYY-MM for sorting
  location: string;
  responsibilities: string[];
  skills: string[];
}

export const workExperiences: WorkExperience[] = [
  {
    id: "1",
    company: "Dayforce Inc.",
    position: "Project Coordinator",
    employmentType: "Internship",
    duration: "Jan. 2025 – Aug. 2025",
    startDate: "2025-01",
    location: "Remote",
    responsibilities: [
      "Led a high-impact ServiceNow rollout, collaborating with an external vendor and internal stakeholders.",
      "Facilitated requirements-gathering sessions to map current processes and define roadmap.",
      "Created and managed Jira epics and user stories to support agile delivery across teams.",
      "Identified risks and escalated to leadership as needed to mitigate delays and maintain delivery momentum.",
      "Coordinated a company-wide migration from on-premise to cloud, facilitating the move of 245 VMs.",
      "Led cross-functional meetings with development teams to unblock issues and gather status updates.",
      "Designed and distributed a weekly project newsletter to align technical/business teams and leadership, a format adopted by 4 additional programs following positive leadership feedback.",
      "Supported a remote event organized by internal operations, reaching 80% attendance worldwide.",
      "Wrote scripts for kickoff and instructional videos to ensure clarity and engagement during the launch.",
    ],
    skills: [
      "ServiceNow",
      "Jira",
      "Agile",
      "Cloud Migration",
      "Stakeholder Management",
      "Risk Management",
      "Technical Writing",
    ],
  },
  {
    id: "2",
    company: "SAP Canada Inc.",
    position: "Technical Project Coordinator",
    employmentType: "Internship",
    duration: "Sep. 2022 – Apr. 2023",
    startDate: "2022-09",
    location: "Vancouver, Canada",
    responsibilities: [
      "Automated security notifications for 100+ teams, resulting in a 100% reduction in overdue items.",
      "Developed a Python script integrated with Jenkins (CI/CD) in collaboration with the security intern.",
      "Presented the plan to the VP and stakeholders, securing approval due to its impact.",
      "Managed Jira for 100+ global teams, ensuring alignment with SAP standards.",
      "Reviewed workflow change requests for feasibility and implemented when needed.",
      "Built an automated SAP Analytics Cloud dashboard to identify workflow discrepancies.",
      "PM for internal LMS platform: managed a team of 8 interns, prioritized features, led sprint planning.",
      "Led weekly meetings with the VP, QA leads, and managers to address priority issues and quality concerns.",
    ],
    skills: [
      "Python",
      "Jenkins",
      "CI/CD",
      "Jira",
      "SAP Analytics Cloud",
      "Process Automation",
      "Team Leadership",
      "Sprint Planning",
    ],
  },
];
