import React from 'react';
import { BaseColumn, EAGData } from 'src/types';
import EAGJsonData from '@db/EAG/EAG';
import Section from '@components/Sections/Section';
import ColumnGrouping from '@components/Tables/MUI/ColumnGrouping';
import { useSearch } from '@context/SearchContext';

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
  { id: 'disorder', label: 'Disorder', minWidth: 170 },
  {
    id: 'reference',
    label: 'Reference',
    minWidth: 170,
    type: 'link',
    baseUrl: 'https://pubmed.ncbi.nlm.nih.gov/',
  },
];

function createData(
  uniprotID: string,
  gene: string,
  proteinName: string,
  disorder: string,
  reference: string
): EAGData {
  return {
    uniprotID,
    gene,
    proteinName,
    disorder,
    reference,
  };
}
const rows: EAGData[] = EAGJsonData.data.map((row: EAGData) => {
  return createData(
    row.uniprotID,
    row.gene,
    row.proteinName,
    row.disorder,
    row.reference
  );
});

const EAG: React.FC = () => {
  const { handleSearchByParameter } = useSearch();

  const submit = (value: string) => {
    return handleSearchByParameter(value, 'GeneName');
  };
  return (
    <>
      <Section topic="Epilepsy Associated Genes" />
      <ColumnGrouping
        columns={columns}
        rows={rows}
        field="uniprotID"
        handleOnClick={submit}
      />
    </>
  );
};

export default EAG;
