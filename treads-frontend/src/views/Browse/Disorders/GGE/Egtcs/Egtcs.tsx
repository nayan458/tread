import React, { Suspense } from 'react';
import { BaseColumn, EgtcsData } from 'src/types';
import EgtcsJsonData from '@db/Browse/Disorders/GGE/EGTCS';
import Section from '@components/Sections/Section';
import { useSearch } from '@context/SearchContext';
import CircularProgess from '@components/Spinner/CircularProgess';

const ColumnGrouping = React.lazy(
  () => import('@components/Tables/MUI/ColumnGrouping')
);

const columns: BaseColumn[] = [
  {
    id: 'uniprotID',
    label: 'Uniprot\u00a0ID',
    minWidth: 170,
    type: 'link',
    baseUrl: 'https://www.uniprot.org/uniprotkb/',
  },
  { id: 'gene', label: 'Gene', minWidth: 170, type: 'button' },
  { id: 'proteinName', label: 'Protein\u00a0Name', minWidth: 170 },
  {
    id: 'reference',
    label: 'Reference',
    minWidth: 170,
    type: 'link',
    baseUrl: 'https://pubmed.ncbi.nlm.nih.gov/',
  },
];

const rows: EgtcsData[] = EgtcsJsonData?.data || [];

const Egtcs: React.FC = () => {
  const { handleSearchByParameter } = useSearch();

  const submit = (value: string) => {
    return handleSearchByParameter(value, 'GeneName');
  };

  return (
    <>
      <Section topic="Epilepsy with Generalized Tonic-Clonic Seizures" />
      <Suspense fallback={<CircularProgess />}>
        <ColumnGrouping
          columns={columns}
          rows={rows}
          field="uniprotID"
          handleOnClick={submit}
          data={EgtcsJsonData.data}
        />
      </Suspense>
    </>
  );
};

export default Egtcs;
