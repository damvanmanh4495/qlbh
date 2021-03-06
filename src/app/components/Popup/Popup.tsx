import React from "react";
import "./style/Popup.css";

type Props = {
  show?: boolean,
  body?: React.ReactNode
  buttonSubmit?: { label?: string, onClick: Function, classname?: string }
  onClose: Function
  title?: string,
  size?: "small" | "large" | "extra_large";
}

const Popup: React.FC<Props> = (props) => {
  const { buttonSubmit, body, title, show, onClose, size } = props;

  const hanleClickSubmit = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    buttonSubmit!.onClick();
    onClose();
  };

  let modalSizeClassname;

  switch (size) {
    case "small":
      modalSizeClassname = "modal-sm"
      break;
    case "large":
      modalSizeClassname = "modal-lg"
      break;
    case "extra_large":
      modalSizeClassname = "modal-xl"
      break;
    default:
      modalSizeClassname = "modal-df"
      break;
  }

  return (
    <div className={`modal fade ${show ? "d-block show" : "d-none"}`}>
      <div className={"modal-dialog  modal-dialog-new " + modalSizeClassname}>
        <div className="modal-content">
          <form>
            <div className="modal-header">
              <span className="ui-dialog-title">{title}</span>
              <span
                className="modal-close-wrapper btn btn-close"
                role="button"
                aria-label="Close dialog"
                onClick={() => onClose()}
              >
                <svg className="svg-x" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M11.414 10l4.293-4.293c.391-.391.391-1.023 0-1.414s-1.023-.391-1.414 0l-4.293 4.293-4.293-4.293c-.391-.391-1.023-.391-1.414 0s-.391 1.023 0 1.414l4.293 4.293-4.293 4.293c-.391.391-.391 1.023 0 1.414.195.195.451.293.707.293.256 0 .512-.098.707-.293l4.293-4.293 4.293 4.293c.195.195.451.293.707.293.256 0 .512-.098.707-.293.391-.391.391-1.023 0-1.414l-4.293-4.293z"></path></svg>
              </span>
            </div>
            <div className="modal-body">{body}</div>
            <div className="modal-footer">
              <div>
                <span className="btn btn-light" onClick={() => onClose()}>
                  Thoát
              </span>
                {buttonSubmit && (
                  <button
                    className={"ml-3 btn " + (buttonSubmit.classname || "")}
                    onClick={(e) => hanleClickSubmit(e)}
                    type="submit"
                  >
                    {buttonSubmit.label}
                  </button>
                )}
              </div>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};

export default Popup;
