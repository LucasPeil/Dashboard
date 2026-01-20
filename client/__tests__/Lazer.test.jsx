import { screen, waitFor } from '@testing-library/react';
import { renderWithProviders } from './test-utils';
import LazerDashboard from '../src/components/LazerPanels/LazerDashboard';
import { expect, vi } from 'vitest';
import { server } from './mocks/server';
import { http, HttpResponse } from 'msw';
import { beforeAll, afterEach, afterAll } from 'vitest';
// Mockamos toast e outras libs visuais
vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
    POSITION: {},
  },
}));

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Informações da tabela via API', () => {
  it('deve buscar dados da API e exibir na tabela', async () => {
    // 1. Estado inicial SÓ com usuário logado.
    // Deixamos 'atividadesLazer' vazio, pois queremos que venha da "API"
    const initialState = {
      auth: {
        user: { _id: '123', token: 'fake_token' },
      },
    };

    renderWithProviders(<LazerDashboard />, { preloadedState: initialState });

    // 2. O componente monta e dispara o useEffect.
    // O usuário vê primeiro o estado de loading ou tabela vazia.
    // Usamos 'findBy' (que é assíncrono) para esperar o MSW responder e a tela atualizar.

    // Verifica se o texto do mock (handlers.js) apareceu
    expect(await screen.findByText('Atividade 1')).toBeInTheDocument();
    expect(await screen.findByText('Atividade 2')).toBeInTheDocument();
    expect(
      await screen.findByText('Descrição atividade 1')
    ).toBeInTheDocument();
    expect(
      await screen.findByText('Descrição atividade 2')
    ).toBeInTheDocument();

    expect(await screen.findByText(/1 itens cadastrados/i)).toBeInTheDocument();
    expect(await screen.findByText(/2 itens cadastrados/i)).toBeInTheDocument();
    expect(await screen.findByText(/3 itens cadastrados/i)).toBeInTheDocument();
    expect(await screen.findByText(/4 itens cadastrados/i)).toBeInTheDocument();
  });
});
