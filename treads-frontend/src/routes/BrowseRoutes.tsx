import { lazy } from 'react';
import { Outlet } from 'react-router-dom';
import { SearchProvider } from '@context/SearchContext';
import TableLayout from '@layouts/TableLayout';

// Lazy load components
const AED = lazy(() => import('@views/Browse/AED/AED'));
const AEDTarget = lazy(() => import('@views/Browse/AEDTarget/AEDTarget'));
const Mirnas = lazy(() => import('@views/Browse/miRNas/Mirnas'));
const ProtinFamilies = lazy(
  () => import('@views/Browse/Protein-Families/ProtinFamilies')
);
const DS = lazy(() => import('@views/Browse/Disorders/Ds/Ds'));
const Fcd = lazy(() => import('@views/Browse/Disorders/Fcd/Fcd'));
const HS = lazy(() => import('@views/Browse/Disorders/Hs/Hs'));
const MtleHs = lazy(() => import('@views/Browse/Disorders/Mtle-Hs/MtleHs'));
const Mtle = lazy(() => import('@views/Browse/Disorders/Mtle/Mtle'));
const CommonGenes = lazy(
  () => import('@views/Browse/Disorders/Common-Genes/CommonGenes')
);
const Cae = lazy(() => import('@views/Browse/Disorders/GGE/Cae/Cae'));
const Egtcs = lazy(() => import('@views/Browse/Disorders/GGE/Egtcs/Egtcs'));
const Jae = lazy(() => import('@views/Browse/Disorders/GGE/Jae/Jae'));
const Jme = lazy(() => import('@views/Browse/Disorders/GGE/Jme/Jme'));

const BrowseRoutes = {
  path: '/Browse',
  element: (
    <SearchProvider>
      <TableLayout />
    </SearchProvider>
  ),
  children: [
    {
      path: 'AED',
      element: <AED />,
    },
    {
      path: 'AEDTargets',
      element: <AEDTarget />,
    },
    {
      path: 'Mirnas',
      element: <Mirnas />,
    },
    {
      path: 'ProteinFamilies',
      element: <ProtinFamilies />,
    },
    {
      path: 'Disorders',
      element: <Outlet />,
      children: [
        {
          path: 'DS',
          element: <DS />,
        },
        {
          path: 'FCD',
          element: <Fcd />,
        },
        {
          path: 'HS',
          element: <HS />,
        },
        {
          path: 'MTLE-HS',
          element: <MtleHs />,
        },
        {
          path: 'MTLE',
          element: <Mtle />,
        },
        {
          path: 'CommonGenes',
          element: <CommonGenes />,
        },
        {
          path: 'GGE',
          element: <Outlet />,
          children: [
            {
              path: 'CAE',
              element: <Cae />,
            },
            {
              path: 'JAE',
              element: <Jae />,
            },
            {
              path: 'JME',
              element: <Jme />,
            },
            {
              path: 'EGTCS',
              element: <Egtcs />,
            },
          ],
        },
      ],
    },
  ],
};

export default BrowseRoutes;
