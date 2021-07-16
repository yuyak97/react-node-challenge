import {BrowserRouter, Route, Link, Switch} from 'react-router-dom'
import Index from './pages/Index'
import Question1 from './pages/Question1'
import Question2 from './pages/Question2'
import Question3 from './pages/Question3'

function App() {
	return (
		<BrowserRouter>
			<Route exact path='/' component={Index} />
			<Route path='/question1' component={Question1} />
			<Route path='/question2' component={Question2} />
			<Route path='/question3' component={Question3} />
		</BrowserRouter>
	)
}

export default App
