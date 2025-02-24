import React from 'react';
import { BaseColumn, DsData } from 'src/types';
import HSJsonData from '@db/Browse/Disorders/HS.json'
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
  ): DsData  {
    return { 
        uniprotID,
        gene,
        proteinName,
        reference
    };
  }
  const rows: DsData[] = HSJsonData.data.map((row: DsData) => {
    return createData(
        row.uniprotID,
        row.gene,
        row.proteinName,
        row.reference,
    );
  });

  

const HS: React.FC = () => {
  return(<>
    <Section topic="Hippocampal Sclerosis (HS)" />
    <ColumnGroupingTable columns = {columns} rows={rows} field='uniprotID'/>
  </>);
};

export default HS;