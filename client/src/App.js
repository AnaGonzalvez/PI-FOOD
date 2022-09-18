import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import CreationForm from './components/CreationForm/CreationForm';
import Detail from './components/Detail/Detail';

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
