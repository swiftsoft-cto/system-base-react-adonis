// database/seeders/Phase.ts
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Phases from 'App/Models/Phases'
import { DateTime } from 'luxon'

export default class PhaseSeeder extends BaseSeeder {
  public async run() {
    await Phases.createMany([
      {
        project_id: 1,
        status: 'em desenvolvimento',
        start_date: DateTime.fromISO('2023-09-19'),
        end_date: DateTime.fromISO('2024-03-25'),
        description: 'Institucional/ Área Administrativa',
        hours_purchased: 240,
        hours_remaining: 40,
        requirements_scope: 'Site Institucional: Páginas Home, Produtos, Catálogo e Sobre - Área Adm: Criar bolotos e mostra-los na area do cliente, o adm pode ver e editar os boletos e os clientes',
      },
      {
        project_id: 2,
        status: 'em desenvolvimento',
        start_date: DateTime.fromISO('2023-12-11'),
        end_date: DateTime.fromISO('2024-03-25'),
        description: 'Institucional/ Área Administrativa',
        hours_purchased: 220,
        hours_remaining: 40,
        requirements_scope: 'Site Institucional: Páginas Home, Detalhes da propriedade, Área do cliente e Documentos, Cat - Área Adm: Criar bolotos e mostra-los na area do cliente, o adm pode ver e editar os boletos e os clientes',
      },
      {
        project_id: 3,
        status: 'concluído',
        start_date: DateTime.fromISO('2023-11-15'),
        end_date: DateTime.fromISO('2023-11-30'),
        description: 'Landing page',
        hours_purchased: 44,
        hours_remaining: 0,
        requirements_scope: 'Landing Page com CTA home, apresentação dos serviços e do Luthier, depoimentos, localização e rodapé com informações de contato.',
      },
      {
        project_id: 4,
        status: 'concluído',
        start_date: DateTime.fromISO('2024-02-06'),
        end_date: DateTime.fromISO('2024-03-06'),
        description: 'Landing page',
        hours_purchased: 160,
        hours_remaining: 10,
        requirements_scope: 'Landing Page com CTA home, apresentação dos serviços, localização e rodapé com informações de contato.',
      },
      {
        project_id: 5,
        status: 'concluído',
        start_date: DateTime.fromISO('2024-01-04'),
        end_date: DateTime.fromISO('2024-01-12'),
        description: 'Landing page',
        hours_purchased: 40,
        hours_remaining: 40,
        requirements_scope: 'Automação de atendimento com chatbot, perguntas pré prontas para coleta de dados do pacientes pré atendimento humanizado.',
      },
      {
        project_id: 6,
        status: 'concluído',
        start_date: DateTime.fromISO('2024-03-20'),
        end_date: DateTime.fromISO('2024-04-29'),
        description: 'Landing page',
        hours_purchased: 208,
        hours_remaining: 40,
        requirements_scope: 'Landing Page para apresentação de produtos e equipe, área adm para edição de dados e imagens da landing page',
      },
      
    ])
  }
}
