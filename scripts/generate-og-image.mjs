#!/usr/bin/env node
/**
 * OG Image Generator Script
 *
 * Generates og-image.png from the HTML template.
 *
 * Usage: npx playwright install chromium && node scripts/generate-og-image.mjs
 * Or manually screenshot public/og-image-template.html in Chrome at 1200x630
 */

import { chromium } from 'playwright-core';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

async function generateOGImage() {
  console.log('Launching browser...');
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Set viewport to exact OG image dimensions
  await page.setViewportSize({ width: 1200, height: 630 });

  // Load the HTML template
  const templatePath = join(projectRoot, 'public', 'og-image-template.html');
  await page.goto(`file://${templatePath}`);

  // Wait for fonts to load
  await page.waitForTimeout(1000);

  // Screenshot the og-container element
  const element = await page.$('.og-container');
  if (element) {
    const outputPath = join(projectRoot, 'public', 'og-image.png');
    await element.screenshot({ path: outputPath });
    console.log(`OG image saved to: ${outputPath}`);
  } else {
    // Fallback to full page screenshot
    const outputPath = join(projectRoot, 'public', 'og-image.png');
    await page.screenshot({ path: outputPath, clip: { x: 0, y: 0, width: 1200, height: 630 } });
    console.log(`OG image saved to: ${outputPath}`);
  }

  await browser.close();
  console.log('Done!');
}

generateOGImage().catch(console.error);
