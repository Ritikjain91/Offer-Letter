const puppeteer = require('puppeteer');
const path = require('path');
const os = require('os');

(async () => {
  try {
    console.log('Launching browser...');
    const browser = await puppeteer.launch({
      headless: false,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();

    console.log('Setting HTML content...');
    const htmlContent = '<html><body><h1>Hello, PDF!</h1></body></html>';
    await page.setContent(htmlContent, { waitUntil: 'load', timeout: 60000 });

    console.log('Generating PDF...');
    const downloadPath = path.resolve(os.homedir(), 'Downloads', 'output.pdf');
    await page.pdf({
      path: downloadPath,
      format: 'A4',
      printBackground: true
    });

    console.log('Closing browser...');
    await browser.close();
    console.log('PDF generated successfully at:', downloadPath);
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();
