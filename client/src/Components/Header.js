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
      <p>My portfolio</p>
      <h1 style={{ color: "#6eeb5e" }}>
        {new Intl.NumberFormat("us-US", {
          style: "currency",
          currency: "USD",
        }).format(total)}
      </h1>
    </div>
  );
};

export default Header;
