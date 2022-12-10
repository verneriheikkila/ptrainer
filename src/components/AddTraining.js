// @ts-nocheck
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function AddTraining(props) {
    const [open, setOpen] = useState(false);
    const [training, setTraining] = useState({
        date: new Date(),
        duration: 0,
        activity: '',
        customer: '',
    });

    const handleClickOpen = () => {
        setTraining({
            ...training,
            customer: props.data.links?.[0].href,
        });
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        props.addTraining(training);
        setOpen(false);
    };

    return (
        <div>
            <Button onClick={handleClickOpen} size="small">
                +Training
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    Add new training for {props.data.firstname}
                </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="date"
                        type="datetime-local"
                        value={training.date}
                        onChange={(e) =>
                            setTraining({
                                ...training,
                                date: e.target.value,
                            })
                        }
                        label="Date"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        label="Duration"
                        value={training.duration}
                        onChange={(e) =>
                            setTraining({
                                ...training,
                                duration: e.target.value,
                            })
                        }
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        label="Activity"
                        value={training.activity}
                        onChange={(e) =>
                            setTraining({
                                ...training,
                                activity: e.target.value,
                            })
                        }
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
