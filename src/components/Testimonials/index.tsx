import React, { useState } from 'react';
import styles from './styles.module.css';
import LinkedInIcon from '@site/static/img/linkedin.png';

interface Recommendation {
    name: string;
    role: string;
    company: string;
    teaser: string;
    fullTextParagraphs: string[];
    linkedInUrl: string;
}

const testimonialData: Recommendation[] = [
    {
        name: "Heiner Preiss",
        role: "Principal API Designer",
        company: "Sabre",
        linkedInUrl: "https://www.linkedin.com/in/heiner-preiss/",
        teaser: "I had the pleasure of working closely with Shane at Sabre, where he consistently demonstrated a rare blend of deep systems knowledge and documentation excellence. Shane doesn’t just 'write'—he builds.",
        fullTextParagraphs: [
            "A standout example of his technical finesse was our work on implementing the automatic enforcement of the Sabre API Style Guide. Using Vale CLI and a custom ruleset, Shane helped transform our standards from a static document into a functional part of the CI/CD pipeline.",
            "His background in infrastructure means he speaks the same language as our architects and engineers, eliminating the 'translation gap' usually found in technical writing. Shane is disciplined, highly reliable, and brings a rigorous, code-centric mindset to everything he touches. I highly recommend him to any team looking for a writer who truly understands the architecture they are documenting."
        ]
    },
    {
        name: "Saverio Cirillo",
        role: "Senior Technical Writer, Ververica",
        company: "Sabre",
        linkedInUrl: "https://www.linkedin.com/in/saverio-cirillo/",
        teaser: "I had the pleasure of working alongside Shane on the same team, and I can confidently say he is one of the best API professionals I have collaborated with. His expertise spans the full lifecycle of API documentation.",
        fullTextParagraphs: [
            "His expertise spans the full lifecycle of API documentation: from the design and architecture of the API itself, to writing precise technical specifications, all the way through stakeholder management across every phase of the documentation process. He has the ability to bridge the technical and relational sides of the work: he keeps all stakeholders aligned while never losing sight of the technical details.",
            "One of his most impactful contributions was implementing automation tools and style-checking elements within the API spec review workflow, significantly improving consistency and efficiency across the team.",
            "Beyond his technical skills, Shane is a genuine team player, always up to date with the latest industry standards, attentive to detail, and consistently ready to take on new challenges and support his colleagues.",
            "I highly recommend Shane to any team working on API products: he will bring real, tangible value from day one."
        ]
    },
    {
        name: "Ryan Gonzalez",
        role: "Manager Technical Writing",
        company: "Sabre",
        linkedInUrl: "https://www.linkedin.com/in/ryan-gonzalez-13750225/",
        teaser: "Shane is an industry-best technical writer specializing in a docs-as-code approach, with a voracious appetite for knowledge. He has the unique ability to research, digest information quickly, and then iterate on his findings.",
        fullTextParagraphs: [
            "He has the unique ability to research, digest information quickly, and then iterate on his findings and transform abstract concepts into tangible results, providing solutions that benefit entire teams and organizations.",
            "It was my pleasure to work with Shane directly on several high-profile initiatives, including style guide automation with Vale, AI prompts for technical writing, and several API products in need of documentation. Not only did Shane provide a rare humanistic quality to his approach with automation and docs-as-code, but also ensured that every piece of documentation he worked on met style guide standards and industry-best practices. The teams he worked with only ever had great things to say about him!",
            "Shane’s eagerness to learn, his eye for detail, and his courage to explore the unknown will be a great asset to any team!"
        ]
    },
    {
        name: "Marek Chojecki",
        role: "Senior Technical Writer, Fluke",
        company: "Sabre",
        linkedInUrl: "https://www.linkedin.com/in/mschojecki/",
        teaser: "Working with Shane was a great experience. As an API technical writer, he brings clarity and structure to even the most complex technical concepts. His API-related work is thorough, accurate, and thoughtfully organized.",
        fullTextParagraphs: [
            "He asks the right questions, works closely with SMEs to ensure technical accuracy, and always keeps the end user’s experience in mind.",
            "Beyond his technical writing skills, he is reliable, detail-oriented, and proactive in improving documentation standards and processes. He’s a true team player who elevates the overall quality of common work, and I highly recommend him to any organization looking for a strong API technical writer."
        ]
    },
    {
        name: "Martyna Piskorz-Marciniak",
        role: "Senior Technical Writer",
        company: "Sabre",
        linkedInUrl: "https://www.linkedin.com/in/martynapiskorzmarciniak/",
        teaser: "Shane is an excellent technical writer with outstanding experience and commitment to his work. He can perform very well under tight deadlines and handle multiple projects simultaneously due to his exceptional organizational skills.",
        fullTextParagraphs: [
            "Beyond technical professionalism, Shane is inquisitive and strives to maintain the highest quality of documentation he creates and oversees, continuously researching industry best practices and designing new guidelines for his organization to use in daily work.",
            "I am grateful to have had the opportunity to be part of the technical writing team along with Shane. As colleagues, we directly collaborated on numerous documentation projects and supported each other. Shane was always available to brainstorm ideas together or share important findings. He never hesitated to present his opinion, which I consider a valuable voice given his experience. His unending dedication to pursuing the goals of our organization inspired me to grow as a technical writer myself. I learned a lot watching Shane interact with SMEs, product managers, and other stakeholders.",
            "I am confident that Shane will be an important asset to any team he decides to join. It's not an easy feat to convert complex concepts to clear and actionable documentation - and Shane is a technical writer who can do just that."
        ]
    }
];

function TestimonialCard({ name, role, company, teaser, fullTextParagraphs, linkedInUrl }: Recommendation) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                <h3 className={styles.name} style={{ display: 'flex', alignItems: 'center' }}>
                    {name}
                    <a 
                        href={linkedInUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        style={{ marginLeft: '8px', display: 'inline-flex', alignItems: 'center' }}
                    >
                        <img
                            src={LinkedInIcon}
                            alt={`${name}'s LinkedIn Profile`}
                            style={{ width: '16px', height: '16px', objectFit: 'contain' }}
                        />
</a>
</h3>
<p className={styles.title}>
    {role} {company ? <span>(<strong>{company}</strong>)</span> : ''}
</p>
</div>
<div className={styles.cardBody}>
    <p className={styles.text}>
        "{teaser}"
    </p>

    {isExpanded && (
        <div className={styles.expandedContent}>
            {fullTextParagraphs.map((para, index) => (
                <p key={index} className={styles.textParagraph}>
                    {para}
                </p>
            ))}
        </div>
    )}

    <button
        className={styles.toggleBtn}
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
    >
        {isExpanded ? 'Show Less ↑' : 'Read Full Endorsement ↓'}
    </button>
</div>
</div>
);
}

export default function Testimonials(): JSX.Element {
    return (
        <div className={styles.grid}>
            {testimonialData.map((t, idx) => (
                <TestimonialCard key={idx} {...t} />
            ))}
        </div>
    );
}