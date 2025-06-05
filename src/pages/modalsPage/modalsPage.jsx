import { FaRegCheckCircle } from "react-icons/fa";
import { Modal } from "../../components/modal/modal";
import stylesModal from "../../components/modal/modal.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { InfoSimulationContext } from "../../contexts/infoSimulationContext";
import { FiAlertCircle } from "react-icons/fi";
import { validationFaceId, validationSignature } from "../../services/form.service";

export const ModalsPage = () => {
  const [searchParams] = useSearchParams();
  const { info } = useContext(InfoSimulationContext);

  const idRequest = searchParams.get("idRequest");
  const idSignature = searchParams.get("idSignature");
  const status = searchParams.get("status");
  const isCodeudor = searchParams.get("isCodeudor");
  const processId = searchParams.get("process_id");

  const [isSuccess, setIsSuccess] = useState(null);
  const [isSignatureSuccess, setIsSignatureSuccess] = useState(null);
  const navigate = useNavigate();


  const handleSignatureProcess = () => {
    validationFaceId({
      document_number: "10618151003",
      cellphone_number: "3204101697",
      id_request:"294",
      id_client: "5",
      redirect_url: "http://localhost:5173/modal"
    }).then((res) => {
      if(res?.token_url){
        window.open(res.token_url, "_blank");
      }
    }).catch((err) => {
      console.error("Error in validationFaceId:", err);
    });
  }

  useEffect(() => {
    if(processId){
      validationSignature(processId)
        .then((res) => {
          console.log("Signature validation response:", res);
          setIsSignatureSuccess(true)
        })
        .catch((err) => {
          console.error("Error in validationSignature:", err);
          setIsSignatureSuccess(false);
        });
    }
  }
  , [processId]);


  useEffect(() => {
    if (status == "approved") {
      setIsSuccess("approved");
    } else if (status == "remediable") {
      setIsSuccess("remediable");
    } else {
      setIsSuccess("rejected");
    }
  }, [status]);

  return (
    <>
      {!processId ? <Modal
        icon={status == "approved" ? <FaRegCheckCircle /> : <FiAlertCircle />}
        title={
          isSuccess == "approved"
            ? "Solicitud preaprobada"
            : "Solicitud rechazada"
        }
        isSuccess={isSuccess}
      >
        {isSuccess == "approved" && isCodeudor == "false" && (
          <>
            <p>
              <strong>¡Estás a un paso de obtener tu crédito!</strong>
            </p>
            <p>
              <strong>
                Ahora procederemos con la validación de tu identidad. <br />
                Para Completar este proceso, asegúrate de contar con lo
                siguiente:
              </strong>
            </p>
            <p>
              <strong>
                Tu documento de identidad físico <br />
                Acceso a la cámara frontal de tu dispositivo móvil <br />
                Conexión estable a internet
              </strong>
            </p>
            <p>
              <strong>
                Una vez validemos tu identidad, podrás firmar los documentos de
                forma digital y habrás finalizado el proceso. ¡Así de fácil!
              </strong>
            </p>
            <div className={stylesModal.modalFooter}>
              <button
                className={`${stylesModal.button} ${stylesModal.success}`}
                onClick={handleSignatureProcess}
              >
                Continuar
              </button>
            </div>
          </>
        )}
        {isSuccess == "remediable" && isCodeudor == "false" && (
          <>
            <p>
              <strong>Solicitud no aprobada</strong>
            </p>
            <p>
              <strong>¡Pero aún hay opciones para ti!</strong>
            </p>
            <p>
              <strong>
                Aunque no fue posible aprobar el valor total solicitado, podemos
                ofrecerte un crédito por {info?.amount}
              </strong>
            </p>
            <p>
              <strong>
                Si deseas continuar con este nuevo valor, estamos listos para
                seguir el proceso
              </strong>
            </p>
            <p>
              <strong>
                ¿Prefieres mantener el monto inicial? <br />
                Puedes hacerlo agregando un codeudor para continuar con el
                estudio.
              </strong>
            </p>
            <p>
              <strong>
                Indícanos cómo deseas proceder <br />
                ¡Estamos aquí para ayudarte!
              </strong>
            </p>
            <div className={stylesModal.modalFooter}>
              <button
                className={`${stylesModal.button} ${stylesModal.success}`}
                onClick={() => navigate("/")}
              >
                Simular nuevo monto
              </button>
              <button
                className={`${stylesModal.button} ${stylesModal.failure}`}
                onClick={() =>
                  navigate(`/formularioCodeudor?idRequest=${idRequest}`)
                }
              >
                Agregar codeudor
              </button>
            </div>
          </>
        )}
        {isSuccess == "rejected" && isCodeudor == "false" && (
          <>
            <p>
              <strong>Tu solicitud no ha sido aprobada.</strong>
            </p>
            <p>
              <strong>
                En esta oportunidad no podemos avanzar con el crédito. <br />
                Te invitamos a interntarlo nuevamente más adelante.
              </strong>
            </p>
            <div className={stylesModal.modalFooter}>
              <button
                className={`${stylesModal.button} ${stylesModal.success}`}
                onClick={() => {}}
              >
                Finalizar
              </button>
            </div>
          </>
        )}
        {isSuccess == "rejected" && isCodeudor == "true" && (
          <>
            <p>
              <strong>Tu codeudor no cumple con los requisitos</strong>
            </p>
            <p>
              <strong>
                Hemos evaluado la información de tu codeudor y, lamentablemente,
                no cumple con los requisitos para respaldar tu solicitud de
                crédito.
              </strong>
            </p>
            <p>
              <strong>
                Puedes intentar nuevamente agregando un nuevo codeudor o
                continuar con el monto preaprobado disponible para ti.
              </strong>
            </p>
            <div className={stylesModal.modalFooter}>
              <button
                className={`${stylesModal.button} ${stylesModal.success}`}
                onClick={() => navigate(`/formularioCodeudor/?idRequest=${idRequest}`)}
              >
                Ingresar nuevo codeudor
              </button>
              <button
                className={`${stylesModal.button} ${stylesModal.failure}`}
                onClick={() => {}}
              >
                Aceptar monto preaprobado
              </button>
            </div>
          </>
        )}
      </Modal>
      : isSignatureSuccess ? <Modal
        icon={<FaRegCheckCircle />}
        title="Validación de firma"
        isSuccess="approved"
      >
        <>
          <p>
            <strong>¡Tu firma ha sido validada exitosamente!</strong>
          </p>
          <p>
            Documento firmado y procesado correctamente
          </p>
          <div className={stylesModal.modalFooter}>
            <button
              className={`${stylesModal.button} ${stylesModal.success}`}
              onClick={() => navigate("/")}
            >
              Finalizar
            </button>
          </div>
        </>

      </Modal>:
      <Modal
        icon={<FiAlertCircle />}
        title="Validación de firma"
        isSuccess="rejected"
      >
        <>
          <p>
            <strong>¡Error al validar la firma!</strong>
          </p>
          <p>
            No se pudo completar el proceso de firma. Por favor, intenta
            nuevamente más tarde o contacta al soporte.
          </p>
          <div className={stylesModal.modalFooter}>
            <button
              className={`${stylesModal.button} ${stylesModal.success}`}
              onClick={() => navigate("/")}
            >
              Finalizar
            </button>
          </div>
        </>
      </Modal>
      }
    </>
  );
};
