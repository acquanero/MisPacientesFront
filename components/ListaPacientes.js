import React from "react";
import { StyleSheet, View, ActivityIndicator, FlatList, Text, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { RectButton, ScrollView } from 'react-native-gesture-handler';


export default class ListaPacientes extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: "Source Listing",
            headerStyle: { backgroundColor: "#fff" },
            headerTitleStyle: { textAlign: "center", flex: 1 }
        };
    };
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            dataSource: []
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(a) {
        console.log("hiciste click" + a);
      }

    componentDidMount(){
        fetch("http://localhost:3000/api/pacientes")
        .then(response => response.json())
        .then((responseJson)=> {
          this.setState({
           loading: false,
           dataSource: responseJson
          })
        })
        .catch(error=>console.log(error))
        }

    FlatListItemSeparator = () => {
        return (
            <View style={{
                height: .5,
                width: "100%",
                backgroundColor: "rgba(0,0,0,0.5)",
            }}
            />
        );
    }
    renderItem = (data) =>
        <TouchableOpacity style={styles.list}  onClick={this.handleClick}>
            <Text style={styles.lightText}>Nombre: {data.item.apellido}, {data.item.nombre}</Text>
            <Text style={styles.lightText}>DNI: {data.item.dni}</Text>
            <Text style={styles.lightText}>O.S: {data.item.obraSocial}</Text>
            <Text style={styles.lightText}>N° afiliado: {data.item.numAfiliado}</Text>
        </TouchableOpacity>
    render() {
        if (this.state.loading) {
            return (
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color="#0c9" />
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.dataSource}
                    ItemSeparatorComponent={this.FlatListItemSeparator}
                    renderItem={item => this.renderItem(item)}
                />
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    loader: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff"
    },
    list: {
        paddingVertical: 4,
        margin: 5,
        backgroundColor: "#fff"
    }
});