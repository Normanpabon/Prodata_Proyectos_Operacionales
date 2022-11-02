import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  return context;
};

export function UserContextProvider({ children }) {
  const [projects, setProjects] = useState([]);
  const [token, setToken] = useState("");
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [user, setUser] = useState(null);
  const [allStatus, setAllStatus] = useState([]);
  const [unit, setUnit] = useState("");
  const opDataRestApi = "http://localhost:8090/opData/API/V2";
  const [alert, setAlert] = useState(" hidden");

  const clearFilters = () => {
    setFilteredProjects(() => [...projects]);
    console.log(filteredProjects);
  };

  const formatDate = (fecha) => {
    const formatedDate = new Date(
      `${fecha.slice(0, 4)}/${fecha.slice(5, 7)}/${fecha.slice(8)}`
    );
    return formatedDate;
  };

  const filterProjectsSoonToExpire = () => {
    setFilteredProjects(
      projects.filter((project) => {
        const finDate = formatDate(project.fecha_fin);
        const today = new Date();
        const diff = (finDate - today) / (1000 * 60 * 60 * 24);
        if (diff < 7 && diff >=0) {
          return true;
        }
        return false;
      })
    );
  };

  const filterProjectsExpired = () => {
    setFilteredProjects(
      projects.filter((project) => {
        const finDate = formatDate(project.fecha_fin);
        const today = new Date();
        const diff = (finDate - today) / (1000 * 60 * 60 * 24);
        if (diff <= 0) {
          return true;
        }
        return false;
      })
    );
  };

  const filterProjectsByDate = (dateType, dateFilter, order) => {
    if (dateType === "reg") {
      setFilteredProjects(
        projects.filter((item) =>
          filterProjectsDateOperation(order, dateFilter, item.fecha_reg)
        )
      );
    } else if (dateType === "ini") {
      setFilteredProjects(
        projects.filter((item) =>
          filterProjectsDateOperation(order, dateFilter, item.fecha_ini)
        )
      );
    } else if (dateType === "fin") {
      setFilteredProjects(
        projects.filter((item) =>
          filterProjectsDateOperation(order, dateFilter, item.fecha_fin)
        )
      );
    }
  };

  const filterProjectsDateOperation = (order, dateFilter, date) => {
    if (order == ">") {
      return date.replace("-", "") > dateFilter.replace("-", "");
    } else if (order == "<") {
      return date.replace("-", "") < dateFilter.replace("-", "");
    } else if (order == "=") {
      return date.replace("-", "") === dateFilter.replace("-", "");
    }
  };

  const orderProjectsByDate = (dateType, order) => {
    const sortedArray = [...filteredProjects];
    if (dateType === "reg") {
      sortedArray.sort((a, b) =>
        orderProjectDateOperation(a.fecha_reg, b.fecha_reg, order)
      );
    } else if (dateType === "ini") {
      sortedArray.sort((a, b) =>
        orderProjectDateOperation(a.fecha_ini, b.fecha_ini, order)
      );
    } else if (dateType === "fin") {
      sortedArray.sort((a, b) =>
        orderProjectDateOperation(a.fecha_fin, b.fecha_fin, order)
      );
    }
    console.log(sortedArray);
    setFilteredProjects(sortedArray);
  };

  const orderProjectDateOperation = (a, b, order) => {
    if (order == "asc") {
      if (a.replace("-", "") > b.replace("-", "")) {
        return 1;
      } else if (a.replace("-", "") < b.replace("-", "")) {
        return -1;
      }
      return 0;
    } else if (order == "des") {
      if (a.replace("-", "") > b.replace("-", "")) {
        return -1;
      } else if (a.replace("-", "") < b.replace("-", "")) {
        return 1;
      }
      return 0;
    }
  };

  const filterProjectsByStatus = (status) => {
    var keysArray = [];
    for (const key in status) {
      if (status[key]) {
        keysArray.push(key);
      }
    }
    setFilteredProjects(
      projects.filter((item) => {
        for (const key of keysArray) {
          if (item.id_estado == key) {
            return true;
          }
        }
        return false;
      })
    );
    console.log(filteredProjects);
  };

  const filterProjectsBySingleStatus = (status) => {
    setFilteredProjects(projects.filter((item) => item.id_estado === status));
  };

  const orderProjectsByStatus = (order) => {
    const sortedArray = [...filteredProjects];
    sortedArray.sort((a, b) =>
      orderProjectsOperation(a.id_estado, b.id_estado, order)
    );
    setFilteredProjects(sortedArray);
  };

  const orderProjectsOperation = (a, b, order) => {
    if (order == "asc") {
      if (a > b) {
        return 1;
      } else if (a < b) {
        return -1;
      }
      return 0;
    } else if (order == "des") {
      if (a > b) {
        return -1;
      } else if (a < b) {
        return 1;
      }
      return 0;
    }
  };

  const filterProjectsByName = (name) => {
    setFilteredProjects(
      projects.filter((item) => item.desc_pro.includes(name))
    );
    console.log(filteredProjects);
  };

  const orderProjectsByName = (order) => {
    const sortedArray = [...filteredProjects];
    sortedArray.sort((a, b) =>
      orderProjectsOperation(a.desc_pro, b.desc_pro, order)
    );
    setFilteredProjects(sortedArray);
  };

  const getProjectsByUnit = async () => {
    try {
      const { data } = await axios({
        method: "get",
        url: `${opDataRestApi}/proyectos/unidad/${1}`,
        headers: { Authorization: `Opdata ${token}` },
      });
      data.map((item) => {
        item.fecha_reg = `${item.fecha_reg[0]}-${
          item.fecha_reg[1] < 10 ? `0${item.fecha_reg[1]}` : item.fecha_reg[1]
        }-${
          item.fecha_reg[2] < 10 ? `0${item.fecha_reg[2]}` : item.fecha_reg[2]
        }`;
        item.fecha_ini = `${item.fecha_ini[0]}-${
          item.fecha_ini[1] < 10 ? `0${item.fecha_ini[1]}` : item.fecha_ini[1]
        }-${
          item.fecha_ini[2] < 10 ? `0${item.fecha_ini[2]}` : item.fecha_ini[2]
        }`;
        item.fecha_fin = `${item.fecha_fin[0]}-${
          item.fecha_fin[1] < 10 ? `0${item.fecha_fin[1]}` : item.fecha_fin[1]
        }-${
          item.fecha_fin[2] < 10 ? `0${item.fecha_fin[2]}` : item.fecha_fin[2]
        }`;
      });
      setProjects([...data]);
      setFilteredProjects(
        [...data].sort((a, b) => (a.id_estado > b.id_estado ? 1 : -1))
      );
    } catch (error) {}
  };

  const getAllStatus = async () => {
    try {
      const { data } = await axios({
        method: "get",
        url: `${opDataRestApi}/proyectos/estado/all`,
        headers: { Authorization: `Opdata ${token}` },
      });
      setAllStatus(data);
    } catch (error) {}
  };

  const getUnitById = async () => {
    try {
      const { data } = await axios.get(
        `${opDataRestApi}/unidades/${user.unit}`
      );
      setUnit(data.nombre_unidad);
    } catch (error) {}
  };

  const createProject = async (project) => {
    try {
      const {
        desc_pro,
        fecha_fin,
        fecha_ini,
        fecha_reg,
        id_estado,
        observaciones,
      } = project;
      let observacionesSend = "";
      if (observaciones == "" || observaciones == undefined) {
        observacionesSend = "na";
      } else {
        observacionesSend = observaciones;
      }
      console.log(user);
      const { data } = await axios({
        method: "post",
        url: `${opDataRestApi}/proyectos/${user.id_unidad}/${fecha_reg}/${fecha_ini}/${fecha_fin}/${desc_pro}/${id_estado}/${observacionesSend}`,
        headers: { Authorization: `Opdata ${token}` },
      });
      setProjects([...projects, data]);
      setFilteredProjects([
        ...projects.filter((pro) => pro.id !== data.id),
        data,
      ]);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const updateProject = async (project) => {
    try {
      var {
        id,
        desc_pro,
        fecha_fin,
        fecha_ini,
        fecha_reg,
        id_estado,
        observaciones,
      } = project;
      let observacionesSend = "";
      if (observaciones == "" || observaciones == undefined) {
        observacionesSend = "na";
      } else {
        observacionesSend = observaciones;
      }
      const { data } = await axios({
        method: "put",
        url: `${opDataRestApi}/proyectos/${id}/${user.id_unidad}/${fecha_reg}/${fecha_ini}/${fecha_fin}/${desc_pro}/${id_estado}/${observacionesSend}`,
        headers: { Authorization: `Opdata ${token}` },
      });
      setProjects([...projects.filter((pro) => pro.id !== data.id), data]);
      setFilteredProjects([
        ...projects.filter((pro) => pro.id !== data.id),
        data,
      ]);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const userAuth = async (user, password) => {
    try {
      const { data } = await axios({
        method: "post",
        url: `${opDataRestApi}/login`,
        headers: {},
        data: { username: user, password: password },
      });
      setToken(data.token);
      const userGet = await axios({
        method: "get",
        url: `${opDataRestApi}/users/username/${user}`,
        headers: { Authorization: `Opdata ${data.token}` },
      });
      const { nombre, apellido, rol, cod_ins } = userGet.data;
      const unit = await axios({
        method: "get",
        url: `${opDataRestApi}/unidades/jefe/${cod_ins}`,
        headers: { Authorization: `Opdata ${data.token}` },
      });
      setUser({
        nombre: nombre,
        apellido: apellido,
        rol: rol,
        nombre_unidad: unit.data.nombre_unidad,
        id_unidad: unit.data.id,
      });
      return true;
    } catch (error) {
      return false;
    }
  };

  return (
    <UserContext.Provider
      value={{
        userAuth: userAuth,
        projects: projects,
        filteredProjects: filteredProjects,
        user: user,
        unit: unit,
        allStatus: allStatus,
        alert: alert,
        setProjects: setProjects,
        setFilteredProjects: setFilteredProjects,
        setUser: setUser,
        setAllStatus: setAllStatus,
        setAlert: setAlert,
        getProjectsByUnit: getProjectsByUnit,
        getAllStatus: getAllStatus,
        getUnitById: getUnitById,
        filterProjectsSoonToExpire: filterProjectsSoonToExpire,
        filterProjectsExpired: filterProjectsExpired,
        filterProjectsByDate: filterProjectsByDate,
        orderProjectsByDate: orderProjectsByDate,
        filterProjectsByStatus: filterProjectsByStatus,
        orderProjectsByStatus: orderProjectsByStatus,
        filterProjectsByName: filterProjectsByName,
        orderProjectsByName: orderProjectsByName,
        filterProjectsBySingleStatus: filterProjectsBySingleStatus,
        formatDate: formatDate,
        clearFilters: clearFilters,
        createProject: createProject,
        updateProject: updateProject,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
