import { useUser } from "../../context/UserContext";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
function StatusForm() {
  const { allStatus, updateStatus, createStatus, setAlert, users } = useUser();
  const [validation, setValidation] = useState({});
  const navigate = useNavigate();
  const params = useParams();
  const [status, setStatus] = useState({
    estado: "",
  });
  useEffect(() => {
    if (params.id) {
      const temp = allStatus.find((statusFound) => statusFound.id == params.id);
      setStatus(temp);
    }
  }, []);

  const handleChange = (e) => {
    setStatus({ ...status, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let validationTemp = {};
    let validationPass = true;
    if (status.estado === "") {
      validationTemp = { ...validationTemp, estado_empty: true };
      validationPass = false;
    } else {
      validationTemp = { ...validationTemp, estado_empty: false };
    }
    if (status.estado.length > 100) {
      validationTemp = { ...validationTemp, estado_length: true };
      validationPass = false;
    } else {
      validationTemp = { ...validationTemp, estado_length: false };
    }
    setValidation(validationTemp);
    if (validationPass) {
      if (params.id) {
        updateStatus({
          ...status,
          id: params.id,
        });
      } else {
        createStatus(status);
      }
    }
    navigate("/admin/status");
    setAlert("");
    setTimeout(() => {
      setAlert(" hidden");
    }, 5000);
  };

  return (
    <>
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box w-11/12 h-11/12 bg-secondary">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col p-3 h-full bg-white rounded-xl border-black border-2 overflow-auto"
          >
            <h2 className="text-xl font-bold bg-primary -m-2 mb-1 text-white rounded-xl p-2">
              {params.id ? "Modificación de estado" : "Creación de estado"}
            </h2>
            <div className="form-control">
              <label htmlFor="nombre_estado" className="label">
                <span className="label-text font-bold">Nombre del estado</span>
              </label>
              <input
                type="text"
                name="estado"
                id="nombre_unidad"
                className={`input input-bordered${
                  validation.estado_empty || validation.estado_length
                    ? " input-error"
                    : " input-secondary"
                }`}
                value={status.estado}
                onChange={handleChange}
              />
              <label htmlFor="nombre_unidad" className="label">
                <span className="label-text-alt text-error">
                  {validation.estado_empty
                    ? "El campo no debe estar vacío"
                    : ""}
                  {validation.estado_length
                    ? "El campo no debe sobrepasar los 100 carácteres"
                    : ""}
                </span>
              </label>
            </div>
            <div className="mt-2 -ml-3">
              <button className="btn btn-primary text-white rounded-xl w-fit mx-3">
                Guardar
              </button>
              <button
                className="btn btn-secondary text-white rounded-xl w-fit"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/admin/status");
                }}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default StatusForm;