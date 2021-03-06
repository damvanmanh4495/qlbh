import React from "react";
import Icon from "@material-ui/core/Icon";
import CircularProgress from "@material-ui/core/CircularProgress";

type Props = {
  className?: string,
  loading?: boolean,
  onClick: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined,
  type?: "button" | "submit" | "reset" | undefined,
}

const ButtonLoading: React.FC<Props> = (props) => {
  const { className, onClick, loading, type } = props;

  return (
    <button
      className={className + (loading ? " btn-loading" : "")}
      onClick={onClick}
      disabled={loading || false}
      type={type || "button"}
    >
      {!loading ? (
        props.children
      ) : (
        <Icon>
          <CircularProgress className="w-100 h-100" />
        </Icon>
      )}
    </button>
  );
};

export default ButtonLoading;
