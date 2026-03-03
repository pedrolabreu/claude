/**
 * VERSÃO DEBUG - Apps Script para Google Sheets
 * Cole este código no Apps Script para ver EXATAMENTE o que está sendo lido
 */

function doGet(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('Dashboard - Performance');

    if (!sheet) {
      return ContentService.createTextOutput(JSON.stringify({
        error: 'Aba não encontrada',
        message: 'A aba "Dashboard - Performance" não existe',
        availableSheets: ss.getSheets().map(s => s.getName())
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // Obter dados do range I1:N35
    const dataRange = sheet.getRange('I1:N35');
    const values = dataRange.getValues();

    // LINHA 1 (Índice 0) - Deve ser "TOTAL DA EMPRESA"
    const linha1 = values[0];

    // LINHA 2 (Índice 1) - Deve conter os meses
    const linha2_meses = values[1];

    // LINHA 4 (Índice 3) - VISITANTES
    const linha4_visitantes = values[3];

    // LINHA 16 (Índice 15) - QT VENDAS (GERAL)
    const linha16_vendas = values[15];

    // LINHA 17 (Índice 16) - QT VENDAS PROJETOS
    const linha17_pin = values[16];

    // LINHA 18 (Índice 17) - QT VENDAS MONITORAMENTO
    const linha18_monit = values[17];

    // Retornar DEBUG INFO
    return ContentService.createTextOutput(JSON.stringify({
      debug: true,
      sheetName: sheet.getName(),
      rangeUsed: 'I1:N35',
      totalRows: values.length,
      totalCols: values[0].length,

      // Headers (Linha 2)
      linha2_meses: linha2_meses,

      // Dados importantes
      linha1_header: linha1,
      linha4_visitantes: linha4_visitantes,
      linha16_vendas_total: linha16_vendas,
      linha17_qtd_pin: linha17_pin,
      linha18_qtd_monit: linha18_monit,

      // Estrutura completa de fevereiro/2026 (coluna K = índice 2)
      fevereiro_col2: {
        mes: linha2_meses[2],
        visitantes: linha4_visitantes[2],
        vendasTotal: linha16_vendas[2],
        qtdPIN: linha17_pin[2],
        qtdMonit: linha18_monit[2]
      },

      // TODAS as linhas de fevereiro (coluna 2)
      todasLinhasFevereiro: values.map((row, idx) => ({
        linha: idx + 1,
        valor: row[2]
      }))
    }, null, 2)).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      error: 'Erro ao processar',
      message: error.toString(),
      stack: error.stack
    }, null, 2)).setMimeType(ContentService.MimeType.JSON);
  }
}
