import { useEffect, useContext } from 'react'
import { Navigate } from 'react-router-dom';

import UserContext from '../context/UserContext';

export default function Logout() {
	const { setUser, unsetUser } = useContext(UserContext)

	unsetUser();

	//PLacing the "setUser" function inside of a useEffect is necessary  because a state of another component cannot b e updated while trying to render a different component
	// By adding the useEffect, this will allow the logout page to render first before triggering the useEffect which changes the state of our user
	useEffect(() => {
		//Set the user state back to it's initial value.
		setUser({
			id: null, 
			isAdmin: null
		});
	})

	return(
		<Navigate to="/login" />
	)
}