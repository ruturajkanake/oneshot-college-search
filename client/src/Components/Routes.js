import { BrowserRouter, Route, Switch} from "react-router-dom";
import Dashboard from './Dashboard/Dashboard';
import CollegeList from './CollegeList/CollegeList';
import CollegeDetails from './CollegeDetails/CollegeDetails';
import StudentsList from './StudentsList/StudentsList';

function App() {
  return (
    <div>
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Dashboard}></Route>
                <Route exact path='/college' render={(props) => <CollegeList {...props}/>}></Route>
                <Route exact path='/college/:collegeId' render={(props) => <CollegeDetails {...props}/>}></Route>
                <Route exact path='/student/:collegeId' component={StudentsList}></Route>
            </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;
