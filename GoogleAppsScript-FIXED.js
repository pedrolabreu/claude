/**
 * Google Apps Script CORRIGIDO para Dashboard Emisfera
 *
 * IMPORTANTE: Este código foi atualizado para usar o ID da planilha diretamente
 *
 * INSTRUÇÕES DE INSTALAÇÃO:
 * 1. COPIE O ID DA SUA PLANILHA da URL:
 *    https://docs.google.com/spreadsheets/d/SEU_ID_AQUI/edit
 *
 * 2. Cole o ID na linha 20 onde está escrito 'SEU_ID_DA_PLANILHA_AQUI'
 *
 * 3. No Google Sheets: Extensões > Apps Script
 * 4. Cole este código COMPLETO
 * 5. Clique em "Implantar" > "Nova implantação"
 * 6. Tipo: "Aplicativo da Web"
 * 7. Executar como: "Eu"
 * 8. Quem tem acesso: "Qualquer pessoa"
 * 9. Copie a URL gerada
 */

// ⚠️ IMPORTANTE: SUBSTITUA PELO ID DA SUA PLANILHA
const SPREADSHEET_ID = 'SEU_ID_DA_PLANILHA_AQUI';

function doGet(e) {
  try {
    // Usar ID da planilha ao invés de getActiveSpreadsheet()
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = spreadsheet.getSheetByName('Resumo de Dados');

    if (!sheet) {
      return ContentService.createTextOutput(JSON.stringify({
        error: 'Aba "Resumo de Dados" não encontrada',
        availableSheets: spreadsheet.getSheets().map(s => s.getName())
      })).setMimeType(ContentService.MimeType.JSON);
    }

    const data = {};

    // Mapeamento de colunas para meses
    // Meses de 2025: Maio a Dezembro (colunas C a J)
    const meses2025 = [
      { mes: 'maio/2025', col: 'C' },
      { mes: 'junho/2025', col: 'D' },
      { mes: 'julho/2025', col: 'E' },
      { mes: 'agosto/2025', col: 'F' },
      { mes: 'setembro/2025', col: 'G' },
      { mes: 'outubro/2025', col: 'H' },
      { mes: 'novembro/2025', col: 'I' },
      { mes: 'dezembro/2025', col: 'J' }
    ];

    // Meses de 2026: Janeiro a Dezembro (colunas K a V)
    const meses2026 = [
      { mes: 'janeiro/2026', col: 'K' },
      { mes: 'fevereiro/2026', col: 'L' },
      { mes: 'marco/2026', col: 'M' },
      { mes: 'abril/2026', col: 'N' },
      { mes: 'maio/2026', col: 'O' },
      { mes: 'junho/2026', col: 'P' },
      { mes: 'julho/2026', col: 'Q' },
      { mes: 'agosto/2026', col: 'R' },
      { mes: 'setembro/2026', col: 'S' },
      { mes: 'outubro/2026', col: 'T' },
      { mes: 'novembro/2026', col: 'U' },
      { mes: 'dezembro/2026', col: 'V' }
    ];

    // Combinar todos os meses
    const todosMeses = [...meses2025, ...meses2026];

    // Para cada mês, extrair os dados
    todosMeses.forEach(item => {
      const col = item.col;

      data[item.mes] = {
        // ===== DADOS DE MARKETING =====
        investimento: getNumericValue(sheet, col + '3'),
        visitantes: getNumericValue(sheet, col + '4'),
        cadastros: getNumericValue(sheet, col + '5'),
        mqls: getNumericValue(sheet, col + '6'),

        // ===== DADOS DE COMERCIAL & VENDAS =====
        ligacoesRealizadas: getNumericValue(sheet, col + '8'),
        ligacoesAtendidas: getNumericValue(sheet, col + '9'),

        // ===== DADOS COMPARTILHADOS =====
        // Linha 11: Formulário Respondido (usado em ambos)
        formularioRespondido: getNumericValue(sheet, col + '11'),
        respostaFormulario: getNumericValue(sheet, col + '11'), // mesmo valor

        // Linha 12: Análise Positiva (usado em ambos)
        analisePositiva: getNumericValue(sheet, col + '12'),
        analisePositivaMarketing: getNumericValue(sheet, col + '12'), // mesmo valor

        // ===== DADOS EXCLUSIVOS DE MARKETING =====
        pitchsAgendados: getNumericValue(sheet, col + '14'),
        pitchsRealizados: getNumericValue(sheet, col + '15'),

        // ===== VENDAS (usado em ambos) =====
        vendas: getNumericValue(sheet, col + '16'),
        vendasMarketing: getNumericValue(sheet, col + '16') // mesmo valor
      };
    });

    return ContentService.createTextOutput(JSON.stringify(data))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      error: error.toString(),
      message: 'Erro ao processar dados',
      hint: 'Verifique se o SPREADSHEET_ID está correto'
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
 * Função de teste - Execute esta função para verificar se os dados estão sendo lidos corretamente
 */
function testarLeitura() {
  const result = doGet();
  const data = JSON.parse(result.getContent());
  Logger.log('Dados lidos:');
  Logger.log(JSON.stringify(data, null, 2));

  // Verificar se há erro
  if (data.error) {
    Logger.log('\n⚠️ ERRO: ' + data.error);
    Logger.log('Mensagem: ' + data.message);
    if (data.hint) {
      Logger.log('Dica: ' + data.hint);
    }
    if (data.availableSheets) {
      Logger.log('Abas disponíveis: ' + data.availableSheets.join(', '));
    }
    return;
  }

  // Verificar maio/2025
  if (data['maio/2025']) {
    Logger.log('\n✅ Dados de Maio/2025:');
    Logger.log('Investimento: ' + data['maio/2025'].investimento);
    Logger.log('Visitantes: ' + data['maio/2025'].visitantes);
    Logger.log('Ligações Realizadas: ' + data['maio/2025'].ligacoesRealizadas);
    Logger.log('Vendas: ' + data['maio/2025'].vendas);
  }
}

/**
 * Função para pegar o ID da planilha atual
 * Execute esta função para descobrir o ID da sua planilha
 */
function pegarIDDaPlanilha() {
  const id = SpreadsheetApp.getActiveSpreadsheet().getId();
  Logger.log('ID da planilha: ' + id);
  Logger.log('Copie este ID e cole na linha 20 do código!');
  return id;
}
