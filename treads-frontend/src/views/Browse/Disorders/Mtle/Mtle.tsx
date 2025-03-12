import React, { Suspense } from 'react';
import { BaseColumn, MtleData } from 'src/types';
import Section from '@components/Sections/Section';
import MtleJsonData from '@db/Browse/Disorders/MTLE';
import { useSearch } from '@context/SearchContext';
import CircularProgess from '@components/Spinner/CircularProgess';

const ColumnGrouping = React.lazy(() => import('@components/Tables/MUI/ColumnGrouping'));

const columns: BaseColumn[] = [
  {
    id: 'uniprotID',
    label: 'Uniprot\u00a0ID',
    minWidth: 170,
  },
  {
    id: 'gene',
    label: 'Genes',
    minWidth: 170,
    type: 'button',
  },
  {
    id: 'proteinName',
    label: 'Protein\u00a0Name',
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

const rows: MtleData[] = MtleJsonData?.data || [];

const Mirnas: React.FC = () => {
  const { handleSearchByParameter } = useSearch();

  const submit = (value: string) => {
    return handleSearchByParameter(value, 'GeneName');
  };

  return (
    <>
      <Section topic="Mesial Temporal Lobe Epilepsy (MTLE)" />
      <Suspense fallback={<CircularProgess/>}>
      <ColumnGrouping
        columns={columns}
        rows={rows}
        field="uniprotID"
        handleOnClick={submit}
      />
      </Suspense>
    </>
  );
};

export default Mirnas;
