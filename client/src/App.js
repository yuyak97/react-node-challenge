import {BrowserRouter, Route, Link, Switch} from 'react-router-dom'
import CountryPage from './pages/CountryPage'
import Index from './pages/Index'
import Question1 from './pages/Question1'
import Question2 from './pages/Question2'
import Question3 from './pages/Question3'

function App() {
	return (
		<BrowserRouter>
			<Route exact path='/' component={Index} />
			<Route exact path='/question1' component={Question1} />
			<Route exact path='/question2' component={Question2} />
			<Route exact path='/question3' component={Question3} />
			<Route path={'/country/:countryName'} component={CountryPage}></Route>
		</BrowserRouter>
	)
}

export default App
