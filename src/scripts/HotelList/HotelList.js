class HotelList extends React.Component {
  render() {
    const Hotels =
      this.props.hotelsData.length !== 0 ? (
        this.props.hotelsData.map((hotel) => (
          <Hotel key={hotel.name + hotel.country + hotel.city} hotel={hotel} />
        ))
      ) : (
        <p>¡ Ups, Lo sentimos ! No hemos encontrado Hoteles con ese criterio</p>
      );
    return (
      <div className="d-flex flex-wrap m-5 justify-content-around">
        {Hotels}
      </div>
    );
  }
}
