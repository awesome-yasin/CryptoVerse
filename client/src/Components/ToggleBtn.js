import { BsPlus, BsX } from "react-icons/bs";

const ToggleBtn = ({ toggle, toggleSearch }) => {
  return (
    <div className="toggle-btn" onClick={toggle}>
      {toggleSearch ? (
        <BsX className="btn-sign" />
      ) : (
        <BsPlus className="btn-sign" />
      )}
    </div>
  );
};

export default ToggleBtn;
