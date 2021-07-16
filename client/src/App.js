import {BrowserRouter, Route, Link, Switch} from 'react-router-dom'
import Index from './pages'

function App() {
	return (
		<BrowserRouter>
			<Route path='/' component={Index} />
		</BrowserRouter>
	)
}

export default App
