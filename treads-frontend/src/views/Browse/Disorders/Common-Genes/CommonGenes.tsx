import React from 'react';
import { BaseColumn, CommonGenesData, CommonGenesDataRaw } from 'src/types';
import data from '@db/temp/temp';
import Section from '@components/Sections/Section';
import ColumnGrouping from '@components/Tables/MUI/ColumnGrouping';
import { useSearch } from '@context/SearchContext';
import CommonGeneSearch from './CommonGeneSearchBar';

const columns: BaseColumn[] = [
  {id: 'uniprotid',label: 'Uniprot\u00a0ID',minWidth: 170,type: 'link',baseUrl: 'https://www.uniprot.org/uniprotkb/'},
  {id: 'genename', label: 'Gene', minWidth: 170, type: 'button' },
  {id: 'proteinname', label: 'Protein\u00a0Name', minWidth: 170 },
  {id: 'references',label: 'Reference',minWidth: 170,type: 'link',baseUrl: 'https://pubmed.ncbi.nlm.nih.gov/'},
];

function createData(
  uniprotid: string,
  genename: string,
  proteinname: string,
  references: string
): CommonGenesData {
  return {
    uniprotid,
    genename,
    proteinname,
    references,
  };
}

const rows: CommonGenesData[] = data.map((row: CommonGenesDataRaw) => {
    const references = row.references.map(ref => `PMID: ${ref}`).join("; ");
    return createData(
        row.uniprotid, 
        row.genename, 
        row.proteinname, 
        references
    );
});

const CommonGenes: React.FC = () => {
  const { handleSearchByParameter } = useSearch();

  const submit = (value: string) => {
    return handleSearchByParameter(value, 'GeneName');
  };

  

  return (
    <>
      <Section topic="Common Genes" />
      <CommonGeneSearch/>
      <ColumnGrouping
        columns={columns}
        rows={rows}
        field="uniprotID"
        handleOnClick={submit}
      />
    </>
  );
};

export default CommonGenes;
