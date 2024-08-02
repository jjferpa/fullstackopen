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
  
  
 export const Course = ( {course} ) =>{
  
    return(
  
      <>
       <Header course={course} />
       <Content course={course} />
  
      </>
  
    );
  
  }


