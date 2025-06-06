import { useNavigate } from "react-router-dom";
import styles from "./simulator.module.css";
import { useForm } from "react-hook-form";
import { dateSimulator, functionToMoney, moneyToFunction } from "../../utils";
import { useEffect, useState } from "react";
import { getFinantialData } from "../../services/simulator.service";

export const Simulator = () => {
  const [resultSimulator, setResultSimulator] = useState({
    resultQuotaValue: "",
    resultDateStart: "",
    resultDateEnd: "",
    resultTasaEA: "",
    resultTasaMNV: "",
  });
  const [finantialData, setFinantialData] = useState([{}]);
  const [valueTable, setValueTable] = useState([]);
  const [isViewTable, setIsViewTable] = useState(false);
  const navigate = useNavigate();
  const form = useForm();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = form;

  useEffect(() => {
    getFinantialData().then((response) => {
      setFinantialData(response);
    });
  }, []);

  const onSubmit = (data) => {
    let secureValue = 0;
    data.valueFinance = moneyToFunction(data.valueFinance);
    if (data.valueFinance < 1000000) {
      setError("valueFinance", {
        type: "manual",
        message: "El valor a financiar debe ser mayor a $1.000.000",
      });
      return;
    }
    if (data.valueFinance > 100000000) {
      setError("valueFinance", {
        type: "manual",
        message: "El valor a financiar debe ser menor a $100.000.000",
      });
      return;
    }
    const newSimulator = {
      ...resultSimulator,
      resultQuotaValue: data.quotaValue,
      resultDateStart: dateSimulator(new Date(), data.dayPay),
      resultDateEnd: dateSimulator(
        new Date(),
        data.dayPay,
        data.quotaValue,
        true
      ),
    };
    if (data?.quotaValue >= 1 && data?.quotaValue <= 12) {
      newSimulator.resultTasaEA = finantialData[0]?.cp_ea;
      newSimulator.resultTasaMNV = finantialData[0]?.cp_nmv;
    } else if (data.quotaValue >= 13 && data.quotaValue <= 36) {
      newSimulator.resultTasaEA = finantialData[0]?.mp_ea;
      newSimulator.resultTasaMNV = finantialData[0]?.mp_nmv;
    } else if (data.quotaValue >= 37 && data.quotaValue <= 60) {
      newSimulator.resultTasaEA = finantialData[0]?.lp_ea;
      newSimulator.resultTasaMNV = finantialData[0]?.lp_nmv;
    }

    if (data.valueFinance >= 1000000 && data.valueFinance <= 5000000) {
      secureValue = 8000;
    } else if (data.valueFinance > 5000000 && data.valueFinance <= 10000000) {
      secureValue = 15000;
    } else if (data.valueFinance > 10000000 && data.valueFinance <= 15000000) {
      secureValue = 18000;
    } else if (data.valueFinance > 15000000 && data.valueFinance <= 25000000) {
      secureValue = 20000;
    } else if (data.valueFinance > 25000000 && data.valueFinance <= 30000000) {
      secureValue = 23000;
    } else if (data.valueFinance > 30000000 && data.valueFinance <= 50000000) {
      secureValue = 30000;
    } else if (data.valueFinance > 50000000 && data.valueFinance <= 75000000) {
      secureValue = 40000;
    } else if (data.valueFinance > 75000000 && data.valueFinance <= 100000000) {
      secureValue = 50000;
    }

    setResultSimulator(newSimulator);

    const tasaMensual = newSimulator.resultTasaMNV / 100;
    const n = data.quotaValue;
    const P = data.valueFinance;

    const cuota =
      (P * tasaMensual) /
      (1- Math.pow(1 + tasaMensual, -n));


    let saldo = P;

    const cuotas = Array.from({ length: n }, (_, i) => {
      const interes = saldo * tasaMensual;
      const abonoCapital = cuota - interes;
      const fecha = dateSimulator(new Date(), data.dayPay, i, true);
      const cuotaTotal = cuota + secureValue;

      const cuotaObj = {
        quotas: (i + 1).toString(),
        date: fecha,
        amountQuota: functionToMoney(cuotaTotal),
        capital: functionToMoney(abonoCapital),
        secureValue: functionToMoney(secureValue),
        interest: functionToMoney(interes),
        balance: functionToMoney(saldo - abonoCapital),
      };

      saldo -= abonoCapital;
      return cuotaObj;
    });

    setValueTable(cuotas);
    setIsViewTable(true);
  };


  const inputs = [
    {
      name: "valueFinance",
      label: "Valor a financiar *",
      type: "text",
    },
    {
      name: "quotaValue",
      label: "Número de cuotas *",
      type: "select",
      options: Array.from({ length: 60 }, (_, i) => (i + 1).toString()),
    },
    {
      name: "dayPay",
      label: "Selecciona día de pago *",
      type: "select",
      options: ["5", "10", "15", "20", "25", "30"],
    },
  ];

  const results = [
    {
      label: "Número de cuotas",
      value: resultSimulator.resultQuotaValue,
    },
    {
      label: "Fecha inicio",
      value: resultSimulator.resultDateStart,
    },
    {
      label: "Fecha fin",
      value: resultSimulator.resultDateEnd,
    },
    {
      label: "Tasa EA",
      value: resultSimulator.resultTasaEA,
    },
    {
      label: "Tasa MNV",
      value: resultSimulator.resultTasaMNV,
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

  const handleRequestCredit = () => {
    navigate("/formulario");
  };

  const handlePrint = () => {
    print();
  }
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Simulador</h1>
      <h4>Simulá tu crédito con OdontoAmiga</h4>
      <h4>Ingresa la información para dar inicio.</h4>
      <form
        className={styles.inputsContainer}
        onSubmit={handleSubmit(onSubmit)}
      >
        {inputs.map((input, index) => (
          <div key={index} className={styles.inputContainer}>
            <label className={styles.label}>{input.label}</label>
            {input.type === "text" ? (
              <input
                className={styles.input}
                {...register(input.name, {
                  required: true,
                  onChange: (e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    const formattedValue = functionToMoney(value);
                    e.target.value = formattedValue;
                  },
                })}
              />
            ) : input.type == "date" ? (
              <input
                type="date"
                className={styles.input}
                {...register(input.name, {
                  required: true,
                })}
              />
            ) : input.type == "select" ? (
              <select
                className={styles.select}
                {...register(input.name, {
                  required: true,
                })}
              >
                <option value="">Seleccionar</option>
                {input.options.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : null}
            {errors[input.name] && (
              <span className={styles.errorMessage}>
                {errors[input.name].message || "Campo requerido"}
              </span>
            )}
          </div>
        ))}
        <button type="submit" className={styles.button}>
          Simular
        </button>
      </form>
      {isViewTable&& <div className={ styles.resultContainer}>
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
              <button onClick={handlePrint} className={styles.button}>Imprimir</button>
            </div>
          </div>
          <div className={styles.tableHeader}>
            {headerTable.map((item, index) => (
              <div key={index} className={styles.tableHeaderItem}>
                <p>{item.label}</p>
              </div>
            ))}
          </div>
          {valueTable.map((item, index) => (
            <div key={index} className={styles.tableBody}>
              {Object.values(item).map((value, index) => (
                <div key={index} className={styles.tableBodyItem}>
                  <p>{value}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className={styles.containerButton}>
          <button onClick={handleRequestCredit} className={styles.button}>
            Solicitar crédito
          </button>
        </div>
      </div>}
    </div>
  );
};
