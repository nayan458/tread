import ColumnGroupingTable from '@components/Tables/MUI/ColumnGroupingTable';
import React from 'react';
import { BaseColumn, MtleshData } from 'src/types';
import MtleJsonData from '@db/Browse/Disorders/MTLE.json'
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
  ): MtleshData {
    return { 
        uniprotID,
        gene,
        proteinName,
        reference
    };
  }
  const rows: MtleshData[] = MtleJsonData.data.map((row: MtleshData) => {
    return createData(
        row.uniprotID,
        row.gene,
        row.proteinName,
        row.reference,
    );
  });

  

const MtleHs: React.FC = () => {
  return(<>
    <Section topic="Mesial Temporal Lobe Epilepsy-Hippocampal Sclerosis (HS)" />
    <ColumnGroupingTable columns = {columns} rows={rows} field='uniprotID'/>
  </>);
};

export default MtleHs;