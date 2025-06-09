import { FaCross } from "react-icons/fa";
import styles from "./modalAdress.module.css";
import { IoMdClose } from "react-icons/io";

export const ModalAdress = ({
  setIsOpenAddress,
  formAdress,
  formPrincipal,
}) => {
  const inputs = [
    {
      placeholder: "Tipo de vía",
      name: "tipoVia",
    },
    {
      placeholder: "Número",
      name: "numeroVia",
    },
    {
      placeholder: "Letra",
      name: "letraVia",
    },
    {
      placeholder: "Cuadrante",
      name: "cuadrante",
    },
    {
      placeholder: "Número",
      name: "numero",
    },
    {
      placeholder: "Letra",
      name: "letra",
    },
    {
      placeholder: "Cuadrante",
      name: "cuadrante2",
    },
    {
      placeholder: "Número",
      name: "numero2",
    },
    {
      placeholder:
        "Información adicionar (Ej: Torre, apartamento, oficina, etc.)",
      name: "informacionAdicional",
    },
  ];
  const handleChange = (e) => {
    const { name, value } = e.target;
    formAdress.setValue(name, value);
    const addressParts = inputs
      .map((input) => formAdress.getValues(input.name))
      .filter((part) => part);
    const fullAddress = addressParts.join(" ");
    formPrincipal.setValue("direccion", fullAddress);
  };
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2>Dirección</h2>
          <i
            className={styles.succesIcon}
            onClick={() => setIsOpenAddress(false)}
          >
            <IoMdClose />
          </i>
        </div>
        <div className={styles.modalBody}>
          {inputs.map((input, index) => (
            <input
              type="text"
              key={index}
              placeholder={input.placeholder}
              className={styles.input}
              {...formAdress.register(input.name, {
                required: true,
              })}
              onChange={handleChange}
            />
          ))}
          <input
            type="text"
            placeholder="Dirección completa"
            disabled
            className={styles.input}
            {...formPrincipal.register("direccion", {})}
          />
        </div>
        <div className={styles.modalFooter}>
          <button
            className={styles.button}
            onClick={() => setIsOpenAddress(false)}
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
};
