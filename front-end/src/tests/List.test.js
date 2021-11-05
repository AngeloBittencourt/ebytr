import { render, screen } from '@testing-library/react';
import React from 'react';
import List from '../components/List';
import Home from '../pages/Home'
import userEvent from '@testing-library/user-event';

describe('Testando se renderiza a tela inicial', () => {
  render(<Home />);  
  it('Tela tem a mensagem to-do list', () => {
    const h1 = screen.getByRole('heading');
    expect(h1).toBeInTheDocument();
    expect(h1.innerHTML).toBe('To-do List')
  });
});

describe('Testando se renderiza a Lista de tarefas', () => {
  beforeEach(() => {
    render(<List />);

  });
  it('Começo da lista', () => {
    const title = screen.getByText('Lista de tarefas');
    expect(title).toBeInTheDocument();
  });
  it('Carrega as 5 tarefas pré-salvas', () => {
    const li = screen.getAllByRole('listitem');
    expect(li.length).toBe(5);
  });
  it('Adiciona nova Tarefa', () => {
    const textField = screen.getByPlaceholderText('Adicione nova tarefa');
    const buttonAdd = screen.getByText('Adicionar');
    expect(textField).toBeInTheDocument();
    expect(buttonAdd).toBeInTheDocument();
    userEvent.type(textField, 'teste');

    userEvent.click(buttonAdd);

    const li = screen.getAllByRole('listitem');
    expect(li.length).toBe(6);
  });
})

describe('Testando funcionalidades da lista', () => {
  beforeEach(() => {
    render(<List />);

  }); 
  it('Removendo itens da lista', () => {
    const buttonRemove = screen.getAllByText('Remover');
    userEvent.click(buttonRemove[0]);
    //remove 1
    const li = screen.getAllByRole('listitem');
    expect(li.length).toBe(4);
    //remove mais 2
    userEvent.click(buttonRemove[1]);
    userEvent.click(buttonRemove[2]);

    const newLi = screen.getAllByRole('listitem');
    expect(newLi.length).toBe(2);

  });
  it('Editando um item', () => {
    const firstItem = screen.getByText('lavar a louça');
    expect(firstItem).toBeInTheDocument()

    userEvent.dblClick(firstItem)

    const itemEditor = screen.getByDisplayValue('lavar a louça')
    userEvent.clear(itemEditor)
    userEvent.type(itemEditor, 'teste2')

    const title = screen.getByText('Lista de tarefas');
    userEvent.click(title)

    const editedItem = screen.getByText('teste2');

    expect(editedItem.innerHTML).toBe('teste2')

  })
});
