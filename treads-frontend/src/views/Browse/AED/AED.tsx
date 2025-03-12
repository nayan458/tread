import React, { lazy, Suspense } from 'react';
import { AedData, LinkColumn } from 'src/types';
import Section from '@components/Sections/Section';

import AEDJsonData from '@db/Browse/AED';
import CircularProgess from '@components/Spinner/CircularProgess';

const ColumnGroupingTable = lazy(() => import('@components/Tables/MUI/ColumnGroupingTableProps'));

const columns: LinkColumn[] = [
  {
    id: 'drugBankID',
    label: 'Drug\u00a0Bank\u00a0ID',
    type: 'link',
    minWidth: 170,
    baseUrl: 'https://go.drugbank.com/drugs/',
  },
  {
    id: 'AEDName',
    label: 'AED\u00a0Name',
    minWidth: 100,
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

const rows: AedData[] = AEDJsonData?.AED?.map((row) => ({
  ...row,
  drugBankID: row.drugBankID, // Ensure it's correctly mapped
})) || []; // Prevent errors if AEDJsonData.AED is undefined

const AED: React.FC = () => {
  return (
    <>
      <Section topic="Anti-Epileptic Drugs" />
      <Suspense fallback={<CircularProgess/>}>
        <ColumnGroupingTable columns={columns} rows={rows} field="drugBankID" />
      </Suspense>
    </>
  );
};

export default AED;
