type ButtonType = {
    onClick?: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined,
    classNames?: string,
    loading?: boolean,
    label?: string,
    link?: string,
  }

  export default ButtonType;