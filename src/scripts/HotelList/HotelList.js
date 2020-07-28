class HotelList extends React.Component {
  render() {
    const Hotels = this.props.hotelsData.map((hotel) => (
      <Hotel key={hotel.name + hotel.country + hotel.city} hotel={hotel} />
    ));
    return (
      <div className="d-flex flex-wrap m-5 justify-content-around">
        {Hotels}
      </div>
    );
  }
}
