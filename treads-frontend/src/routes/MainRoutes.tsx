import ExampleComponent from "@components/research/Example";
import GraphsLayout from "@components/research/GraphLayout";
import { SearchProvider } from "@context/SearchContext";
import { TOCProvider } from "@context/TOCContext";
import BaseLayout from "@layouts/BaseLayout";
import TableLayout from "@layouts/TableLayout";
import EAG from "@views/EAG/EAG";
import PageNotFound from "@views/Error/PageNotFound";
import Home from "@views/Home/Home";
import Result from "@views/Result/Result";
import SearchComponent from "@views/Search/Search";
import { Navigate, Outlet } from "react-router-dom";


const MainRoutes = {
  path: '/',
  element: <>
    <Outlet/>
  </>
  ,
  children: [
    {
      path: '/',
      element: 
        <TOCProvider>
          <BaseLayout/>
        </TOCProvider>,
      children : [
        {
          path: '/',
          element: <Navigate to='/home'/>,
        },
        {
          path: '/home',
          element: <Home/>,
        },
      ]
    },
    {
      path: '/',
      element: <TableLayout/>,
      children: [
        {
          path: '/EpilepsyAssociatedGenes',
          element: <EAG/>,
        },
        {
          path: '/results',
          element: <GraphsLayout />
        },
        {
          path: '/example',
          element: <ExampleComponent />
        }
      ]
    },
    {
      path: '/',
      element: 
        <SearchProvider>
          <TableLayout/>
        </SearchProvider>,
      children: [
        {
          path: '/search',
          element: <SearchComponent/>
        },
        {
          path: '/result',
          element: <Result/>
        },
      ]
    },
    {
      path: "*",
      element: <PageNotFound />,
    },
  ],
};

export default MainRoutes;
