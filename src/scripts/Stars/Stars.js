const Stars = (props) => {
  const stars = [...Array(props.price).keys()].map((item, index) => (
    <i key={`light-${index}`} className="fas fa-dollar-sign" />
  ));
  stars.push(
    [...Array(4 - props.price).keys()].map((item, index) => (
      <i key={`light-${index}`} className="dimmed fas fa-dollar-sign" />
    ))
  );
  return <div className="stars-bg bg-info p-2 m-2">{stars}</div>;
};
