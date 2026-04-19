import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material'
import React from 'react'

type PersonText = { section1: string[]; section2?: string[] }

type PersonDetailProps = {
    open: boolean
    handleClose: () => void
    title: string
    text: PersonText
}

const PersonDetail = ({ open, handleClose, title, text }: PersonDetailProps) => (
    <Dialog maxWidth="sm" open={open} onClose={handleClose} fullWidth>
        <DialogTitle>
            <Typography variant="h5">{title}</Typography>
        </DialogTitle>
        <DialogContent>
            <Box mb={2}>
                {text.section1.map((line) => (
                    <Typography key={line} variant="body2" gutterBottom>
                        {line}
                    </Typography>
                ))}
            </Box>
            {text.section2 && (
                <Box>
                    {text.section2.map((line) => (
                        <Typography key={line} variant="body2" gutterBottom>
                            {line}
                        </Typography>
                    ))}
                </Box>
            )}
        </DialogContent>
        <DialogActions>
            <Button variant="outlined" onClick={handleClose} color="primary">
                Zavřít
            </Button>
        </DialogActions>
    </Dialog>
)

export default PersonDetail
