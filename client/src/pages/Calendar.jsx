import {Calendar,momentLocalizer} from "react-big-calendar"
import moment from "moment"
import "react-big-calendar/lib/css/react-big-calendar.css"

import {useState,useEffect} from "react"
import API from "../services/api"
import MainNavbar from "../components/MainNavbar"

const localizer = momentLocalizer(moment)

const CalendarPage = ()=>{

const [events,setEvents] = useState([])

useEffect(()=>{
loadTasks()
},[])

const loadTasks = async()=>{

const res = await API.get("/tasks")

const data = res.data.map(task=>({
title:task.text,
start:new Date(task.deadline),
end:new Date(task.deadline)
}))

setEvents(data)

}

return(

<div className="page-wrapper">

<MainNavbar/>

<div className="calendar-container">

<Calendar
localizer={localizer}
events={events}
startAccessor="start"
endAccessor="end"
style={{height:600}}
/>

</div>

</div>

)

}

export default CalendarPage