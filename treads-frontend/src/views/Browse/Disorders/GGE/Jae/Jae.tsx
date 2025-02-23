import ColumnGroupingTable from '@components/Tables/MUI/ColumnGroupingTable';
import React from 'react';
import { BaseColumn, JaeData } from 'src/types';
import JaeJsonData from '@db/Browse/Disorders/GGE/JAE.json';
import Section from '@components/Sections/Section';

const columns: BaseColumn[] = [
    { id: 'uniprotID', label: 'Uniprot\u00a0ID', minWidth: 170 },
    { id: 'gene', label: 'Gene', minWidth: 170 },
    { id: 'proteinName', label: 'Protein\u00a0Name', minWidth: 170 },
    { id: 'reference', label: 'Reference', minWidth: 170 },
  ];

  function createData(
    uniprotID: string,
    gene: string,
    proteinName: string,
    reference: string,
  ): JaeData {
    return { 
        uniprotID,
        gene,
        proteinName,
        reference
    };
  }
  const rows: JaeData[] = JaeJsonData.data.map((row: JaeData) => {
    return createData(
        row.uniprotID,
        row.gene,
        row.proteinName,
        row.reference,
    );
  });

  

const Jae: React.FC = () => {
  return(<>
    <Section topic="Juvenile Absence Epilepsy" />
    <ColumnGroupingTable columns = {columns} rows={rows} field='uniprotID'/>
  </>);
};

export default Jae;