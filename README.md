### 1. **Install dependencies**

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 2. **Run the development server**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠 Features

- **Admin Dashboard** at `/admin`

  - Create, edit, and delete posts (with rich text editor)
  - Posts list is scrollable and updates instantly (local state simulates CRUD)
  - Modern UI with shadcn/ui and TailwindCSS

- **Public Site** at `/`
  - View list of posts with excerpts
  - Click a post to view details at `/posts/[id]`

---

## 📦 Tech Stack

- [Next.js](https://nextjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [React Query](https://tanstack.com/query/latest)
- [jsonplaceholder API](https://jsonplaceholder.typicode.com/)

---

## 💡 Notes

- All CRUD operations are simulated in local state for demo purposes (jsonplaceholder does not persist changes).
- Toast notifications require the `<Toaster />` component, which is already included in the layout.
