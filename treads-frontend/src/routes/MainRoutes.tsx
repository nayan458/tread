import { SearchProvider } from '@context/SearchContext';
import { TOCProvider } from '@context/TOCContext';
import BaseLayout from '@layouts/BaseLayout';
import TableLayout from '@layouts/TableLayout';
import EAG from '@views/EAG/EAG';
import EAP from '@views/EAP/EAP';
import PageNotFound from '@views/Error/PageNotFound';
import Home from '@views/Home/Home';
import Result from '@views/Result/Result';
import { Navigate, Outlet } from 'react-router-dom';

const MainRoutes = {
  path: '/',
  element: (
    <>
      <SearchProvider>
        <Outlet />
      </SearchProvider>
    </>
  ),
  children: [
    {
      path: '/',
      element: (
        <TOCProvider>
          <BaseLayout />
        </TOCProvider>
      ),
      children: [
        {
          path: '/',
          element: <Navigate to="/home" />,
        },
        {
          path: '/home',
          element: <Home />,
        },
      ],
    },
    {
      path: '/',
      element: <TableLayout />,
      children: [
        {
          path: '/EpilepsyAssociatedGenes',
          element: <EAG />,
        },
        {
          path: '/EpilepsyAssociatedPathways',
          element: <EAP />,
        },
        {
          path: '/result',
          element: <Result />,
        },
      ],
    },
    {
      path: '*',
      element: <PageNotFound />,
    },
  ],
};

export default MainRoutes;
