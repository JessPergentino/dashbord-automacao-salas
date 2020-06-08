import React from 'react'
import t from 'prop-types'

import {
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from '@material-ui/core'

const SelectItens = ({ itens, itemSelecionado, handleChangeItem }) => {
  return (
    <>
      <FormControl
        variant='outlined'
        style={{
          margin: '8px',
          minWidth: 200
        }}
      >
        <InputLabel id='label-select-projeto'>Selecione o Projeto</InputLabel>
        <Select
          labelId='label-select-projeto'
          id='select-projeto'
          value={itemSelecionado}
          onChange={handleChangeItem}
          label='Selecione o Projeto'
        >
          {itens ? itens.map((item) => (
            <MenuItem
              key={item.id}
              value={item}
            >
              {item.nome}
            </MenuItem>
          )) : []}
        </Select>
      </FormControl>
    </>
  )
}

SelectItens.propTypes = {
  itens: t.array,
  itemSelecionado: t.any,
  handleChangeItem: t.func
}

export default SelectItens
