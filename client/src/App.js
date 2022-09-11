import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/home" component={Home} />
       {/*  <Route exact path="/detail" component={} />
        <Route exact path="/newRecipe" component={} /> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
