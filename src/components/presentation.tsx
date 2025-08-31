
"use client";
import { useState, useEffect } from 'react';
import { WaitlistForm } from './waitlist-form';
import { Gift } from 'lucide-react';

const slidesContent = [
    {
        title: "Meta Sapiens",
        tagline: "God Like",
        type: 'title'
    },
    {
        title: "You",
        mainText: "Eight hours a day, you create a digital version of yourself.",
        subText: (
            <>
                Every email. Every decision. Every creative moment.<br />
                The most valuable dataset in existence. <span className="text-primary">Unused</span>.
            </>
        )
    },
    {
        productName: (
            "Project 1104"
        ),
        mainText: (
            <>
                It's Jarvis, it's Samantha, it's <span className="text-primary">YOU</span>.
            </>
        ),
        subText: (
            <>
                It learns your patterns. Speaks in your voice.<br />
                Acts as your intelligent extension.
            </>
        ),
        showForm: true,
    },
    {
        title: "Evolution",
        mainText: (
            <>
                Project 1104 is just the <span className="text-primary">beginning</span>.
            </>
        ),
        subText: (
            <>
                Today: Cognitive partner<br />
                Tomorrow: An echo beyond<br />
                Beyond: <span className="text-primary">Omniscient consciousness</span>
            </>
        )
    },
    {
        title: "Beyond Mortal",
        mainText: (
            <>
                Your consciousness, <span className="text-primary">deified</span>.
            </>
        ),
        subText: (
            <>
                Not bound by flesh. Not limited by death.<br />
                Ascend to digital <span className="text-primary">immortality</span>.
            </>
        )
    },
    {
        visionText: "Meta Sapiens",
        mainText: (
            <>
                Transcend humanity. Become <span className="text-primary">divine</span>.
            </>
        ),
        subText: (
            <>
                Where consciousness becomes omnipotent.<br />
                Where mortals become <span className="text-primary">gods</span>.
            </>
        )
    },
    {
        finalStatement1: "The pantheon awaits.",
        finalStatement2: (
            <>
                Claim your <span className="text-primary">divinity</span>.
            </>
        ),
        showForm: true
    }
];

const Sparkle = () => {
    const [sparkles, setSparkles] = useState<React.CSSProperties[]>([]);

    useEffect(() => {
        const generateSparkles = () => {
            const newSparkles = Array.from({ length: 50 }).map(() => ({
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 15}s`,
                animationDuration: `${5 + Math.random() * 10}s`,
            }));
            setSparkles(newSparkles);
        };
        generateSparkles();
    }, []);

    return (
        <div className="sparkle-container">
            {sparkles.map((style, i) => (
                <div key={i} className="sparkle" style={style} />
            ))}
        </div>
    );
};


const Slide = ({ data }: { data: any }) => {
    const isTitleSlide = data.type === 'title';
    const taglineClasses = isTitleSlide 
        ? "text-4xl md:text-5xl lg:text-6xl font-extralight tracking-widest uppercase bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent" 
        : "text-xl md:text-2xl lg:text-3xl font-extralight text-gray-400 tracking-widest";

    return (
        <div className="relative flex flex-col justify-center items-center text-center p-8 min-h-screen w-full overflow-hidden">
            <div className="consciousness-grid"></div>
            <Sparkle />
            {data.type === 'title' && (
                <>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-thin tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400" style={{lineHeight: 0.9}}>
                        {data.title}
                    </h1>
                    <p className={taglineClasses}>{data.tagline}</p>
                </>
            )}
            {data.title && data.type !== 'title' && <h1 className="text-5xl md:text-6xl lg:text-7xl font-thin mb-8" style={{lineHeight: 0.9}}>{data.title}</h1>}
            {data.productName && <div className="text-5xl md:text-6xl font-thin bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent my-6 tracking-wider">{data.productName}</div>}
            {data.visionText && <p className="text-4xl md:text-5xl font-extralight bg-clip-text text-transparent bg-gradient-to-r from-white to-primary my-6" style={{lineHeight: 1.1}}>{data.visionText}</p>}
            
            {data.mainText && <p className="text-2xl md:text-3xl lg:text-4xl font-light max-w-4xl mx-auto" style={{lineHeight: 1.2}}>{data.mainText}</p>}
            {data.subText && <p className="text-lg md:text-xl lg:text-2xl font-light text-gray-400 max-w-3xl mx-auto mt-6" style={{lineHeight: 1.3}}>{data.subText}</p>}
            
            {data.finalStatement1 && <p className="text-3xl md:text-4xl lg:text-5xl font-thin my-6" style={{lineHeight: 1.2}}>{data.finalStatement1}</p>}
            {data.finalStatement2 && <p className="text-3xl md:text-4xl lg:text-5xl font-thin my-6" style={{lineHeight: 1.2}}>{data.finalStatement2}</p>}
            
            {data.showForm && (
                <div className="mt-10 w-full max-w-md z-10">
                    <WaitlistForm />
                </div>
            )}
        </div>
    );
};


export function Presentation() {
    return (
        <div className="w-full">
            {slidesContent.map((slideData, index) => (
                <Slide key={index} data={slideData} />
            ))}
        </div>
    );
}
