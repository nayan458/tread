import { lazy } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { SearchProvider } from '@context/SearchContext';
import { TOCProvider } from '@context/TOCContext';
import BaseLayout from '@layouts/BaseLayout';
import TableLayout from '@layouts/TableLayout';

// Lazy-loaded views
const EAG = lazy(() => import('@views/EAG/EAG'));
const EAP = lazy(() => import('@views/EAP/EAP'));
const PageNotFound = lazy(() => import('@views/Error/PageNotFound'));
const Home = lazy(() => import('@views/Home/Home'));
const Result = lazy(() => import('@views/Result/Result'));

const MainRoutes = {
  path: '/',
  element: (
    <SearchProvider>
      <Outlet />
    </SearchProvider>
  ),
  children: [
    {
      element: (
        <TOCProvider>
          <BaseLayout />
        </TOCProvider>
      ),
      children: [
        {
          index: true,
          element: <Navigate to="home" />,
        },
        {
          path: 'home',
          element: (
              <Home />
          ),
        },
      ],
    },
    {
      element: <TableLayout />,
      children: [
        {
          path: 'EpilepsyAssociatedGenes',
          element: (
              <EAG />
          ),
        },
        {
          path: 'EpilepsyAssociatedPathways',
          element: (
              <EAP />
          ),
        },
        {
          path: 'result',
          element: (
              <Result />
          ),
        },
      ],
    },
    {
      path: '*',
      element: (
          <PageNotFound />
      ),
    },
  ],
};

export default MainRoutes;
