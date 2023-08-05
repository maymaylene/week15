import './App.css';
import { useState, useEffect } from 'react'

function App() {

  //Defininf mock API
  const END_POINT = 'https://64cd60d3bb31a268409aa575.mockapi.io/users' 

  const [employees, setEmployees] = useState([{
    name: 'Maria',
    birthday: '01/01/1988',
    title: 'Manager'
  }])


  //defining new employee, birthday, and title
  const [newEmployee, setNewEmployee] = useState()
  const [newBirthday, setNewBirthday] = useState()
  const [newTitle, setNewTitle] = useState()

  //Defining employee, birthday, and title for updated function
  const [updatedEmployeeName, setUpdatedEmployeeName] = useState()
  const [updatedBirthday, setUpdatedBirthday] = useState()
  const [updatedTitle, setUpdatedTitle] = useState()


//get employee data then turn it to json then set it as an employee
function getEmployees(){
  fetch(END_POINT)
    .then(data => data.json())
    .then(data => setEmployees(data))
}

useEffect(() => {
  getEmployees()
}, [])

//creating a delete employee function
function deleteEmployee(id){
  fetch(`${END_POINT}/${id}`, {
    method: 'DELETE'
  })
  .then(() => getEmployees())

}

//creating POST new employee function
function postNewEmployee(e){
  e.preventDefault()
  
  fetch(END_POINT, {
    method: 'POST',
    headers: {"Content Type" : "application/json"},
    body: JSON.stringify({
      name: newEmployee,
      birthday: newBirthday,
      title: newTitle,
    })
  })
  .then(() => getEmployees())
}


//creating updaded employee function 
function updatedEmployee(e, employeeObject){
  e.preventDefault()

  let updatedEmployeeObject = {
    ...employeeObject, 
    name: updatedEmployeeName,
    birthday: updatedBirthday,
    title: updatedTitle,
  }

  fetch(`${END_POINT}/${employeeObject.id}`, {
    method: 'PUT',
    body: JSON.stringify(updatedEmployeeObject),
    headers: {
      "Content-Type": "application/json"
    }

  })
  .then(() => getEmployees())  
}
                    
  return (
    <div className="App">
      <form>
          <h1>New Employee: </h1>
          <label>Name: </label>
          <input onChange={(e) => setNewEmployee(e.target.value)}></input><br></br>
          <label>Birthday: </label>
          <input onChange={(e) => setNewBirthday(e.target.value)}></input><br></br>
          <label>Title: </label>
          <input onChange={(e) => setNewTitle(e.target.value)}></input> <br></br>   
          <button onClick={(e) => postNewEmployee(e, employees)}>Post New Employee</button>                
      </form> 
      {employees.map((employees, index) => (
        <div key={index}>          
          <form>
            <h4>Update Employee Information</h4>
            <label>Update Employee Name: </label>
            <input onChange={(e) => setUpdatedEmployeeName(e.target.value)}></input><br></br>
            <label>Update Employee Birthday: </label>
            <input onChange={(e) => setUpdatedBirthday(e.target.value)}></input><br></br>
            <label>Update Employee Title: </label>
            <input onChange={(e) => setUpdatedTitle(e.target.value)}></input><br></br>
            <button onClick={(e) => updatedEmployee(e, employees)}>Update Employee Information</button>
          </form>
          <div>
            Name: {employees.name}<br></br>
            Birthday: {employees.birthday} <br></br>
            Title: {employees.title}<br></br>
            <button onClick={(e) => deleteEmployee(employees.id)}>Delete Employee</button>
          </div>
      </div>  
      ))}      
    </div>
  )
}

export default App;
