import API from "./api"

export const getTasks = ()=>{
return API.get("/tasks")
}

export const createTask = (task)=>{
return API.post("/tasks",task)
}

export const toggleTask = (id)=>{
return API.put(`/tasks/${id}`)
}

export const deleteTask = (id)=>{
return API.delete(`/tasks/${id}`)
}