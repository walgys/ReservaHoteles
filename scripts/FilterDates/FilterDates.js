const FilterDates = (props) => {
  const date = new Date(props.value);
  const min = new Date(props.min);
  const formattedValue =
    date.getFullYear() +
    "-" +
    (date.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    date.getDate().toString().padStart(2, "0");

  const formattedmin =
    min.getFullYear() +
    "-" +
    (min.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    min.getDate().toString().padStart(2, "0");
  return (
    <input
      className={`filter filter-${props.icon}`}
      type="date"
      name={props.name}
      min={formattedmin}
      onChange={props.onChange}
      value={formattedValue}
    />
  );
};
