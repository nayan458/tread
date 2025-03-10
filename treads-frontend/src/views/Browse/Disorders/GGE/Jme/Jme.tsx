import React from 'react';
import { BaseColumn, JmeData } from 'src/types';
import JmeJsonData from '@db/Browse/Disorders/GGE/JME';
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
  reference: string
): JmeData {
  return {
    uniprotID,
    gene,
    proteinName,
    reference,
  };
}
const rows: JmeData[] = JmeJsonData.data.map((row: JmeData) => {
  return createData(row.uniprotID, row.gene, row.proteinName, row.reference);
});

const Jme: React.FC = () => {
  const { handleSearchByParameter } = useSearch();

  const submit = (value: string) => {
    return handleSearchByParameter(value, 'GeneName');
  };

  return (
    <>
      <Section topic="Juvenile Myoclonic Epilepsy" />
      <ColumnGrouping
        columns={columns}
        rows={rows}
        field="uniprotID"
        handleOnClick={submit}
      />
    </>
  );
};

export default Jme;
