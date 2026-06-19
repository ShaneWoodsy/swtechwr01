import React, { useState, useRef, useEffect } from 'react';
import styles from './Marquee.module.css';

interface Recommendation {
    name: string;
    role: string;
    text: string;
}

const recommendations: Recommendation[] = [
    {
        name: "Heiner Preiss",
        role: "Principal API Designer, Sabre",
        text: "I had the pleasure of working closely with Shane at Sabre, where he consistently demonstrated a rare blend of deep systems knowledge and documentation excellence. Shane doesn’t just 'write'—he builds. A standout example of his technical finesse was our work on implementing the automatic enforcement of the Sabre API Style Guide. Using Vale CLI and a custom ruleset, Shane helped transform our standards from a static document into a functional part of the CI/CD pipeline.\n" +
            "\n" +
            "His background in infrastructure means he speaks the same language as our architects and engineers, eliminating the 'translation gap' usually found in technical writing. Shane is disciplined, highly reliable, and brings a rigorous, code-centric mindset to everything he touches. I highly recommend him to any team looking for a writer who truly understands the architecture they are documenting."
    },
    {
        name: "Saverio Cirillo",
        role: "Senior Technical Writer, Ververica, ex-Sabre",
        text: "I had the pleasure of working alongside Shane on the same team, and I can confidently say he is one of the best API professionals I have collaborated with.\n" +
            "\n" +
            "His expertise spans the full lifecycle of API documentation: from the design and architecture of the API itself, to writing precise technical specifications, all the way through stakeholder management across every phase of the documentation process. He has the ability to bridge the technical and relational sides of the work: he keeps all stakeholders aligned while never losing sight of the technical details.\n" +
            "\n" +
            "One of his most impactful contributions was implementing automation tools and style-checking elements within the API spec review workflow, significantly improving consistency and efficiency across the team.\n" +
            "\n" +
            "Beyond his technical skills, Shane is a genuine team player, always up to date with the latest industry standards, attentive to detail, and consistently ready to take on new challenges and support his colleagues.\n" +
            "\n" +
            "I highly recommend Shane to any team working on API products: he will bring real, tangible value from day one.\n"
    },
    {
        name: "Ryan Gonzalez",
        role: "Manager Technical Writing, ex-Sabre",
        text: "Shane is an industry-best technical writer specializing in a docs-as-code approach, with a voracious appetite for knowledge. He has the unique ability to research, digest information quickly, and then iterate on his findings and transform abstract concepts into tangible results, providing solutions that benefit entire teams and organizations.\n" +
            "\n" +
            "It was my pleasure to work with Shane directly on several high-profile initiatives, including style guide automation with Vale, AI prompts for technical writing, and several API products in need of documentation. Not only did Shane provide a rare humanistic quality to his approach with automation and docs-as-code, but also ensured that every piece of documentation he worked on met style guide standards and industry-best practices. The teams he worked with only ever had great things to say about him!\n" +
            "\n" +
            "Shane’s eagerness to learn, his eye for detail, and his courage to explore the unknown will be a great asset to any team! "
    },
    {
        name: "Marek Chojecki",
        role: "Senior Technical Writer, Fluke, ex-Sabre",
        text: "Working with Shane was a great experience. As an API technical writer, he brings clarity and structure to even the most complex technical concepts.\n" +
            "\n" +
            "His API-related work is thorough, accurate, and thoughtfully organized. He asks the right questions, works closely with SMEs to ensure technical accuracy, and always keeps the end user’s experience in mind.\n" +
            "\n" +
            "Beyond his technical writing skills, he is reliable, detail-oriented, and proactive in improving documentation standards and processes. He’s a true team player who elevates the overall quality of common work, and I highly recommend him to any organization looking for a strong API technical writer. "
    },
    {
        name: "Martyna Piskorz-Marciniak",
        role: "Senior Technical Writer, ex-Sabre",
        text: "Shane is an excellent technical writer with outstanding experience and commitment to his work. He can perform very well under tight deadlines and handle multiple projects simultaneously due to his exceptional organizational skills. Beyond technical professionalism, Shane is inquisitive and strives to maintain the highest quality of documentation he creates and oversees, continuously researching industry best practices and designing new guidelines for his organization to use in daily work.\n" +
            "\n" +
            "I am grateful to have had the opportunity to be part of the technical writing team along with Shane. As colleagues, we directly collaborated on numerous documentation projects and supported each other. Shane was always available to brainstorm ideas together or share important findings. He never hesitated to present his opinion, which I consider a valuable voice given his experience. His unending dedication to pursuing the goals of our organization inspired me to grow as a technical writer myself. I learned a lot watching Shane interact with SMEs, product managers, and other stakeholders.\n" +
            "\n" +
            "I am confident that Shane will be an important asset to any team he decides to join. It's not an easy feat to convert complex concepts to clear and actionable documentation - and Shane is a technical writer who can do just that.\n"
    }

];

export default function Marquee(): JSX.Element {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isPaused, setIsPaused] = useState(false);

    // Scroll amount per click (Card width 500px + 50px total margins = 550px)
    const handleScroll = (direction: 'left' | 'right') => {
        if (containerRef.current) {
            setIsPaused(true); // Temporarily pause automated animation loop on click interaction
            const scrollAmount = direction === 'left' ? -550 : 550;
            containerRef.current.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className={styles.wrapperContainer}>
            {/* MANUAL CONTROLS OVERLAID */}
            <button onClick={() => handleScroll('left')} className={`${styles.navButton} ${styles.leftBtn}`} aria-label="Previous recommendation">◀</button>
            <button onClick={() => handleScroll('right')} className={`${styles.navButton} ${styles.rightBtn}`} aria-label="Next recommendation">▶</button>

            <div
                ref={containerRef}
                className={`${styles.marqueeContainer} ${isPaused ? styles.pausedAnimation : ''}`}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                <div className={styles.marqueeTrack}>
                    {[...recommendations, ...recommendations].map((rec, index) => (
                        <div
                            key={index}
                            className={styles.marqueeCard}
                            style={{
                                width: '500px',
                                minWidth: '500px',
                                flexShrink: 0,
                                margin: '0 25px',
                                padding: '25px',
                                background: '#434e5f',
                                border: '1px solid #303846',
                                borderRadius: '12px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between'
                            }}
                        >
                            <div className={styles.quote}>
                                <p style={{ margin: 0, fontStyle: 'italic', color: '#e3e8f0' }}>"{rec.text}"</p>
                            </div>
                            <div className={styles.meta} style={{ marginTop: '20px', paddingTop: '15px', borderTop: '1px solid #303846' }}>
                                <h4 className={styles.author} style={{ margin: '0 0 5px 0', fontWeight: 'bold', color: '#fff' }}>{rec.name}</h4>
                                <span className={styles.role} style={{ fontSize: '0.85rem', color: '#8a99ad' }}>{rec.role}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}