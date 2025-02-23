import React from 'react';

interface UserProps {
    topic: string;
    description?: string[];
}

const Section: React.FC<UserProps> = ({topic,description}) => {
  return (<>
        <section className="mb-10 text-gray-800 dark:text-gray-200">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-4 text-primary">
                {topic}
            </h2>
            {description &&
                description.map((desc, index) => (
                    <p
                    className="text-base sm:text-lg lg:text-xl leading-relaxed sm:leading-loose mt-3 sm:mt-4 text-secondary"
                    key={index}
                    >
                        {desc}
                    </p>
                ))
            }
        </section>

  </>);
};

export default Section;