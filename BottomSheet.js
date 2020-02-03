import React from 'react'
import {Text, View, Dimensions} from 'react-native'

import SlidingUpPanel from 'rn-sliding-up-panel'
import { omit } from './getProductCount';

const {height} = Dimensions.get('window')

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center'
  },
  panel: {
    flex: 1,
    backgroundColor: 'white',
    position: 'relative'
  },
  panelHeader: {
    height: 120,
    backgroundColor: '#b197fc',
    alignItems: 'center',
    justifyContent: 'center'
  },
  favoriteIcon: {
    position: 'absolute',
    top: -24,
    right: 24,
    backgroundColor: '#2b8a3e',
    width: 48,
    height: 48,
    padding: 8,
    borderRadius: 24,
    zIndex: 1
  }
}

class BottomSheet extends React.Component {
  render() {
    let addedItems = Object.entries(omit(this.props.navigation.getParam('item'),"total"));
    let Total = 0;
    return (
      <View style={styles.container}>
        <Text>Hello world</Text>
        <SlidingUpPanel
          ref={c => (this._panel = c)}
          draggableRange={{top: height/1.1 , bottom: 120}}
          animatedValue={this._draggedValue}
          showBackdrop={false}>
          <View style={styles.panel}>
            <View style={styles.panelHeader}>
              <Text style={{color: '#FFF'}}>Bottom Sheet Peek</Text>
            </View>
            <View style={styles.container}>
            {addedItems.map((value,index)=>{
            Total = Total + (value[1].count * value[1].price);
            return(
                <View key = { index } >
                    <Text style = {{color: 'red'}}>Product: {value[0]}</Text>
                    <Text>Quantity: {value[1].count}</Text>
                    <Text>Price: {value[1].price}</Text>
                    <Text>Subtotal:{value[1].count * value[1].price}</Text>
                </View>)
            }
            )}
            <Text>Total: {Total}</Text>
            </View>
          </View>
        </SlidingUpPanel>
      </View>
    )
  }
}

export default BottomSheet