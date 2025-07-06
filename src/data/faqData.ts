export interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

export const faqData: FAQItem[] = [
  {
    id: 1,
    question: "What is myScheme and how does it work?",
    answer: "myScheme is a comprehensive digital platform developed by the Government of India that helps citizens discover and access various government schemes and benefits. It serves as a one-stop solution for finding schemes based on eligibility criteria, categories, states, and central ministries.",
    category: "General"
  },
  {
    id: 2,
    question: "How will myScheme help common citizens access benefits?",
    answer: "myScheme simplifies the complex process of finding relevant government schemes by providing personalized recommendations based on your profile. It eliminates the need to search through multiple websites and provides clear, comprehensive information about eligibility, application processes, required documents, and deadlines.",
    category: "Benefits"
  },
  {
    id: 3,
    question: "Can I directly apply for schemes through myScheme?",
    answer: "myScheme provides detailed information about schemes and directs you to the official application portals. While you cannot directly apply through myScheme, it provides all necessary links, documents, step-by-step guidance, and even tracks your application status.",
    category: "Application"
  },
  {
    id: 4,
    question: "How do I check my eligibility for different schemes?",
    answer: "myScheme uses an intelligent AI-powered matching system that analyzes your profile information including age, income, location, category, education, occupation, and other relevant factors to suggest suitable schemes.",
    category: "Eligibility"
  },
  {
    id: 5,
    question: "What detailed information can I find about each scheme?",
    answer: "For each scheme, myScheme provides comprehensive details including complete eligibility criteria, benefits offered, step-by-step application process, required documents checklist, important dates and deadlines, contact information, and frequently asked questions.",
    category: "Information"
  }
];
