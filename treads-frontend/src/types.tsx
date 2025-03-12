// Table of content Types

export interface TOCItem {
  id: string;
  title: string;
  level: number;
  element?: HTMLElement;
}

// Bar Graph Types

export enum search_id {
  'UniprotID',
  'GeneName',
  'EnsemblID',
  'Sequence',
  '',
}

export interface searchTermType {
  gene: string;
  search_id: string;
}

export interface graphData {
  data: JSON[] | null;
  layout: {
    xaxis_title: string;
    yaxis_title: string;
  };
}

export interface SearchResultType {
  gene_id?: string;
  articles?: JSON;
  label?: string | null;
  table?: {
    Value: Record<string, string | number>;
  } | null;
  aed_dict?: JSON;
  num_articles?: number | null;
  graphs?: {
    graph_1?: graphData;
    graph_2?: graphData;
    graph_3?: graphData;
    graph_4?: graphData;
    graph_5?: graphData;
  } | null;
  epilepsy_associated_pathways?: string | null;
  ml_predictions?: JSON | null;
}

// ColumnGroupingTable Content Types

export interface LinkCell {
  href: string;
  value: string;
}

export interface BaseColumn {
  id: string;
  label: string;
  minWidth?: number;
  baseUrl?: string | '#';
  type?: 'button' | 'link';
  align?: 'right' | 'left' | 'center';
  format?: (value: number) => string;
}

export interface LinkColumn {
  id: string;
  label: string;
  minWidth?: number;
  type?: 'button' | 'link';
  align?: 'right' | 'left' | 'center';
  link?: string;
  baseUrl?: string;
  format?: (value: number) => string;
  // handleOnClick?: (value: string, searchID: string) => handleSearchByParameter
}

export interface Data {
  name: string;
  code: string;
  population: number;
  size: number;
  density: number;
  [key: string]: string | number;
}

export interface AedData {
  drugBankID: string;
  AEDName: string;
  targetGene: string;
  status: string;
  link: string;
  [key: string]: string | number;
}

export interface AedTargetData {
  Protein: string;
  AntiEpilepticDrug: string;
  DrugBankID: string;
  Status: string;
  [key: string]: string | number;
}

export interface MirnasData {
  mirna: string;
  targetGenes: string;
  experiment: string;
  reference: string;
  [key: string]: string | number;
}

export interface MtleData {
  uniprotID: string;
  gene: string;
  proteinName: string;
  reference: string;
  [Key: string]: string | number;
}

export interface DsData {
  uniprotID: string;
  gene: string;
  proteinName: string;
  reference: string;
  [key: string]: string | number;
}

export interface HsData {
  uniprotID: string;
  gene: string;
  proteinName: string;
  reference: string;
  [key: string]: string | number;
}

export interface MtleshData {
  uniprotID: string;
  gene: string;
  proteinName: string;
  reference: string;
  [key: string]: string | number;
}

export interface FcdData {
  uniprotID: string;
  gene: string;
  proteinName: string;
  reference: string;
  [key: string]: string | number;
}

// GGE

export interface CaeData {
  uniprotID: string;
  gene: string;
  proteinName: string;
  reference: string;
  [key: string]: string | number;
}

export interface JaeData {
  uniprotID: string;
  gene: string;
  proteinName: string;
  reference: string;
  [key: string]: string | number;
}

export interface JmeData {
  uniprotID: string;
  gene: string;
  proteinName: string;
  reference: string;
  [key: string]: string | number;
}

export interface EgtcsData {
  uniprotID: string;
  gene: string;
  proteinName: string;
  reference: string;
  [key: string]: string | number;
}

export interface CommonGenesData {
  uniprotid: string;
  genename: string;
  proteinname: string;
  references: string;
  [key: string]: string;
}

export interface CommonGenesDataRaw {
  uniprotid: string;
  genename: string;
  proteinname: string;
  references: string[];
  [key: string]: string | string[];
}

export interface CommonDisordersType {
  uniprotID: string;
  genen: string;
  proteinName: string;
  reference: string;
  [key: string]: string | number;
}

// EAG

export interface EAGData {
  uniprotID: string;
  gene: string;
  proteinName: string;
  disorder: string;
  reference: string;
  [key: string]: string | number;
}

export interface ResultData {
  columnOne: string;
  columnTwo: string;
  [key: string]: string | number;
}

// EAP

export interface EAPData {
  uniprotid: string;
  genename: string;
  uniprotname: string;
  [key: string]: string | number;
}
