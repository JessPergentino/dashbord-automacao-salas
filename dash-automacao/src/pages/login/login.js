import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles, Paper, Grid, Typography, TextField, Button } from '@material-ui/core'
import { BarraNavegacao } from 'ui'
import { HOME } from 'routes'

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(2),
      padding: theme.spacing(4),
      width: '1200px',
      height: '500px'
    }
  }
}))

const Login = () => {
  const classes = useStyles()

  const history = useHistory()

  const [acesso, setAcesso] = useState('')

  const handleClick = () => {
    if (acesso.login === 'usuarioUcsal' && acesso.senha === '123456') {
      history.push(HOME)
    }
  }

  return (
    <>
      <BarraNavegacao />

      <div className={classes.paper}>
        <Paper>
          <Grid
            container
            direction='column'
            justify='space-around'
            alignItems='center'
            spacing={4}
          >
            <Grid item>
              <Typography variant='h2'>Monitoramento de Salas</Typography>
            </Grid>

            <Grid item>
              <form>
                <Grid
                  container
                  direction='column'
                  justify='center'
                  alignItems='center'
                  spacing={2}
                >
                  <Grid item>
                    <TextField
                      id='login'
                      label='Login'
                      variant='outlined'
                      fullWidth
                      onChange={(e) => {
                        const val = e.target.value
                        setAcesso(prevState => {
                          return { ...prevState, login: val }
                        })
                      }}
                    />
                  </Grid>

                  <Grid item>
                    <TextField
                      id='senha'
                      label='Senha'
                      type='password'
                      autoComplete='current-password'
                      variant='outlined'
                      fullWidth
                      onChange={(e) => {
                        const val = e.target.value
                        setAcesso(prevState => {
                          return { ...prevState, senha: val }
                        })
                      }}
                    />
                  </Grid>

                  <Grid item>
                    <Button onClick={handleClick} variant='contained' color='primary'>
                      Login
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Grid>
        </Paper>
      </div>
    </>
  )
}

export default Login
