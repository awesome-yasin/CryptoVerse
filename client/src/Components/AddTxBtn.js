const AddTxBtn = ({setShowForm, showForm}) => {
  return (
    <div
      onClick={() => {
        setShowForm(!showForm);
      }}
    >
      <button className="add-txa-btnn">Add coins</button>
    </div>
  );
};

export default AddTxBtn;
