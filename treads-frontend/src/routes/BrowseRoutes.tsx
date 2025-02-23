import TableLayout from "@layouts/TableLayout";
import AED from "@views/Browse/AED/AED";
import AEDTarget from "@views/Browse/AEDTarget/AEDTarget";
import DS from "@views/Browse/Disorders/Ds/Ds";
import Fcd from "@views/Browse/Disorders/Fcd/Fcd";
import Cae from "@views/Browse/Disorders/GGE/Cae/Cae";
import Egtcs from "@views/Browse/Disorders/GGE/Egtcs/Egtcs";
import Jae from "@views/Browse/Disorders/GGE/Jae/Jae";
import Jme from "@views/Browse/Disorders/GGE/Jme/Jme";
import HS from "@views/Browse/Disorders/Hs/Hs";
import MtleHs from "@views/Browse/Disorders/Mtle-Hs/MtleHs";
import Mtle from "@views/Browse/Disorders/Mtle/Mtle";
import Mirnas from "@views/Browse/miRNas/Mirnas";
import { Outlet } from "react-router-dom";


const BrowseRoutes = {
  path: '/Browse',
  element: <TableLayout/>,
  children: [
    {
      path: 'AED',
      element: <AED/> ,
    },
    {
      path: 'AEDTargets',
      element: <AEDTarget /> ,
    },
    {
      path: 'Mirnas',
      element: <Mirnas /> ,
    },
    {
      path: 'Disorders',
      element: <>
        <Outlet/>
      </> ,
      children: [
        {
          path: 'Dcd',
          element: <> Need to be completed</>
        },
        {
          path: 'DS',
          element: <DS />
        },
        {
          path: 'FCD',
          element: <Fcd />
        },
        {
          path: 'HS',
          element: <HS/>
        },
        {
          path: 'MTLE-HS',
          element: <MtleHs/>
        },
        {
          path: 'MTLE',
          element: <Mtle/>
        },
        {
          path: 'GGE',
          element: <>
            <Outlet/>
            </>,
          children: [
            {
              path: 'CAE',
              element: <Cae />
            },
            {
              path: 'JAE',
              element: <Jae />
            },
            {
              path: 'JME',
              element: <Jme />
            },
            {
              path: 'EGTCS',
              element: <Egtcs />
            },
          ]
        }
      ]
    },
  ],
};

export default BrowseRoutes;
