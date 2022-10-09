import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  return context;
};

export function UserContextProvider({ children }) {
  const [projects, setProjects] = useState([]);
  const [user, setUser] = useState(null);
  const [allStatus, setAllStatus] = useState([]);

  const getProjectsByUnit = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8090/prodata/API/V1/proyectos/unidad/${user.unit}`
      );
      setProjects(data);
    } catch (error) {}
  };

  const getAllStatus = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8090/prodata/API/V1/proyectos/estado/all"
      );
      setAllStatus(data);
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
        unidad_p,
      } = project;
      const { data } = await axios.post(
        `http://localhost:8090/prodata/API/V1/proyectos/${unidad_p}/${fecha_reg}/${fecha_ini}/${fecha_fin}/${desc_pro}/${id_estado}/${observaciones}`
      );
      setProjects([...projects, data]);
    } catch (error) {}
  };

  return (
    <UserContext.Provider
      value={{
        projects: projects,
        user: user,
        allStatus: allStatus,
        setProjects: setProjects,
        setUser: setUser,
        setAllStatus: setAllStatus,
        getProjectsByUnit: getProjectsByUnit,
        getAllStatus: getAllStatus,
        createProject: createProject,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}