import styles from "./modal.module.css";

export const Modal = ({ icon, title, isSuccess = true, children }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <i>{icon}</i>
          <h2 className={`${isSuccess ? styles.success : styles.failure}`}>
            {title}
          </h2>
        </div>
        <div className={styles.modalBody}>{children}</div>
      </div>
    </div>
  );
};
