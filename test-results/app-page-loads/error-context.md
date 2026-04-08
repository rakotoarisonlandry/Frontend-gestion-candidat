# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: app.spec.ts >> page loads
- Location: tests\e2e\app.spec.ts:3:1

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('text=Login')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('text=Login')

```

# Page snapshot

```yaml
- generic [ref=e5]:
  - generic [ref=e6]:
    - img [ref=e8]
    - heading "Connexion" [level=1] [ref=e11]
    - paragraph [ref=e12]: Accédez à votre espace recrutement
  - generic [ref=e13]:
    - generic [ref=e14]:
      - generic [ref=e15]: Adresse e-mail
      - textbox "vous@exemple.com" [ref=e16]: admin@test.com
    - generic [ref=e17]:
      - generic [ref=e18]: Mot de passe
      - textbox "••••••••" [ref=e19]: "1234"
  - button "Se connecter" [ref=e20]
```

# Test source

```ts
  1 | import { test, expect } from "@playwright/test";
  2 | 
  3 | test("page loads", async ({ page }) => {
  4 |   await page.goto("/");
  5 | 
> 6 |   await expect(page.locator("text=Login")).toBeVisible();
    |                                            ^ Error: expect(locator).toBeVisible() failed
  7 | });
```