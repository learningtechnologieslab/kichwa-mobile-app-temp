import { test, expect, type Page } from '@playwright/test';
import { quest } from '../src/content/quest';
import { animalIds } from '../src/types';
import { mockTranscripts } from '../src/content/mocks/mockTranscripts';

async function finishTranslation(page: Page, language: string, text = 'Ñuka muyuta mikuni.') {
  await page.locator('#kichwa-translation').fill(text);
  await page
    .getByRole('button', { name: language === 'en' ? 'Label my words' : 'Clasificar mis palabras' })
    .click();
  for (const select of await page.getByRole('combobox').all()) await select.selectOption('unsure');
  await page
    .getByRole('button', { name: language === 'en' ? 'Continue' : 'Continuar', exact: true })
    .click();
}

async function seed(page: Page, stage: string, language = 'en') {
  await page.addInitScript(
    ({ stage, language }) => {
      if (sessionStorage.getItem('test-progress-seeded')) return;
      sessionStorage.setItem('test-progress-seeded', 'true');
      localStorage.setItem('kichwa-language', language);
      localStorage.setItem(
        'kichwa-first-mother-progress',
        JSON.stringify({ stage, animal: 'toucan' }),
      );
    },
    { stage, language },
  );
  await page.goto('/#quest');
}
for (const language of ['en', 'es']) {
  for (const id of animalIds) {
    test(`${language}: complete ${id}, resume and replay`, async ({ page }) => {
      const errors: string[] = [];
      page.on('pageerror', (error) => errors.push(error.message));
      await page.goto('/#quests');
      await expect(page.locator('.quest-launch')).toBeDisabled();
      if (language === 'es') await page.getByRole('button', { name: 'ES', exact: true }).click();
      await page.locator('.sidebar a[href="#learn"]').click();
      await page.locator('.home-minimal button').click();
      await page.locator('.quest-next').click();
      await page.locator('.animal-choice').nth(animalIds.indexOf(id)).click();
      await page.locator('.quest-next').click();
      await page.locator('.exit-quest').click();
      await page.reload();
      await page.locator('.sidebar a[href="#learn"]').click();
      await page.locator('.home-minimal button').click();
      const chosen =
        animalIds.indexOf(id) % 2 === 0
          ? quest.animals[id].answer
          : (quest.animals[id].answer + 1) % 3;
      await page.locator('.answer-option').nth(chosen).click();
      await expect(page.locator('.answer-option.correct')).toHaveCount(1);
      await expect(page.locator('.answer-option:disabled')).toHaveCount(3);
      await page.locator('.challenge-next').click();
      await page.locator('.record-button').click();
      await page.locator('.record-button').press('Space');
      await expect(page.locator('#transcription')).toHaveValue(mockTranscripts[id]);
      await page.locator('#transcription').fill(quest.animals[id].phrase);
      await page
        .getByRole('button', {
          name: language === 'en' ? 'Confirm transcription' : 'Confirmar transcripción',
        })
        .click();
      await finishTranslation(page, language, quest.animals[id].phrase);
      await page.locator('.finding-skip').click();
      await expect(page.locator('.completion-note')).toBeVisible();
      await page.locator('.completion-actions .primary-button').click();
      await expect(page.locator('.quest-launch')).toBeEnabled();
      await page.locator('.sidebar a[href="#profile"]').click();
      await expect(page.locator('.profile-stats strong')).toHaveText(['1', '4', '3']);
      await page.locator('.profile-card button').click();
      await page.locator('.quest-launch').click();
      await page.locator('.completion-actions .secondary-button').click();
      await page.locator('.quest-next').click();
      await page.locator('.animal-choice').first().click();
      await page.locator('.exit-quest').click();
      await expect(page.locator('.quest-launch')).toBeEnabled();
      expect(errors).toEqual([]);
    });
  }
}
test('photo preview survives language change and waits for Continue', async ({ page }) => {
  await seed(page, 'finding');
  const png = Buffer.from(
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jRZkAAAAASUVORK5CYII=',
    'base64',
  );
  await page
    .locator('input[type=file]')
    .setInputFiles({ name: 'fruit.png', mimeType: 'image/png', buffer: png });
  const first = await page.locator('#photoPreview img').getAttribute('src');
  await page.getByRole('button', { name: 'ES', exact: true }).click();
  await expect(page.locator('#photoPreview img')).toHaveAttribute('src', first!);
  await page
    .locator('input[type=file]')
    .setInputFiles({ name: 'fruit2.png', mimeType: 'image/png', buffer: png });
  await expect(page.locator('#photoPreview img')).not.toHaveAttribute('src', first!);
  await expect(page.locator('.completion-note')).toHaveCount(0);
  await page.getByRole('button', { name: 'Continuar' }).click();
  await expect(page.locator('.completion-note')).toBeVisible();
});
test('simulated recording and corrected transcript survive language change and require confirmation', async ({
  page,
}) => {
  await seed(page, 'speaking');
  await page.getByRole('button', { name: 'Record myself' }).click();
  // The existing recording button pulses continuously; use its keyboard action.
  await page.getByRole('button', { name: 'Stop recording' }).press('Space');
  await expect(page.locator('audio')).toHaveCount(0);
  await expect(page.locator('.phrase')).toHaveCount(0);
  await expect(page.getByText('Transcribing your recording…')).toBeVisible();
  await expect(page.locator('#transcription')).toHaveValue(mockTranscripts.toucan);
  for (const width of [320, 1440]) {
    await page.setViewportSize({ width, height: 844 });
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth),
    ).toBe(false);
    await page.screenshot({
      path: `.visual-baseline/features/en-transcription-${width}.png`,
      fullPage: true,
      animations: 'disabled',
    });
  }
  await page.locator('#transcription').fill('Sikwanga muyuta mikun.');
  await page.getByRole('button', { name: 'ES', exact: true }).click();
  await expect(page.locator('#transcription')).toHaveValue('Sikwanga muyuta mikun.');
  await expect(page.locator('audio')).toHaveCount(0);
  await expect(page.locator('.phrase')).toHaveCount(0);
  await expect(page.locator('.finding-card')).toHaveCount(0);
  await page.getByRole('button', { name: 'Confirmar transcripción' }).click();
  await expect(page.locator('.translation-card')).toBeVisible();
  await finishTranslation(page, 'es');
  await expect(page.locator('.finding-card')).toBeVisible();
});
test('mobile navigation and invalid hashes', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/#unknown');
  await expect(page).toHaveURL(/#learn$/);
  await page.locator('.mobile-nav a[href="#profile"]').click();
  await expect(page.getByRole('heading', { name: 'Hi Helen!' })).toBeVisible();
  await page.evaluate(() => {
    location.hash = '#quests';
  });
  await expect(page.locator('.quest-launch')).toBeDisabled();
});

for (const language of ['en', 'es']) {
  test(`${language}: translation labels survive save, reload, and edits on mobile`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 320, height: 844 });
    await seed(page, 'translation', language);
    await expect(page.locator('.source-sentence')).toHaveText(
      language === 'en' ? '“The toucan eats fruit.”' : '“El tucán come fruta.”',
    );
    await page.locator('#kichwa-translation').fill('  Ñuka,  muyuta\nÑuka.  ');
    await page
      .getByRole('button', {
        name: language === 'en' ? 'Label my words' : 'Clasificar mis palabras',
      })
      .click();
    await expect(page.getByRole('combobox')).toHaveCount(3);
    await page.getByRole('combobox').nth(0).selectOption('pronoun');
    await page.getByRole('combobox').nth(1).selectOption('other');
    await expect(
      page.getByRole('button', { name: language === 'en' ? 'Continue' : 'Continuar', exact: true }),
    ).toBeDisabled();
    await page.locator('.exit-quest').click();
    await page.reload();
    await page.goto('/#quest');
    await expect(page.getByRole('combobox').nth(0)).toHaveValue('pronoun');
    await expect(page.getByRole('combobox').nth(1)).toHaveValue('other');
    await page.getByRole('combobox').nth(2).selectOption('unsure');
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth),
    ).toBe(false);
    await page.screenshot({
      path: `.visual-baseline/features/${language}-word-labels-mobile.png`,
      fullPage: true,
      animations: 'disabled',
    });
    await page
      .getByRole('button', {
        name: language === 'en' ? 'Edit my translation' : 'Editar mi traducción',
      })
      .click();
    await page.locator('#kichwa-translation').fill('Alimanda purini.');
    await page
      .getByRole('button', {
        name: language === 'en' ? 'Label my words' : 'Clasificar mis palabras',
      })
      .click();
    await expect(page.getByRole('combobox')).toHaveCount(2);
    for (const select of await page.getByRole('combobox').all()) {
      await expect(select).toHaveValue('');
      await select.selectOption('noun');
    }
    await page
      .getByRole('button', { name: language === 'en' ? 'Continue' : 'Continuar', exact: true })
      .click();
    await expect(page.locator('.finding-card')).toBeVisible();
  });
}

test('simulation never accesses media APIs and restarting resets the review', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'mediaDevices', {
      get() {
        throw new Error('Microphone API must not be accessed');
      },
    });
    Object.defineProperty(window, 'MediaRecorder', {
      get() {
        throw new Error('MediaRecorder must not be accessed');
      },
    });
  });
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await seed(page, 'speaking');
  await expect(page.locator('.phrase')).toBeVisible();
  await expect(page.locator('.recording-actions .text-button')).toHaveCount(0);
  await expect(page.locator('#transcription')).toHaveCount(0);
  await page.getByRole('button', { name: 'Record myself' }).click();
  await expect(page.getByRole('status')).toContainText('Recording…');
  await expect(page.locator('.phrase')).toBeVisible();
  await expect(page.locator('#transcription')).toHaveCount(0);
  await page.getByRole('button', { name: 'Stop recording' }).press('Space');
  await expect(page.locator('.phrase')).toHaveCount(0);
  await expect(page.locator('.translation')).toHaveCount(0);
  await expect(page.locator('audio')).toHaveCount(0);
  await expect(page.locator('#transcription')).toHaveValue(mockTranscripts.toucan);
  await page.locator('#transcription').fill('   ');
  await expect(page.getByRole('button', { name: 'Confirm transcription' })).toBeDisabled();
  await page.locator('#transcription').fill('Edited draft');
  await page.getByRole('button', { name: 'Record again' }).click();
  await expect(page.locator('.phrase')).toBeVisible();
  await expect(page.locator('#transcription')).toHaveCount(0);
  await page.getByRole('button', { name: 'Stop recording' }).press('Space');
  await expect(page.locator('#transcription')).toHaveValue(mockTranscripts.toucan);
  await page.getByRole('button', { name: 'Confirm transcription' }).click();
  await expect(page.locator('.translation-card')).toBeVisible();
  expect(errors).toEqual([]);
});

test('responsive layouts fit both languages at every breakpoint', async ({ page }) => {
  for (const width of [320, 390, 620, 621, 700, 701, 880, 881, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const language of ['en', 'es']) {
      await page.goto('/');
      for (const stage of [
        'intro',
        'choice',
        'animal',
        'quiz',
        'speaking',
        'translation',
        'finding',
        'ending',
      ]) {
        await page.evaluate(
          ({ stage, language }) => {
            localStorage.setItem('kichwa-language', language);
            localStorage.setItem(
              'kichwa-first-mother-progress',
              JSON.stringify({ stage, animal: 'woodpecker' }),
            );
          },
          { stage, language },
        );
        await page.goto('/#quest');
        await page.reload();
        await expect(page.locator('.quest-panel')).toBeVisible();
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth > window.innerWidth,
        );
        expect(overflow, `${width}px ${language} ${stage} overflow`).toBe(false);
      }
    }
  }
});
