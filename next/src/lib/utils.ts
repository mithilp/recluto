import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const skills = [
	// Soft Skills
	"Communication Skills",
	"Teamwork",
	"Leadership",
	"Problem-Solving",
	"Time Management",
	"Adaptability",
	"Creativity",
	"Critical Thinking",
	"Interpersonal Skills",
	"Attention to Detail",
	"Resilience",
	"Emotional Intelligence",
	"Conflict Resolution",
	"Decision Making",
	"Negotiation Skills",
	"Customer Service",
	"Presentation Skills",
	"Networking",
	"Collaboration",
	"Empathy",

	// Technical Skills
	"Programming",
	"Web Development",
	"Mobile Development",
	"Database Management",
	"Cloud Computing",
	"Cybersecurity",
	"Data Analysis",
	"Machine Learning",
	"Artificial Intelligence",
	"Data Mining",
	"Data Visualization",
	"Statistical Analysis",
	"Version Control (Git)",
	"Agile Methodologies",
	"DevOps",
	"Test-Driven Development",
	"Responsive Design",
	"UI/UX Design",
	"Graphic Design",
	"Project Management",
	"Quality Assurance",
	"Systems Administration",
	"Network Administration",
	"Technical Support",
	"IT Troubleshooting",
	"Scripting Languages (e.g., Python, Bash)",
	"Containerization (Docker, Kubernetes)",
	"Continuous Integration/Continuous Deployment (CI/CD)",
	"Backend Development",
	"Frontend Development",
	"Full-Stack Development",
	"Software Architecture",
	"RESTful APIs",
	"GraphQL",
	"Microservices",
	"Blockchain Development",
	"Embedded Systems",
	"Game Development",

	// Programming Languages
	"JavaScript",
	"Python",
	"Java",
	"C++",
	"C#",
	"Ruby",
	"Swift",
	"Kotlin",
	"PHP",
	"Go",
	"Rust",
	"TypeScript",
	"SQL",
	"HTML/CSS",
	"Shell Scripting",
	"Scala",
	"Objective-C",
	"Assembly Language",

	// Web Development Technologies
	"React.js",
	"Angular",
	"Vue.js",
	"Node.js",
	"Express.js",
	"Django",
	"Flask",
	"Ruby on Rails",
	"ASP.NET",
	"jQuery",
	"Bootstrap",
	"SASS/LESS",
	"Webpack",
	"Babel",
	"GraphQL",
	"RESTful APIs",
	"Firebase",
	"MongoDB",
	"MySQL",
	"PostgreSQL",
	"SQLite",
	"Redis",
	"Webpack",
	"Gatsby.js",
	"Next.js",
	"Nuxt.js",
	"Electron",
	"D3.js",

	// Mobile Development Technologies
	"React Native",
	"Flutter",
	"Swift (iOS Development)",
	"Kotlin (Android Development)",
	"Xamarin",
	"PhoneGap/Cordova",

	// Cloud Computing Technologies
	"Amazon Web Services (AWS)",
	"Microsoft Azure",
	"Google Cloud Platform (GCP)",
	"IBM Cloud",
	"Alibaba Cloud",

	// DevOps and Tools
	"Docker",
	"Kubernetes",
	"Jenkins",
	"CircleCI",
	"Travis CI",
	"GitLab CI/CD",
	"Ansible",
	"Terraform",
	"Puppet",
	"Chef",
	"Prometheus",
	"Grafana",

	// Data Science and Machine Learning Tools
	"TensorFlow",
	"PyTorch",
	"Keras",
	"Scikit-learn",
	"Pandas",
	"NumPy",
	"SciPy",
	"Matplotlib",
	"Seaborn",
	"Jupyter",

	// Other Tools and Technologies
	"Microsoft Office Suite",
	"Adobe Creative Suite",
	"AutoCAD",
	"Unity",
	"Unreal Engine",
	"Maya",
	"Blender",
	"Sketch",
	"Figma",
	"Adobe XD",
	"InVision",
	"Zeplin",
	"Microsoft Visual Studio",
	"Eclipse",
	"IntelliJ IDEA",
	"Sublime Text",
	"Atom",
	"Visual Studio Code",
	"Vim",
	"Emacs",
	"Postman",
	"Swagger",
	"JIRA",
	"Confluence",
	"Slack",
	"Microsoft Teams",
	"Trello",
	"Asana",
	"Monday.com",
	"Zendesk",
	"Salesforce",
	"HubSpot",
	"Google Analytics",
	"Adobe Analytics",
	"Tableau",
	"Power BI",
	"Elasticsearch",
	"Splunk",
	"New Relic",
	"Datadog",
	"Zabbix",
];

export type Profile = {
	name: string;
	school: string;
	degree: string;
	skills: string[] | string;
	bookmarked: boolean;
	id: string;
	experience: number;
	public_id: string;
};

export type Message = {
	name: string;
	message: string;
	timestamp: Date;
	id: string;
};
