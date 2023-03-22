import './App.css';
import { Home } from './components/Home';
import {QueryClientProvider, QueryClient} from 'react-query'
import {ReactQueryDevtools } from 'react-query/devtools'
import { Route, Routes } from "react-router-dom"
import { Login } from './components/Login';

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient} >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
