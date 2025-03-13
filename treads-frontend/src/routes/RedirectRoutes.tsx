import { Navigate } from 'react-router-dom';

const RedirectRoutes = {
  path: '',
  children: [
    {
      path: '/',
      element: <Navigate to="/home" />,
    },
    {
      path: '/DS',
      element: <Navigate to="/Browse/Disorders/DS" />,
    },
    {
      path: '/FCD',
      element: <Navigate to="/Browse/Disorders/FCD" />,
    },
    {
      path: '/HS',
      element: <Navigate to="/Browse/Disorders/HS" />,
    },
    {
      path: '/MTLE-HS',
      element: <Navigate to="/Browse/Disorders/MTLE-HS" />,
    },
    {
      path: '/MTLE',
      element: <Navigate to="/Browse/Disorders/MTLE" />,
    },
    {
      path: '/CommonGenes',
      element: <Navigate to="/Browse/Disorders/CommonGenes" />,
    },
    {
      path: '/CAE',
      element: <Navigate to="/Browse/Disorders/GGE/CAE" />,
    },
    {
      path: '/JAE',
      element: <Navigate to="/Browse/Disorders/GGE/JAE" />,
    },
    {
      path: '/JME',
      element: <Navigate to="/Browse/Disorders/GGE/JME" />,
    },
    {
      path: '/EGTCS',
      element: <Navigate to="/Browse/Disorders/GGE/EGTCS" />,
    },
    {
      path: '/commonGenes',
      element: <Navigate to="/Browse/Disorders/CommonGenes" />,
    },
  ],
};

export default RedirectRoutes;
