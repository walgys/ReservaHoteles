const FilterDates = (props) => {
  return (
    <input
      className={`filter filter-${props.icon}`}
      type="date"
      name={props.name}
      min={dayjs(props.min).format("YYYY-MM-DD")}
      onInput={props.onInput}
      onChange={()=> false}
      max={props.max}
      value={dayjs(props.value).format("YYYY-MM-DD")}
    />
  );
};
