import { createBrowserRouter } from 'react-router-dom';
import MainRoutes from './MainRoutes';
import BrowseRoutes from './BrowseRoutes';

const router = createBrowserRouter([
    MainRoutes,
    BrowseRoutes
]);

export default router;
