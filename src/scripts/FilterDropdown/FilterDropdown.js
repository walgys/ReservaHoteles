const FilterDropdown = (props) => {
  return (
    <select
      className={`filter ${props.icon}`}
      name={props.ID}
      onChange={props.onHandleClick}
    >
      {props.items.map((item) => (
        <option key={item.text} value={item.value}>
          {item.text}
        </option>
      ))}
    </select>
  );
};
