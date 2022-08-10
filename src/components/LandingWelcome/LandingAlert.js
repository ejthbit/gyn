import React, { useState } from 'react'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import { Close } from '@mui/icons-material'

const LandingAlert = () => {
    const [open, close] = useState(true)
    const handleClose = () => close((open) => !open)
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                <Box display="flex" alignItems="center" justifyContent="center">
                    <Box flexGrow={1}>
                        <Typography variant="h4">Plánovaná odstávka webu</Typography>
                    </Box>
                    <Box alignSelf="flex-start">
                        <IconButton onClick={handleClose} size="large">
                            <Close />
                        </IconButton>
                    </Box>
                </Box>
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <span>Z důvodu technické udržby webu v termínu 13 - 14.8.2022 bude web nedostupný.</span>
                    <br />
                    Děkujeme za pochopení MUDr. Miroslav Vaněk.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} autoFocus>
                    Zavřít
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default LandingAlert
