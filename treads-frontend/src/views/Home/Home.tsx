import Section from '@components/Sections/Section';
import { useHeadings } from '@hooks/useHeading';
import React from 'react';

const Home: React.FC = () => {

  useHeadings();

  const content = [
    {
      topic: "Welcome to TREADS",
      description: [
        "TREADS (Target REsearch for Anti-epileptic drugs using Data Science) is a tool developed to enable user to search for known Anti-epileptic drugs (AEDs) & AED targets, and even to identify if a given protein can be a potential drug target or not. Predicting potential drug targets can be helpful in accelerating drug discovery process. "
      ],
      list: [
        "For every human protein (reviewed), various properties such as physico-chemical & structural, post-translational modifications etc., have been either extracted or calculated.",
        "This information is used to train different machine learning algorithms for druggable features.",
        "In the test data, the number of known drug targets that are accurately predicted are analyzed.",
        "Different statistical techniques are used to assess the performance of each machine learning algorithm."

      ]
    },
    {
      topic: "About Epilepsy",
      description: [
        "Epilepsy is a chronic non-communicable disease of the brain that is characterized by recurrent seizures. Seizure episodes are a result of excessive electrical discharges in a group of brain cells. These are brief episodes of involuntary movement that may involve a part of the body (partial) or the entire body (generalized). They are sometimes accompanied by loss of consciousness and control of bowel or bladder function.",
        "As per WHO, 50 million people worldwide are affected by Epilepsy. It is estimated that there are more than 10 million persons with epilepsy in India (Dixit et al 2017). Various factors such as infection, stroke, traumatic brain injury, brain tumors, cerebral ischemia, and importantly, mutations in genes that are crucial for the development, migration, and function of neurons and glia may cause seizures and lead to the development of epilepsy."
      ]
    },
    {
      topic: "About Our Project",
      description: [
        "The objective of the project is to identify potential drug targets in AED-resistant patients using data science approaches. Various properties such as physico-chemical & structural features, post-translational modifications, etc., have been extracted or calculated for each human protein. These features are used to train different machine learning algorithms for druggable features, helping to predict potential drug targets."
      ]
    },
    {
      topic: "About TREADS",
      description: [
        "TREADS is a tool developed to enable users to search for known Anti-epileptic drugs (AEDs) & AED targets, and even identify if a given protein can be a potential drug target. Predicting potential drug targets can be helpful in accelerating the drug discovery process. For prediction, various features are extracted or calculated for every human protein (reviewed), such as physico-chemical, structural properties, and post-translational modifications. This data is used to train machine learning algorithms to predict druggable features.", ]
    },
    {
      topic: "Why TREADS Matters",
      description: [
        "More than 25 Anti-epileptic drugs (AEDs) are available in the market. However, 30% of epileptic patients are resistant to AEDs, meaning they fail to respond to drugs despite appropriate dosage and treatment duration. Understanding the molecular mechanisms causing drug resistance is essential. There are ongoing studies to identify epilepsy-associated genes and possible alternate targets in resistant patients, and TREADS is a step forward in this critical research."
      ]
    }
  ];

    return (
      
      <main className="max-w-screen-md lg:max-w-screen-lg mx-auto scrollbar-hide">
        {
          content.map((section, index) => (
            <Section key={index} topic={section.topic} description={section.description} list={section.list}/>
          ))
        }
      </main>
    
      );
};

export default Home;