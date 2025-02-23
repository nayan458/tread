import ColumnGroupingTable from '@components/Tables/MUI/ColumnGroupingTable';
import React from 'react';
import { BaseColumn, MtleData } from 'src/types';
import Section from '@components/Sections/Section';
import MtleJsonData from '@db/Browse/Disorders/MTLE.json';

const columns: BaseColumn[] = [
    { 
        id: 'uniprotID',
        label: 'Uniprot\u00a0ID',
        minWidth: 170 
    },
    { 
        id: 'gene',
        label: 'Genes',
        minWidth: 170,

    },
    { 
        id: 'proteinName',
         label: 'Protein\u00a0Name',
         minWidth: 100 
    },
    { 
        id: 'reference',
        label: 'Reference',
        minWidth: 170,

    },
  ];

  function createData(
    uniprotID: string,
    gene: string,
    proteinName: string,
    reference: string,
  ): MtleData  {
    return { uniprotID,gene,proteinName,reference};
  }
  const rows: MtleData[]  = MtleJsonData.data.map((row: MtleData) => {
    return createData(
        row.uniprotID,
        row.gene,
        row.proteinName,
        row.reference
    );
  });

  

const Mirnas: React.FC = () => {
  return(<>
    <Section topic="Mesial Temporal Lobe Epilepsy (MTLE)" />
    <ColumnGroupingTable columns = {columns} rows={rows} field='uniprotID'/>
  </>);
};

export default Mirnas; 

