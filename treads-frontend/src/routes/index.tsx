import { createBrowserRouter } from 'react-router-dom';
import MainRoutes from './MainRoutes';
import BrowseRoutes from './BrowseRoutes';
import RedirectRoutes from './RedirectRoutes';

const router = createBrowserRouter([
    MainRoutes, 
    BrowseRoutes, 
    RedirectRoutes
]);

export default router;
