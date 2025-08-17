# JobHuntly User Site

User site của nền tảng tuyển dụng **JobHuntly**, dành cho ứng viên và nhà tuyển dụng. Ứng dụng được xây dựng với **Next.js App Router**, tích hợp **Redux Toolkit**, **Zustand**, cấu trúc theo domain-driven feature, sử dụng **TailwindCSS** và thư viện UI **ShadCN/UI**.

---

## 🧱 Tech Stack

- **Framework**: Next.js (App Router, JavaScript)
- **UI**: Tailwind CSS, shadcn/ui
- **State Management**: Redux Toolkit, RTK Query, Zustand
- **Validation**: Yup, React hook form
- **API Communication**: Axios
- **Icon Library**: Lucide react

---

## 🚀 Scripts

| Command         | Mục đích                   |
| --------------- | -------------------------- |
| `npm run dev`   | Chạy ứng dụng local        |
| `npm run build` | Build production           |
| `npm start`     | Start server sau khi build |
| `npm run lint`  | Kiểm tra lint              |

---

## 📁 Folder Structure

```bash
src/
├── app/                # App Router entry (route-based folders)
│   ├── (auth)/         # Đăng nhập/đăng ký chung
│   ├── (user)/         # Toàn bộ tính năng cho user (candidate + recruiter)
│   ├── job-detail/     # Chi tiết job (route động [id])
│   └── recruiter/     # Tính năng riêng cho recruiter
│
├── components/         # Reusable UI + layout components
│   ├── auth/           # Form login/register cho ứng viên và recruiter
│   ├── home/           # Các section trên homepage
│   ├── layout/         # Header, Footer, Sidebar layout
│   └── ui/             # Button, Input, Modal, Card, Toast...
│
├── features/           # State management (Redux slices, RTK Query)
│   ├── auth/           # authSlice, authApi
│   └── profile/        # profileSlice
│
├── hooks/              # Custom hooks (ex: useAuth, useScroll)
├── lib/                # Cấu hình store, API base, utils
├── services/           # API service functions
├── store/              # Zustand stores + slices dùng chung
├── styles/             # Tailwind CSS (globals.css)
├── constants/          # appConstant, enums, role định danh
├── validation/         # Zod schema validation
└── assets/             # Hình ảnh static
```

---

## 🌍 App Routing theo domain

- **(auth)**: Login/Register cho cả ứng viên và recruiter
- **(user)**: Domain chính của user – bao gồm `candidate`, `profile`, `dashboard`, `jobInvitation`, `jobs`, `settings`, `notifications`, ...
- **recruiter**: Đăng job, pricing, quản lý job của nhà tuyển dụng
- **job-detail/\[id]**: Route chi tiết một công việc

---

## 🔐 Authentication

- Sử dụng `authSlice` (Redux Toolkit) và `zustand/authStore`
- Token được lưu bằng cookies (JWT)
- Có middleware ở `app/middleware.js` để redirect nếu chưa login

---

## 📦 Feature Modules (Domain)

Ví dụ `app/(user)/candidate/`:

```bash
app/(user)/candidate/
├── dashboard/page.jsx              # Trang chính dashboard
├── profile/manage-cv/page.jsx     # Quản lý CV
├── jobInvitation/                 # Thư mời, phỏng vấn
│   ├── archived/page.jsx
│   ├── received/page.jsx
│   └── interview/page.jsx
└── components/                    # Component layout, section riêng
```

---

## 📌 Ghi chú phát triển

- Component UI nên nằm trong `components/ui/` hoặc `components/layout/` nếu dùng lại nhiều nơi.
- Tránh import chéo giữa các domain `candidate`, `recruiter`, `company`, v.v. để dễ maintain.
- Tối ưu hiệu năng với `memo`, `useMemo`, `useCallback`, lazy loading route/component.

---

## 👥 Đóng góp

- Mỗi domain/tính năng nên đi kèm:

  - `components/`
  - `page.jsx`
  - `layout.jsx` nếu cần nested layout
  - Zustand store hoặc Redux slice (nếu cần global state)

---

## 🧪 Testing (sắp tới)

- Kế hoạch tích hợp `Playwright` hoặc `Jest` cho unit test UI và end-to-end test

---

## 📎 Ghi chú khác

- Cập nhật cấu trúc trong README.md nếu thêm domain mới
- Code phải lint & format trước khi push lên `main`
