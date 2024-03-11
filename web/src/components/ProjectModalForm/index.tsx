import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, Button, Grid, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';

export const EditProjectModal = ({ open, onClose, project, onSave, isEditing = false }:any) => {
  const [selectedPhase, setSelectedPhase] = useState('');
  const [selectedPhaseData, setSelectedPhaseData]:any = useState({
    description: '',
    status: '',
    start_date: null,
    end_date: null,
    hours_purchased: '',
    hours_remaining: '',
    requirements_scope: '',
  });

  useEffect(() => {
    if (isEditing && selectedPhase && project?.phases) {
      const phase = project.phases.find((p: { id: string; }) => p.id === selectedPhase);
      if (phase) {
        setSelectedPhaseData(phase);
      }
    } else if (!isEditing) {
      setSelectedPhase('');
      setSelectedPhaseData({
        description: '',
        status: '',
        start_date: new Date(),
        end_date: new Date(),
        hours_purchased: '',
        hours_remaining: '',
        requirements_scope: '',
      });
    }
  }, [selectedPhase, project, isEditing]);

  const handlePhaseChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setSelectedPhase(event.target.value);
  };

  const handleStartDateChange = (newValue: any) => {
    setSelectedPhaseData({ ...selectedPhaseData, start_date: newValue });
  };

  const handleEndDateChange = (newValue: any) => {
    setSelectedPhaseData({ ...selectedPhaseData, end_date: newValue });
  };

  const onSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    onSave(project.id, selectedPhase, selectedPhaseData, isEditing);
    onClose();
  };

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
  };

  return (
    <Modal open={open} onClose={onClose}>
      <LocalizationProvider dateAdapter={AdapterLuxon}>
        <Box sx={modalStyle}>
          <Typography variant="h6">{isEditing ? 'Editar Fase' : 'Adicionar Nova Fase'}</Typography>
          <form onSubmit={onSubmit}>
            <Grid container spacing={2}>
              {isEditing && (
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="phase-select-label">Fase</InputLabel>
                    <Select
                      labelId="phase-select-label"
                      value={selectedPhase}
                      label="Fase"
                      onChange={handlePhaseChange}
                    >
                      {project?.phases?.map((phase:any) => (
                        <MenuItem key={phase.id} value={phase.id}>
                          {phase.description}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              )}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Descrição da Fase"
                  name="description"
                  value={selectedPhaseData.description}
                  onChange={e => setSelectedPhaseData({ ...selectedPhaseData, description: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Status"
                  name="status"
                  value={selectedPhaseData.status}
                  onChange={e => setSelectedPhaseData({ ...selectedPhaseData, status: e.target.value })}
                />
              </Grid>
           
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Horas Compradas"
                  name="hours_purchased"
                  type="number"
                  value={selectedPhaseData.hours_purchased}
                  onChange={e => setSelectedPhaseData({ ...selectedPhaseData, hours_purchased: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Horas Restantes"
                  name="hours_remaining"
                  type="number"
                  value={selectedPhaseData.hours_remaining}
                  onChange={e => setSelectedPhaseData({ ...selectedPhaseData, hours_remaining: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Escopo de Requisitos"
                  name="requirements_scope"
                  value={selectedPhaseData.requirements_scope}
                  onChange={e => setSelectedPhaseData({ ...selectedPhaseData, requirements_scope: e.target.value })}
                />
              </Grid>
            </Grid>
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>
              Salvar
            </Button>
          </form>
        </Box>
      </LocalizationProvider>
    </Modal>
  );
};
