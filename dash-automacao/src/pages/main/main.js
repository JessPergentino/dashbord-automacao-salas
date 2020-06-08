import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, makeStyles, Paper, Grid, Typography, Box } from '@material-ui/core'
import WbIncandescentIcon from '@material-ui/icons/WbIncandescent'
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects'
import PersonIcon from '@material-ui/icons/Person'
import AcUnitIcon from '@material-ui/icons/AcUnit'
import TitleIcon from '@material-ui/icons/Title'
import AccessTimeIcon from '@material-ui/icons/AccessTime'

import { BarraNavegacao } from 'ui'

import api from 'services/api'
import SelectItens from 'ui/select'
import { LOGIN } from 'routes'

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(2),
      padding: theme.spacing(4),
      width: '1200px',
      height: '730px'
    }
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 300
  },
  info: {
    width: '1000px',
    height: '470px'
  }
}))

const salas = [
  {
    id: '1',
    nome: 'Sala 1'
  },
  {
    id: '2',
    nome: 'Sala 2'
  }
]

const MainPage = () => {
  const classes = useStyles()
  const [sala, setSala] = useState('')
  const [luminosidade, setLuminosidade] = useState('...')
  const [lampada, setLampada] = useState('...')
  const [temperatura, setTemperatura] = useState('...')
  const [arCondicionado, setArCondicionado] = useState('...')
  const [hasPessoas, setHasPessoas] = useState('...')
  const [acesso, setAcesso] = useState('')

  const history = useHistory()

  useEffect(() => {
    let interval
    if (sala !== '') {
      interval = setInterval(() => {
        api.get(`/infos/${sala.id}`)
          .then((response) => {
            if (response.data.length > 0) {
              setLuminosidade(response.data[0].luminosidade)
              setTemperatura(response.data[0].temperatura)
              response.data[0].lampada ? setLampada('Ligada') : setLampada('Desligada')
              response.data[0].arCondicionado ? setArCondicionado('Ligado') : setArCondicionado('Desligado')
              response.data[0].pessoas ? setHasPessoas('Há pessoas na sala') : setHasPessoas('Não há pessoas na sala')
              setAcesso(response.data[0].createdAt)
            }
          })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [sala])

  const handleChange = (event) => {
    setSala(event.target.value)
    setAcesso('...')
    setLuminosidade('...')
    setTemperatura('...')
    setLampada('...')
    setArCondicionado('...')
    setHasPessoas('...')
  }

  const handleLogout = () => {
    history.push(LOGIN)
  }

  return (
    <>
      <BarraNavegacao>
        <Button onClick={handleLogout} color='inherit'>Logout</Button>
      </BarraNavegacao>

      <div className={classes.paper}>
        <Paper>
          <Grid
            container
            direction='column'
            justify='space-around'
            alignItems='center'
            spacing={2}
          >
            <Grid item>
              <Typography variant='h2'>Monitoramento de Salas</Typography>
            </Grid>

            <Grid item>
              <Grid
                container
                direction='column'
                justify='center'
                alignItems='center'
                spacing={2}
              >
                <Grid item>
                  <SelectItens
                    itens={salas}
                    itemSelecionado={sala}
                    handleChangeItem={handleChange}
                  />
                </Grid>

                <Grid item>
                  {sala !== '' && (
                    <Box className={classes.info} border={1} borderColor='primary.main' borderRadius={16}>
                      <Grid
                        container
                        direction='column'
                        justify='space-between'
                        alignItems='stretch'
                        style={{ marginTop: '10px' }}
                        spacing={10}
                      >

                        <Grid item xs>
                          <Grid
                            container
                            direction='row'
                            justify='space-evenly'
                            alignItems='center'
                          >
                            <Grid item>
                              <Grid
                                container
                                direction='column'
                                justify='space-between'
                                alignItems='stretch'
                                spacing={2}
                              >
                                <Grid item xs>
                                  <AccessTimeIcon /> Ultima Atualização:
                                </Grid>

                                <Grid item xs>
                                  {acesso}
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs>
                          <Grid
                            container
                            direction='row'
                            justify='space-evenly'
                            alignItems='center'
                            spacing={2}
                          >
                            <Grid item>
                              <WbIncandescentIcon /> {luminosidade} lux
                            </Grid>

                            <Grid item>
                              <TitleIcon /> {temperatura} °C
                            </Grid>
                          </Grid>
                        </Grid>

                        <Grid item xs>
                          <Grid
                            container
                            direction='row'
                            justify='space-evenly'
                            alignItems='center'
                            spacing={2}
                          >
                            <Grid item>
                              <EmojiObjectsIcon /> {lampada}
                            </Grid>

                            <Grid item>
                              <AcUnitIcon /> {arCondicionado}
                            </Grid>
                          </Grid>
                        </Grid>

                        <Grid item xs>
                          <Grid
                            container
                            direction='row'
                            justify='space-evenly'
                            alignItems='center'
                          >
                            <Grid item>
                              <PersonIcon /> {hasPessoas}
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Box>
                  )}

                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </div>
    </>
  )
}

export default MainPage
