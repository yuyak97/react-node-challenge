export const setProfileReducer = (state = {}, action) => {
	switch (action.type) {
		case 'SET_PROFILE':
			return {
				...state,
				profile: action.profile,
			}
		default:
			return state
	}
}
