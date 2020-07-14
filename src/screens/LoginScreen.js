import React, { useState } from 'react';
import { ActivityIndicator, AsyncStorage, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { Toast } from 'native-base';
import API from '../api';
import { Block, Button, Input, Text } from '../components';
import { theme } from '../constants';

const INITIAL_MAIL = 'prueba@gmail.com';
const INITIAL_PASSWORD = '1234';

const Login = (props) => {
	const [loading, setLoading] = useState(false);
	const [state, setState] = useState({
		mail: INITIAL_MAIL,
		password: INITIAL_PASSWORD,
		errors: [],
	});

	const { navigation } = props;
	const { errors } = state;
	const hasErrors = (key) => (errors.includes(key) ? styles.hasErrors : null);

	const handleLogin = async () => {
		setLoading(true);
		const { mail, password } = state;

		try {
			// Intentamos pegarle al endpoint de login
			const response = await API.post('/medicos/login', {
				mail,
				password,
			});

			try {
				if (!response.data.token) {
					// Verifico si el response trae el token
					Toast.show({
						text: response.data.message,
						buttonText: 'Ok',
						type: 'danger',
						duration: 3000,
					});
					return;
				}
				AsyncStorage.setItem('token', response.data.token); // se guarda en el asyncStorage que es la memoria de la app
				navigation.navigate('Shifts'); // se va a la pantalla de turnos
			} catch (e) {
				console.log('ERROR LoginScreen [handleLogin]: ', e);
			}
		} catch (error) {
			console.log('Error: ', error.message);
			// Alert.alert("Error", error.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<KeyboardAvoidingView style={styles.login} behavior="height">
			<Block padding={[0, theme.sizes.base * 2]}>
				<Text h1 bold>
					Iniciar Sesión
				</Text>
				<Block middle>
					<Input
						label="Email"
						error={hasErrors('mail')}
						style={[styles.input, hasErrors('mail')]}
						defaultValue={state.mail}
						onChangeText={(text) => setState({ ...state, mail: text })}
					/>
					<Input
						secure
						label="Contraseña"
						error={hasErrors('password')}
						style={[styles.input, hasErrors('password')]}
						defaultValue={state.password}
						onChangeText={(text) => setState({ ...state, password: text })}
					/>
					<Button gradient onPress={handleLogin}>
						{loading ? (
							<ActivityIndicator size="small" color="white" />
						) : (
							<Text bold white center>
								Iniciar Sesión
							</Text>
						)}
					</Button>

					<Button onPress={() => navigation.navigate('Register')}>
						<Text gray caption center style={{ textDecorationLine: 'underline' }}>
							No tenes cuenta? Registrate
						</Text>
					</Button>
				</Block>
			</Block>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	login: {
		flex: 1,
		justifyContent: 'center',
	},
	input: {
		borderRadius: 0,
		borderWidth: 0,
		borderBottomColor: theme.colors.gray2,
		borderBottomWidth: StyleSheet.hairlineWidth,
	},
	hasErrors: {
		borderBottomColor: theme.colors.accent,
	},
});

export default Login;
