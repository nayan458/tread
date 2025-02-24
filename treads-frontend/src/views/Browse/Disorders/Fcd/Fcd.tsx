import React from 'react';
import { BaseColumn, FcdData } from 'src/types';
import FcdJsonData from '@db/Browse/Disorders/FCD.json';
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
  ): FcdData {
    return { 
        uniprotID,
        gene,
        proteinName,
        reference
    };
  }
  const rows: FcdData[] = FcdJsonData.data.map((row: FcdData) => {
    return createData(
        row.uniprotID,
        row.gene,
        row.proteinName,
        row.reference,
    );
  });

  

const Fcd: React.FC = () => {
  return(<>
    <Section topic="Focal Cortical Dysplasia (FCD)" />
    <ColumnGroupingTable columns = {columns} rows={rows} field='uniprotID'/>
  </>);
};

export default Fcd;