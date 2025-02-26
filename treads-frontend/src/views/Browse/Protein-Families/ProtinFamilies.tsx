import Section from '@components/Sections/Section';
import React from 'react';
import ProtinPiChart from './ProtinPieChart';

const ProtinFamilies: React.FC = () => {
  return (<>
    <Section topic='Protein Families of Anti-Epileptic Drug Targets'/>
    <ProtinPiChart/>
  </>);
};

export default ProtinFamilies;