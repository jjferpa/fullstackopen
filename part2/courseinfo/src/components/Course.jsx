const Header = ({ course }) => {
    return (
       <h1>{course.name}</h1>
    )
  }
  
  
  const Part = (course) => {
    return (
      <>
      <p>
        {course.part.name} {course.part.exercises}
      </p>
      </>
  
    )
  }
  
  
  const Content = ({ course }) => {
  
    return (
    <>
        {course.parts.map((part) => <Part key={part.id} part={part} />)}
    </>
    )
  }

  const Total = ( {course} ) => {
    
    const sum = course.parts.reduce((acc, part) => acc + part.exercises, 0);

    return (
        <p><b>total of {sum} exercises</b></p>
    )
  }
  
  
 export const Course = ( {course} ) =>{
  
    return(
  
      <>
       <Header course={course} />
       <Content course={course} />
       <Total course={course} />
  
      </>
  
    );
  
  }


