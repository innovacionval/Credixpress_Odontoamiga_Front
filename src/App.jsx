import { useRoutes } from 'react-router-dom';
import { ROUTES } from './routes';
import { Simulator } from './pages/simulator/simulator';
import { Form } from './pages/form/form';
import { Document } from './pages/document/document';
import { Layout } from './layout/Layout';
import { NotFound } from './pages/notFound/NotFound';

function App() {
  const element = useRoutes([
    {
      element: <Layout />,
      children: [
        {
          path: ROUTES.HOME,
          element: <Simulator />,
        },
        {
          path: ROUTES.FORM,
          element: <Form />,
        },
        {
          path: ROUTES.DOCUMENT,
          element: <Document />,
        },
      ],
    },
    {
      path: ROUTES.NOT_FOUND,
      element: <NotFound />,
    },
  ]);
  return element;
}

export default App
