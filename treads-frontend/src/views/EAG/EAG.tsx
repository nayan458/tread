import ColumnGroupingTable from '@components/Tables/MUI/ColumnGroupingTable';
import React from 'react';
import { BaseColumn, EAGData } from 'src/types';
import EAGJsonData from '@db/EAG/EAG.json'
import Section from '@components/Sections/Section';

const columns: BaseColumn[] = [
    { id: 'uniprotID', label: 'Uniprot\u00a0ID', minWidth: 170 },
    { id: 'gene', label: 'Gene', minWidth: 170 },
    { id: 'proteinName', label: 'Protein\u00a0Name', minWidth: 170 },
    { id: 'disorder', label: 'Disorder', minWidth: 170 },
    { id: 'reference', label: 'Reference', minWidth: 170 },
  ];

  function createData(
    uniprotID: string,
    gene: string,
    proteinName: string,
    disorder: string,
    reference: string,
  ): EAGData  {
    return { 
        uniprotID,
        gene,
        proteinName,
        disorder,
        reference
    };
  }
  const rows: EAGData[] = EAGJsonData.data.map((row: EAGData) => {
    return createData(
        row.uniprotID,
        row.gene,
        row.proteinName,
        row.disorder,
        row.reference,
    );
  });

  

const EAG: React.FC = () => {
  return(<>
    <Section topic="Epilepsy Associated Genes" />
    <ColumnGroupingTable columns = {columns} rows={rows} field='uniprotID'/>
  </>);
};

export default EAG;

