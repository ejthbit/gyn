import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from '@material-ui/core'
import React, { forwardRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logOutAutomatically } from 'src/store/administration/administrationSlice'
import { isAdminAutomaticallyLoggedOut } from 'src/store/administration/selectors'

const AutomaticLogoutDialog = () => {
    const dispatch = useDispatch()
    const isLoggedOutAutomatically = useSelector(isAdminAutomaticallyLoggedOut)

    const handleClearState = () => dispatch(logOutAutomatically())

    const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />)
    Transition.displayName = 'Transition'

    return (
        isLoggedOutAutomatically && (
            <Dialog
                open={isLoggedOutAutomatically}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClearState}
            >
                <DialogTitle>Automatické odhlašení</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Vypršela platnost Vašeho přihlašovacího tokenu, z toho důvodu jste byli automaticky odhlášení.
                        Pro pokračování se prosím znovu přihlašte.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClearState} color="primary">
                        Zavřít
                    </Button>
                </DialogActions>
            </Dialog>
        )
    )
}

export default AutomaticLogoutDialog
