const AddTxBtn = ({setShowForm, showForm}) => {
  return (
    <div
      onClick={() => {
        setShowForm(!showForm);
      }}
    >
      <button className="add-tx-btn">Add coins</button>
    </div>
  );
};

export default AddTxBtn;
