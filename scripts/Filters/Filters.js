const Filters = (props) => {
  const FilterDropdowns = props.filters
    .filter((item) => item.type === "dropdown")
    .map((filter) => (
      <FilterDropdown
        key={filter.ID}
        items={filter.items}
        ID={filter.ID}
        icon={filter.name}
        selected={filter.selected}
        onHandleClick={props.handleDropdowns}
      />
    ));
  const filterDates = props.filters
    .filter((item) => item.type === "fecha")
    .map((filter) => (
      <FilterDates
        key={filter.ID}
        value={filter.value}
        min={filter.min}
        name={filter.ID}
        icon={filter.name}
        onInput={props.handleDates}
      />
    ));

  return (
    <div className="container bg-info d-flex py-1 justify-content-around flex-wrap">
      {filterDates}
      {FilterDropdowns}
    </div>
  );
};
