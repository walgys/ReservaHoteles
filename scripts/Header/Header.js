const Header = (props) => {
  return (
    <div className="container mb-0 header d-flex flex-column justify-content-center ">
      <h3>Hoteles</h3>
      <p>{`desde el ${props.desde.stringDate} hasta el ${props.hasta.stringDate}`}</p>
    </div>
  );
};
