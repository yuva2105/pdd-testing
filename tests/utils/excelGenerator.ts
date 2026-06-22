import * as ExcelJSNamespace from 'exceljs';
import * as fs from 'fs';
import * as path from 'path';
import { TestResult } from '../unit/storeTests';

const ExcelJS = (ExcelJSNamespace as any).default || ExcelJSNamespace;

export async function generateExcelReports(
  unitResults: TestResult[],
  seleniumResults: TestResult[],
  appiumResults: TestResult[],
  validationResults: TestResult[],
  deploymentResults: TestResult[],
  loadResults: TestResult[]
) {
  const reportsDir = path.join(process.cwd(), 'tests/reports');

  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }

  const writeCategoryReport = async (
    filename: string,
    title: string,
    results: TestResult[],
    categoryLabel: string
  ) => {
    const workbook = new ExcelJS.Workbook();
    
    // 1. Dashboard Tab
    const total = results.length;
    const passed = results.filter(r => r.status === 'PASS').length;
    const failed = results.filter(r => r.status === 'FAIL').length;
    const passRate = total > 0 ? `${((passed / total) * 100).toFixed(1)}%` : '0%';
    const deployableStatus = failed === 0 ? 'DEPLOYABLE (PASSING ALL)' : 'DO NOT DEPLOY';

    const summarySheet = workbook.addWorksheet('Dashboard');
    summarySheet.columns = [
      { key: 'colA', width: 3 },
      { key: 'metric', width: 25 },
      { key: 'val', width: 50 }
    ];

    const titleRow = summarySheet.addRow(['', title]);
    titleRow.getCell(2).font = { name: 'Segoe UI', size: 14, bold: true, color: { argb: 'FF1F293D' } };
    
    summarySheet.addRow(['', 'Generated on:', new Date().toLocaleString('en-US')]);
    summarySheet.addRow([]);

    const execHeader = summarySheet.addRow(['', 'EXECUTION SUMMARY']);
    execHeader.getCell(2).font = { name: 'Segoe UI', size: 11, bold: true, color: { argb: 'FF1F293D' } };

    const metrics = [
      ['Total Test Cases', total],
      ['Passed Tests', passed],
      ['Failed Tests', failed],
      ['Pass Rate', passRate],
      ['Deployable Status', deployableStatus]
    ];

    metrics.forEach(([metric, val]) => {
      const row = summarySheet.addRow(['', metric, val]);
      row.getCell(2).font = { name: 'Segoe UI', size: 10, bold: true };
      row.getCell(3).font = { name: 'Segoe UI', size: 10 };
      if (metric === 'Deployable Status') {
        row.getCell(3).font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: failed === 0 ? 'FF10B981' : 'FFEF4444' } };
      }
    });

    // 2. Details Tab (Matching Screenshot Columns B-G)
    const detailsSheet = workbook.addWorksheet('Test Details');
    detailsSheet.columns = [
      { key: 'colA', width: 3 }, // Empty col A
      { header: 'Test Suite', key: 'suite', width: 28 },
      { header: 'Category', key: 'category', width: 16 },
      { header: 'Test Case', key: 'case', width: 65 },
      { header: 'Status', key: 'status', width: 12 },
      { header: 'Error Detail', key: 'error', width: 30 },
      { header: 'Timestamp', key: 'timestamp', width: 22 }
    ];

    // Style headers
    const headerRow = detailsSheet.getRow(1);
    headerRow.eachCell((cell, colNumber) => {
      if (colNumber > 1) {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FF1F293D' } // Navy/Grey background
        };
        cell.font = {
          name: 'Segoe UI',
          bold: true,
          color: { argb: 'FFFFFFFF' },
          size: 11
        };
        cell.alignment = {
          vertical: 'middle',
          horizontal: 'center'
        };
        cell.border = {
          top: { style: 'thin', color: { argb: 'FF374151' } },
          left: { style: 'thin', color: { argb: 'FF374151' } },
          bottom: { style: 'thin', color: { argb: 'FF374151' } },
          right: { style: 'thin', color: { argb: 'FF374151' } }
        };
      }
    });
    headerRow.height = 28;

    // Add rows
    const timestampStr = new Date().toLocaleString('en-US');
    results.forEach(r => {
      const row = detailsSheet.addRow({
        suite: categoryLabel,
        category: r.type,
        case: `${r.id}: ${r.id}: ${r.description}`,
        status: r.status,
        error: r.status === 'FAIL' ? r.actual : '',
        timestamp: timestampStr
      });

      row.eachCell((cell, colNumber) => {
        if (colNumber > 1) {
          cell.font = {
            name: 'Segoe UI',
            size: 10,
            color: { argb: 'FF1F293D' }
          };
          cell.border = {
            top: { style: 'thin', color: { argb: 'FFE5E7EB' } },
            left: { style: 'thin', color: { argb: 'FFE5E7EB' } },
            bottom: { style: 'thin', color: { argb: 'FFE5E7EB' } },
            right: { style: 'thin', color: { argb: 'FFE5E7EB' } }
          };
          cell.alignment = {
            vertical: 'middle',
            wrapText: true
          };
        }

        // Color format Status Column (Col E is colNumber 5)
        if (colNumber === 5) {
          cell.alignment = {
            vertical: 'middle',
            horizontal: 'center'
          };
          if (cell.value === 'PASS') {
            cell.fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: 'FF34C759' } // Vibrant Green
            };
            cell.font = {
              name: 'Segoe UI',
              bold: true,
              color: { argb: 'FFFFFFFF' }
            };
          } else {
            cell.fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: 'FFFF2D55' } // Vibrant Red
            };
            cell.font = {
              name: 'Segoe UI',
              bold: true,
              color: { argb: 'FFFFFFFF' }
            };
          }
        }
      });
      row.height = 20;
    });

    const filePath = path.join(reportsDir, filename);
    await workbook.xlsx.writeFile(filePath);
    console.log(`Individual report generated successfully at: ${filePath}`);
  };

  // 1. Write individual reports
  await writeCategoryReport('unit-test-report.xlsx', 'AstraSafe Safety Platform - Unit Tests API', unitResults, 'Unit Tests - API');
  await writeCategoryReport('selenium-web-report.xlsx', 'AstraSafe Safety Platform - Selenium Website Tests', seleniumResults, 'Selenium - Website Tests');
  await writeCategoryReport('appium-android-report.xlsx', 'AstraSafe Safety Platform - Appium Android Tests', appiumResults, 'Appium - Android Tests');
  await writeCategoryReport('validation-test-report.xlsx', 'AstraSafe Safety Platform - Validation Tests', validationResults, 'Validation Tests');
  await writeCategoryReport('deployment-test-report.xlsx', 'AstraSafe Safety Platform - Deployment Status Tests', deploymentResults, 'Deployment Status');
  await writeCategoryReport('load-test-report.xlsx', 'AstraSafe Safety Platform - Load Testing Performance', loadResults, 'Load Testing - Performance');

  // 2. Write consolidated master report (full-e2e-report.xlsx)
  const masterWorkbook = new ExcelJS.Workbook();
  const allResults = [
    ...unitResults,
    ...seleniumResults,
    ...appiumResults,
    ...validationResults,
    ...deploymentResults,
    ...loadResults
  ];

  const totalMaster = allResults.length;
  const passedMaster = allResults.filter(r => r.status === 'PASS').length;
  const failedMaster = allResults.filter(r => r.status === 'FAIL').length;
  const passRateMaster = totalMaster > 0 ? `${((passedMaster / totalMaster) * 100).toFixed(1)}%` : '0%';
  const deployableStatusMaster = failedMaster === 0 ? 'DEPLOYABLE (PASSING ALL SUITES)' : 'DO NOT DEPLOY';

  const masterSummarySheet = masterWorkbook.addWorksheet('Master Dashboard');
  masterSummarySheet.columns = [
    { key: 'colA', width: 3 },
    { key: 'metric', width: 28 },
    { key: 'val', width: 50 }
  ];

  const masterTitle = masterSummarySheet.addRow(['', 'AstraSafe Safety Platform - Consolidated Master Report']);
  masterTitle.getCell(2).font = { name: 'Segoe UI', size: 14, bold: true };
  masterSummarySheet.addRow(['', 'Generated on:', new Date().toLocaleString('en-US')]);
  masterSummarySheet.addRow([]);

  const execMasterHeader = masterSummarySheet.addRow(['', 'CONSOLIDATED EXECUTION SUMMARY']);
  execMasterHeader.getCell(2).font = { name: 'Segoe UI', size: 11, bold: true };

  const masterMetrics = [
    ['Total Test Cases', totalMaster],
    ['Passed Tests', passedMaster],
    ['Failed Tests', failedMaster],
    ['Pass Rate', passRateMaster],
    ['Deployable Status', deployableStatusMaster]
  ];

  masterMetrics.forEach(([metric, val]) => {
    const row = masterSummarySheet.addRow(['', metric, val]);
    row.getCell(2).font = { name: 'Segoe UI', size: 10, bold: true };
    row.getCell(3).font = { name: 'Segoe UI', size: 10 };
    if (metric === 'Deployable Status') {
      row.getCell(3).font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: failedMaster === 0 ? 'FF10B981' : 'FFEF4444' } };
    }
  });

  const createDetailsSheet = (workbook: ExcelJS.Workbook, sheetName: string, results: TestResult[], categoryLabel: string) => {
    const detailsSheet = workbook.addWorksheet(sheetName);
    detailsSheet.columns = [
      { key: 'colA', width: 3 },
      { header: 'Test Suite', key: 'suite', width: 28 },
      { header: 'Category', key: 'category', width: 16 },
      { header: 'Test Case', key: 'case', width: 65 },
      { header: 'Status', key: 'status', width: 12 },
      { header: 'Error Detail', key: 'error', width: 30 },
      { header: 'Timestamp', key: 'timestamp', width: 22 }
    ];

    const headerRow = detailsSheet.getRow(1);
    headerRow.eachCell((cell, colNumber) => {
      if (colNumber > 1) {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FF1F293D' }
        };
        cell.font = {
          name: 'Segoe UI',
          bold: true,
          color: { argb: 'FFFFFFFF' },
          size: 11
        };
        cell.alignment = {
          vertical: 'middle',
          horizontal: 'center'
        };
        cell.border = {
          top: { style: 'thin', color: { argb: 'FF374151' } },
          left: { style: 'thin', color: { argb: 'FF374151' } },
          bottom: { style: 'thin', color: { argb: 'FF374151' } },
          right: { style: 'thin', color: { argb: 'FF374151' } }
        };
      }
    });
    headerRow.height = 28;

    const timestampStr = new Date().toLocaleString('en-US');
    results.forEach(r => {
      const row = detailsSheet.addRow({
        suite: categoryLabel,
        category: r.type,
        case: `${r.id}: ${r.id}: ${r.description}`,
        status: r.status,
        error: r.status === 'FAIL' ? r.actual : '',
        timestamp: timestampStr
      });

      row.eachCell((cell, colNumber) => {
        if (colNumber > 1) {
          cell.font = {
            name: 'Segoe UI',
            size: 10,
            color: { argb: 'FF1F293D' }
          };
          cell.border = {
            top: { style: 'thin', color: { argb: 'FFE5E7EB' } },
            left: { style: 'thin', color: { argb: 'FFE5E7EB' } },
            bottom: { style: 'thin', color: { argb: 'FFE5E7EB' } },
            right: { style: 'thin', color: { argb: 'FFE5E7EB' } }
          };
          cell.alignment = {
            vertical: 'middle',
            wrapText: true
          };
        }

        if (colNumber === 5) {
          cell.alignment = {
            vertical: 'middle',
            horizontal: 'center'
          };
          if (cell.value === 'PASS') {
            cell.fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: 'FF34C759' }
            };
            cell.font = {
              name: 'Segoe UI',
              bold: true,
              color: { argb: 'FFFFFFFF' }
            };
          } else {
            cell.fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: 'FFFF2D55' }
            };
            cell.font = {
              name: 'Segoe UI',
              bold: true,
              color: { argb: 'FFFFFFFF' }
            };
          }
        }
      });
      row.height = 20;
    });
  };

  createDetailsSheet(masterWorkbook, 'Unit Details', unitResults, 'Unit Tests - API');
  createDetailsSheet(masterWorkbook, 'Selenium Details', seleniumResults, 'Selenium - Website Tests');
  createDetailsSheet(masterWorkbook, 'Appium Details', appiumResults, 'Appium - Android Tests');
  createDetailsSheet(masterWorkbook, 'Validation Details', validationResults, 'Validation Tests');
  createDetailsSheet(masterWorkbook, 'Deployment Details', deploymentResults, 'Deployment Status');
  createDetailsSheet(masterWorkbook, 'Load Details', loadResults, 'Load Testing - Performance');

  const masterFilePath = path.join(reportsDir, 'full-e2e-report.xlsx');
  await masterWorkbook.xlsx.writeFile(masterFilePath);
  console.log(`Consolidated Master E2E report generated successfully at: ${masterFilePath}`);
}
