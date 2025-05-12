import { useNavigate } from "react-router-dom";
import styles from "./simulator.module.css";

export const Simulator = () => {
  const navigate = useNavigate();
  const inputs = [
    {
      label: "Valor a financiar *",
      type: "text",
    },
    {
      label: "Número de cuotas *",
      type: "select",
      options: Array.from({ length: 60 }, (_, i) => (i + 1).toString()),
    },
    {
      label: "Selecciona día de pago *",
      type: "date",
    },
  ];

  const results = [
    {
      label: "Número de cuotas",
      value: "12",
    },
    {
      label: "Fecha inicio",
      value: "01/01/2024",
    },
    {
      label: "Fecha fin",
      value: "01/01/2025",
    },
    {
      label: "Tasa EA",
      value: "12%",
    },
    {
      label: "Tasa MNV",
      value: "1%",
    },
  ];

  const headerTable = [
    {
      label: "No.Cuota",
    },
    {
      label: "Fecha",
    },
    {
      label: "Monto Cuota",
    },
    {
      label: "Capital",
    },
    {
      label: "Valor de Seguro",
    },
    {
      label: "Interés",
    },
    {
      label: "Saldo",
    },
  ];

  const valueTable = [
    "1",
    "01/01/2024",
    "$100.000",
    "$80.000",
    "$10.000",
    "$10.000",
    "$20.000",
    "1",
    "01/01/2024",
    "$100.000",
    "$80.000",
    "$10.000",
    "$10.000",
    "$20.000",
    "1",
    "01/01/2024",
    "$100.000",
    "$80.000",
    "$10.000",
    "$10.000",
    "$20.000",
    "1",
    "01/01/2024",
    "$100.000",
    "$80.000",
    "$10.000",
    "$10.000",
    "$20.000",
    "1",
    "01/01/2024",
    "$100.000",
    "$80.000",
    "$10.000",
    "$10.000",
    "$20.000",
    "1",
    "01/01/2024",
    "$100.000",
    "$80.000",
    "$10.000",
    "$10.000",
    "$20.000",
  ];

  const handleRequestCredit = () => {
    navigate("/formulario");
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Simulador</h1>
      <h4>Simulá tu crédito con OdontoAmiga</h4>
      <h4>Ingresa la información para dar inicio.</h4>
      <form className={styles.inputsContainer}>
        {inputs.map((input, index) => (
          <div key={index} className={styles.inputContainer}>
            <label className={styles.label}>{input.label}</label>
            {input.type === "text" ? (
              <input type="text" className={styles.input} />
            ) : input.type == "date" ? (
              <input type="date" className={styles.input} />
            ) : input.type == "select" ? (
              <select className={styles.select}>
                <option value="">Seleccionar</option>
                {input.options.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : null}
          </div>
        ))}
        <button type="button" className={styles.button}>
          Simular
        </button>
      </form>
      <div className={styles.resultContainer}>
        <div className={styles.inputsResults}>
          {results.map((result, index) => (
            <div key={index} className={styles.resultItem}>
              <span className={styles.resultLabel}>{result.label}</span>
              <input
                type="text"
                className={styles.resultInput}
                value={result.value}
                readOnly
              />
            </div>
          ))}
        </div>
        <hr />
        <div className={styles.tableResult}>
          <div className={styles.headerTitle}>
            <div className={styles.headerTitleItem}></div>
            <div className={styles.headerTitleItem}>
              <h2>Plan de pago</h2>
            </div>
            <div className={styles.containerButton}>
              <button className={styles.button}>Imprimir</button>
            </div>
          </div>
          <div className={styles.tableHeader}>
            {headerTable.map((item, index) => (
              <div key={index} className={styles.tableHeaderItem}>
                <p>{item.label}</p>
              </div>
            ))}
          </div>
          <div className={styles.tableBody}>
            {valueTable.map((item, index) => (
              <div key={index} className={styles.tableBodyItem}>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.containerButton}>
          <button onClick={handleRequestCredit} className={styles.button}>
            Solicitar crédito
          </button>
        </div>
      </div>
    </div>
  );
};
