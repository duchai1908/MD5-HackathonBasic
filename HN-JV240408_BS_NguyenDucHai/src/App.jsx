
import { useEffect, useRef, useState } from 'react'
import './App.css'
import FormTodo from './components/FormTodo'
import ListTodo from './components/ListTodo'
import { message, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
function App() {

  const index = useRef();
  const [todo,setTodo] = useState(()=> JSON.parse(localStorage.getItem('todo')) || []);
  const [edit, setEdit] = useState(null);
  const [jobName, setJobName] = useState("");
  const [isShowError, setIsShowError] = useState(false);
  const [isShowErrorExists, setIsShowErrorExists] = useState(false);
  const [task,setTask] = useState('');
  const [modalStatus,setModalStatus] = useState(false)

  // Validate dữ liệu
  const validateData = (value,currentTask = null) => {
    let isValid = true;
    let isExist = todo.findIndex(item => item.task === value)
    if (!value) {
      setIsShowError(true);
      isValid = false;
    }else if(isExist !== -1 && value !== currentTask){
      setIsShowErrorExists(true)
      isValid = false;
    }else {
      setIsShowError(false);
      setIsShowErrorExists(false)
    }
    return isValid;
  };

  // Thêm công việc
  const handleAddTodo = (e)=>{
      e.preventDefault()
      const isValid = validateData(jobName);
      if(isValid){
        const newTodo = {
          id: Math.floor(Math.random() * 1000),
          task: e.target.todo.value,
          completed: false
        }
        setTodo([newTodo, ...todo])
        setJobName("")
        message.success("Thêm thành công")
      }
      
  }
 
  // Hiển thị thông tin của công việc muốn sửa
  const viewEdit = (id)=>{
    const indexUpdate = todo.findIndex((item) => item.id === id)
    if(indexUpdate !== -1){
      index.current = indexUpdate
      setEdit(todo[indexUpdate])
    }
  }

  // Sửa công việc
  const handleEditTodo = (job,id) =>{
      const isValid = validateData(jobName);
      const currentIndex = todo.findIndex(item=>item.id === id)   
      if(isValid){
        const newTask = job;
        const newTodo = [...todo]
        newTodo[currentIndex] = {...newTodo[currentIndex], task: newTask}
        setTodo(newTodo)
        setEdit(null)
        setJobName("")
        setModalStatus(false)
      }
  }

  // Thay đổi trạng thái hoàn thành
  const handleCompleted = (id) =>{
    const indexUpdate = todo.findIndex((item) => item.id === id)
    if (indexUpdate !== -1) {
      const newTodo = [...todo];
      newTodo[indexUpdate].completed = !newTodo[indexUpdate].completed;
      setTodo(newTodo);
    }
  }

  // Dữ liệu đầu vào của hành động thêm công việc 
  const handleChange = (e) =>{
    const {value} = e.target
    setJobName(value)
    validateData(value)
  }

  // Dữ liệu đầu vào của hành động sửa công việc  
  const handleChangeEdit = (e,id) =>{
      const {value} = e.target 
      const indexUpdate = todo.findIndex((item) => item.id === id)
      setJobName(value)
      validateData(value,todo[indexUpdate].task)
      setTask(value)
  }

  // Xoá công việc
  const handleDelete = (id) =>{
    Modal.confirm({
      title: 'Xác nhận',
      icon: <ExclamationCircleOutlined style={{ color: 'red' }} />,
      content: 'Bạn có chắc chắn muốn thực hiện hành động này?',
      okText: 'Có',
      cancelText: 'Không',
      onOk() {
      const indexDelete = todo.findIndex((item) => item.id === id)
      if(indexDelete !== -1){
        const newTodo = [...todo]
        newTodo.splice(indexDelete,1)
        setTodo(newTodo)
        message.success("Xoá thành công")
      }
      },
      onCancel() {
      
      },
  });    
    
  }
  // Thay đổi task
  const changeTask = (job) =>{
      setTask(job)
  }
  // Re-Render khi thay đổi trạng thái dữ liệu của state todo
  useEffect(() => {
    localStorage.setItem('todo', JSON.stringify(todo));
  }, [todo]);
  // Re-Render khi thay đổi trạng thái dữ liệu của state edit
  useEffect(()=>{
    if(edit){
      setTask(edit.task);
    }
  },[edit])
  return (
    <div className='flex items-center justify-center h-screen'>
       <div className='border w-[50%] rounded-md px-5 py-6 shadow-sm'>
        <FormTodo handleAddTodo={handleAddTodo} 
                  handleEditTodo={handleEditTodo} 
                  handleChange={handleChange} 
                  isShowError ={isShowError} 
                  jobName={jobName} 
                  isShowErrorExists={isShowErrorExists} 
                  edit ={edit} 
                  task= {task}
                  handleChangeEdit={handleChangeEdit}>
          </FormTodo>
        <ListTodo handleListTodo={todo} 
                  task= {task}
                  changeTask = {changeTask}
                  handleEditTodo={handleEditTodo} 
                  handleCompleted={handleCompleted} 
                  isShowError ={isShowError} 
                  isShowErrorExists={isShowErrorExists} 
                  handleChangeEdit={handleChangeEdit}
                  viewEdit={viewEdit}
                  handleDelete={handleDelete}
                  modalStatus={modalStatus}>
        </ListTodo>
       </div> 
    </div>
  )
}

export default App
