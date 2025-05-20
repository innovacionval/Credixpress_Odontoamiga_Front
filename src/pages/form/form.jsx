import { useState } from "react";
import styles from "./form.module.css";
import { Modal } from "../../components/modal/modal";
import stylesModal from "../../components/modal/modal.module.css";
import documentoTerminos from "../../assets/documents/1_TÉRMINOS_Y_CONDICIONES_ODONTOAMIGA.pdf";

export const Form = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e) => {
    if (e.target.checkValidity()) {
      e.preventDefault();
      setIsOpen(true);
    }
  };
  const inputs = [
    {
      name: "nombre",
      label: "Primer Nombre *",
      type: "text",
      required: true,
    },
    {
      name: "segundoNombre",
      label: "Segundo Nombre",
      type: "text",
      required: true,
    },
    {
      name: "primerApellido",
      label: "Primer Apellido *",
      type: "text",
      required: true,
    },
    {
      name: "segundoApellido",
      label: "Segundo Apellido *",
      type: "text",
      required: true,
    },
    {
      name: "telefono",
      label: "Celular *",
      type: "number",
      required: true,
    },
    {
      name: "correo",
      label: "Correo *",
      type: "text",
      required: true,
    },
    {
      name: "tipoDocumento",
      label: "Tipo de documento *",
      type: "select",
      required: true,
    },
    {
      name: "numeroDocumento",
      label: "Número de documento *",
      type: "text",
      required: true,
    },
    {
      name: "fechaExpedicion",
      label: "Fecha de expedición *",
      type: "date",
      required: true,
    },
    {
      name: "fechaNacimiento",
      label: "Fecha de nacimiento *",
      type: "date",
      required: true,
    },
    {
      name: "ciudad",
      label: "Ciudad *",
      type: "text",
      required: true,
    },
    {
      name: "direccion",
      label: "Dirección *",
      type: "text",
      required: true,
    },
    {
      name: "barrio",
      label: "Genero *",
      type: "select",
      required: true,
      options: [
        { label: "Masculino", value: "masculino" },
        { label: "Femenino", value: "femenino" },
      ],
    },
  ];
  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>¡Bienvenid@!</h1>
        <h3>Ingresa la información para dar inicio a tu solicitud</h3>
        <form
          id="creditForm"
          className={styles.inputsContainer}
          onSubmit={handleSubmit}
        >
          {inputs.map((input, index) => (
            <div key={index} className={styles.inputContainer}>
              <label className={styles.label}>{input.label}</label>
              {input.type == "select" ? (
                <select required={input.required} className={styles.select}>
                  <option value="">Seleccionar</option>
                  {input.options &&
                    input.options.map((option, index) => (
                      <option key={index} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                </select>
              ) : (
                <input
                  required={input.required}
                  type={input.type}
                  className={styles.input}
                />
              )}
            </div>
          ))}
          <div className={styles.inputContainerColumn}>
            <input required type="checkbox" className={styles.checkbox} />
            <label className={styles.label}>
              Autorizo la consulta y reporte de mis datos a las centrales de
              riesgo autorizadas por ValCredit
            </label>
          </div>
          <div className={styles.inputContainerColumn}>
            <input required type="checkbox" className={styles.checkbox} />
            <label className={styles.label}>
              He leído y acepto la{" "}
              <a href={documentoTerminos} target="_blank">
                <strong>Política de tratamiento de datos personales</strong>
              </a>
            </label>
          </div>
          <div className={styles.inputContainerColumn}>
            <input required type="checkbox" className={styles.checkbox} />
            <label className={styles.label}>
              <a href="" target="_blank">
                <strong>
                  Autorizo la firma electrónica y condiciones de contratación
                  digital
                </strong>
              </a>
            </label>
          </div>
        </form>
        <button
          form="creditForm"
          onClick={handleSubmit}
          type="submit"
          className={styles.button}
        >
          Enviar
        </button>
      </div>
      {isOpen && (
        <Modal icon={"a"} title="Solicitud Preaprobada" isSuccess={true}>
          <p>
            <strong>¡Tu solicitud ha sido preaprobada!</strong>
          </p>
          <p>
            <strong>
              Estás a un paso de obtener tu crédito con OdontoAmiga. Pronto nos
              contactaremos para continuar con el proceso
            </strong>
          </p>
          <div className={stylesModal.modalFooter}>
            <button
              className={stylesModal.button}
              onClick={() => setIsOpen(false)}
            >
              Finalizar
            </button>
            <button
              className={stylesModal.button}
              onClick={() => setIsOpen(false)}
            >
              Volver
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};
