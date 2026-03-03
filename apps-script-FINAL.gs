/**
 * Google Apps Script CORRETO para Dashboard Emisfera
 * Baseado no mapeamento REAL da planilha (com números de linha visíveis)
 *
 * INSTRUÇÕES:
 * 1. Copie TODO este código
 * 2. Abra: https://docs.google.com/spreadsheets/d/13MQbv3f92bZNHeHU9rkNTEvodu3Y1wMTjbw9ZmmNgiY/edit
 * 3. Vá em: Extensões > Apps Script
 * 4. APAGUE todo o código antigo
 * 5. COLE todo este código
 * 6. Salve (Ctrl+S)
 * 7. Teste: Execute a função "testarLeitura"
 * 8. Implante: Implantar > Nova implantação > Aplicativo da Web
 * 9. Me envie a URL gerada
 */

// ID da Planilha - JÁ CONFIGURADO!
const SPREADSHEET_ID = '13MQbv3f92bZNHeHU9rkNTEvodu3Y1wMTjbw9ZmmNgiY';

function doGet(e) {
  try {
    // Usar ID da planilha ao invés de getActiveSpreadsheet()
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);

    // IMPORTANTE: Verificar o nome EXATO da aba
    // Pode ser: "Dashboard - Performance", "RESUMO_DADOS", "Resumo de Dados", etc.
    const sheet = spreadsheet.getSheetByName('Dashboard - Performance');

    if (!sheet) {
      return ContentService.createTextOutput(JSON.stringify({
        error: 'Aba não encontrada',
        message: 'Verifique o nome exato da aba',
        availableSheets: spreadsheet.getSheets().map(s => s.getName())
      })).setMimeType(ContentService.MimeType.JSON);
    }

    const data = {};

    // Mapeamento de colunas para meses (MANTIDO do script anterior)
    // Meses de 2025: Maio a Dezembro (colunas B a I)
    const meses2025 = [
      { mes: 'maio/2025', col: 'B' },
      { mes: 'junho/2025', col: 'C' },
      { mes: 'julho/2025', col: 'D' },
      { mes: 'agosto/2025', col: 'E' },
      { mes: 'setembro/2025', col: 'F' },
      { mes: 'outubro/2025', col: 'G' },
      { mes: 'novembro/2025', col: 'H' },
      { mes: 'dezembro/2025', col: 'I' }
    ];

    // Meses de 2026: Janeiro a Dezembro (colunas J a U)
    const meses2026 = [
      { mes: 'janeiro/2026', col: 'J' },
      { mes: 'fevereiro/2026', col: 'K' },
      { mes: 'marco/2026', col: 'L' },
      { mes: 'abril/2026', col: 'M' },
      { mes: 'maio/2026', col: 'N' },
      { mes: 'junho/2026', col: 'O' },
      { mes: 'julho/2026', col: 'P' },
      { mes: 'agosto/2026', col: 'Q' },
      { mes: 'setembro/2026', col: 'R' },
      { mes: 'outubro/2026', col: 'S' },
      { mes: 'novembro/2026', col: 'T' },
      { mes: 'dezembro/2026', col: 'U' }
    ];

    // Combinar todos os meses
    const todosMeses = [...meses2025, ...meses2026];

    // Para cada mês, extrair os dados (LINHAS CORRIGIDAS baseado na imagem)
    todosMeses.forEach(item => {
      const col = item.col;

      data[item.mes] = {
        // ===== MARKETING (Inbound) =====
        investimento: getNumericValue(sheet, col + '3'),              // Linha 3
        visitantes: getNumericValue(sheet, col + '4'),                // Linha 4
        cadastros: getNumericValue(sheet, col + '5'),                 // Linha 5
        mqls: getNumericValue(sheet, col + '6'),                      // Linha 6 - MQL

        // ===== COMERCIAL (Outbound) =====
        ligacoesRealizadas: getNumericValue(sheet, col + '8'),        // Linha 8
        ligacoesAtendidas: getNumericValue(sheet, col + '9'),         // Linha 9

        // ===== DADOS COMPARTILHADOS (usados em ambos) =====
        formularioRespondido: getNumericValue(sheet, col + '11'),     // Linha 11
        respostaFormulario: getNumericValue(sheet, col + '11'),       // Linha 11 (mesmo valor)

        analisePositiva: getNumericValue(sheet, col + '12'),          // Linha 12 - TQL
        analisePositivaMarketing: getNumericValue(sheet, col + '12'), // Linha 12 (mesmo valor)

        // ===== FUNIL DE VENDAS =====
        pitchsAgendados: getNumericValue(sheet, col + '14'),          // Linha 14
        pitchsRealizados: getNumericValue(sheet, col + '15'),         // Linha 15

        // ===== VENDAS (usado em ambos) =====
        vendas: getNumericValue(sheet, col + '16'),                   // Linha 16 - QT VENDAS (GERAL)
        vendasMarketing: getNumericValue(sheet, col + '16'),          // Linha 16 (mesmo valor)
        vendasTotal: getNumericValue(sheet, col + '16'),              // Linha 16 (para página Resumo)

        // ===== QUANTIDADE DE VENDAS POR TIPO =====
        qtdVendasPin: getNumericValue(sheet, col + '17'),             // Linha 17 - QT VENDAS PROJETOS
        qtdVendasMonitoramento: getNumericValue(sheet, col + '18'),   // Linha 18 - QT VENDAS MONITORAMENTO
        qtdVendasInbound: getNumericValue(sheet, col + '19'),         // Linha 19
        qtdVendasOutbound: getNumericValue(sheet, col + '20'),        // Linha 20

        // ===== DADOS FINANCEIROS =====
        receitaTotal: getNumericValue(sheet, col + '22'),             // Linha 22 - R$ VENDAS
        receitaPIN: getNumericValue(sheet, col + '23'),               // Linha 23 - R$ VENDAS PIN
        receitaMonitoramento: getNumericValue(sheet, col + '24'),     // Linha 24 - R$ VENDAS MONITORAMENTO
        roi: getNumericValue(sheet, col + '30'),                      // Linha 30 - ROI
        cac: getNumericValue(sheet, col + '31'),                      // Linha 31 - CAC
        ticketMedio: getNumericValue(sheet, col + '32'),              // Linha 32 - TICKET MEDIO
        cicloVendas: getNumericValue(sheet, col + '33'),              // Linha 33 - CICLO DE VENDAS
        ticketMedioPIN: getNumericValue(sheet, col + '34'),           // Linha 34 - TICKET MEDIO PIN
        ticketMedioMonit: getNumericValue(sheet, col + '35'),         // Linha 35 - TICKET MEDIO MONITORAMENTO

        // ===== CAMPOS EXTRAS PARA PÁGINA RESUMO =====
        oportunidades1: getNumericValue(sheet, col + '6'),            // Linha 6 - MQL
        oportunidades2: getNumericValue(sheet, col + '7'),            // Linha 7 - OPORTUNIDADES OUTBOUND
        analises: getNumericValue(sheet, col + '13'),                 // Linha 13 - OPORTUNIDADES QUALIF
        analisesPositivas: getNumericValue(sheet, col + '12')         // Linha 12 - ANÁLISE POSITIVA (TQL)
      };
    });

    return ContentService.createTextOutput(JSON.stringify(data))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      error: error.toString(),
      message: 'Erro ao processar dados',
      stack: error.stack
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Função auxiliar para obter valores numéricos da planilha
 * Converte strings, remove formatação e retorna 0 se vazio
 */
function getNumericValue(sheet, cellAddress) {
  try {
    const value = sheet.getRange(cellAddress).getValue();

    // Se for vazio, retornar 0
    if (value === null || value === undefined || value === '') {
      return 0;
    }

    // Se já for número, retornar
    if (typeof value === 'number') {
      return value;
    }

    // Se for string, tentar converter
    if (typeof value === 'string') {
      // Remover formatação de moeda (R$, pontos, vírgulas)
      const cleanValue = value
        .replace(/[R$\s]/g, '')  // Remove R$ e espaços
        .replace(/\./g, '')       // Remove pontos (milhares)
        .replace(/,/g, '.');      // Troca vírgula por ponto (decimais)

      const numValue = parseFloat(cleanValue);
      return isNaN(numValue) ? 0 : numValue;
    }

    return 0;
  } catch (error) {
    Logger.log('Erro ao ler célula ' + cellAddress + ': ' + error.toString());
    return 0;
  }
}

/**
 * Função de teste - Execute esta função para verificar se os dados estão sendo lidos
 */
function testarLeitura() {
  const result = doGet();
  const data = JSON.parse(result.getContent());

  if (data.error) {
    Logger.log('❌ ERRO: ' + data.error);
    Logger.log('Mensagem: ' + data.message);
    if (data.availableSheets) {
      Logger.log('Abas disponíveis: ' + data.availableSheets.join(', '));
    }
    return;
  }

  Logger.log('✅ Dados carregados com sucesso!');
  Logger.log('Total de meses: ' + Object.keys(data).length);

  // Testar fevereiro/2026
  if (data['fevereiro/2026']) {
    Logger.log('\n📊 FEVEREIRO/2026:');
    Logger.log('  Vendas Total: ' + data['fevereiro/2026'].vendasTotal + ' (esperado: 3)');
    Logger.log('  Oportunidades MQL: ' + data['fevereiro/2026'].oportunidades1 + ' (esperado: 129)');
    Logger.log('  Oportunidades OUT: ' + data['fevereiro/2026'].oportunidades2 + ' (esperado: 0)');
    Logger.log('  Análises: ' + data['fevereiro/2026'].analises + ' (esperado: 13)');
    Logger.log('  Análises Positivas: ' + data['fevereiro/2026'].analisesPositivas + ' (esperado: 13)');
    Logger.log('  Reuniões Agendadas: ' + data['fevereiro/2026'].pitchsAgendados + ' (esperado: 20)');
    Logger.log('  Reuniões Feitas: ' + data['fevereiro/2026'].pitchsRealizados + ' (esperado: 17)');
    Logger.log('  Qtd PIN: ' + data['fevereiro/2026'].qtdVendasPin + ' (esperado: 2)');
    Logger.log('  Qtd Monit: ' + data['fevereiro/2026'].qtdVendasMonitoramento + ' (esperado: 1)');
    Logger.log('  Ticket Médio PIN: R$ ' + data['fevereiro/2026'].ticketMedioPIN + ' (esperado: R$ 3000)');
    Logger.log('  Ticket Médio Monit: R$ ' + data['fevereiro/2026'].ticketMedioMonit + ' (esperado: R$ 17982)');
  }

  Logger.log('\n✅ Tudo OK! Script funcionando corretamente.');
}
