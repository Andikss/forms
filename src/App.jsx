import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Progress } from '@chakra-ui/react';
import Detail from './Pages/Detail.jsx';

const Login = lazy(() => import('./Pages/Login.jsx'));
const Home  = lazy(() => import('./Pages/Home.jsx'));

const App = () => {
  return (
    <Suspense fallback={<Progress size="xs" isIndeterminate />}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/:slug/detail" element={<Detail />} />
      </Routes>
    </Suspense>
  );
};

export default App;