import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        backgroundColor: '#F5F5F5',
        color: '#F5F5F5',
        opacity: 100,
        alignItems: 'stretch',
        padding: 15,
        marginTop: 30,
        justifyContent: 'center',
        flex: 1
    },
    login: {
        backgroundColor: '#F5F5F5',
        opacity: 100,
        alignItems: 'stretch',
        padding: 15,
        justifyContent: 'center',
        alignContent: 'center'
    },
    name: {
        fontFamily: 'serif',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        fontSize: 25,
        color: '#B3A369',
        fontWeight: '700'
    },
    title: {
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'left',
        fontSize: 25,
        marginVertical: 15,
        color: '#B3A369',
        fontWeight: 'bold',
    },
    button: {
        alignItems: 'center',
        borderRadius: 15,
        backgroundColor: '#B3A369',
        height: 40,
        //width: '45%',
        justifyContent: "center",
        margin: 20,
        marginVertical: 10,
        paddingHorizontal: 10,
        textAlign: 'center'
    },
    buttonText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#FFFFFF'
    },
    label: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#B3A369',
        paddingVertical: 10
    },
    inputs: {
        marginBottom: 15,
        borderRadius: 15,
        backgroundColor: '#B3A36975',
        padding: 10,
        paddingLeft: 20,
        height: 40
    },
    selector: {
        margin: 10,
        flexDirection: 'column',
        position: 'relative',
        bottom: -250,
        alignItems: 'stretch',
    },
});
