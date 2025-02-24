import React from 'react';
import { BaseColumn, CaeData } from 'src/types';
import CaeJsonData from '@db/Browse/Disorders/GGE/CAE.json';
import Section from '@components/Sections/Section';
import ColumnGroupingTable from '@components/Tables/MUI/ColumnGroupingTableProps';

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
  ): CaeData {
    return { 
        uniprotID,
        gene,
        proteinName,
        reference
    };
  }
  const rows: CaeData[] = CaeJsonData.data.map((row: CaeData) => {
    return createData(
        row.uniprotID,
        row.gene,
        row.proteinName,
        row.reference,
    );
  });

  

const Cae: React.FC = () => {
  return(<>
    <Section topic="Childhood Absence Epilepsy" />
    <ColumnGroupingTable columns = {columns} rows={rows} field='uniprotID'/>
  </>);
};

export default Cae;