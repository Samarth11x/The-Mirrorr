# THE MIRRORR Unisex Hair & Beauty Studio - Full-Stack Website

A complete, working full-stack website for **THE MIRRORR Unisex Hair & Beauty Studio** in Bengaluru. Built with **React**, **TypeScript**, **Node.js with Express**, **Prisma**, and **PostgreSQL / SQLite**. 

The design combines the visual and landing-page editorial layout inspired by **Blown Premium Salon** (striking full-width imagery, minimal navigation, high-fashion typography, spacious editorial storytelling, mobile-first design) with **THE MIRRORR's 100% verified business identity and catalog data** extracted from `https://themirrorrunisexhairbeautysalon.nowfloats.com/all-services/1`.

---

## 1. Verified Business Details & Content Policy

| Business Attribute | Verified Reference Data | Implementation |
| :--- | :--- | :--- |
| **Salon Name** | **THE MIRRORR Unisex Hair & Beauty Studio** | Editorial wordmark & branding |
| **Address** | **B. No. 64, 1st Floor, Vinayaka Nagara, Hosa Road, near Sobha Silicon Oasis, Doddanagamangala Village, Naganathapura, Bengaluru, Karnataka 560100** | Stored in DB `SalonSetting`, rendered on header, about, contact cards, and map |
| **Coordinates** | **12.818598022474724, 77.74761579415772** | Interactive map embed + direct Google Maps directions |
| **Phone** | **+91 80883 23885** | Click-to-call & tap-to-call (`tel:+918088323885`) |
| **Email** | **themirrorr2024@gmail.com** | Click-to-email (`mailto:themirrorr2024@gmail.com`) |
| **WhatsApp** | `+91 80883 23885` | Direct chat action (`https://wa.me/918088323885`) |
| **Pricing Status** | Reference booking engine reported *"No Services available for booking."* No numeric prices are published on any service page. | Strictly displays **"Contact us for pricing"** (zero fabricated prices) |
| **Verified Services** | 1. **Women Hair Cut**<br>2. **Women Hair Color**<br>3. **Massage**<br>4. **Body Polishing** | 4 image-led cards with protocol detail modals |
| **Massage Styles** | Verified: Swedish, Deep Tissue, Hot Stone, Aromatherapy | Documented in full protocol and API |
| **Body Polishing** | Verified: 4 steps (Exfoliation &rarr; Hydration &rarr; Massage &rarr; Finishing Touches) | Documented in full protocol and API |
| **Hair Color Protocol** | Verified: 8 highlights (Consultation, Expertise, Range, Blending, Damage-Free, Correction, Longevity, Aftercare) | Documented in full protocol and API |
| **Bridal Offer** | Homepage contains *"₹20 OFF on Bridal makeup"*, but description is unedited Lorem Ipsum dummy text. | Transparently labeled as **"Sample / Demo Content from Reference Template"** |
| **Gallery** | 8 original studio interior & equipment photographs from withfloats CDN | Downloaded locally to `/assets/images/` with Lightbox |

---

## 2. Architecture & Tech Stack

```text
TM/
├── client/                      # Frontend (Vite + React + TypeScript)
│   ├── src/
│   │   ├── components/          # Header, Hero, Services, DetailModal, YourVisit, Gallery, About, Offers, Contact, Footer, MobileStickyBar
│   │   ├── pages/               # LandingPage, AdminLoginPage, AdminDashboard
│   │   ├── styles/              # editorial.css, admin.css
│   │   ├── types/               # TypeScript interfaces
│   │   ├── App.tsx              # View router (Landing, Admin Login, Admin Dashboard)
│   │   └── main.tsx
│   ├── dist/                    # Compiled production assets
│   ├── index.html
│   ├── vite.config.ts
│   └── tsconfig.json
├── server/                      # Backend (Node.js + Express + TypeScript + Prisma)
│   ├── src/
│   │   ├── middleware/          # auth.ts (JWT + HTTP-only cookies), validation.ts (Zod schemas & sanitization)
│   │   ├── routes/              # publicRoutes.ts (/api/settings, /services, /gallery, /enquiries), adminRoutes.ts (/api/admin/*)
│   │   ├── tests/               # api.test.ts (14 automated tests with Vitest & Supertest)
│   │   ├── index.ts             # Express app & static file server
│   │   ├── prisma.ts            # Prisma client singleton
│   │   ├── seed.ts              # Database seeder with verified salon data
│   │   └── createAdmin.ts       # CLI tool to create/update admin accounts securely
│   └── prisma/
│       ├── schema.prisma        # SQLite development schema (zero-setup out-of-the-box execution)
│       └── schema.postgresql.prisma # PostgreSQL production schema
├── assets/images/               # 14 authentic studio & branding image assets
├── data/reference_data.json     # Forensic JSON extraction of reference data
├── .env.example                 # Environment variables template
├── .env                         # Active configuration
├── vitest.config.ts             # Test runner configuration
└── package.json                 # Unified build, test, and execution scripts
```

---

## 3. Database Models (Source of Truth)

1. **`Service`**: `name`, `slug`, `category`, `description`, `detailedContent`, `price` (optional), `active`, `displayOrder`, `features` (JSON), `tags` (JSON).
2. **`Enquiry`**: `customerName`, `contactMethod`, `email`, `phone`, `selectedService`, `preferredTime`, `message`, `status` (`new` | `contacted` | `closed`), `notes`, `createdAt`.
3. **`GalleryItem`**: `imagePath`, `altText`, `category` (`ambience` | `hair` | `wellness`), `active`, `displayOrder`, `caption`.
4. **`SalonSetting`**: `salonName`, `tagline`, `address`, `phone`, `email`, `lat`, `lng`, `googleMapsUrl`.
5. **`AdminUser`**: `email`, `name`, `passwordHash` (bcrypt), `role`.

---

## 4. Local Setup & Quickstart Instructions

### Prerequisites
- **Node.js** v18+ (tested on Node.js v25)
- **npm** v9+

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Database Preparation & Seeding
The project is configured by default with SQLite (`DATABASE_URL="file:./dev.db"`) so that it runs immediately without requiring an external PostgreSQL daemon.
```bash
# Push schema and generate Prisma client
npm run prisma:generate
npm run prisma:push

# Seed the database with verified salon information & 4 core services
npm run db:seed
```

### Step 3: Run Automated Tests
Execute the 14-test suite covering public endpoints, validation, enquiry processing, and protected admin endpoints:
```bash
npm test
```

### Step 4: Run the Full-Stack Application

#### Option A: Production Mode (Recommended)
Builds the React client and serves everything from Express on a single port (`http://localhost:5000`):
```bash
# 1. Build frontend
npm run build

# 2. Start server
npm start
```
Visit **`http://localhost:5000`** in your browser.

#### Option B: Development Mode (Hot Reloading)
Runs the Express API on port 5000 and the Vite React dev server on port 5173 with automatic proxying:
```bash
npm run dev
```
Visit **`http://localhost:5173`** for live frontend development.

---

## 5. Admin Portal & Staff Management

Salon staff can manage enquiries, update customer follow-up statuses, edit service descriptions, and change contact coordinates through the protected Admin Dashboard.

### Creating an Admin Account
To avoid hardcoding credentials in git, create an admin account using the CLI tool:
```bash
npm run admin:create <email> <password> "<name>"

# Example:
npm run admin:create manager@themirrorr.com MySecurePassword123! "Studio Manager"
```

The database seeder also creates an initial local test account:
- **Email:** `themirrorr2024@gmail.com`
- **Password:** `Mirrorr@Admin2026!` *(change in production)*

### Accessing the Portal
1. Navigate to **`http://localhost:5000#admin`** (or click **"Staff Portal"** in the website header/footer).
2. Sign in with your admin credentials.
3. Once authenticated:
   - **Client Enquiries:** Filter by `new`, `contacted`, `closed`. Search by customer name or service. Update status with one click, write staff notes, or delete records.
   - **Services:** View active service listings and unpriced status.
   - **Gallery:** Inspect studio imagery and categories.
   - **Salon Settings:** Edit salon address, phone number, email, GPS coordinates, and Google Maps URL.
   - **Session Security:** Auth is enforced via HTTP-only secure cookies (`the_mirrorr_admin_token`) and server-side JWT verification.

---

## 6. Switching to PostgreSQL (Production Deployment)

To deploy with PostgreSQL:
1. Update `.env`:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/themirrorr?schema=public"
   ```
2. Copy the PostgreSQL schema:
   ```bash
   cp server/prisma/schema.postgresql.prisma server/prisma/schema.prisma
   ```
3. Run migrations and seed:
   ```bash
   npx prisma migrate dev --name init
   npm run db:seed
   ```

---

## 7. Verification & Anti-Fabrication Safeguards

- **No Online Payments / Fake Slots:** The booking engine on NowFloats stated "No Services available for booking." Submissions are therefore handled via a transparent **enquiry flow** rather than booking non-existent live calendar slots.
- **No Fabricated Pricing:** All services clearly display **"Contact us for pricing"** as no numeric rates are published by the salon.
- **No Fake Reviews or Awards:** The About section strictly uses verified text from the reference site regarding personalized attention, meticulous detail, client satisfaction, and holistic wellness.
- **Bridal Season Sale Disclosure:** The ₹20 offer found on the reference is prominently tagged as sample template content with an explanatory notice about its placeholder description.
