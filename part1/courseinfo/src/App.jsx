//import { Content } from "./components/Content"
import { Header } from "./components/Header"
import { Part } from "./components/Part"
import { Total } from "./components/Total"


const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course} />
  
      <Part part={part1.name} exercises={part1.exercises} />
      <Part part={part2.name} exercises={part2.exercises} />
      <Part part={part3.name} exercises={part3.exercises} />

      <Total exercises1={part1.exercises} 
            exercises2={part2.exercises}
            exercises3={part3.exercises}
              />
    
    </div>
  )
}

export default App