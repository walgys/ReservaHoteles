const FilterDates = (props) => {
  return (
    <input
      className={`filter filter-${props.icon}`}
      type="date"
      name={props.name}
      min={props.min}
      onChange={props.onChange}
      value={props.value}
    />
  );
};
