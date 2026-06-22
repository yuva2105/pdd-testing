import { spawn, ChildProcess } from 'child_process';
import { runUnitTests } from './unit/storeTests';
import { runSeleniumTests } from './selenium/webTests';
import { runAppiumTests } from './appium/mobileTests';
import { runValidationTests } from './validation/validationTests';
import { runDeploymentTests } from './deployment/deploymentTests';
import { runLoadTests } from './load/loadTests';
import { generateExcelReports } from './utils/excelGenerator';
import { generateHtmlDashboard } from './utils/htmlGenerator';

async function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function isServerReady(url: string): Promise<boolean> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1000);
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    return res.status === 200 || res.status === 304;
  } catch {
    return false;
  }
}

async function main() {
  const args = process.argv.slice(2);
  const suiteIndex = args.indexOf('--suite');
  const targetSuite = suiteIndex !== -1 ? args[suiteIndex + 1]?.toLowerCase() : null;

  console.log('==================================================');
  console.log('           ASTRASAFE FULL TESTING SUITE           ');
  console.log('==================================================');
  if (targetSuite) {
    console.log(`Running targeted test suite: ${targetSuite.toUpperCase()}`);
  }
  console.log('==================================================\n');

  let unitResults = [];
  let seleniumResults = [];
  let appiumResults = [];
  let validationResults = [];
  let deploymentResults = [];
  let loadResults = [];

  const devServerUrl = 'http://localhost:5173';
  let viteProcess: ChildProcess | null = null;

  // 1. Run Unit Tests
  if (!targetSuite || targetSuite === 'unit') {
    console.log('Executing Unit Tests...');
    unitResults = runUnitTests();
    console.log(`Completed: ${unitResults.length} test cases.`);
  }

  // 2. Run Selenium Web Tests
  if (!targetSuite || targetSuite === 'selenium') {
    let serverRunning = await isServerReady(devServerUrl);
    if (!serverRunning && !targetSuite) {
      console.log('Launching Vite development server in the background for E2E tests...');
      viteProcess = spawn('npx', ['vite'], { stdio: 'pipe', shell: true });
      let retries = 10;
      while (retries > 0) {
        await delay(1000);
        serverRunning = await isServerReady(devServerUrl);
        if (serverRunning) break;
        retries--;
      }
    }
    console.log('Executing Selenium Web Tests...');
    seleniumResults = await runSeleniumTests(devServerUrl);
    console.log(`Completed: ${seleniumResults.length} test cases.`);
  }

  // 3. Run Appium Mobile Tests
  if (!targetSuite || targetSuite === 'appium') {
    console.log('Executing Appium Mobile Tests...');
    appiumResults = await runAppiumTests();
    console.log(`Completed: ${appiumResults.length} test cases.`);
  }

  // 4. Run Validation Tests
  if (!targetSuite || targetSuite === 'validation') {
    console.log('Executing Validation Tests...');
    validationResults = runValidationTests();
    console.log(`Completed: ${validationResults.length} test cases.`);
  }

  // 5. Run Deployment Tests
  if (!targetSuite || targetSuite === 'deployment') {
    console.log('Executing Deployment Tests...');
    deploymentResults = runDeploymentTests();
    console.log(`Completed: ${deploymentResults.length} test cases.`);
  }

  // 6. Run Load Tests
  if (!targetSuite || targetSuite === 'load') {
    console.log('Executing Load/Performance Tests...');
    loadResults = runLoadTests();
    console.log(`Completed: ${loadResults.length} test cases.`);
  }

  // Generate output files
  console.log('\nCompiling results and generating Excel analysis reports...');
  try {
    await generateExcelReports(
      unitResults,
      seleniumResults,
      appiumResults,
      validationResults,
      deploymentResults,
      loadResults
    );
    console.log('Excel reports successfully created.');

    if (!targetSuite) {
      console.log('Generating HTML dashboard for GitHub Pages...');
      generateHtmlDashboard(
        unitResults,
        seleniumResults,
        appiumResults,
        validationResults,
        deploymentResults,
        loadResults
      );
      console.log('HTML dashboard successfully compiled.');
    }
  } catch (err: any) {
    console.error('Error generating reports:', err.message);
  }

  // Clean up Vite server if spawned
  if (viteProcess) {
    console.log('\nShutting down Vite dev server...');
    viteProcess.kill('SIGINT');
    if (process.platform === 'win32') {
      spawn('taskkill', ['/pid', String(viteProcess.pid), '/f', '/t']);
    }
  }

  // Print execution summary
  const total = unitResults.length + seleniumResults.length + appiumResults.length + validationResults.length + deploymentResults.length + loadResults.length;
  const passed = [
    ...unitResults,
    ...seleniumResults,
    ...appiumResults,
    ...validationResults,
    ...deploymentResults,
    ...loadResults
  ].filter(r => r.status === 'PASS').length;
  const failed = total - passed;

  console.log('\n==================================================');
  console.log('               TESTING SUITE SUMMARY              ');
  console.log('==================================================');
  console.log(`Total Test Cases Executed: ${total}`);
  console.log(`Passed Test Cases       : ${passed} (${total > 0 ? ((passed/total)*100).toFixed(1) : 0}%)`);
  console.log(`Failed Test Cases       : ${failed}`);
  console.log(`Deployable Status       : ${failed === 0 ? 'DEPLOYABLE (PASSING ALL)' : 'DO NOT DEPLOY'}`);
  console.log('==================================================\n');
}

main().catch(err => {
  console.error('Unhandled execution error in test runner:', err);
  process.exit(1);
});
