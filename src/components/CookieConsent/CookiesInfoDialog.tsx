import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material'
import React from 'react'

type CookiesInfoDialogProps = {
    open: boolean
    handleClose: () => void
}

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <Box component="section" sx={{ mt: 2 }}>
        <Typography variant="h6" component="h3" color="primary" gutterBottom>
            {title}
        </Typography>
        {children}
    </Box>
)

const CookiesInfoDialog = ({ open, handleClose }: CookiesInfoDialogProps) => (
    <Dialog
        maxWidth="md"
        open={open}
        onClose={handleClose}
        fullWidth
        scroll="paper"
        aria-labelledby="cookies-info-title"
    >
        <DialogTitle id="cookies-info-title">
            <Typography variant="h5" component="span">
                GDPR a cookies
            </Typography>
        </DialogTitle>
        <DialogContent dividers>
            <Typography variant="body2">
                Na této stránce se dozvíte, jaké soubory cookies na webových stránkách www.vanek-gynekologie.cz
                zpracováváme, k jakému účelu a jak můžete ovlivnit to, jaká cookies ukládáme do vašich zařízení.
            </Typography>
            <Section title="Co jsou to cookies">
                <Typography variant="body2">
                    Cookies jsou malé datové soubory, které jsou v některých případech nezbytné pro některé funkce
                    webových stránek. Díky cookies si naše webové stránky mohou také zapamatovat různá nastavení, která
                    jste si pro zobrazení či používání stránek zvolili.
                </Typography>
            </Section>
            <Section title="Jaké cookies na webu používáme">
                <Box component="ul" sx={{ mt: 0, pl: 3 }}>
                    <Typography variant="body2" component="li">
                        Technické cookies (první strany) – nezbytné pro základní funkčnost webu, např. zapamatování, že
                        jste se seznámili s tímto oznámením.
                    </Typography>
                    <Typography variant="body2" component="li">
                        Analytické cookies (Google Analytics) – pouze s vaším souhlasem; používáme, abychom mohli
                        stránky lépe přizpůsobit; nepoužíváme analytické funkce shromažďující údaje k profilování
                        uživatelů (věk, pohlaví, zájmy, IP adresa apod.).
                    </Typography>
                </Box>
                <Typography variant="body2">
                    Cookies nikdy nepoužíváme k osobní identifikaci návštěvníků a neumisťujeme do nich citlivé nebo
                    osobní údaje.
                </Typography>
            </Section>
            <Section title="Osobní údaje při online rezervaci">
                <Typography variant="body2">
                    Při objednání termínu v rezervačním formuláři od vás získáváme jméno, datum narození a volitelně
                    e-mail a telefonní číslo. Tyto údaje nám poskytujete dobrovolně odesláním rezervace a zpracováváme
                    je výhradně za účelem objednání a vyřízení vašeho termínu.
                </Typography>
            </Section>
            <Section title="Osobní údaje z kontaktního formuláře">
                <Typography variant="body2">
                    Prostřednictvím kontaktního formuláře v patičce webu od vás získáváme jméno, e-mail, zvolenou
                    pobočku a text zprávy. Tyto údaje nám poskytujete dobrovolně odesláním formuláře a zpracováváme je
                    výhradně za účelem odpovědi na vaši zprávu.
                </Typography>
            </Section>
            <Section title="Jak můžete cookies upravit">
                <Typography variant="body2">
                    Souhlas s analytickými cookies můžete kdykoli odvolat nebo změnit odkazem „Nastavení cookies“ v
                    patičce webu. Všechny cookies uložené ve vašem zařízení můžete kdykoli vymazat. Většina prohlížečů
                    nabízí i možnost jejich blokace. Detailní informace o nastavení naleznete na stránkách poskytovatele
                    vašeho prohlížeče (Chrome, Firefox, Safari, Edge apod.).
                </Typography>
            </Section>
        </DialogContent>
        <DialogActions>
            <Button variant="outlined" onClick={handleClose} color="primary">
                Zavřít
            </Button>
        </DialogActions>
    </Dialog>
)

export default CookiesInfoDialog
