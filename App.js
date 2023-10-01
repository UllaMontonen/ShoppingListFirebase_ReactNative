import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Keyboard, Text, View, Button, TextInput, FlatList } from 'react-native';
import { push, ref, onValue, remove } from 'firebase/database';
import database from './firebase';


export default function App() {
    // product input
    const [product, setProduct] = useState('');
    // amount input 
    const [amount, setAmount] = useState('');
    // items are saved here
    const [items, setItems] = useState([]);


    useEffect(() => {
      const itemsRef = ref(database, '/items');
      onValue(itemsRef, (snapshot) => {
        const data = snapshot.val();
        setItems(Object.values(data));
      })
    }, []);

    // saving an item to shopping list
    const saveItem = () => {
      push(
        ref(database, 'items/'),
        { 'product': product, 'amount': amount });
        Keyboard.dismiss();
        setAmount('');
        setProduct('');
        console.log(items)
    }
    // deleting an item from a shopping list
    // deleting is not currently working
    const deleteItem = (key) => {
      console.log('delete item: ', key);
      remove (
        ref(database, '/items/' + key),
      )
    }


  return (
    <View style={styles.container}>
      <TextInput 
          placeholder='Product'
          style={styles.input} 
          onChangeText={product => setProduct(product)} 
          value={product} />
          <TextInput 
          placeholder='Amount'
          style={styles.input} 
          onChangeText={amount => setAmount(amount)} 
          value={amount} />
      <View style={styles.button}>
            <Button onPress={saveItem} title="SAVE" />
      </View>
      <Text style={styles.title}>Shopping List</Text>
      <FlatList style={styles.list}
          keyExtractor={item => item.key }
          renderItem={({item}) => 
          <View style={styles.list}>
            <Text>{item.product}, {item.amount}</Text>
            <Text style={styles.delete} onPress={() => deleteItem(item.key)}>  delete</Text>
          </View>}
        data={items}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 80,
  },
  input: {
    marginTop: 5,
    marginBottom: 5,
    padding: 5,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1
  },
  title: {
    marginTop: 10,
    fontSize: 20,
    marginBottom: 10,
  },
  list: {
    flexDirection: 'row',
  },
  delete: {
    color: "blue",
  },
  // iPhone button does not have bacground color
  button: {
    backgroundColor: "#AED6F1",
    marginTop: 10,
    marginBottom: 10,
  },
});