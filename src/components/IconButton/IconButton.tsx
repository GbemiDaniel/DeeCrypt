import styles from "./IconButton.module.css";

type IconButtonProps = {
  label: string;
  onClick?: () => void;
  children: React.ReactNode;
};

export default function IconButton({
  label,
  onClick,
  children,
}: IconButtonProps) {
  return (
    <button
      className={styles.btn}
      type="button"
      aria-label={label}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
