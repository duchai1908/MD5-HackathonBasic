import React, { useEffect, useState } from 'react'
import { Button, Checkbox, Modal, Input } from "antd";
export default function ListTodo({handleListTodo,handleCompleted,task,handleDelete,handleChangeEdit,changeTask,isShowError, handleEditTodo,isShowErrorExists,modalStatus}) {
    const [isEditing, setIsEditing] = useState(modalStatus); 
    const [editTask,setEditTask] = useState("");
    
    // Đếm số lượng công việc hoàn hành
    const countCompletedJob = ()=>{
        const count = handleListTodo.filter(item=> item.completed).length
        return count;
    }
    // Mở modal
    const handleEdit = (status,item) => {
        setIsEditing(status);
        changeTask(item.task)
        setEditTask(item)
    };  
  return (
    <>
         <ul className="m-0 p-0 flex flex-col gap-3">
         {handleListTodo.length > 0 ? handleListTodo.map((item)=> (
                 <li className="list-none flex items-center justify-between border p-2 rounded shadow-sm" key={item.id}>
                    <div className="flex items-center gap-2">
                        <Checkbox id={item.id}  onClick={() => handleCompleted(item.id)} checked={item.completed} />
                        <label htmlFor={item.id}>
                        {item.completed ? <s>{item.task}</s> : <span>{item.task}</span>}
                        </label>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            className="!bg-green-500 hover:bg-green-300 text-white hover:!text-white"
                            onClick={()=> (handleEdit(!modalStatus,item))}
                        >
                            Sửa
                        </Button>
                        <Button type="primary" danger
                            onClick={()=> handleDelete(item.id)}>
                            Xóa
                        </Button>
                    </div>
                </li>
            )) : <img className='size-28 block mx-auto' src="https://t4.ftcdn.net/jpg/05/86/21/03/360_F_586210337_WOGOw0l7raEB8F61Muc4hWbvVcyQdk9Z.jpg" /> }
            
            {handleListTodo.length > 0 && countCompletedJob() === handleListTodo.length ? 
                <li>Tất cả công việc đã hoàn thành</li> : (handleListTodo.length > 0) ?
             <li className='text-left'>Số công việc đã hoàn thành: {countCompletedJob()} / {handleListTodo.length}  </li> : ""}
        </ul>
        <Modal
        title="Chỉnh sửa công việc"
        visible={isEditing}
        onOk={()=>handleEditTodo(task,editTask.id)} 
        onCancel={() => setIsEditing(modalStatus)}
        okText="Sửa"
        cancelText="Đóng"
      >
        <h3 className='mb-2'>Tên công việc</h3>
        <Input
          value={task}
          onChange={(e)=>handleChangeEdit(e,editTask.id)}
          name="todo"
        />
        {isShowError && <p className='text-red-500'>Tên công việc không được để trống.</p>}
        {isShowErrorExists && <p className='text-red-500'>Tên công việc đã tồn tại.</p>}
      </Modal>
    </>
  )
}
