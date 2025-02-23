import ColumnGroupingTable from '@components/Tables/MUI/ColumnGroupingTable';
import React from 'react';
import { AedTargetData, BaseColumn } from 'src/types';
import AedTargetJsonData from '@db/Browse/AEDTarget.json';
import Section from '@components/Sections/Section';

const columns: BaseColumn[] = [
    { 
        id: 'Protein',
        label: 'Protein',
        minWidth: 170 
    },
    { 
        id: 'AntiEpilepticDrug',
         label: 'Anti\u00a0Epileptic\u00a0Drug',
         minWidth: 100 
    },
    { 
        id: 'DrugBankID',
        label: 'Drug\u00a0Bank\u00a0ID',
        minWidth: 170,

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
  return(<>
    <Section topic="Anti-Epileptic Drug Targets" />
    <ColumnGroupingTable columns = {columns} rows={rows} field='Protein'/>
  </>);
};

export default AEDTarget;

