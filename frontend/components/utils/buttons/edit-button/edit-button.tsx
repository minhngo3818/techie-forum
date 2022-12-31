import styles from "./EditButton.module.css";

interface EditButton {
  isEdit: boolean;
  isCheckCancelOnly?: boolean;
  onClick?(event: React.MouseEvent<HTMLButtonElement>): void;
  onSubmit?(event: React.FormEvent<HTMLButtonElement>): void;
}

function EditButton(props: EditButton) {
  return (
    <div className={styles.editBtnContainer}>
      <div className={styles.editBtnWrapper}>
        {props.isEdit ? (
          <>
            <button
              type="submit"
              onSubmit={props.onSubmit}
              className={`${styles.editBtnSubmit} ${styles.editBtn} `}
            >
              ✓
            </button>
            <button
              type="button"
              onClick={props.onClick}
              className={`${styles.editBtnCancel} ${styles.editBtn}`}
            >
              X
            </button>
          </>
        ) : (
          <>
            {!props.isCheckCancelOnly && (
              <button
                type="button"
                onClick={props.onClick}
                className={`${styles.editBtnLarge} ${styles.editBtn}`}
              >
                Edit
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
export default EditButton;
