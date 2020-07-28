class App extends React.Component {
  state = {
    hotelsData: hotelsData,
    filters: [
      {
        ID: 1,
        name: "desde",
        type: "fecha",
        value: moment().format("YYYY-MM-DD"),
        min: moment().format("YYYY-MM-DD"),
        stringDate: `${moment().locale("es").format("dddd")}, ${moment()
          .locale("es")
          .format("LL")}`,
      },
      {
        ID: 2,
        name: "hasta",
        type: "fecha",
        value: moment().format("YYYY-MM-DD"),
        min: moment().format("YYYY-MM-DD"),
        stringDate: `${moment().locale("es").format("dddd")}, ${moment()
          .locale("es")
          .format("LL")}`,
      },
      {
        ID: 3,
        name: "países",
        type: "dropdown",
        items: [{ value: 0, text: "Todos los países", selected: true }],
        selected: 0,
      },
      {
        ID: 4,
        name: "tamaño",
        type: "dropdown",
        items: [
          { value: 0, text: "Cualquier tamaño" },
          { value: 1, text: "Pequeño" },
          { value: 2, text: "Mediano" },
          { value: 3, text: "Grande" },
        ],
        selected: 0,
      },
      {
        ID: 5,
        name: "precio",
        type: "dropdown",
        items: [
          { value: 0, text: "Cualquier precio" },
          { value: 1, text: "$" },
          { value: 2, text: "$$" },
          { value: 3, text: "$$$" },
          { value: 4, text: "$$$$" },
        ],
        selected: 0,
      },
    ],
  };
  componentDidMount() {
    const Paises = [
      ...new Set(hotelsData.map((item) => item.country)),
    ].map((item, index) => ({ value: index + 1, text: item }));
    const newState = this.state.filters.map((item) =>
      item.name === "países"
        ? { ...item, items: [...item.items, ...Paises] }
        : item
    );
    this.setState({
      filters: newState,
    });
  }
  filterHotels = () => {
    let baseHotelsData = hotelsData;
    let country = "";
    let tamaño = "";
    let precio = "";
    //Obtener valores de los filtros

    this.state.filters.map((item) => {
      switch (item.ID) {
        case 3:
          country = item.items.filter(
            (i) => i.value === parseInt(item.selected)
          )[0];
          break;
        case 4:
          tamaño = item.items.filter(
            (i) => i.value === parseInt(item.selected)
          )[0];
          break;
        case 5:
          precio = item.items.filter(
            (i) => i.value === parseInt(item.selected)
          )[0];
          break;
        default:
          break;
      }
    });
    //Filtrado de Hoteles por País
    baseHotelsData = baseHotelsData.filter((hotel) => {
      if (country.value !== 0) {
        return hotel.country === country.text;
      } else {
        return true;
      }
    });
    //Filtrado de Hoteles por Tamaño
    baseHotelsData = baseHotelsData.filter((hotel) => {
      switch (tamaño.value) {
        case 1:
          return hotel.rooms < 10;
        case 2:
          return hotel.rooms < 20 ? (hotel.rooms > 9 ? true : false) : false;
        case 3:
          return hotel.rooms > 19;
        default:
          return true;
          break;
      }
    });
    //Filtrado de Hoteles por Precio
    baseHotelsData = baseHotelsData.filter((hotel) => {
      if (precio.value !== 0) {
        return hotel.price === precio.value;
      } else {
        return true;
      }
    });
    this.setState({ hotelsData: baseHotelsData });
  };
  handleDropdowns = (e) => {
    const newState = this.state.filters.map((item) =>
      item.ID === parseInt(e.target.name)
        ? { ...item, selected: e.target.value }
        : item
    );
    this.setState({ filters: newState }, this.filterHotels);
  };
  compararFechas = () => {
    const desdeString = this.state.filters.find((item) => item.name === "desde")
      .value;
    let desde = new Date(
      this.state.filters.find((item) => item.name === "desde").value
    );
    let hasta = new Date(
      this.state.filters.find((item) => item.name === "hasta").value
    );
    let newState = {};
    if (desde > hasta) {
      newState = this.state.filters.map((item) =>
        item.ID === 2
          ? {
              ...item,
              value: moment(desdeString, "YYYY-MM-DD").format("YYYY-MM-DD"),
              stringDate: `${moment(desdeString, "YYYY-MM-DD")
                .locale("es")
                .format("dddd")}, ${moment(desdeString, "YYYY-MM-DD")
                .locale("es")
                .format("LL")}`,
            }
          : item
      );
    } else {
      newState = this.state.filters;
    }
    this.setState({ filters: newState });
  };
  handleDates = (e) => {
    const newState = this.state.filters.map((item) =>
      item.ID === parseInt(e.target.name)
        ? {
            ...item,
            value: e.target.value,
            stringDate: `${moment(e.target.value, "YYYY-MM-DD")
              .locale("es")
              .format("dddd")}, ${moment(e.target.value, "YYYY-MM-DD")
              .locale("es")
              .format("LL")}`,
          }
        : item
    );
    this.setState({ filters: newState }, this.compararFechas);
  };
  render() {
    const desde = this.state.filters.find((item) => item.name === "desde");
    const hasta = this.state.filters.find((item) => item.name === "hasta");
    return (
      <div className="container">
        <Header desde={desde} hasta={hasta} />
        <Filters
          handleDropdowns={this.handleDropdowns}
          handleDates={this.handleDates}
          filters={this.state.filters}
        />
        <HotelList hotelsData={this.state.hotelsData} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
