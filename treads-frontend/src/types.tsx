export interface TOCItem {
    id: string;
    title: string;
    level: number;
    element?: HTMLElement;
  }

export interface searchTermType {
    gene: string,
    search_id: string
}

export interface BaseColumn {
    id: string;
    label: string;
    minWidth?: number;
    type?: 'button' | 'link';
    align?: 'right' | 'left' | 'center';
    format?: (value: number) => string;
}

export interface LinkColumn {
    id: string;
    label: string;
    link?: string;
    minWidth?: number;
    type?: 'button' | 'link';
    align?: 'right' | 'left' | 'center';
    format?: (value: number) => string;
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

// EAG

export interface EAGData {
    uniprotID: string;
    gene: string;
    proteinName: string;
    disorder: string;
    reference: string;
    [key: string]: string | number;
}

export interface  ResultData {
    columnOne: string;
    columnTwo: string;
    [key: string]: string | number;
}