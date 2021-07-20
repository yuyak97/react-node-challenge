import {createStore} from 'redux'
import {setProfileReducer} from './reducers/setProfileReducer'

export const configureStore = () => {
	return createStore(setProfileReducer)
}
