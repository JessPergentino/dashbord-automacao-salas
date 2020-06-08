import React from 'react'
import t from 'prop-types'
import { makeStyles, AppBar, Toolbar } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  bar: {
    flexGrow: 1
  }
}))

const BarraNavegacao = ({ children }) => {
  const classes = useStyles()
  return (
    <div className={classes.bar}>
      <AppBar position='static'>
        <Toolbar>
          {children}
        </Toolbar>
      </AppBar>
    </div>
  )
}

BarraNavegacao.propTypes = {
  children: t.node
}

export default BarraNavegacao
