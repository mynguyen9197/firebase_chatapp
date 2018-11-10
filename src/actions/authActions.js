import { googleProvider } from '../config/fbConfig'

export const loginWithEmailPass = (credentials) => {
	return (dispatch, getState, {getFirebase}) => {
		const firebase = getFirebase();

		firebase.auth().signInWithEmailAndPassword(
			credentials.email,
			credentials.password 
		).then(() => {
			dispatch({ type: 'LOGIN_SUCCESS' })
		}).catch((err) => {
			dispatch({ type: 'LOGIN_ERROR', err })
		})
	}
}

export const loginWithGoogle = () => {
	return (dispatch, getState, {getFirebase}) => {
		const firebase = getFirebase();

		firebase.auth().signInWithPopup(googleProvider)
		.then(() => {
			dispatch({ type: 'LOGIN_SUCCESS' })
		}).catch((err) => {
			dispatch({ type: 'LOGIN_ERROR', err })
		})
	}
}

export const logOut = () => {
	return (dispatch, getState, { getFirebase }) => {
		const firebase = getFirebase();

		firebase.auth().signOut().then(() => {
			dispatch({ type: 'LOGOUT_SUCCESS' })
		});
	}
}

export const SignUp = (newUser) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		const firebase = getFirebase;
		const firestore = getFirestore;

		firebase.auth().createUserWithEmailAndPassword(
			newUser.email,
			newUser.password
		).then((res) => {
			return firestore.collection('users').doc(res.user.uid).set({
				username: newUser.username,
				email: newUser.email,
				password: newUser.password,
				status: newUser.status
			})
		}).then(() => {
			dispatch({ type: 'SIGNUP_SUCCESS' })
		}).catch((err) => {
			dispatch({ type: 'SIGNUP_ERROR', err })
		})
	}
}