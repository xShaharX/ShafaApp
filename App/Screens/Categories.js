/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    Image,
    Dimensions,

} from 'react-native';
import {CategoryItem} from './App/Components/CategoryItem';

export default class Categories extends Component<Props> {


    render() {
        let pic = require('./App/Images/placeholder.jpg');
        let name = "Category Name";
        let data=[{pict:pic,namet:name, id:'0'},
            {pict:pic,namet:name, id:'1'},
            {pict:pic,namet:name, id:'2'},
            {pict:pic,namet:name, id:'3'},
            {pict:pic,namet:name, id:'4'},
            {pict:pic,namet:name, id:'5'},
            {pict:pic,namet:name, id:'6'},
            {pict:pic,namet:name, id:'7'},];
        return (
            <View style={styles.container}>

                <FlatList
                    data={data}
                    renderItem={({item})=><CategoryItem categoryImagePath={item.pict} categoryName={item.namet}/>}
                    keyExtractor={item => item.id}
                    ListHeaderComponent={<Image source={require('./App/Images/logoPlaceholder.png')} style={styles.logo}/>}
                />
            </View>
        );
    }
};


const percent = 0.1;
const window = Dimensions.get('window');
const renderedHeight = percent*window.height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EFEFEF'
    },
    logo : {
        resizeMode:'center',
        height: renderedHeight,
        margin: 10,
        alignSelf:'center'

    },
});