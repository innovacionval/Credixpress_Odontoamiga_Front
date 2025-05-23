import { useContext } from "react";
import styles from "./formDeudor.module.css";
import { Modal } from "../../components/modal/modal";
import { InfoSimulationContext } from "../../contexts/infoSimulationContext";
import { useForm } from "react-hook-form";
import { AddprincipalDebtor } from "../../services/simulator.service";
import { FaRegCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Form } from "../../components/form/form";

export const FormDeudor = () => {
  const form = useForm();
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
          `/modal?idRequest=${res.id_request}&idSignature=${res.id_signature}&status=${res.status}isCodeudor=false`
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
        <Form inputs={inputs} form={form} onSubmit={onSubmit} />
      </div>
    </>
  );
};
