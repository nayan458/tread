import React from 'react';
import { AedData, LinkColumn } from 'src/types';
import AedJsonData from '@db/Browse/AED.json';
import Section from '@components/Sections/Section';
import ColumnGroupingTable from '@components/Tables/MUI/ColumnGroupingTableProps';

const columns: LinkColumn[] = [
    { 
        id: 'drugBankID',
        label: 'Drug\u00a0Bank\u00a0ID',
        type: 'link',
        minWidth: 170,
        baseUrl:  'https://go.drugbank.com/drugs/'
    },
    { 
        id: 'AEDName',
         label: 'AED\u00a0Name',
         minWidth: 100 
    },
    { 
        id: 'targetGene',
        label: 'Target\u00a0Gene',
        minWidth: 170,

    },
    { 
        id: 'status',
        label: 'Status',
        minWidth: 170,

    },
  ];

  function createData(
    drugBankID: string,
    AEDName: string,
    targetGene: string,
    status: string,
    link: string
  ): AedData  {
    return { drugBankID,AEDName,targetGene,status, link};
  }
  const rows: AedData[] = AedJsonData.AED.map((row: AedData) => {
    return createData(row.drugBankID,row.AEDName,row.targetGene,row.status,row.link);
  });

  

const AED: React.FC = () => {
  return(<>
    <Section topic="Anti-Epileptic Drugs" />
    <ColumnGroupingTable columns = {columns} rows={rows} field='drugBankID'/>
  </>);
};

export default AED;

