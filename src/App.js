import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Container, Content, Text, View } from "native-base";
import Modal from "react-native-modalbox";
import MainStackRouter from "./views/Navigator";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: null,
        height: null
    },
    modal: {
        justifyContent: "center",
        alignItems: "center"
    },
    modal1: {
        height: 300
    }
});

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showUpdateModal: false
        };
    }

    componentDidMount() {

    }

    render() {
        if (this.state.showUpdateModal) {
            return (
                <Container>

                </Container>
            );
        }

        return <MainStackRouter />;
    }
}

export default App;