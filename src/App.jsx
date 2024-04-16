import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Progress } from '@chakra-ui/react';

const Login = lazy(() => import('./Pages/Login.jsx'));
const Home = lazy(() => import('./Pages/Home.jsx'));

const App = () => {
  return (
    <Suspense fallback={<Progress size="xs" isIndeterminate />}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Suspense>
  );
};

export default App;