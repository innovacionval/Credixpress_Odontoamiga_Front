import styles from "./form.module.css";
import documentoTerminos from "../../assets/documents/1_TÉRMINOS_Y_CONDICIONES_ODONTOAMIGA.pdf";

export const Form = ({ inputs, form, onSubmit }) => {
  const politicaValcredit = 'https://cdn.prod.website-files.com/66799e6ddf33619721f76391/66d0cd0a7f3b2c9098354ed0_Pol%C3%ADtica%20de%20Tratamiento%20de%20Datos%20Valcredit.pdf'
  return (
    <>
      <form
        id="creditForm"
        className={styles.inputsContainer}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {inputs.map((input, index) => (
          <div key={index} className={styles.inputContainer}>
            <label className={styles.label}>{input.label}</label>
            {input.type == "select" ? (
              <select
                className={styles.select}
                {...form.register(input.name, {
                  required: input.required,
                })}
              >
                <option value="">Seleccionar</option>
                {input.options &&
                  input.options.map((option, index) => (
                    <option key={index} value={option.value}>
                      {option.label}
                    </option>
                  ))}
              </select>
            ) : input.name == "telefono" ? (
              <input
                type={input.type}
                className={styles.input}
                {...form.register(input.name, {
                  required: input.required,
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "El número debe tener 10 dígitos",
                  },
                })}
              />
            ) : (
              <input
                type={input.type}
                className={styles.input}
                {...form.register(input.name, {
                  required: input.required,
                })}
              />
            )}

            <span
              className={
                form.formState.errors[input.name] == undefined
                  ? styles.errorMessage
                  : `${styles.errorMessage} ${styles.show}`
              }
            >
              {form.formState.errors[input.name]?.message || "Campo requerido"}
            </span>
          </div>
        ))}
        <div className={styles.inputContainerColumn}>
          <input required type="checkbox" className={styles.checkbox} />
          <label className={styles.label}>
            <a href={documentoTerminos} target="_blank">
              Autorizo la consulta y reporte de mis datos a las centrales de
              riesgo autorizadas por ValCredit
            </a>
          </label>
        </div>
        <div className={styles.inputContainerColumn}>
          <input required type="checkbox" className={styles.checkbox} />
          <label className={styles.label}>
            He leído y acepto la{" "}
            <a href={politicaValcredit} target="_blank">
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
        onClick={form.handleSubmit}
        type="submit"
        className={styles.button}
      >
        Enviar
      </button>
    </>
  );
};
