import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Paper } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';
import { DateTime } from "luxon";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
export const ProjectTable = ({
    projects,
    onPageChange,
    onRowsPerPageChange,
    page,
    rowsPerPage,
    onOpenModal,
    onOpenEditModal,
}: any) => {
    const { userAccessLevel } = useAuth();

    const [selectedProject, setSelectedProject]: any = useState(null);
    const [openModal, setOpenModal] = useState(false);

    const formatDate = (isoDate: string) => {
        return DateTime.fromISO(isoDate).toLocaleString({
            day: '2-digit',
            month: 'numeric',
            year: 'numeric',
        });
    };



    const handleOpenModal = (project: any) => {
        setSelectedProject(project);
        setOpenModal(true);
    };

    return (
        <TableContainer component={Paper}>
            <Table aria-label="tabela de projetos">
                <TableHead>
                    <TableCell>Nome do Projeto</TableCell>
                    <TableCell>Início</TableCell>
                    <TableCell>Previsão de Término</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Ações</TableCell>
                </TableHead>
                <TableBody>

                    {projects && projects.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((project: any) => (
                        <TableRow key={project.id}>
                            <TableCell>{project.name}</TableCell>
                            <TableCell>{formatDate(project.phases?.[0]?.start_date)}</TableCell>
                            <TableCell>{formatDate(project.phases[project.phases.length - 1]?.end_date)}</TableCell>
                            <TableCell>
                                {project.phases[project.phases.length - 1]?.status}
                            </TableCell>
                            <TableCell>
                                <IconButton onClick={() => onOpenModal(project)} color="primary" aria-label="detalhes do projeto">
                                    <InfoIcon />
                                </IconButton>
                                {userAccessLevel === 1 && ( // se for admin
                                    <IconButton onClick={() => onOpenEditModal(project)} color="secondary" aria-label="editar projeto">
                                        <EditIcon />
                                    </IconButton>
                                )}

                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={projects.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={onPageChange}
                onRowsPerPageChange={onRowsPerPageChange}
                labelRowsPerPage="Linhas por página:"
                labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count !== -1 ? count : `mais de ${to}`}`}
            />
        </TableContainer>
    );
};
