import styles from "./form.module.css";

export const Form = () => {
  const inputs = [
    {
      label: "Primer Nombre *",
      type: "text",
      required: true,
    },
    {
      label: "Segundo Nombre",
      type: "text",
      required: true,
    },
    {
      label: "Primer Apellido *",
      type: "text",
      required: true,
    },
    {
      label: "Segundo Apellido",
      type: "text",
      required: true,
    },
    {
      label: "Celular *",
      type: "select",
      required: true,
    },
    {
      label: "Correo *",
      type: "text",
      required: true,
    },
    {
      label: "Tipo de documento *",
      type: "select",
      required: true,
    },
    {
      label: "Número de documento *",
      type: "text",
      required: true,
    },
    {
      label: "Fecha de expedición *",
      type: "date",
      required: true,
    },
    {
      label: "Fecha de nacimiento *",
      type: "date",
      required: true,
    },
    {
      label: "Ciudad",
      type: "text",
      required: true,
    },
    {
      label: "Dirección *",
      type: "text",
      required: true,
    },
    {
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
    <div className={styles.container}>
      <h1 className={styles.title}>¡Bienvenid@!</h1>
      <h3>Ingresa la información para dar inicio a tu solicitud</h3>
      <form className={styles.inputsContainer}>
        {inputs.map((input, index) => (
          <div key={index} className={styles.inputContainer}>
            <label className={styles.label}>{input.label}</label>
            {input.type === "text" ? (
              <input
                required={input.required}
                type={input.type}
                className={styles.input}
              />
            ) : input.type == "date" ? (
              <input
                required={input.required}
                type={input.type}
                className={styles.input}
              />
            ) : input.type == "select" ? (
              <select required={input.required} className={styles.select}>
                <option value="">Seleccionar</option>
                {input.options &&
                  input.options.map((option, index) => (
                    <option key={index} value={option.value}>
                      {option.label}
                    </option>
                  ))}
              </select>
            ) : null}
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
            <a
              href="https://cdn.prod.website-files.com/66799e6ddf33619721f76391/669fb0702f4ec3426d0f9a95_politica_tratamiento_de_datos_v2.pdf"
              target="_blank"
            >
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
      <button type="submit" className={styles.button}>
        Enviar
      </button>
    </div>
  );
};
