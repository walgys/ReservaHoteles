class App extends React.Component {
  state = {
    hotelsData: hotelsData,
    filters: [
      {
        ID: 1,
        name: "desde",
        type: "fecha",
        value: today,
        min: today,
        stringDate: `${moment().locale("es").format("dddd")}, ${moment()
          .locale("es")
          .format("LL")}`,
      },
      {
        ID: 2,
        name: "hasta",
        type: "fecha",
        value: today,
        min: today,
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
      {
        ID: 5,
        name: "tamaño",
        type: "dropdown",
        items: [
          { value: 0, text: "Cualquier tamaño" },
          { value: 1, text: "Hotel Pequeño" },
          { value: 2, text: "Hotel Mediano" },
          { value: 3, text: "Hotel Grande" },
        ],
        selected: 0,
      },
    ],
  };
  componentDidUpdate() {
    console.log(this.state.hotelsData);
  }
  componentDidMount() {
    const Paises = [
      ...new Set(hotelsData.map((item) => item.country)),
    ].map((item, index) => ({ value: index + 1, text: item }));
    const newState = this.state.filters.map((item) =>
      item.name === "países"
        ? { ...item, items: [...item.items, ...Paises] }
        : item
    );
    this.setState(
      {
        filters: newState,
      },
      this.filterHotels
    );
  }

  filterHotels = () => {
    let baseHotelsData = hotelsData;
    let country = "";
    let tamaño = "";
    let precio = "";
    const desde = new Date(this.state.filters[0].value);
    const hasta = new Date(this.state.filters[1].value);

    //Obtener valores de los filtros

    this.state.filters.map((item) => {
      switch (item.ID) {
        case 3:
          country = item.items.filter(
            (i) => i.value === parseInt(item.selected)
          )[0];
          break;
        case 4:
          precio = item.items.filter(
            (i) => i.value === parseInt(item.selected)
          )[0];
          break;
        case 5:
          tamaño = item.items.filter(
            (i) => i.value === parseInt(item.selected)
          )[0];
          break;
        default:
          break;
      }
    });

    baseHotelsData = baseHotelsData.filter((hotel) => {
      if (
        hotel.availabilityFrom <= desde.valueOf() + 86400000 &&
        hotel.availabilityTo >= hasta.valueOf()
      ) {
        console.log(
          " hotel: " +
            hotel.name +
            " desde " +
            (hotel.availabilityFrom - today.valueOf()) / 86400000 +
            " días hasta: " +
            (hotel.availabilityTo - today.valueOf()) / 86400000
        );
        return true;
      } else {
        return false;
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
          return hotel.rooms > 9 ? (hotel.rooms < 20 ? true : false) : false;
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
  handleDropdowns = (elementId, ID) => {
    const newState = this.state.filters.map((item) =>
      item.ID === ID ? { ...item, selected: elementId } : item
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

    newState = this.state.filters.map((item) =>
      item.ID === 2
        ? desde > hasta
          ? {
              ...item,
              value: desde,
              min: desde,
              stringDate: `${moment(desdeString, "YYYY-MM-DD")
                .locale("es")
                .format("dddd")}, ${moment(desdeString, "YYYY-MM-DD")
                .locale("es")
                .format("LL")}`,
            }
          : {
              ...item,
              min: desde,
            }
        : item
    );
    this.setState({ filters: newState }, this.filterHotels);
  };
  handleDates = (e) => {
    const value = new Date(e.target.value + "T00:00:00");
    const newState = this.state.filters.map((item) =>
      item.ID === parseInt(e.target.name)
        ? {
            ...item,
            value: value,
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
