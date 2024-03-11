import { Box, Card, CardContent, Grid, IconButton, Modal, Typography } from "@mui/material";
import { DateTime } from "luxon";
import DescriptionIcon from '@mui/icons-material/Description';

export const ProjectModal = ({ open, onClose, project }: any) => {
    const formatDate = (isoDate: string) => {
        return DateTime.fromISO(isoDate).toLocaleString({
            day: '2-digit',
            month: 'numeric',
            year: 'numeric',
        });
    };

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 1000,
        maxWidth: '90%',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: 1,
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={modalStyle}>
                {project && (
                    <>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            {project.name}
                        </Typography>
                        {project.phases.map((phase: any, index: any) => (
                            <Card raised sx={{ minWidth: '100%', marginBottom: 2, mt: index > 0 ? 2 : 0 }} key={index}>
                                <CardContent>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                            <Typography variant="h5" component="div">
                                                {phase.description}
                                            </Typography>
                                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                Status: {phase.status}
                                            </Typography>
                                            <Typography variant="body2" paragraph>
                                                Data de Início: {formatDate(phase.start_date)}
                                            </Typography>
                                            <Typography variant="body2" paragraph>
                                                Previsão de Término: {formatDate(phase.end_date)}
                                            </Typography>

                                            <Typography variant="body2" paragraph>
                                                Horas Adquiridas: {phase.hours_purchased}
                                            </Typography>
                                            <Typography variant="body2" paragraph>
                                                Horas Restantes: {phase.hours_remaining}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Typography variant="h5" component="div">
                                                Escopo de Levantamento de Requisitos
                                            </Typography>
                                            <Typography variant="body2" paragraph>
                                                {phase.requirements_scope}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <hr />
                                    <Typography variant="body2" paragraph>
                                        Visualizar a documentação relacionada a este projeto
                                    </Typography>
                                    {phase.contracts.length > 0 ? (
                                        phase.contracts.map((contract: any) => (
                                            <Grid container spacing={2} key={contract.id}>
                                                <Grid item xs={12}>
                                                    <IconButton color="primary" aria-label="abrir contrato">
                                                        <DescriptionIcon />
                                                    </IconButton>
                                                    <i style={{ fontSize: '12px' }}>{contract.name}</i>
                                                </Grid>
                                            </Grid>
                                        ))
                                    ) : (
                                        <Typography variant="body2" paragraph>
                                            Não há contratos para esta fase.
                                        </Typography>
                                    )}

                                </CardContent>
                            </Card>
                        ))}
                    </>
                )}
            </Box>
        </Modal>
    );
};
