import { FaRegCheckCircle } from "react-icons/fa";
import { Modal } from "../../components/modal/modal";
import stylesModal from "../../components/modal/modal.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { InfoSimulationContext } from "../../contexts/infoSimulationContext";
import { FiAlertCircle } from "react-icons/fi";

export const ModalsPage = () => {
  const [searchParams] = useSearchParams();
  const { info } = useContext(InfoSimulationContext);

  const idRequest = searchParams.get("idRequest");
  const idSignature = searchParams.get("idSignature");
  const status = searchParams.get("status");
  const isCodeudor = searchParams.get("isCodeudor");

  const [isSuccess, setIsSuccess] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (status == "approved") {
      setIsSuccess("approved");
    } else if (status == "subsanable") {
      setIsSuccess("subsanable");
    } else {
      setIsSuccess("rejected");
    }
  }, [status]);
  return (
    <>
      <Modal
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
                onClick={() => {}}
              >
                Finalizar
              </button>
            </div>
          </>
        )}
        {isSuccess == "subsanable" && isCodeudor == "false" && (
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
    </>
  );
};
