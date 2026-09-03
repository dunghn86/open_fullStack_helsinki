const Course = ({ courses }) => {
  // function summarize total of the exercises
  const sumExercise = (coursedData) => {
    const total = coursedData.parts.reduce((a, c) => a + c.exercises, 0);
    return total;
  };
  return (
    <div>
      <h1>Web development cirriculum</h1>
      {courses.map((index) => (
        <div>
          <h2>{index.name}</h2>
          {index.parts.map((item) => (
            <div key={index.id}>
              <div style={{ display: "flex", gap: "2px", margin: "2px 0px" }} key={item.id}>
                <div>{item.name}</div>
                <div>{item.exercises}</div>
              </div>
            </div>
          ))}
          <div>total of {sumExercise(index)} exercises</div>
        </div>
      ))}
    </div>
  );
};

const App = () => {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2
        }
      ]
    }
  ];

  return (
    <div>
      <Course courses={courses} />
    </div>
  );
};

export default App;
