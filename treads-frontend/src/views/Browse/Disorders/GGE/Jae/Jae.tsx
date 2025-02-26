import React from 'react';
import { BaseColumn, JaeData } from 'src/types';
import JaeJsonData from '@db/Browse/Disorders/GGE/JAE.json';
import Section from '@components/Sections/Section';
import ColumnGrouping from '@components/Tables/MUI/ColumnGrouping';
import { useSearch } from '@context/SearchContext';

const columns: BaseColumn[] = [
    { id: 'uniprotID', label: 'Uniprot\u00a0ID', minWidth: 170, type: 'link', baseUrl: 'https://www.uniprot.org/uniprotkb/'},
    { id: 'gene', label: 'Gene', minWidth: 170, type: 'button' },
    { id: 'proteinName', label: 'Protein\u00a0Name', minWidth: 170 },
    { id: 'reference', label: 'Reference', minWidth: 170, type: 'link', baseUrl: 'https://pubmed.ncbi.nlm.nih.gov/'},
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

  const { handleSearchByParameter } = useSearch();
  
  const submit=(value: string)=>{

    return handleSearchByParameter(value,'GeneName') 
  }

  return(<>
    <Section topic="Juvenile Absence Epilepsy" />
    <ColumnGrouping columns = {columns} rows={rows} field='uniprotID' handleOnClick={submit}/>
  </>);
};

export default Jae;