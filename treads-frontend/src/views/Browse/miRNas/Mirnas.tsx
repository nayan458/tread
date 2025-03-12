import React, { Suspense } from 'react';
import { MirnasData, BaseColumn } from 'src/types';
import MirnaJsonData from '@db/Browse/Mirnas';
import Section from '@components/Sections/Section';
import { useSearch } from '@context/SearchContext';
import CircularProgess from '@components/Spinner/CircularProgess';

const ColumnGrouping = React.lazy(() => import('@components/Tables/MUI/ColumnGrouping'));

const columns: BaseColumn[] = [
  {
    id: 'mirna',
    label: 'miRNA',
    minWidth: 170,
  },
  {
    id: 'targetGenes',
    label: 'Target\u00a0Genes',
    minWidth: 170,
    type: 'button',
  },
  {
    id: 'experiment',
    label: 'Experiment',
    minWidth: 100,
  },
  {
    id: 'reference',
    label: 'Reference',
    minWidth: 170,
    type: 'link',
    baseUrl: 'https://pubmed.ncbi.nlm.nih.gov/',
  },
];

const rows: MirnasData[] = MirnaJsonData?.data || [];

const Mirnas: React.FC = () => {
  const { handleSearchByParameter } = useSearch();

  const submit = (value: string) => {
    return handleSearchByParameter(value, 'GeneName');
  };

  return (
    <>
      <Section topic="miRNAs and their Target Genes (Epilepsy Associated)" />
      <Suspense fallback={<CircularProgess />}>
        <ColumnGrouping
          columns={columns}
          rows={rows}
          field="targetGenes"
          handleOnClick={submit}
        />
      </Suspense>
    </>
  );
};

export default Mirnas;
