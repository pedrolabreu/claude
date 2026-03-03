/**
 * Google Apps Script para Dashboard Emisfera
 *
 * INSTRUÇÕES DE USO:
 * 1. Abra sua planilha Google Sheets
 * 2. Vá em Extensões > Apps Script
 * 3. Cole este código substituindo todo o conteúdo
 * 4. Clique em "Implantar" > "Nova implantação"
 * 5. Escolha "Aplicativo da Web"
 * 6. Configure "Executar como: Eu" e "Quem tem acesso: Qualquer pessoa"
 * 7. Clique em "Implantar" e copie a URL
 * 8. Atualize a URL no arquivo api/dados.js
 */

function doGet(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('Dashboard - Performance'); // Ajuste o nome da aba conforme necessário

    if (!sheet) {
      return ContentService.createTextOutput(JSON.stringify({
        error: 'Planilha não encontrada',
        message: 'Verifique o nome da aba'
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // Obter dados de todos os meses (colunas I até N = dezembro/2025 até maio/2026)
    // Ajuste o range conforme o número de meses na sua planilha
    const dataRange = sheet.getRange('I1:N35'); // Linha 1 até Linha 35, colunas I até N
    const values = dataRange.getValues();

    // Segunda linha (índice 1) contém os nomes dos meses
    const headers = values[1]; // Linha 2: ["dezembro/2025", "janeiro/2026", ...]

    // Criar objeto com dados por mês
    const dadosPorMes = {};

    // Para cada coluna (mês)
    for (let col = 0; col < headers.length; col++) {
      const mesAno = String(headers[col]).trim().toLowerCase();

      if (!mesAno || mesAno === '') continue;

      // Extrair valores de cada linha (índices ajustados para array 0-based)
      // Linha 1 do sheet = índice 0 no array (headers), então Linha N = índice N-1

      dadosPorMes[mesAno] = {
        // Comercial (Outbound) - CORRETO baseado na imagem com linhas numeradas
        ligacoesRealizadas: parseNumber(values[7][col]),      // Linha 8
        ligacoesAtendidas: parseNumber(values[8][col]),       // Linha 9
        formularioRespondido: parseNumber(values[10][col]),   // Linha 11 - FORMULÁRIO RESPONDIDO
        analisePositiva: parseNumber(values[11][col]),        // Linha 12 - ANÁLISE POSITIVA (TQL)
        vendas: parseNumber(values[15][col]),                 // Linha 16 - QT VENDAS (GERAL)

        // Marketing (Inbound)
        investimento: parseNumber(values[2][col]),            // Linha 3 - INVESTIMENTO EM MÍDIA
        visitantes: parseNumber(values[3][col]),              // Linha 4 - VISITANTES
        cadastros: parseNumber(values[4][col]),               // Linha 5 - CADASTROS GERAIS SITE
        mqls: parseNumber(values[5][col]),                    // Linha 6 - OPORTUNIDADES INB (MQL)
        respostaFormulario: parseNumber(values[10][col]),     // Linha 11 - FORMULÁRIO RESPONDIDO
        analisePositivaMarketing: parseNumber(values[11][col]), // Linha 12 - ANÁLISE POSITIVA (TQL)
        pitchsAgendados: parseNumber(values[13][col]),        // Linha 14 - PITCHS AGENDADOS
        pitchsRealizados: parseNumber(values[14][col]),       // Linha 15 - PITCHS REALIZADOS
        vendasMarketing: parseNumber(values[15][col]),        // Linha 16 - QT VENDAS (GERAL)

        // Financeiro
        qtdVendasPin: parseNumber(values[16][col]),           // Linha 17 - QT VENDAS PROJETOS
        qtdVendasMonitoramento: parseNumber(values[17][col]), // Linha 18 - QT VENDAS MONITORAMENTO
        qtdVendasInbound: parseNumber(values[18][col]),       // Linha 19 - QT VENDAS INBOUND
        qtdVendasOutbound: parseNumber(values[19][col]),      // Linha 20 - QT VENDAS OUTBOUND
        receitaTotal: parseNumber(values[21][col]),           // Linha 22 - R$ VENDAS
        receitaPIN: parseNumber(values[22][col]),             // Linha 23 - R$ VENDAS PIN
        receitaMonitoramento: parseNumber(values[23][col]),   // Linha 24 - R$ VENDAS MONITORAMENTO
        roi: parseNumber(values[29][col]),                    // Linha 30 - ROI
        cac: parseNumber(values[30][col]),                    // Linha 31 - CAC
        ticketMedio: parseNumber(values[31][col]),            // Linha 32 - TICKET MEDIO
        cicloVendas: parseNumber(values[32][col]),            // Linha 33 - CICLO DE VENDAS

        // Novos campos para página Resumo (mapeamento CORRETO baseado na imagem)
        vendasTotal: parseNumber(values[15][col]),            // Linha 16 - QT VENDAS (GERAL)
        oportunidades1: parseNumber(values[5][col]),          // Linha 6 - OPORTUNIDADES INB (MQL)
        oportunidades2: parseNumber(values[6][col]),          // Linha 7 - OPORTUNIDADES OUTBOUND
        analises: parseNumber(values[12][col]),               // Linha 13 - OPORTUNIDADES QUALIF
        analisesPositivas: parseNumber(values[11][col]),      // Linha 12 - ANÁLISE POSITIVA (TQL)
        ticketMedioPIN: parseNumber(values[33][col]),         // Linha 34 - TICKET MEDIO PIN
        ticketMedioMonit: parseNumber(values[34][col])        // Linha 35 - TICKET MEDIO MONITORAMENTO
      };
    }

    // Retornar JSON
    return ContentService.createTextOutput(JSON.stringify(dadosPorMes))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      error: 'Erro ao processar dados',
      message: error.toString(),
      stack: error.stack
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Função auxiliar para converter valores para número
 */
function parseNumber(value) {
  if (value === null || value === undefined || value === '') {
    return 0;
  }

  // Se já for número, retorna
  if (typeof value === 'number') {
    return value;
  }

  // Se for string, remove formatação monetária
  if (typeof value === 'string') {
    // Remove R$, pontos e substitui vírgula por ponto
    const cleaned = value
      .replace(/R\$\s?/g, '')
      .replace(/\./g, '')
      .replace(/,/g, '.')
      .trim();

    const num = parseFloat(cleaned);
    return isNaN(num) ? 0 : num;
  }

  return 0;
}
