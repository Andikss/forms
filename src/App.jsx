import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Progress } from '@chakra-ui/react';

const Login = lazy(() => import('./Pages/Login.jsx'));

const App = () => {
  return (
    <Suspense fallback={<Progress size="xs" isIndeterminate />}>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </Suspense>
  );
};

export default App;