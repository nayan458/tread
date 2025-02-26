import React from 'react';

interface UserProps {
    topic: string;
    description?: string[];
    list?: string[];
}

const Section: React.FC<UserProps> = ({topic, description, list}) => {
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
            {
                list &&
                list.map((item,index) => (
                    <ul className='pl-8'>
                        <li 
                            className="
                                text-base 
                                sm:text-md lg:text-lg 
                                leading-relaxed 
                                sm:leading-loose 
                                mt-3 sm:mt-4 
                                text-secondary 
                                list-disc"
                            key={index} 
                            >{item}</li>
                    </ul>
                ))
            }
        </section>

  </>);
};

export default Section;