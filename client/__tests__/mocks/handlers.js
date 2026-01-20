import React from 'react';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

export const visaoGeralHandlers = [
  http.get('*/api/dinheiroGasto', () => {
    return HttpResponse.json({
      dinheiroCasaMes: [
        {
          _id: {
            mes: 'January',
          },
          totalAmount: 1080,
        },
      ],
      dinheiroLazerMes: [
        {
          _id: {
            mes: 'January',
          },
          totalAmount: 998,
        },
      ],
      dinheiroEducacaoMes: [
        {
          _id: {
            mes: 'January',
          },
          totalAmount: 1619,
        },
      ],
    });
  }),
];
const LAZER_API_URL = '*/api/atividades-lazer';
export const lazerDashboardHandlers = [
  http.get(LAZER_API_URL, () => {
    return HttpResponse.json({
      total: 6,
      documents: [
        {
          _id: '1',
          nomeAtividade: 'Atividade 1',
          descricaoAtividade: 'Descrição atividade 1',
        },
        {
          _id: '2',
          nomeAtividade: 'Atividade 2',
          descricaoAtividade: 'Descrição atividade 2',
        },
      ],
    });
  }),

  http.get(LAZER_API_URL + `/quantidadeCultura`, () => {
    return HttpResponse.json({
      culturaQuantidade: 1,
    });
  }),
  http.get(LAZER_API_URL + '/quantidadeJogos', () => {
    return HttpResponse.json({
      jogosQuantidade: 2,
    });
  }),
  http.get(LAZER_API_URL + '/quantidadeEmGrupo', () => {
    return HttpResponse.json({
      emGrupoQuantidade: 3,
    });
  }),
  http.get(LAZER_API_URL + '/quantidadeOutros', () => {
    return HttpResponse.json({
      outrosQuantidade: 4,
    });
  }),
];
