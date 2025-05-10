import styles from "./form.module.css";

export const Form = () => {
  const inputs = [
    {
      label: "Primer Nombre *",
      type: "text",
    },
    {
      label: "Segundo Nombre",
      type: "text",
    },
    {
      label: "Primer Apellido *",
      type: "text",
    },
    {
      label: "Segundo Apellido",
      type: "text",
    },
    {
      label: "Celular *",
      type: "select",
    },
    {
      label: "Correo *",
      type: "text",
    },
    {
      label: "Tipo de documento *",
      type: "select",
    },
    {
      label: "Número de documento *",
      type: "text",
    },
    {
      label: "Fecha de expedición *",
      type: "select",
    },
    {
      label: "Fecha de nacimiento *",
      type: "select",
    },
    {
      label: "Ciudad",
      type: "text",
    },
    {
      label: "Dirección *",
      type: "text",
    },
    {
      label: "Genero *",
      type: "select",
    },
  ];
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>¡Bienvenid@!</h1>
      <h3>Ingresa la información para dar inicio a tu solicitud</h3>
      <form className={styles.inputsContainer}>
        {inputs.map((input, index) => (
          <div key={index} className={styles.inputContainer}>
            <label className={styles.label}>{input.label}</label>
            {input.type === "text" ? (
              <input type="text" className={styles.input} />
            ) : (
              <select className={styles.select}>
                <option value="">Seleccionar</option>
              </select>
            )}
          </div>
        ))}
        <div className={styles.inputContainerColumn}>
          <input type="checkbox" className={styles.checkbox} />
          <label className={styles.label}>
            Autorizo la consulta y reporte de mis datos a las centrales de
            riesgo autorizadas por ValCredit
          </label>
        </div>
        <div className={styles.inputContainerColumn}>
          <input type="checkbox" className={styles.checkbox} />
          <label className={styles.label}>
            He leído y acepto la Política de tratamiento de datos personales
          </label>
        </div>
        <div className={styles.inputContainerColumn}>
          <input type="checkbox" className={styles.checkbox} />
          <label className={styles.label}>
            Autorizo la firma electrónica y condiciones de contratación digital
          </label>
        </div>
      </form>
      <button type="submit" className={styles.button}>
        Enviar
      </button>
    </div>
  );
};
