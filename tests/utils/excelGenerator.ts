import * as XLSX from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';
import { TestResult } from '../unit/storeTests';

export function generateExcelReports(
  unitResults: TestResult[],
  seleniumResults: TestResult[],
  appiumResults: TestResult[],
  validationResults: TestResult[],
  deploymentResults: TestResult[],
  loadResults: TestResult[]
) {
  // Use process.cwd() instead of __dirname to avoid ES modules errors
  const reportsDir = path.join(process.cwd(), 'tests/reports');

  // Create directory if it doesn't exist
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }

  // Helper to write a single category workbook
  const writeCategoryReport = (
    filename: string,
    title: string,
    results: TestResult[],
    categoryLabel: string
  ) => {
    const workbook = XLSX.utils.book_new();

    const total = results.length;
    const passed = results.filter(r => r.status === 'PASS').length;
    const failed = results.filter(r => r.status === 'FAIL').length;
    const passRate = total > 0 ? `${((passed / total) * 100).toFixed(1)}%` : '0%';
    const deployableStatus = failed === 0 ? 'DEPLOYABLE (PASSING ALL)' : 'DO NOT DEPLOY';

    // Summary Page
    const summaryData = [
      [title],
      ['Generated on:', new Date().toLocaleString()],
      [],
      ['EXECUTION SUMMARY'],
      ['Metric', 'Value'],
      ['Total Test Cases', total],
      ['Passed Tests', passed],
      ['Failed Tests', failed],
      ['Pass Rate', passRate],
      ['Deployable Status', deployableStatus],
      [],
      ['TEST CATEGORY SUMMARY'],
      ['Category', 'Count', 'Passed', 'Failed'],
      [categoryLabel, total, passed, failed]
    ];

    const summarySheet = XLSX.utils.aoa_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(workbook, summarySheet, 'Dashboard');

    // Details Page
    const detailsHeaders = ['Test ID', 'Category', 'Description', 'Test Type', 'Expected Result', 'Actual Result', 'Status', 'Time (ms)'];
    const detailsRows = results.map(r => [
      r.id,
      r.category,
      r.description,
      r.type,
      r.expected,
      r.actual,
      r.status,
      r.executionTimeMs
    ]);

    const detailsSheet = XLSX.utils.aoa_to_sheet([detailsHeaders, ...detailsRows]);
    XLSX.utils.book_append_sheet(workbook, detailsSheet, 'Test Details');

    const filePath = path.join(reportsDir, filename);
    XLSX.writeFile(workbook, filePath);
    console.log(`Individual report generated successfully at: ${filePath}`);
  };

  // 1. Write individual reports
  writeCategoryReport('unit-test-report.xlsx', 'AstraSafe Safety Platform - Unit Tests API', unitResults, 'Unit Tests - API');
  writeCategoryReport('selenium-web-report.xlsx', 'AstraSafe Safety Platform - Selenium Website Tests', seleniumResults, 'Selenium - Website Tests');
  writeCategoryReport('appium-android-report.xlsx', 'AstraSafe Safety Platform - Appium Android Tests', appiumResults, 'Appium - Android Tests');
  writeCategoryReport('validation-test-report.xlsx', 'AstraSafe Safety Platform - Validation Tests', validationResults, 'Validation Tests');
  writeCategoryReport('deployment-test-report.xlsx', 'AstraSafe Safety Platform - Deployment Status Tests', deploymentResults, 'Deployment Status');
  writeCategoryReport('load-test-report.xlsx', 'AstraSafe Safety Platform - Load Testing Performance', loadResults, 'Load Testing - Performance');

  // 2. Write consolidated master report (full-e2e-report.xlsx)
  const masterWorkbook = XLSX.utils.book_new();
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
  const deployableStatusMaster = failedMaster === 0 ? 'DEPLOYABLE (PASSING ALL SUITES)' : 'DO NOT DEPLOY (BLOCKED BY FAILURES)';

  const masterSummaryData = [
    ['AstraSafe Safety Platform - Consolidated Master Report'],
    ['Generated on:', new Date().toLocaleString()],
    [],
    ['CONSOLIDATED EXECUTION SUMMARY'],
    ['Metric', 'Value'],
    ['Total Test Cases', totalMaster],
    ['Passed Tests', passedMaster],
    ['Failed Tests', failedMaster],
    ['Pass Rate', passRateMaster],
    ['Deployable Status', deployableStatusMaster],
    [],
    ['TEST SUITES SUMMARY'],
    ['Category', 'Count', 'Passed', 'Failed'],
    ['Unit Tests - API', unitResults.length, unitResults.filter(r => r.status === 'PASS').length, unitResults.filter(r => r.status === 'FAIL').length],
    ['Selenium - Website Tests', seleniumResults.length, seleniumResults.filter(r => r.status === 'PASS').length, seleniumResults.filter(r => r.status === 'FAIL').length],
    ['Appium - Android Tests', appiumResults.length, appiumResults.filter(r => r.status === 'PASS').length, appiumResults.filter(r => r.status === 'FAIL').length],
    ['Validation Tests', validationResults.length, validationResults.filter(r => r.status === 'PASS').length, validationResults.filter(r => r.status === 'FAIL').length],
    ['Deployment Status', deploymentResults.length, deploymentResults.filter(r => r.status === 'PASS').length, deploymentResults.filter(r => r.status === 'FAIL').length],
    ['Load Testing - Performance', loadResults.length, loadResults.filter(r => r.status === 'PASS').length, loadResults.filter(r => r.status === 'FAIL').length],
  ];

  const masterSummarySheet = XLSX.utils.aoa_to_sheet(masterSummaryData);
  XLSX.utils.book_append_sheet(masterWorkbook, masterSummarySheet, 'Master Dashboard');

  // Add individual tabs for details
  const createDetailsSheet = (results: TestResult[]) => {
    const detailsHeaders = ['Test ID', 'Category', 'Description', 'Test Type', 'Expected Result', 'Actual Result', 'Status', 'Time (ms)'];
    const detailsRows = results.map(r => [
      r.id,
      r.category,
      r.description,
      r.type,
      r.expected,
      r.actual,
      r.status,
      r.executionTimeMs
    ]);
    return XLSX.utils.aoa_to_sheet([detailsHeaders, ...detailsRows]);
  };

  XLSX.utils.book_append_sheet(masterWorkbook, createDetailsSheet(unitResults), 'Unit Details');
  XLSX.utils.book_append_sheet(masterWorkbook, createDetailsSheet(seleniumResults), 'Selenium Details');
  XLSX.utils.book_append_sheet(masterWorkbook, createDetailsSheet(appiumResults), 'Appium Details');
  XLSX.utils.book_append_sheet(masterWorkbook, createDetailsSheet(validationResults), 'Validation Details');
  XLSX.utils.book_append_sheet(masterWorkbook, createDetailsSheet(deploymentResults), 'Deployment Details');
  XLSX.utils.book_append_sheet(masterWorkbook, createDetailsSheet(loadResults), 'Load Details');

  const masterFilePath = path.join(reportsDir, 'full-e2e-report.xlsx');
  XLSX.writeFile(masterWorkbook, masterFilePath);
  console.log(`Consolidated Master E2E report generated successfully at: ${masterFilePath}`);
}
