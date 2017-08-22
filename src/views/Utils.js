import React, {Component} from 'react';
import {Platform, View, StyleSheet, AppState,Linking,Dimensions,TouchableOpacity,NativeModules} from 'react-native';
import {Icon,Button,Text} from 'native-base';
import Toast from 'react-native-simple-toast';
import Modal from 'react-native-modalbox';

class Utils extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showUpdateModal:false,
            updateUrl:'',
            content:'',
            version:''
        };
    }
    componentDidMount() {
        // this.checkUpdate();
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.toast.id !== nextProps.toast.id) {
            Toast.show(nextProps.toast.text);
        }
    }
    checkUpdate() {
        const {actions} = this.props;
        actions.checkUpdate((result)=>{
            if(result){
                this.setState({
                    updateUrl:result.appUrl,
                    content:result.content,
                    showUpdateModal:true,
                    version:result.version
                });
            }
        });
    }
    openUpdate(){
        Linking.openURL(this.state.updateUrl);
    }
    renderContent(){
        if(this.state.content){
            let c = JSON.parse(this.state.content);
            return c.map((res,index)=>{
                return (
                    <Text style={{lineHeight:22}} key={index}>{res}</Text>
                );
            });
        }
    }

    render() {
        if(this.state.showUpdateModal){
            return (
                <Modal isOpen={this.state.showUpdateModal} style={styles.modal} position={"center"} swipeToClose={false} backdropPressToClose={false}>
                    <View style={{flexDirection:'row',padding:1,justifyContent:'flex-end'}}>
                        <TouchableOpacity style={{flex:1,alignItems:'flex-end'}}  onPress={()=>this.setState({showUpdateModal:false})}>
                            <Icon style={{color:'red'}} name="ios-close-circle-outline" />
                        </TouchableOpacity>
                    </View>
                    <View style={{justifyContent:'center',alignItems:'center'}}>
                        <Text style={{fontSize:18,fontWeight:'400'}}>有新的版本
                            <Text style={{color:'red'}}>{this.state.version.substring(0,5)}</Text></Text>
                    </View>
                    <View style={{flex:1,paddingLeft:12,paddingTop:12}}>
                        {this.renderContent()}
                    </View>
                    <View style={{padding:12}}>
                        <Button block danger onPress={()=>this.openUpdate()}>
                            <Text>立即升级</Text>
                        </Button>
                    </View>
                </Modal>
            );
        }
        return null;
    }
}

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        width:width
    },
    modal:{
        width:width*0.8,
        borderRadius:5,
        height:249
    }
});

export const LayoutComponent = Utils;
export function mapStateToProps(state) {
    const {utils = {}, user} = state;
    return {
        ...utils,
        user
    }
}
