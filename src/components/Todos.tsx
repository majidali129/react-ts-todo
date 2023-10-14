import {Button, Checkbox,Form,Input,Layout, List, Space, Typography} from 'antd'
import {DeleteFilled} from '@ant-design/icons'
import { headerSyles, headerTextStyles, iconStyles } from '../styles'
import { useEffect, useState } from 'react'
import { saveToLocal } from '../services'

const {Header} = Layout

const Todos = () => {
  
  const [todos, setTodos] = useState<TodoItemType[]>(() => {
    const savedItems = localStorage.getItem('my-todos');

    return savedItems? JSON.parse(savedItems): []
  });
  const [todoName, setTodoName] = useState<string>('');


  function handleSubmit(): void {
    if(!todoName) return 
    const taskToAdd: TodoItemType = {
      name: todoName,
      status: 'pending',
      id: String(Math.random()*100)
    };

    setTodos(prev => [...prev, taskToAdd]);
    setTodoName('');
  }

  useEffect(() => {
    saveToLocal(todos)
  }, [todos])

  function handleDelete (id: TodoItemType['id']): void {
    const todoAfterDeletion: TodoItemType[] = todos.filter(todo => todo.id !== id);
    setTodos(todoAfterDeletion)
  }

  function handleMarkAsDone (id: string): void {
    // console.log(id);
    const newArr: TodoItemType[] = todos.map(todo => {
      if(todo.id === id){
        todo.status = todo.status === 'complete'? 'pending': 'complete';
      }
      return todo
    })    
    setTodos(newArr)
  }
 

  return (
    <Space style={{ border: '1px solid green', width: '40%', margin: '3rem auto', display: 'block'}} size='small' direction='vertical' >
      <Layout style={{background: 'inherit'}}>
        <Header style={headerSyles} >
          <Typography.Text role='P' style={headerTextStyles}>REACT-TS-TODO</Typography.Text>
        </Header>
      </Layout>
      <Layout >
        <List
        style={{height: '50vh', overflow: 'hidden', marginBottom: '1rem'}}
        size="small"
        bordered
        dataSource={todos}
        renderItem={(todo) => (
          <List.Item key={todo.id}>
            <Typography.Text style={{textDecorationLine: todo.status === 'complete'? 'line-through': 'none'}}>{todo.name}</Typography.Text >
            <Checkbox onChange={() => handleMarkAsDone(todo.id)} checked={todo.status === 'complete'} />
            <DeleteFilled style={iconStyles} onClick={() => handleDelete(todo.id)} />
            
          </List.Item>
        )}
        />

        <Form 
        name='basic'
        initialValues={{remember: true}}
          onFinish={() => handleSubmit()}
        >
          <Form.Item rules={[{required:true, message: 'Field can not be empty' }]} >
          <Input placeholder='Write here' value={todoName} onChange={(e) => setTodoName(e.target.value)} />
          </Form.Item>
          <Form.Item >
          <Button type='primary' size='middle' style={{width: '100%'}} htmlType='submit' >Add New Task</Button>
          </Form.Item>
        </Form>

          
      </Layout>
    </Space>
  )
}

export default Todos