import './App.css';
import Home from './pages/Home';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
import PhotoUpload from './pages/PhotoUpload';
import PhotoList from './pages/PhotoList';
import Photo from './pages/Photo';
import NavBar from './components/NavBar';
import PageNotFound from './components/PageNotFound';

function App() {
  return (
        <Router>
            <div className="App">
                <NavBar />
                <div id="page-body">
                    <Switch>
                        <Route path="/" component={Home} exact />
                        <Route path="/photoUpload" component={PhotoUpload} />
                        <Route path="/photoList" component={PhotoList} />
                        <Route path="/photo/:id" component={Photo} />
                        <Route component={PageNotFound} />
                    </Switch>
                </div>
            </div>
        </Router>
  );
}

export default App;
