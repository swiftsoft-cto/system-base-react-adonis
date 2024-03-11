import React, { useEffect, useState } from "react";
import api from "../../../../services/api";
import { Box, Grid } from "@mui/material";
import { SearchBar } from "../../../../components/SearchBar";
import { ProjectTable } from "../../../../components/ProjectTable";
import { ProjectModal } from "../../../../components/ProjectModal";
import Main from "../../../../components/Main";
import { EditProjectModal } from "../../../../components/ProjectModalForm";

const AdminProject = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedProject, setSelectedProject]: any = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, [page, rowsPerPage]);


  const fetchProjects = async () => {
    const response: any = await api.get('get-projects');
    if (response.data && Array.isArray(response.data)) {
      setProjects(response.data);
      setFilteredProjects(response.data);
    } else {
      console.error("Expected an array of projects, received:", response.data);
    }
  };

  const handleSearch = (event: any) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = projects.filter((project: any) => project.name.toLowerCase().includes(value));
    setFilteredProjects(filtered);
  };

  const handleChangeRowsPerPage = (event: { target: { value: string; }; }) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangePage = (_event: any, newPage: React.SetStateAction<number>) => {
    setPage(newPage);
  };

  const handleOpenModal = (project: any) => {
    setSelectedProject(project);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };



  const handleOpenEditModal = (project: any) => {
    setSelectedProject(project);
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  const onSaveProject = async (projectId: any, updatedProject: any) => {
    try {
      // Chama a API para atualizar o projeto
      await api.put(`update-project/${projectId}`, updatedProject);
      // Atualiza a lista de projetos
      const updatedProjects: any = projects.map((project: any) =>
        project.id === projectId ? { ...project, ...updatedProject } : project
      );
      setProjects(updatedProjects);
      setFilteredProjects(updatedProjects); // Se estiver usando filtragem
      setOpenEditModal(false); // Fecha a modal após a atualização
    } catch (error) {
      console.error("Erro ao salvar o projeto:", error);
    }
  };


  return (
    <Main>
      <Grid container>
        <Grid item xs={12} lg={4}>
          <SearchBar onSearch={handleSearch} />
        </Grid>
        <ProjectTable
          projects={filteredProjects}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          page={page}
          rowsPerPage={rowsPerPage}
          onOpenModal={handleOpenModal}
          onOpenEditModal={handleOpenEditModal}
        />
        <ProjectModal
          open={openModal}
          onClose={handleCloseModal}
          project={selectedProject}
        />
        <EditProjectModal
          open={openEditModal}
          onClose={handleCloseEditModal}
          project={selectedProject}
          onSave={onSaveProject}
        />
      </Grid>
    </Main>
  );
};

export default AdminProject;
