import { CardItem, Content, Text } from 'native-base';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';

const CreateAppointmentScreen = ({ navigation }) => {
	const goToNextStep = (dia) => {
		navigation.navigate('CreateAppointmentTwo', { dia });
	};

	return (
		<ScrollView>
			<Content>
				<CardItem header bordered>
					<Text style={styles.header}>Seleccione la fecha:</Text>
				</CardItem>
				<Calendar
					onDayPress={({ dateString }) => {
						goToNextStep(dateString);
					}}
				/>
			</Content>
		</ScrollView>
	);
};

CreateAppointmentScreen.navigationOptions = {
	title: 'Crear turno',
};

const styles = StyleSheet.create({
	header: {
		fontSize: 24,
	},
	title: {
		fontSize: 18,
		textDecorationLine: 'underline',
	},
	inputDato: {
		height: 38,
		paddingTop: 20,
		borderBottomColor: '#ccc',
		borderWidth: 1,
		width: 350,
	},
	cajaBoton: {
		flexDirection: 'row',
		alignContent: 'center',
		paddingTop: 10,
	},
	estiloBoton: {
		marginRight: 20,
	},
});

export default CreateAppointmentScreen;
