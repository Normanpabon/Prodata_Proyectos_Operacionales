import UsersFilterSearch from "./UsersFilterSearch";
import { useState, useEffect } from "react";
import { useUser } from "../../context/UserContext";
function UsersFilterBar() {
  const { conmuteDisabledUsers, sortUsersByCode, sortUsersByLastName } =
    useUser();
  const [open, setOpen] = useState(true);
  const [eye, setEye] = useState(false);
  useEffect(() => {
    setOpen(false);
  }, []);

  return (
    <div
      className={`${
        open ? "w-fit" : "w-16"
      } mx-auto h-full bg-secondary p-2 mb-1 text-white flex flex-col z-50`}
    >
      <div
        className="tooltip tooltip-right"
        data-tip="Abrir/Cerrar la barra de filtros"
      >
        <button
          className="btn btn-primary btn-square w-full"
          onClick={() => {
            setOpen(!open);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
            />
          </svg>
        </button>
      </div>
      {open ? <UsersFilterSearch /> : ""}
      {!open ? (
        <div
          className="tooltip tooltip-right"
          data-tip="Buscar un usuario por Nombre de Usuario"
        >
          <button
            onClick={() => {
              setOpen(!open);
            }}
            className="btn btn-square btn-primary mt-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      ) : (
        ""
      )}
      <div className="tooltip tooltip-right" data-tip="Limpiar la busqueda">
        <label
          onClick={() => {
            sortUsersByLastName("des");
          }}
          className={`btn btn-primary text-white w-full mt-2`}
        >
          <div className={`${open ? "grid grid-cols-4 w-full" : ""}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
            {open ? (
              <p className="my-auto text-left col-span-3">Limpiar busqueda</p>
            ) : (
              ""
            )}
          </div>
        </label>
      </div>
      <div
        className="tooltip tooltip-right"
        data-tip="Mostrar/ocultar usuarios deshabilitados"
      >
        <label
          onClick={() => {
            conmuteDisabledUsers();
            setEye(!eye);
          }}
          className={`btn btn-primary text-white w-full mt-2`}
        >
          <div className={`${open ? "grid grid-cols-4 w-full" : ""}`}>
            {eye ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
                <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
              </svg>
            )}
            {open ? (
              <p className="my-auto text-left col-span-3">
                Mostrar/Ocultar Deshabilitados
              </p>
            ) : (
              ""
            )}
          </div>
        </label>
      </div>
      <div
        className="tooltip tooltip-right"
        data-tip="Ordenar por Código ascendente"
      >
        <label
          onClick={() => {
            sortUsersByCode("asc");
          }}
          className={`btn btn-primary text-white w-full mt-2`}
        >
          <div className={`${open ? "grid grid-cols-4 w-full" : ""}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M12.438 1.668V7H11.39V2.684h-.051l-1.211.859v-.969l1.262-.906h1.046z" />
              <path
                fillRule="evenodd"
                d="M11.36 14.098c-1.137 0-1.708-.657-1.762-1.278h1.004c.058.223.343.45.773.45.824 0 1.164-.829 1.133-1.856h-.059c-.148.39-.57.742-1.261.742-.91 0-1.72-.613-1.72-1.758 0-1.148.848-1.835 1.973-1.835 1.09 0 2.063.636 2.063 2.687 0 1.867-.723 2.848-2.145 2.848zm.062-2.735c.504 0 .933-.336.933-.972 0-.633-.398-1.008-.94-1.008-.52 0-.927.375-.927 1 0 .64.418.98.934.98z"
              />
              <path d="M4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293V2.5z" />
            </svg>
            {open ? (
              <p className="my-auto text-left col-span-3">Código ascendente</p>
            ) : (
              ""
            )}
          </div>
        </label>
      </div>
      <div
        className="tooltip tooltip-right"
        data-tip="Ordenar por Código descendente"
      >
        <label
          onClick={() => {
            sortUsersByCode("des");
          }}
          className={`btn btn-primary text-white w-full mt-2`}
        >
          <div className={`${open ? "grid grid-cols-4 w-full" : ""}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M11.36 7.098c-1.137 0-1.708-.657-1.762-1.278h1.004c.058.223.343.45.773.45.824 0 1.164-.829 1.133-1.856h-.059c-.148.39-.57.742-1.261.742-.91 0-1.72-.613-1.72-1.758 0-1.148.848-1.836 1.973-1.836 1.09 0 2.063.637 2.063 2.688 0 1.867-.723 2.848-2.145 2.848zm.062-2.735c.504 0 .933-.336.933-.972 0-.633-.398-1.008-.94-1.008-.52 0-.927.375-.927 1 0 .64.418.98.934.98z"
              />
              <path d="M12.438 8.668V14H11.39V9.684h-.051l-1.211.859v-.969l1.262-.906h1.046zM4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293V2.5z" />
            </svg>
            {open ? (
              <p className="my-auto text-left col-span-3">Código descendente</p>
            ) : (
              ""
            )}
          </div>
        </label>
      </div>
      <div
        className="tooltip tooltip-right"
        data-tip="Ordenar por apellido ascendente"
      >
        <label
          onClick={() => {
            sortUsersByLastName("asc");
          }}
          className={`btn btn-primary text-white w-full mt-2`}
        >
          <div className={`${open ? "grid grid-cols-4 w-full" : ""}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M10.082 5.629 9.664 7H8.598l1.789-5.332h1.234L13.402 7h-1.12l-.419-1.371h-1.781zm1.57-.785L11 2.687h-.047l-.652 2.157h1.351z"
              />
              <path d="M12.96 14H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645V14zM4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293V2.5z" />
            </svg>
            {open ? (
              <p className="my-auto text-left col-span-3">
                Apellido ascendente
              </p>
            ) : (
              ""
            )}
          </div>
        </label>
      </div>
      <div
        className="tooltip tooltip-right"
        data-tip="Ordenar por apellido descendente"
      >
        <label
          onClick={() => {
            sortUsersByLastName("des");
          }}
          className={`btn btn-primary text-white w-full mt-2`}
        >
          <div className={`${open ? "grid grid-cols-4 w-full" : ""}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M12.96 7H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645V7z" />
              <path
                fillRule="evenodd"
                d="M10.082 12.629 9.664 14H8.598l1.789-5.332h1.234L13.402 14h-1.12l-.419-1.371h-1.781zm1.57-.785L11 9.688h-.047l-.652 2.156h1.351z"
              />
              <path d="M4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293V2.5z" />
            </svg>
            {open ? (
              <p className="my-auto text-left col-span-3">
                Apellido descendente
              </p>
            ) : (
              ""
            )}
          </div>
        </label>
      </div>
    </div>
  );
}

export default UsersFilterBar;
