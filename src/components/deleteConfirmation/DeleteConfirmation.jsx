import { Icon } from "@iconify/react";
import "./deleteConfirmation.css";

const DeleteConfirmation = ({ onClose, handleDelete, selectedItemIndex }) => {
  return (
    <div className="delete__confirmation__wrapper ">
      <div className="delete__icon__wrapper">
        <Icon onClick={onClose} icon="ic:round-close" className={``} />
      </div>
      <div className="delete__confirmation__question ">
        Are you sure you want to delete this item?
      </div>
      <div className="delete__modal__divider"></div>

      <div className="delete__modal__bottom__buttons ">
        <div className="delete__modal__bottom__button " onClick={onClose}>
          Cancel
        </div>
        <div
          className="delete__modal__bottom__button "
          onClick={() => handleDelete(selectedItemIndex)}
        >
          Delete item
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
