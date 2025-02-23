import ColumnGroupingTable from '@components/Tables/MUI/ColumnGroupingTable';
import React from 'react';
import { BaseColumn, JmeData } from 'src/types';
import JmeJsonData from '@db/Browse/Disorders/GGE/JME.json';
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
  ): JmeData {
    return { 
        uniprotID,
        gene,
        proteinName,
        reference
    };
  }
  const rows: JmeData[] = JmeJsonData.data.map((row: JmeData) => {
    return createData(
        row.uniprotID,
        row.gene,
        row.proteinName,
        row.reference,
    );
  });

  

const Jme: React.FC = () => {
  return(<>
    <Section topic="Juvenile Myoclonic Epilepsy" />
    <ColumnGroupingTable columns = {columns} rows={rows} field='uniprotID'/>
  </>);
};

export default Jme;