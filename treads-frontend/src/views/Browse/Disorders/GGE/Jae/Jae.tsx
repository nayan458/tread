import React, { Suspense } from 'react';
import { BaseColumn, JaeData } from 'src/types';
import JaeJsonData from '@db/Browse/Disorders/GGE/JAE';
import Section from '@components/Sections/Section';
import { useSearch } from '@context/SearchContext';
import CircularProgess from '@components/Spinner/CircularProgess';

const ColumnGrouping = React.lazy(() => import('@components/Tables/MUI/ColumnGrouping'));

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

const rows: JaeData[] = JaeJsonData?.data || [];

const Jae: React.FC = () => {
  const { handleSearchByParameter } = useSearch();

  const submit = (value: string) => {
    return handleSearchByParameter(value, 'GeneName');
  };

  return (
    <>
      <Section topic="Juvenile Absence Epilepsy" />
      <Suspense fallback={<CircularProgess />}> 
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

export default Jae;
