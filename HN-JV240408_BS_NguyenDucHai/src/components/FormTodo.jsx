import React, { useEffect, useState } from 'react'
import { Button, Input } from "antd";
export default function ({handleAddTodo,handleChange,isShowError,jobName,isShowErrorExists,edit,handleEditTodo,task,handleChangeEdit}) {

  return (
    <>    
                <h3 className='text-center font-semibold text-[24px]'>Danh sách công việc</h3>
                  <form action='' onSubmit={handleAddTodo}>
                    <div className="flex items-center gap-2 mb-6">
                            <Input placeholder="Nhập tên công việc" className="h-10" value={jobName} name="todo" onChange={handleChange} />
                            <Button htmlType='submit' className="h-10" type="primary">
                                Thêm
                            </Button>                      
                    </div>
                            {isShowError && <p className='text-red-500'>Tên công việc không được để trống.</p>}
                            {isShowErrorExists && <p className='text-red-500'>Tên công việc đã tồn tại.</p>}
                  </form>                           
    </>
  )
}
