const Header = ({course}) => <h1>{course}</h1>

const Content = ({parts}) => parts.map(part => <Part key={part.id} part={part}/>)

const Part = ({part}) => <p>{part.name} {part.exercises}</p>

const Total = ({parts}) => { return (
  <p>
    total of {parts.map((item) => item.exercises).reduce((a, b) => a+b)} exercises
  </p>
  )}

const Course = ({course}) => (
  <div>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
)

export default Course