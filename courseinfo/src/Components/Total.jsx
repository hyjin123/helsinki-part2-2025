const Total = ({ parts }) => {
  const initialValue = 0;
  const sum = parts.reduce((sum, cur) => sum + cur.exercises, initialValue);
  return <h3>Total: {sum}</h3>;
};

export default Total;
