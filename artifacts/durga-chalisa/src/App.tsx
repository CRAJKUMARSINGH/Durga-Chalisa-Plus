import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import NotFound from '@/pages/not-found';
import ChalisaReader from '@/pages/ChalisaReader';
import LandingPage from '@/pages/LandingPage';
import { Route, Switch, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/reader" component={ChalisaReader} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
        <Router />
      </WouterRouter>
    </QueryClientProvider>
  );
}

export default App;
