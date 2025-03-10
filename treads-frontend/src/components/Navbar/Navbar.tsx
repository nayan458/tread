import React from 'react';

import DropDownLinks from './DropDownLinks';
import LeftNavLink from './LeftNavLink';
import Search from '@components/Search/Search';

interface URLItem {
  to?: string;
  label: string;
  dropDown?: boolean;
  urls?: URLItem[]; // This allows for nested dropdown URLs
}

const Navbar: React.FC = () => {
  const urls: URLItem[] = [
    { to: '/Home', label: 'Home' },
    // {
    //   dropDown: true,
    //   label: 'Search',
    //   urls: [
    //     { to: '/Search/UniProtID', label: 'Uni Prot ID' },
    //     { to: '/Search/GeneName', label: 'Gene Name' },
    //     { to: '/Search/EnsemblID', label: 'Ensembl ID' },
    //   ],
    // },
    {
      dropDown: true,
      label: 'Browse',
      urls: [
        { to: '/Browse/AED', label: 'AED' },
        { to: '/Browse/AEDTargets', label: 'AED Targets' },
        { to: '/Browse/ProteinFamilies', label: 'Protein Families' },
        { to: '/Browse/miRNAs', label: 'miRNAs' },
        {
          dropDown: true,
          label: 'Disorder',
          urls: [
            { to: '/Browse/Disorders/MTLE', label: 'MTLE' },
            { to: '/Browse/Disorders/FCD', label: 'FCD' },
            { to: '/Browse/Disorders/HS', label: 'HS' },
            { to: '/Browse/Disorders/MTLE-HS', label: 'MTLE-HS' },
            { to: '/Browse/Disorders/DS', label: 'DS' },
            {
              dropDown: true,
              label: 'GGE',
              urls: [
                { to: '/Browse/Disorders/GGE/CAE', label: 'CAE' },
                { to: '/Browse/Disorders/GGE/JAE', label: 'JAE' },
                { to: '/Browse/Disorders/GGE/JME', label: 'JME' },
                { to: '/Browse/Disorders/GGE/EGTCS', label: 'EGTCS' },
              ],
            },
            { to: '/Browse/Disorders/Common', label: '' },
            { to: '/Browse/Disorders/Genes', label: '' },
          ],
        },
      ],
    },
    { to: '/MLPredictions', label: 'ML Predictions' },
    { to: '/EpilepsyAssociatedGenes', label: 'Epilepsy Associated Genes' },
    {
      to: '/EpilepsyAssociatedPathways',
      label: 'Epilepsy Associated Pathways',
    },
  ];

  return (
    <nav className="flex flex-col bg-background-secondary p-4 pt-12 space-y-2">
      <Search />
      {urls.map((url, index) => {
        if (url.dropDown) {
          return (
            <DropDownLinks key={index} label={url.label} urls={url.urls!} />
          );
        } else if (url.to) {
          return <LeftNavLink key={index} to={url.to} label={url.label} />;
        }
        return <>Hello</>;
      })}
    </nav>
  );
};

export default Navbar;
