import { test, expect } from '@playwright/test';

test.describe('Lucky Draw Flow', () => {
    test('should complete a full 3-round lottery', async ({ page }) => {
        // 1. Visit Home Page
        await page.goto('http://localhost:5173');
        await expect(page).toHaveTitle(/PayerMax/);
        await expect(page.getByText('Waiting for Activity')).toBeVisible();

        // 2. Start Event (Home -> Wait)
        const startButton = page.getByRole('button', { name: /Start Lottery/i });
        await startButton.click();

        // ------------------ ROUND 1: Second Prize (5 winners) ------------------
        // Verify Round 1 Setup
        await expect(page.getByText('二等奖')).toBeVisible();
        await expect(page.getByText('Prize Reveal')).toBeVisible();

        // Start Drawing Round 1
        await page.getByRole('button', { name: /START DRAW/i }).click();
        await expect(page.getByText('STOP')).toBeVisible();

        // Wait for animation
        await page.waitForTimeout(2000);

        // Stop Drawing Round 1
        await page.getByRole('button', { name: /STOP/i }).click();

        // Verify Round 1 Results
        await expect(page.getByText('Winners')).toBeVisible();
        // Check for "Next Round" button
        const nextButton1 = page.getByRole('button', { name: /Next Round/i });
        await expect(nextButton1).toBeVisible();
        await nextButton1.click();

        // ------------------ ROUND 2: First Prize (3 winners) ------------------
        // Verify Round 2 Setup
        await expect(page.getByText('一等奖')).toBeVisible(); // Assuming "一等奖" is the text for First Prize

        // Start Drawing Round 2
        await page.getByRole('button', { name: /START DRAW/i }).click();

        // Wait for animation
        await page.waitForTimeout(2000);

        // Stop Drawing Round 2
        await page.getByRole('button', { name: /STOP/i }).click();

        // Verify Round 2 Results
        await expect(page.getByText('Winners')).toBeVisible();

        // Go to next round
        const nextButton2 = page.getByRole('button', { name: /Next Round/i });
        await nextButton2.click();

        // ------------------ ROUND 3: Grand Prize (1 winner) ------------------
        // Verify Round 3 Setup
        await expect(page.getByText('特等奖')).toBeVisible(); // Assuming "特等奖" is Grand Prize

        // Start Drawing Round 3
        await page.getByRole('button', { name: /START DRAW/i }).click();

        // Wait for animation
        await page.waitForTimeout(2000);

        // Stop Drawing Round 3
        await page.getByRole('button', { name: /STOP/i }).click();

        // Verify Round 3 Results
        await expect(page.getByText('Winners')).toBeVisible();

        // ------------------ END: Show End Page ------------------
        // The last "Next Round" click goes to the End Page
        const finalButton = page.getByRole('button', { name: /Next Round/i });
        await expect(finalButton).toBeVisible();
        await finalButton.click();

        // Verify End Page is shown (not Home)
        await expect(page.getByText('THANK YOU')).toBeVisible();
        await expect(page.getByText('抽奖圆满结束')).toBeVisible();
        await expect(page.getByText('请中奖的同学前往')).toBeVisible();
        await expect(page.getByText('领奖区')).toBeVisible();
        // Verify Home page text is NOT shown
        await expect(page.getByText('Waiting for Activity')).not.toBeVisible();
    });
});
