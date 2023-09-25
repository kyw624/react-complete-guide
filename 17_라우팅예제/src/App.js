import {
  createBrowserRouter,
  RouterProvider,
  // createRoutesFromElements,
  // Route,
} from 'react-router-dom';

import Home from './pages/Home';
import Products from './pages/Products';

// // JSX 코드 솔루션
// const routeDefinitions = createRoutesFromElements(
//   <Route>
//     <Route path='/' element={<Home />} />
//     <Route path='/products' element={<Products />} />
//   </Route>
// );
//
// const router = createBrowserRouter(routeDefinitions);

// React Router v6.4 ~ 객체 기반 솔루션
const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/products', element: <Products /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
