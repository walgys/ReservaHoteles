class App extends React.Component {
  state = {
    hotelsData: hotelsData,
    filters: [
      {
        ID: 1,
        name: "desde",
        type: "fecha",
        value: dayjs(today),
        min: today,
        max: "9999-12-31",
        stringDate: this.stringDate(),
      },
      {
        ID: 2,
        name: "hasta",
        type: "fecha",
        value: dayjs(today),
        min: today,
        max: "9999-12-31",
        stringDate: this.stringDate(),
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

  stringDate(date = today) {
    const weekDay = dayjs(date).locale("es").format("dddd");

    return `${weekDay.charAt(0).toUpperCase() + weekDay.slice(1)}, ${dayjs(date)
      .locale("es")
      .format("LL")}`;
  }

  componentDidUpdate() {
    console.log(this.state);
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
        dayjs(hotel.availabilityFrom).isBefore(dayjs(desde).add(1, "day")) &&
        dayjs(hotel.availabilityTo).isAfter(dayjs(hasta))
      ) {
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
              value: dayjs(desde),
              min: dayjs(desde),
              stringDate: this.stringDate(desdeString),
            }
          : {
              ...item,
              min: dayjs(desde),
            }
        : item
    );
    this.setState({ filters: newState }, this.filterHotels);
  };
  handleDates = (e) => {
    console.log(e.target.value);
    if(e.target.value.split('-')[0].replace(/^0+/,'').length == 4){
      const value = dayjs(e.target.value);
          const newState = this.state.filters.map((item) =>
            item.ID === parseInt(e.target.name)
              ? {
                  ...item,
                  value: value,
                  stringDate: this.stringDate(e.target.value),
                }
              : item
          )
          this.setState({ filters: newState }, this.compararFechas);
        }
    }
    
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
