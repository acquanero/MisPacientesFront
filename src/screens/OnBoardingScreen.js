import React, { useEffect } from 'react';
import { AsyncStorage, View } from 'react-native';
import LoadingSpinner from '../components/LoadingSpinner';

const LOGGED_USER_REDIRECT = 'App';
const NOT_LOGGED_USER_REDIRECT = 'Auth';

export default ({ navigation }) => {
	useEffect(() => {
		AsyncStorage.getItem('token').then((token) => {
			// Verifica si el usuario tiene un token en el dispositivo
			if (token) {
				// Si existe se envia a la pantalla de App
				navigation.navigate(LOGGED_USER_REDIRECT);
			} else {
				// Si no existe el token, se redirige al Login
				navigation.navigate(NOT_LOGGED_USER_REDIRECT);
			}
		});
	}, []);

	return (
		<View>
			<LoadingSpinner />
		</View>
	);
};
