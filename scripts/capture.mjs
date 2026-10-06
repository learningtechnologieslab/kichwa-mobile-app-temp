import { chromium } from '@playwright/test';
import fs from 'node:fs';

const phase = process.argv[2] || 'after';
const url = process.env.CAPTURE_URL || 'http://127.0.0.1:5173';
const browser = await chromium.launch();
const page = await browser.newPage();
const widths = [390, 620, 621, 700, 701, 880, 881, 1440];
let captured = 0;
fs.mkdirSync(`.visual-baseline/${phase}`, { recursive: true });
for (const width of widths) {
  await page.setViewportSize({ width, height: 900 });
  for (const language of ['en', 'es']) {
    for (const screen of [
      'learn',
      'quests',
      'profile',
      'intro',
      'choice',
      'animal',
      'quiz',
      'speaking',
      'translation',
      'finding',
      'ending',
    ]) {
      const stage = ['learn', 'quests', 'profile'].includes(screen) ? 'intro' : screen;
      const route = ['learn', 'quests', 'profile'].includes(screen) ? screen : 'quest';
      await page.goto(url);
      await page.evaluate(
        ({ stage, language }) => {
          const index = [
            'intro',
            'choice',
            'animal',
            'quiz',
            'speaking',
            'translation',
            'finding',
            'ending',
          ].indexOf(stage);
          localStorage.setItem('kichwa-language', language);
          localStorage.setItem(
            'kichwa-first-mother-progress',
            JSON.stringify({
              stage,
              animal: index > 1 ? 'toucan' : '',
              quizDone: index >= 4,
              speakingDone: index >= 5,
              translationDone: index >= 6,
              translationDraft: { text: '', parts: [], labeling: false },
              findingDone: index >= 7,
              complete: index >= 7,
              completedOnce: index >= 7,
            }),
          );
        },
        { stage, language },
      );
      await page.goto(`${url}/#${route}`);
      await page.reload();
      await page.evaluate(() => document.fonts.ready);
      // Stop route-triggered smooth scrolling before capturing fixed navigation.
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
      await page.screenshot({
        path: `.visual-baseline/${phase}/${width}-${language}-${screen}.png`,
        fullPage: true,
        animations: 'disabled',
      });
      captured++;
    }
  }
}
await browser.close();
console.log(`Captured ${captured} ${phase} screenshots.`);
