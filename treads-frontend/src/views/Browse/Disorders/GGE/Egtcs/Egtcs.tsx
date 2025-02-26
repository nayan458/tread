import React from 'react';
import { BaseColumn, EgtcsData } from 'src/types';
import EgtcsJsonData from '@db/Browse/Disorders/GGE/EGTCS.json';
import Section from '@components/Sections/Section';
import ColumnGrouping from '@components/Tables/MUI/ColumnGrouping';
import { useSearch } from '@context/SearchContext';

const columns: BaseColumn[] = [
    { id: 'uniprotID', label: 'Uniprot\u00a0ID', minWidth: 170 },
    { id: 'gene', label: 'Gene', minWidth: 170, type: 'button' },
    { id: 'proteinName', label: 'Protein\u00a0Name', minWidth: 170 },
    { id: 'reference', label: 'Reference', minWidth: 170 },
  ];

  function createData(
    uniprotID: string,
    gene: string,
    proteinName: string,
    reference: string,
  ): EgtcsData {
    return { 
        uniprotID,
        gene,
        proteinName,
        reference
    };
  }
  const rows: EgtcsData[] = EgtcsJsonData.data.map((row: EgtcsData) => {
    return createData(
        row.uniprotID,
        row.gene,
        row.proteinName,
        row.reference,
    );
  });

  

const Egtcs: React.FC = () => {

  const { handleSearchByParameter } = useSearch();
  
  const submit=(value: string)=>{

    return handleSearchByParameter(value,'GeneName') 
  }

  return(<>
    <Section topic="Epilepsy with Generalized Tonic-Clonic Seizures" />
    <ColumnGrouping columns = {columns} rows={rows} field='uniprotID' handleOnClick={submit}/>
  </>);
};

export default Egtcs;