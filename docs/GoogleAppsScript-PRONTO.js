/**
 * Google Apps Script PRONTO para Dashboard Emisfera
 * ID da Planilha JÁ CONFIGURADO
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
    const sheet = spreadsheet.getSheetByName('RESUMO_DADOS');

    if (!sheet) {
      return ContentService.createTextOutput(JSON.stringify({
        error: 'Aba "RESUMO_DADOS" não encontrada',
        availableSheets: spreadsheet.getSheets().map(s => s.getName())
      })).setMimeType(ContentService.MimeType.JSON);
    }

    const data = {};

    // Mapeamento de colunas para meses
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
        vendasMarketing: getNumericValue(sheet, col + '16'), // mesmo valor

        // ===== DADOS FINANCEIROS =====
        receitaTotal: getNumericValue(sheet, col + '22'),
        receitaPIN: getNumericValue(sheet, col + '23'),
        receitaMonitoramento: getNumericValue(sheet, col + '24'),
        roi: getNumericValue(sheet, col + '30'),
        cac: getNumericValue(sheet, col + '31'),
        ticketMedio: getNumericValue(sheet, col + '32'),
        cicloVendas: getNumericValue(sheet, col + '33')
      };
    });

    return ContentService.createTextOutput(JSON.stringify(data))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      error: error.toString(),
      message: 'Erro ao processar dados',
      hint: 'Verifique se a aba se chama "Resumo de Dados" e se os dados estão nas colunas C-V'
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

  // Verificar se há erro
  if (data.error) {
    Logger.log('❌ ERRO: ' + data.error);
    Logger.log('Mensagem: ' + data.message);
    if (data.hint) {
      Logger.log('Dica: ' + data.hint);
    }
    if (data.availableSheets) {
      Logger.log('Abas disponíveis: ' + data.availableSheets.join(', '));
    }
    return;
  }

  Logger.log('✅ Dados carregados com sucesso!');
  Logger.log('Total de meses: ' + Object.keys(data).length);

  // Verificar maio/2025
  if (data['maio/2025']) {
    Logger.log('\n📊 Dados de Maio/2025:');
    Logger.log('\n  === MARKETING ===');
    Logger.log('  Investimento: R$ ' + data['maio/2025'].investimento);
    Logger.log('  Visitantes: ' + data['maio/2025'].visitantes);
    Logger.log('  Cadastros: ' + data['maio/2025'].cadastros);
    Logger.log('  MQLs: ' + data['maio/2025'].mqls);
    Logger.log('  Pitchs Agendados: ' + data['maio/2025'].pitchsAgendados);
    Logger.log('  Pitchs Realizados: ' + data['maio/2025'].pitchsRealizados);

    Logger.log('\n  === COMERCIAL & VENDAS ===');
    Logger.log('  Ligações Realizadas: ' + data['maio/2025'].ligacoesRealizadas);
    Logger.log('  Ligações Atendidas: ' + data['maio/2025'].ligacoesAtendidas);
    Logger.log('  Formulário Respondido: ' + data['maio/2025'].formularioRespondido);
    Logger.log('  Análise Positiva: ' + data['maio/2025'].analisePositiva);
    Logger.log('  Vendas: ' + data['maio/2025'].vendas);

    Logger.log('\n  === FINANCEIRO ===');
    Logger.log('  Receita Total: R$ ' + data['maio/2025'].receitaTotal);
    Logger.log('  Receita PIN: R$ ' + data['maio/2025'].receitaPIN);
    Logger.log('  Receita Monitoramento: R$ ' + data['maio/2025'].receitaMonitoramento);
    Logger.log('  ROI: ' + data['maio/2025'].roi + '%');
    Logger.log('  CAC: R$ ' + data['maio/2025'].cac);
    Logger.log('  Ticket Médio: R$ ' + data['maio/2025'].ticketMedio);
    Logger.log('  Ciclo de Vendas: ' + data['maio/2025'].cicloVendas + ' dias');
  }

  Logger.log('\n✅ Tudo OK! Agora implante o script como Web App.');
}

/**
 * DEBUG: Função para verificar células específicas de dados financeiros
 * Execute esta função para ver o que realmente está em cada célula
 */
function debugFinanceiro() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = spreadsheet.getSheetByName('RESUMO_DADOS');

  if (!sheet) {
    Logger.log('❌ ERRO: Aba "RESUMO_DADOS" não encontrada!');
    Logger.log('Abas disponíveis:');
    spreadsheet.getSheets().forEach(s => Logger.log('  - ' + s.getName()));
    return;
  }

  Logger.log('🔍 DEBUG - Verificando células financeiras (Coluna B = Maio/2025)\n');

  const celulas = [
    { nome: 'Receita Total', celula: 'B22' },
    { nome: 'Receita PIN', celula: 'B23' },
    { nome: 'Receita Monitoramento', celula: 'B24' },
    { nome: 'ROI', celula: 'B30' },
    { nome: 'CAC', celula: 'B31' },
    { nome: 'Ticket Médio', celula: 'B32' },
    { nome: 'Ciclo de Vendas', celula: 'B33' }
  ];

  celulas.forEach(item => {
    const valor = sheet.getRange(item.celula).getValue();
    const tipo = typeof valor;
    const estaVazio = (valor === null || valor === undefined || valor === '');

    Logger.log(`${item.nome} (${item.celula}):`);
    Logger.log(`  Valor bruto: ${valor}`);
    Logger.log(`  Tipo: ${tipo}`);
    Logger.log(`  Está vazio: ${estaVazio}`);
    Logger.log(`  Após processamento: ${getNumericValue(sheet, item.celula)}\n`);
  });

  Logger.log('✅ Debug concluído!');
  Logger.log('Se os valores estão vazios, verifique se:');
  Logger.log('1. A aba se chama exatamente "RESUMO_DADOS" (maiúsculas e underline)');
  Logger.log('2. Os dados financeiros estão nas linhas 22, 23, 24, 30, 31, 32, 33');
  Logger.log('3. Os dados estão na coluna B para maio/2025');
}
