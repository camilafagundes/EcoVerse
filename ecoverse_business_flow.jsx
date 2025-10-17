import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Zap, Users, Building2, TrendingUp, Settings, Shield } from 'lucide-react';

const FlowSection = ({ title, icon: Icon, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <div className="mb-4 border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 transition-colors"
      >
        <div className="flex items-center gap-3">
          <Icon className="w-6 h-6 text-green-600" />
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        </div>
        {isOpen ? <ChevronUp className="w-5 h-5 text-gray-600" /> : <ChevronDown className="w-5 h-5 text-gray-600" />}
      </button>
      {isOpen && (
        <div className="px-6 py-4 bg-white">
          {children}
        </div>
      )}
    </div>
  );
};

const ProcessStep = ({ number, title, description, substeps }) => (
  <div className="mb-6 last:mb-0">
    <div className="flex gap-4">
      <div className="flex-shrink-0">
        <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
          {number}
        </div>
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 mb-3">{description}</p>
        {substeps && (
          <ul className="space-y-2 ml-4">
            {substeps.map((step, idx) => (
              <li key={idx} className="flex gap-2 text-sm text-gray-700">
                <span className="text-green-600 font-bold">→</span>
                <span>{step}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  </div>
);

const Actor = ({ name, role, color }) => (
  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${color}`}>
    <div className="w-2 h-2 rounded-full bg-current"></div>
    {name} <span className="text-xs opacity-75">({role})</span>
  </div>
);

export default function EcoVerseBusinessFlow() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Zap className="w-12 h-12 text-green-600" />
            <h1 className="text-4xl font-bold text-gray-800">EcoVerse</h1>
          </div>
          <p className="text-xl text-gray-600 mb-2">Plataforma de Gestão e Compartilhamento de Energia P2P</p>
          <p className="text-sm text-gray-500">Fluxo de Negócio Completo</p>
        </div>

        {/* Atores do Sistema */}
        <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Users className="w-6 h-6 text-green-600" />
            Atores do Sistema
          </h2>
          <div className="flex flex-wrap gap-3">
            <Actor name="Gerador" role="Prosumidor" color="bg-blue-100 text-blue-800" />
            <Actor name="Consumidor" role="Comprador" color="bg-purple-100 text-purple-800" />
            <Actor name="Operador" role="Admin" color="bg-orange-100 text-orange-800" />
            <Actor name="Utility" role="Concessionária" color="bg-red-100 text-red-800" />
            <Actor name="Plataforma" role="Sistema" color="bg-green-100 text-green-800" />
          </div>
        </div>

        {/* Fluxos */}
        <FlowSection title="1. Onboarding e Cadastro" icon={Users} defaultOpen={true}>
          <ProcessStep
            number="1.1"
            title="Registro Inicial"
            description="Usuário inicia o processo de cadastro na plataforma"
            substeps={[
              "Usuário acessa app/web e cria conta (email, senha, dados pessoais)",
              "Sistema valida informações e envia código de verificação",
              "Usuário confirma identidade e aceita termos de uso"
            ]}
          />
          <ProcessStep
            number="1.2"
            title="Seleção de Perfil"
            description="Definição do tipo de participação no sistema"
            substeps={[
              "Usuário escolhe perfil: Gerador, Consumidor ou Híbrido",
              "Sistema apresenta requisitos específicos para cada perfil",
              "Usuário fornece documentação necessária (conta de luz, CPF/CNPJ)"
            ]}
          />
          <ProcessStep
            number="1.3"
            title="Integração de Equipamentos"
            description="Conexão com dispositivos de medição"
            substeps={[
              "Técnico instala smart meter e gateway IoT na residência",
              "Sistema registra dispositivos e realiza teste de conectividade",
              "Plataforma inicia coleta de telemetria em tempo real",
              "Dashboard exibe primeira leitura de produção/consumo"
            ]}
          />
        </FlowSection>

        <FlowSection title="2. Operação Diária - Geração e Consumo" icon={Zap}>
          <ProcessStep
            number="2.1"
            title="Monitoramento em Tempo Real"
            description="Coleta e processamento contínuo de dados energéticos"
            substeps={[
              "Smart meters enviam dados a cada 5-15 minutos via MQTT",
              "Sistema processa telemetria e atualiza saldo energético",
              "Dashboard exibe produção, consumo e excedente em tempo real",
              "Algoritmo ML prevê geração e demanda para próximas horas"
            ]}
          />
          <ProcessStep
            number="2.2"
            title="Detecção de Excedente"
            description="Identificação de energia disponível para negociação"
            substeps={[
              "Sistema detecta quando geração > consumo",
              "Plataforma envia notificação ao gerador sobre excedente",
              "Usuário recebe sugestões de preço baseadas no mercado local",
              "Opção de venda automática ou manual é apresentada"
            ]}
          />
        </FlowSection>

        <FlowSection title="3. Mercado P2P - Negociação de Energia" icon={TrendingUp}>
          <ProcessStep
            number="3.1"
            title="Criação de Ofertas de Venda"
            description="Gerador disponibiliza energia excedente"
            substeps={[
              "Gerador cria ordem: quantidade (kWh), período, preço",
              "Sistema valida disponibilidade real e reserva energia",
              "Oferta é publicada no marketplace com timestamp",
              "Ordem entra no livro de ofertas organizado por preço/horário"
            ]}
          />
          <ProcessStep
            number="3.2"
            title="Busca e Compra de Energia"
            description="Consumidor adquire energia da comunidade"
            substeps={[
              "Consumidor acessa marketplace e filtra ofertas (preço, horário, vendedor)",
              "Sistema exibe ofertas disponíveis ordenadas por melhor custo-benefício",
              "Consumidor seleciona oferta e confirma compra",
              "Sistema verifica crédito/saldo e reserva energia"
            ]}
          />
          <ProcessStep
            number="3.3"
            title="Matching e Execução"
            description="Motor P2P casa ofertas compatíveis"
            substeps={[
              "Motor de matching identifica ordens compatíveis (preço, horário, volume)",
              "Sistema cria transação e registra no ledger (ou blockchain)",
              "Smart contract (ou módulo central) agenda entrega de energia",
              "Notificações são enviadas a ambas as partes confirmando o trade"
            ]}
          />
          <ProcessStep
            number="3.4"
            title="Entrega de Energia"
            description="Execução física da transação"
            substeps={[
              "Sistema direciona fluxo energético via controladores de rede",
              "Smart meters validam entrega real da energia contratada",
              "Plataforma registra medições com timestamp para auditoria",
              "Eventuais desvios disparam ajustes automáticos ou alertas"
            ]}
          />
        </FlowSection>

        <FlowSection title="4. Liquidação Financeira" icon={Building2}>
          <ProcessStep
            number="4.1"
            title="Apuração de Valores"
            description="Cálculo de débitos e créditos"
            substeps={[
              "Ao final do período (diário/semanal), sistema totaliza transações",
              "Plataforma calcula valor devido (energia comprada) e a receber (energia vendida)",
              "Taxas de transação (% sobre o trade) são aplicadas",
              "Sistema gera extrato detalhado para cada usuário"
            ]}
          />
          <ProcessStep
            number="4.2"
            title="Processamento de Pagamentos"
            description="Execução de transferências financeiras"
            substeps={[
              "Sistema integra com PSP (Pix, débito bancário) para processar pagamentos",
              "Compradores recebem cobrança automática na conta cadastrada",
              "Vendedores recebem crédito automaticamente após confirmação",
              "Plataforma retém sua taxa de serviço conforme modelo de negócio"
            ]}
          />
          <ProcessStep
            number="4.3"
            title="Reconciliação e Auditoria"
            description="Validação e registro contábil"
            substeps={[
              "Sistema cruza dados de medição com registros financeiros",
              "Módulo de reconciliação identifica e reporta discrepâncias",
              "Ledger/blockchain armazena registro imutável para auditoria",
              "Relatórios fiscais são gerados automaticamente para compliance"
            ]}
          />
        </FlowSection>

        <FlowSection title="5. Gestão de Armazenamento (Baterias)" icon={Settings}>
          <ProcessStep
            number="5.1"
            title="Monitoramento de Baterias"
            description="Controle do estado de carga e descarga"
            substeps={[
              "BMS (Battery Management System) envia telemetria (SOC, temperatura, ciclos)",
              "Sistema avalia estado de saúde e vida útil estimada",
              "Dashboard exibe nível de carga e capacidade disponível",
              "Alertas são disparados para manutenção preventiva"
            ]}
          />
          <ProcessStep
            number="5.2"
            title="Otimização de Carga/Descarga"
            description="Decisões inteligentes sobre uso de baterias"
            substeps={[
              "Algoritmo ML analisa previsão de geração, demanda e preços",
              "Sistema determina momento ótimo para carregar (preço baixo/excedente solar)",
              "Sistema determina momento ótimo para descarregar (pico de preço/demanda)",
              "Comandos automáticos são enviados aos inversores/BMS",
              "Usuário pode sobrescrever decisões via app (modo manual)"
            ]}
          />
          <ProcessStep
            number="5.3"
            title="Participação em VPP (Virtual Power Plant)"
            description="Agregação de baterias para serviços de rede"
            substeps={[
              "Operador agrega capacidade de múltiplas baterias da comunidade",
              "Plataforma oferece serviços de reserva/resposta à demanda para utility",
              "Utility solicita descarga coordenada durante pico de rede",
              "Sistema distribui receita entre participantes proporcionalmente",
              "Usuários recebem bônus por disponibilizar capacidade"
            ]}
          />
        </FlowSection>

        <FlowSection title="6. Gestão Comunitária e Governança" icon={Shield}>
          <ProcessStep
            number="6.1"
            title="Dashboard do Operador"
            description="Visão consolidada da comunidade"
            substeps={[
              "Operador acessa KPIs: geração total, consumo, eficiência, receita",
              "Sistema exibe gráficos de balanço energético e financeiro",
              "Alertas sobre anomalias ou necessidade de manutenção",
              "Relatórios de performance individual e coletiva"
            ]}
          />
          <ProcessStep
            number="6.2"
            title="Configuração de Regras"
            description="Definição de políticas operacionais"
            substeps={[
              "Operador define regras de priorização (ex: hospitais > residências)",
              "Sistema configura tarifas dinâmicas e bandas de preço",
              "Políticas de desconto/incentivo são estabelecidas",
              "Regras de desligamento em contingência são registradas"
            ]}
          />
          <ProcessStep
            number="6.3"
            title="Governança Cooperativa"
            description="Tomada de decisão coletiva"
            substeps={[
              "Plataforma disponibiliza módulo de votação para membros",
              "Propostas (mudança de tarifas, novos investimentos) são submetidas",
              "Usuários votam ponderado por participação/consumo",
              "Resultados são registrados e implementados automaticamente",
              "Dividendos/excedentes são distribuídos conforme votação"
            ]}
          />
        </FlowSection>

        <FlowSection title="7. Integração com Utility e Net Metering" icon={Building2}>
          <ProcessStep
            number="7.1"
            title="Troca de Dados com Concessionária"
            description="Interface com rede principal"
            substeps={[
              "Plataforma envia dados agregados de geração/consumo via API",
              "Utility valida medições e atualiza sistema de billing",
              "Sistema registra energia importada/exportada para rede principal",
              "Créditos de net metering são calculados e creditados"
            ]}
          />
          <ProcessStep
            number="7.2"
            title="Balanceamento de Carga"
            description="Gestão de déficit/excedente com rede"
            substeps={[
              "Sistema monitora se comunidade está em superávit ou déficit",
              "Em déficit: plataforma compra energia da utility (tarifa normal)",
              "Em superávit: plataforma vende energia para utility (tarifa buyback)",
              "Controladores de rede ajustam fluxo em tempo real",
              "Histórico é registrado para análise de autossuficiência"
            ]}
          />
        </FlowSection>

        <FlowSection title="8. Resposta a Incidentes e Contingências" icon={Shield}>
          <ProcessStep
            number="8.1"
            title="Detecção de Falhas"
            description="Identificação de problemas na rede"
            substeps={[
              "Sistema detecta queda de rede principal ou falha local",
              "Sensores identificam anomalias (voltage drop, frequência instável)",
              "Alertas automáticos são enviados ao operador e utility",
              "Dashboard indica status de emergência"
            ]}
          />
          <ProcessStep
            number="8.2"
            title="Modo Ilha (Islanding)"
            description="Operação autônoma durante falha"
            substeps={[
              "Sistema desconecta micro-rede da rede principal (segurança)",
              "Geração local + baterias mantêm serviços críticos prioritários",
              "Cargas não-críticas são desligadas conforme regras pré-definidas",
              "Plataforma informa usuários sobre status e previsão de normalização"
            ]}
          />
          <ProcessStep
            number="8.3"
            title="Retorno à Operação Normal"
            description="Reconexão segura com rede principal"
            substeps={[
              "Sistema detecta restauração da rede principal",
              "Protocolo de sincronização é executado (fase, frequência, tensão)",
              "Micro-rede reconecta gradualmente à rede principal",
              "Operação normal é retomada e logs de incidente são arquivados"
            ]}
          />
        </FlowSection>

        {/* Footer */}
        <div className="mt-8 p-6 bg-white rounded-lg shadow-md text-center">
          <p className="text-sm text-gray-600">
            Este fluxo representa a operação completa da plataforma EcoVerse, desde o onboarding até a gestão avançada de energia comunitária, alinhada aos objetivos do ODS 7.
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-green-600">
            <Zap className="w-5 h-5" />
            <span className="font-semibold">Energia Limpa, Acessível e Resiliente para Todos</span>
          </div>
        </div>
      </div>
    </div>
  );
}