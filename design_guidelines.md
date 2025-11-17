# Design Guidelines: Patient Health Records Management System

## Design Approach

**Selected System**: Material Design with Healthcare Specialization
**Rationale**: Medical applications demand clarity, trustworthiness, and information density. Material Design provides robust patterns for data-heavy interfaces while maintaining professional aesthetics suitable for healthcare environments.

**Core Principles**:
- Clinical precision: Clear hierarchy and unambiguous information presentation
- Efficiency-first: Minimize clicks to critical patient data
- Professional trust: Clean, authoritative visual language appropriate for medical settings

---

## Typography

**Font Family**: 
- Primary: Inter (clean, highly legible for data)
- Monospace: JetBrains Mono (for patient IDs, medical codes)

**Hierarchy**:
- Page Titles: text-3xl font-bold (Dashboard headers, "Patient History")
- Section Headers: text-xl font-semibold (Medical records sections, form groups)
- Card Titles: text-lg font-medium (Patient names, doctor names)
- Body Text: text-base font-normal (Medical descriptions, notes)
- Metadata: text-sm font-medium (Timestamps, hospital details)
- Labels: text-xs font-semibold uppercase tracking-wide (Form labels, status badges)

---

## Layout System

**Spacing Scale**: Use Tailwind units of 2, 4, 6, 8, 12, 16
- Component padding: p-6
- Section spacing: gap-8, space-y-8
- Card margins: m-4
- Tight groupings: gap-2

**Grid Structure**:
- Dashboard cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Patient records list: Single column with expansion panels
- Search results: grid-cols-1 gap-4 with stacked cards
- Hospital upload forms: Two-column layout (form left, preview right) on desktop

---

## Component Library

### Navigation & Layout
- **Sidebar Navigation**: Persistent left sidebar (width 64) with role-specific menu items, user profile at top, logout at bottom
- **Top Bar**: Hospital/clinic branding, search bar (prominent), notifications icon, user avatar dropdown
- **Dashboard Cards**: Elevated cards with icon, metric number, label, and subtle action link

### Data Display
- **Patient Record Cards**: 
  - Header: Patient name (text-lg font-semibold), ID (text-sm monospace), age/gender metadata
  - Body: Timeline of medical events with left border indicating hospital
  - Emergency alerts: Full-width banner with icon and color-coded borders
  - Media thumbnails: Grid of attached documents/scans with preview icons

- **Medical Timeline**: Vertical timeline with date markers, hospital badges, expandable entries showing full details

- **Risk Alert Badges**: 
  - Use border-l-4 on cards with semantic indicators
  - Icons prefix alert text
  - Full-width banners for critical alerts in record detail view

### Forms & Inputs
- **Login/Register**: Centered card (max-w-md), role selector as segmented control, fields with floating labels
- **Search Interface**: Prominent search bar with filters (tabs for ID/Name/Phone), recent searches below
- **Upload Forms**: Multi-step with progress indicator, drag-drop zone for media, preview section
- **Profile Edit**: Two-column form (personal info left, medical metadata right)

### Actions & Controls
- **Primary Actions**: Solid buttons (Download PDF, Save Record, Upload Document)
- **Secondary Actions**: Outlined buttons (Edit, Add Note, Cancel)
- **Icon Buttons**: For delete, expand/collapse, download individual files
- **Tabs**: For switching between patient overview, full history, documents, notes

### Specialized Components
- **Face Recognition Demo**: 
  - Video preview window with overlay frame
  - Matched patient card slides in from right
  - Success animation with checkmark
  
- **AI Summarization Panel**: 
  - Collapsible side panel or modal
  - Loading state with skeleton
  - Summary text with sections (Chief Complaints, Diagnoses, Treatments, Recommendations)
  - Download button at bottom

- **Edit Timer Badge**: Countdown display for hospital uploads (shows "Editable for: 47 min" with progress ring)

---

## Page Layouts

### Doctor Dashboard
- Top metrics row: Total patients, recent cases, pending reviews
- Search bar (prominent, centered)
- Recent patient cards grid below
- Quick access to face recognition demo button

### Patient History View
- Left: Patient info card (sticky)
- Right: Scrollable timeline of medical records
- Floating action buttons: Download PDF, Add Note, AI Summary

### Hospital Upload Interface
- Stepper navigation (Patient Selection → Record Details → Media Upload → Review)
- Form sections clearly separated
- Real-time validation
- Edit timer prominent in header

### Patient Portal
- Hero section: Welcome message with last visit summary
- Profile card with edit option
- Medical history cards (chronological, most recent first)
- Download all records button

---

## Images & Media

**No hero images required** - This is a data-centric application where information takes precedence over marketing visuals.

**Media Usage**:
- Hospital logos in sidebar and record headers
- Doctor profile photos (circular avatars, 40x40px in lists, 80x80px in detail)
- Patient photos for face recognition demo (rectangular frames with overlay guides)
- Medical document thumbnails with file type icons (PDF, JPG indicators)
- Placeholder illustrations for empty states ("No records found", "Upload your first document")

---

## Accessibility & Standards

- All form inputs have visible labels and proper ARIA labels
- Color-coded alerts must also have icons (not color alone)
- Focus states clearly visible on all interactive elements
- Keyboard navigation fully supported
- Screen reader announcements for status changes
- High contrast ratios for medical data readability

---

## Animation & Interactions

**Minimal, purposeful animations only**:
- Card hover: Subtle lift (shadow increase)
- Loading states: Skeleton screens for data fetching
- Success confirmations: Brief checkmark animation (500ms)
- Panel transitions: Smooth slide (300ms ease-in-out)
- **No decorative animations** - maintain clinical seriousness