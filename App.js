import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  FlatList 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function App() {
  const [todoItem, setTodoItem] = useState('');
  const [todoList, setTodoList] = useState([]);

  const handleAddTodo = () => {
    if (todoItem !== '') {
      setTodoList([...todoList, { id: Math.random().toString(), task: todoItem }]);
      setTodoItem('');
    }
  };

  const handleDeleteTodo = (todoId) => {
    setTodoList((todos) => todos.filter((todo) => todo.id !== todoId));
  };

  const renderTodoItem = (itemData) => (
    <View style={styles.todoItem}>
      <Text style={styles.todoText}>{itemData.item.task}</Text>
      <TouchableOpacity onPress={() => handleDeleteTodo(itemData.item.id)}>
        <Ionicons name="trash-outline" size={24} color="gray" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Todo List</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter a task"
          placeholderTextColor="gray"
          value={todoItem}
          onChangeText={(text) => setTodoItem(text)}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddTodo}>
          <Ionicons name="add-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
      {todoList.length === 0 ? (
        <View style={styles.noTodosContainer}>
          <Text style={styles.noTodosText}>No todos yet!</Text>
        </View>
      ) : (
        <FlatList
          data={todoList}
          keyExtractor={(item) => item.id}
          renderItem={renderTodoItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    marginRight: 10,
    padding: 10,
    color: 'black',
  },
  addButton: {
    backgroundColor: '#3275a8',
    borderRadius: 5,
    padding: 10,
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    padding: 20,
    marginBottom: 10,
    borderRadius: 5,
  },
  todoText: {
    fontSize: 18,
    color: 'black',
  },
  noTodosContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noTodosText: {
    fontSize: 18,
    color: 'gray',
  },
});
