import './App.css';
import { Home } from './components/Home';
import {QueryClientProvider, QueryClient} from 'react-query'
import {ReactQueryDevtools } from 'react-query/devtools'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient} >
      <Home />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    
  );
}

export default App;
