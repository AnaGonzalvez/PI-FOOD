import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import CreationForm from './components/CreationForm';
import Detail from './components/Detail';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/home/:id" component={Detail} />
        <Route exact path="/newRecipe" component={CreationForm} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
