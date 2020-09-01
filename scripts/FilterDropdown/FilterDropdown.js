class FilterDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.showDropdownMenu = this.showDropdownMenu.bind(this);
    this.hideDropdownMenu = this.hideDropdownMenu.bind(this);
  }
  state = {
    displayMenu: false,
  };

  showDropdownMenu(e) {
    e.preventDefault();
    this.setState({ displayMenu: true }, () => {
      document.addEventListener("click", this.hideDropdownMenu);
    });
  }
  hideDropdownMenu() {
    this.setState({ displayMenu: false }, () => {
      document.removeEventListener("click", this.hideDropdownMenu);
    });
  }

  render() {
    const { icon, items, ID, selected } = this.props;
    return (
      <div className="filter dropdown">
        <div
          className={`button d-inline-flex justify-content-between`}
          onClick={this.showDropdownMenu}
        >
          <p className={`filter-${icon}`}>{items[selected].text}</p>
          <div className="fas fa-chevron-down"></div>
        </div>
        {this.state.displayMenu ? (
          <ul>
            {items.map((element) => (
              <li
                key={element.text}
                name={element.value}
                onClick={() => this.props.onHandleClick(element.value, ID)}
              >
                <a name={ID}>{element.text}</a>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    );
  }
}
