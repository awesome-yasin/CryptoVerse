const Header = ({ coins }) => {
  let total = 0;

  const getTotal = () => {
    if (coins.length > 0) {
      coins.map((coin) => {
        if (coin.amount !== undefined) {
          return (total = total + coin.amount * coin.current_price);
        } else {
          return null;
        }
      });
    }
  };

  getTotal();

  return (
    <div className="header">
      <p>Portfolio Worth</p>
      <h1 style={{ color: "#009E17" }}>
        {new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
        }).format(total)}
      </h1>
      <p className = "note">Note: everything is stored Locally on your Local Storage Nothing is Stored in server.</p>
    </div>
  );
};

export default Header;
