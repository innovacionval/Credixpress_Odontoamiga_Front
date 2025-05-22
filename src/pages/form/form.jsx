import { useContext } from "react";
import styles from "./form.module.css";
import { Modal } from "../../components/modal/modal";
import documentoTerminos from "../../assets/documents/1_TÉRMINOS_Y_CONDICIONES_ODONTOAMIGA.pdf";
import { InfoSimulationContext } from "../../contexts/infoSimulationContext";
import { useForm } from "react-hook-form";
import { AddprincipalDebtor } from "../../services/simulator.service";
import { FaRegCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const Form = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const { info } = useContext(InfoSimulationContext);
  const navigate = useNavigate();


  const onSubmit = (data) => {

    const dataDebtor = {
      validation_type: "OTP",
      person_data: {
        name: `${data.nombre} ${data.segundoNombre}`,
        last_name: `${data.primerApellido} ${data.segundoApellido}`,
        type_person: "N",
        email: data.correo,
        document_type: data.tipoDocumento,
        document_number: data.numeroDocumento,
        cellular: data.telefono,
        birthdate: data.fechaNacimiento,
        expedition_date: data.fechaExpedicion,
        address: data.direccion,
        city: data.ciudad,
        gender: data.barrio,
        requested_amount: info?.amount,
      },
      simulation_info: info?.simulation_info,
    };
    AddprincipalDebtor(dataDebtor)
      .then((res) => {
        navigate(
          `/modal?idRequest=${res.id_request}&idSignature=${res.id_signature}&status=${res.status}`
        );
      })
      .catch((err) => {
        console.log(err);
      });
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
      options: [
        { label: "Cédula de ciudadanía", value: "CC" },
        { label: "Cédula de extranjería", value: "CE" },
        { label: "Pasaporte", value: "PA" },
        { label: "Tarjeta de identidad", value: "TI" },
        { label: "Registro civil", value: "RC" },
      ],
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
        { label: "Masculino", value: "M" },
        { label: "Femenino", value: "F" },
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
          onSubmit={handleSubmit(onSubmit)}
        >
          {inputs.map((input, index) => (
            <div key={index} className={styles.inputContainer}>
              <label className={styles.label}>{input.label}</label>
              {input.type == "select" ? (
                <select
                  className={styles.select}
                  {...register(input.name, {
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
              ) : (
                <input
                  type={input.type}
                  className={styles.input}
                  {...register(input.name, {
                    required: input.required,
                  })}
                />
              )}
              {errors[input.name] && (
                <span className={styles.error}>Este campo es requerido</span>
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
    </>
  );
};
