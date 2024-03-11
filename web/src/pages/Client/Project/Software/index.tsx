import React, { useEffect, useState } from "react";
import api from "../../../../services/api";
import { Box, Grid } from "@mui/material";
import { SearchBar } from "../../../../components/SearchBar";
import { ProjectTable } from "../../../../components/ProjectTable";
import { ProjectModal } from "../../../../components/ProjectModal";
import Main from "../../../../components/Main";

const ClientProject = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedProject, setSelectedProject]: any = useState(null);
  const [openModal, setOpenModal] = useState(false);

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
        />
        <ProjectModal
          open={openModal}
          onClose={handleCloseModal}
          project={selectedProject}
        />
      </Grid>
    </Main>
  );
};

export default ClientProject;
