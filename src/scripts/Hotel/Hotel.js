const Hotel = (props) => {
  return (
    <div className="card" style={{ width: 300, marginBottom: 20 }}>
      <img
        src={props.hotel.photo}
        className="card-img-top"
        alt={props.hotel.name}
      />
      <div className="card-body">
        <h5 className="card-title">{props.hotel.name}</h5>
        <p className="card-text">{props.hotel.description}</p>
        <div>
          <i className="fas fa-map-marker-alt bg-info p-2 m-2" />
          {`${props.hotel.city}, ${props.hotel.country}`}
        </div>
        <div className="d-flex justify-content-between">
          <div>
            <i className="fas fa-bed bg-info p-2 m-2" />
            {`${props.hotel.rooms} habitaciones`}
          </div>
          <div>
            <Stars price={props.hotel.price} />
          </div>
        </div>{" "}
      </div>
      <button className="btn btn-color btn-block">Reservar</button>
    </div>
  );
};
