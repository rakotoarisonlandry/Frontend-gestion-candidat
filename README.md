# Frontend - Gestion de Candidats

## Description

Application React permettant la gestion des candidats avec interface moderne, validation et génération PDF.

---

## Stack technique

* React + TypeScript
* React Query
* React Router
* Axios
* Tailwind CSS
* Playwright (E2E)
* Vitest + Testing Library

---

## Installation

### 1. Cloner le projet

```bash
git clone <repo-frontend>
cd frontend-gestion-candidat
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configurer `.env`

```env
VITE_API_URL=https://backend-gestion-candidat.onrender.com/api
```

### 4. Lancer le projet

```bash
npm run dev
```

---

## Fonctionnalités

* Login JWT
* Liste candidats (filtre + pagination)
* Création / édition
* Page détail
* Validation async
* Suppression
* Export PDF

---

## Stratégie de tests

### tests unitaires

* Hooks + utils
* Vitest

```bash
npm run test
```

### Tests d’intégration

* MSW (Mock API)

### Tests E2E (Playwright)

#### Scénario :

* Login
* Création candidat
* Validation
* Vérification affichage

#### Lancer :

```bash
npm run test:e2e
```

---

## Capture automatique

Dans 
 ├── test-results/
     ├── app-page-loads
en version png 


---

## UX/UI

* Loading states
* Gestion erreurs
* Notifications
* Design moderne (Tailwind)

---

## Déploiement

👉 https://frontend-gestion-candidat.onrender.com

---

## Structure

```
src/
 ├── pages/
 ├── components/
 ├── api/
 ├── hooks/
 ├── mocks/
 ├── types/
 ├── services/
 └── utils/
 └── App.tsx
```

---

## CI/CD

* GitHub Actions :

  * Tests automatiques
  * Coverage
  * Blocage si échec

---

## Points forts

* UX fluide
* Architecture claire
* Tests E2E
* Export PDF (différenciation)

---

## Bonus

* Gestion erreurs API centralisée
* Token auto (interceptors Axios)

---
