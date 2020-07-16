import { Body, Card, CardItem, Content, Form, Text, Textarea, Toast, Button } from 'native-base';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import API from '../api';

const CreatePatientScreen = ({ navigation }) => {
	const [state, setState] = useState({
		nombre: '',
		apellido: '',
		dni: '',
		fechaNacimiento: '',
		obraSocial: '',
		plan: '',
		numAfiliado: '',
		telefono: '',
		antecedentes: [],
		medicacionHabitual: [],
		alergias: [],
		cirugias: [],
	});

	const {
		nombre,
		apellido,
		dni,
		fechaNacimiento,
		obraSocial,
		plan,
		numAfiliado,
		telefono,
		antecedentes,
		medicacionHabitual,
		alergias,
		cirugias,
	} = state;

	async function cargarPaciente() {
		try {
			const response = await API.post('/pacientes', {
				nombre,
				apellido,
				dni,
				fechaNacimiento,
				obraSocial,
				plan,
				numAfiliado,
				telefono,
				antecedentes,
				medicacionHabitual,
				alergias,
				cirugias,
			});
			// Mensaje de exito
			Toast.show({
				text: 'Paciente guardado!',
				buttonText: 'Ok',
				type: 'success',
				duration: 3000,
			});
			// Se le pasa el parametro refresh en true para que en PatientsListScreen se recargue el listado.
			navigation.navigate('PatientsList', { refresh: response.data._id });
		} catch (error) {
			console.error(error);
			// Mensaje de error
			Toast.show({
				text: 'Ocurrió un error al guardar!',
				buttonText: 'Ok',
				type: 'danger',
				duration: 3000,
			});
		}
	}

	return (
		<ScrollView>
			<Content>
				<Card>
					<CardItem header bordered>
						<Text style={styles.header}>Agregar Paciente</Text>
					</CardItem>
					<CardItem>
						<Body>
							<Form>
								<Text style={styles.title}>Nombre:</Text>
								<Textarea
									style={styles.inputMotivo}
									placeholder="nombre"
									onChangeText={(text) => setState({ ...state, nombre: text })}
								/>
							</Form>
							<Text> </Text>
							<Form>
								<Text style={styles.title}>Apellido:</Text>
								<Textarea
									style={styles.inputMotivo}
									placeholder="apellido"
									onChangeText={(text) => setState({ ...state, apellido: text })}
								/>
							</Form>
							<Text> </Text>
							<Form>
								<Text style={styles.title}>DNI:</Text>
								<Textarea
									style={styles.inputMotivo}
									placeholder="dni"
									onChangeText={(text) => setState({ ...state, dni: text })}
								/>
							</Form>
							<Text> </Text>
							<Form>
								<Text style={styles.title}>Fecha de nacimiento:</Text>
								<Textarea
									style={styles.inputMotivo}
									placeholder="dd/mm/yyy"
									onChangeText={(text) => setState({ ...state, fechaNacimiento: text })}
								/>
							</Form>
							<Text> </Text>
							<Form>
								<Text style={styles.title}>Obra social:</Text>
								<Textarea
									style={styles.inputMotivo}
									placeholder="obra social"
									onChangeText={(text) => setState({ ...state, obraSocial: text })}
								/>
							</Form>
							<Text> </Text>
							<Form>
								<Text style={styles.title}>Plan:</Text>
								<Textarea
									style={styles.inputMotivo}
									placeholder="plan"
									onChangeText={(text) => setState({ ...state, plan: text })}
								/>
							</Form>
							<Text> </Text>
							<Form>
								<Text style={styles.title}>N° afiliado:</Text>
								<Textarea
									style={styles.inputMotivo}
									placeholder="numero de afiliado"
									onChangeText={(text) => setState({ ...state, numAfiliado: text })}
								/>
							</Form>
							<Text> </Text>
							<Form>
								<Text style={styles.title}>Telefono:</Text>
								<Textarea
									style={styles.inputMotivo}
									placeholder="telefono"
									onChangeText={(text) => setState({ ...state, telefono: text })}
								/>
							</Form>
							<Text> </Text>
							<Form>
								<Text style={styles.title}>Antecedentes:</Text>
								<Textarea
									style={styles.inputMotivo}
									placeholder="Antecedentes"
									onChangeText={(text) => setState({ ...state, antecedentes: [text] })}
								/>
							</Form>
							<Text> </Text>
							<Form>
								<Text style={styles.title}>Medicacion Habitual:</Text>
								<Textarea
									style={styles.inputMotivo}
									placeholder="medicacion habitual"
									onChangeText={(text) => setState({ ...state, medicacionHabitual: [text] })}
								/>
							</Form>
							<Text> </Text>
							<Form>
								<Text style={styles.title}>Alergias:</Text>
								<Textarea
									style={styles.inputMotivo}
									placeholder="alergias"
									onChangeText={(text) => setState({ ...state, alergias: [text] })}
								/>
							</Form>
							<Text> </Text>
							<Form>
								<Text style={styles.title}>Cirugias:</Text>
								<Textarea
									style={styles.inputMotivo}
									placeholder="cirugias"
									onChangeText={(text) => setState({ ...state, cirugias: [text] })}
								/>
							</Form>
							<Text> </Text>

							<View style={styles.cajaBoton}>
								<Button
									primary
									onPress={() => {
										cargarPaciente();
									}}
								>
									<Text> Guardar </Text>
								</Button>
							</View>
						</Body>
					</CardItem>
				</Card>
			</Content>
		</ScrollView>
	);
};

CreatePatientScreen.navigationOptions = {
	title: 'Crear Paciente',
};

const styles = StyleSheet.create({
	header: {
		fontSize: 24,
	},
	title: {
		fontSize: 18,
		textDecorationLine: 'underline',
	},
	inputMotivo: {
		height: 38,
		paddingTop: 20,
		borderBottomColor: '#ccc',
		borderWidth: 1,
		width: 350,
	},
	inputDescripcion: {
		paddingTop: 20,
		borderBottomColor: '#ccc',
		borderWidth: 1,
		width: 350,
		height: 150,
	},
	cajaBoton: {
		paddingTop: 10,
	},
});

export default CreatePatientScreen;
