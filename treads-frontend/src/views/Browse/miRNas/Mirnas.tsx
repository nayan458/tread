import ColumnGroupingTable from '@components/Tables/MUI/ColumnGroupingTable';
import React from 'react';
import { MirnasData, BaseColumn } from 'src/types';
import MirnaJsonData from '@db/Browse/Mirnas.json';
import Section from '@components/Sections/Section';

const columns: BaseColumn[] = [
    { 
        id: 'mirna',
        label: 'miRNA',
        minWidth: 170 
    },
    { 
        id: 'targetGenes',
        label: 'Target\u00a0Genes',
        minWidth: 170,

    },
    { 
        id: 'experiment',
         label: 'Experiment',
         minWidth: 100 
    },
    { 
        id: 'reference',
        label: 'Reference',
        minWidth: 170,

    },
  ];

  function createData(
    mirna: string,
    experiment: string,
    targetGenes: string,
    reference: string,
  ): MirnasData  {
    return { mirna,experiment,targetGenes,reference};
  }
  const rows: MirnasData[] = MirnaJsonData.data.map((row: MirnasData) => {
    return createData(row.mirna,row.experiment,row.targetGenes,row.reference);
  });

  

const Mirnas: React.FC = () => {
  return(<>
    <Section topic="miRNAs and their Target Genes (Epilepsy Associated)" />
    <ColumnGroupingTable columns = {columns} rows={rows} field='targetGenes'/>
  </>);
};

export default Mirnas; 

