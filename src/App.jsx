import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Progress } from '@chakra-ui/react';

const Login    = lazy(() => import('./Pages/Login.jsx'));
const Home     = lazy(() => import('./Pages/Home.jsx'));
const Form     = lazy(() => import('./Pages/Form.jsx'));
const Detail   = lazy(() => import('./Pages/Detail.jsx'));
const Response = lazy(() => import('./Pages/Response.jsx'));

const App = () => {
  return (
    <Suspense fallback={<Progress size="xs" isIndeterminate />}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/:slug" element={<Form />} />
        <Route path="/:slug/detail" element={<Detail />} />
        <Route path="/:slug/responses" element={<Response />} />
      </Routes>
    </Suspense>
  );
};

export default App;