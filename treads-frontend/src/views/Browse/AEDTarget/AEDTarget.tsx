import React from 'react';
import { AedTargetData, BaseColumn } from 'src/types';
import AedTargetJsonData from '@db/Browse/AEDTarget.json';
import Section from '@components/Sections/Section';
import ColumnGrouping from '@components/Tables/MUI/ColumnGrouping';
import { useSearch } from '@context/SearchContext';

const columns: BaseColumn[] = [
    { 
        id: 'Protein',
        label: 'Protein',
        type: 'button',
        minWidth: 170 
    },
    { 
        id: 'AntiEpilepticDrug',
         label: 'Anti\u00a0Epileptic\u00a0Drug',
         minWidth: 100,
    },
    { 
        id: 'DrugBankID',
        label: 'Drug\u00a0Bank\u00a0ID',
        minWidth: 170,
        type: 'link',
        baseUrl: 'https://go.drugbank.com/drugs/'

    },
    { 
        id: 'Status',
        label: 'Status',
        minWidth: 170,

    },
  ];

  function createData(
    Protein: string,
    AntiEpilepticDrug: string,
    DrugBankID: string,
    Status: string,
  ): AedTargetData  {
    return { Protein,AntiEpilepticDrug,DrugBankID,Status};
  }
  const rows: AedTargetData[] = AedTargetJsonData.AedTargets.map((row: AedTargetData) => {
    return createData(row.Protein,row.AntiEpilepticDrug,row.DrugBankID,row.Status);
  });

  

const AEDTarget: React.FC = () => {

  const { handleSearchByParameter } = useSearch();

  const submit=(value: string)=>{

    return handleSearchByParameter(value,'GeneName') 
  }

  return(<>
    <Section topic="Anti-Epileptic Drug Targets" />
    <ColumnGrouping columns = {columns} rows={rows} field='Protein' handleOnClick={submit}/>
  </>);
};

export default AEDTarget;

