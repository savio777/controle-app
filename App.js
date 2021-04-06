import React, {useEffect, useState} from 'react';

import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import api from './src/services/api';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    marginBottom: 5,
  },
  card: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ccc',
    marginVertical: 5,
    padding: 5,
    alignItems: 'center',
  },
});

const App = () => {
  const [count, setCount] = useState(0);
  const [users, setUsers] = useState([]);

  async function getUsers() {
    const response = await api.get('user');

    console.log(response.data);
    setUsers([...response.data]);
  }

  async function deleteUser(id) {
    await api.delete(`user/${id}`);

    getUsers();
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <View style={styles.container}>
      {count < 0 && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => setCount(count + 1)}>
          <Text style={styles.text}>+</Text>
        </TouchableOpacity>
      )}

      <View>
        {users.length > 0 &&
          users.map((user, index) => (
            <View key={String(index)} style={styles.card}>
              <View>
                <Text style={styles.text}>{user.name}</Text>
                <Text style={styles.text}>{user.email}</Text>
              </View>
              <TouchableOpacity
                style={styles.button}
                onPress={() => deleteUser(user._id)}>
                <Text style={styles.text}>-</Text>
              </TouchableOpacity>
            </View>
          ))}
      </View>
    </View>
  );
};

export default App;
