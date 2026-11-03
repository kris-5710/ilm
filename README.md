# FESTORA – Feel the Music. Live the Moment.

A premium, cinematic concert, music festival, and live entertainment discovery and event registration platform built with semantic HTML5, modern CSS3, and vanilla JavaScript.

---

## 1. Project Overview & Vision

**FESTORA** is an immersive digital discovery platform engineered to capture the electrifying energy of live music festivals, stadium tours, and underground electronic events. It rejects the generic white-and-gray corporate event template in favor of an authentic dark festival aesthetic: deep obsidian black backgrounds, high-contrast typography, electric orange accents, and cinematic concert photography.

- **Tagline:** *Feel the Music. Live the Moment.*
- **Core Concept:** Discover concerts. Explore artists. Experience festivals.

---

## 2. Visual Reference Mapping

The design system and component architecture directly implement the 15 visual references from the official FESTORA Design Reference Suite:

| Reference | Source Inspiration | FESTORA Implementation |
|---|---|---|
| **Ref 1** | Dark festival dashboard, calendar grid, live status tags | Dark surface palette, live badges, event metadata layout |
| **Ref 2** | Poster hero with tape/polaroid graphics, bold stencil headings | Festival branding, dynamic typography hierarchy |
| **Ref 3** | "Drayen" artist tour page & schedule table | Event details tour timetable, stage schedule |
| **Ref 4** | Cinematic golden concert crowd hero with orange pill CTA | **Homepage Primary Hero Section** |
| **Ref 5** | High-contrast lineup, QR code ticket badge, notification banner | Featured artists showcase, QR code pass, newsletter module |
| **Ref 6** | "SONORA" live countdown pill, audio wave, attendee stats | **Featured Festival Countdown Section** |
| **Ref 7 & 8** | Dark glass navbar, search bar with location, popular event cards | **Sticky Navigation Bar** and **Upcoming Events Cards** |
| **Ref 9** | Venue seating chart, stage arcs, FAQ accordion | Event details seating diagram and interactive FAQ |
| **Ref 10** | "PHASES FESTIVAL 2025" multi-stage timetable | Stage-by-stage schedule table (Solar, Aurora, Lunar) |
| **Ref 11** | "KLANG THERAPIE" countdown timer & festival artwork | Live ticking JS countdown digit boxes |
| **Ref 12** | "THE LINE UP" high-contrast editorial artist grid | **Artists Directory** and Lineup Grid |
| **Ref 13** | Festival artist multi-filter dropdown bar & live badges | **Explore Events** search & dynamic filter suite |
| **Ref 14** | Neon-framed 6-category photographic tiles | **Homepage Browse by Category Section** |
| **Ref 15** | High-resolution concert crowd & stage lights | Full-bleed hero & background photography |

---

## 3. Global Design System

### 3.1 Color Palette
- **Main Background (`#090909`)**: Obsidian Black
- **Secondary Background (`#151515`)**: Charcoal Surface
- **Card Background (`#1A1A1A`)**: Elevated Card Surface
- **Primary Accent (`#FF542E`)**: Electric Orange
- **Secondary Accent (`#9D4EDD`)**: Neon Purple
- **Alert / Accent (`#E63946`)**: Crimson Red
- **Primary Text (`#F5F5F5`)**: Off-white (High Contrast)
- **Secondary Text (`#A0A0A0`)**: Muted Cool Gray
- **Borders & Dividers (`#292929`)**: Subtle Dark Stroke

### 3.2 Typography
- **Headings:** `Space Grotesk`, sans-serif (Bold, geometric, controlled letter-spacing)
- **Display Numbers / Badges:** `Bebas Neue`, sans-serif (Oversized festival countdown digits)
- **Body & UI Text:** `Inter`, sans-serif (Clean, readable, 1.6 line height)

---

## 4. Directory Structure

```
FESTORA/
├── index.html              # Homepage
├── events.html             # Explore Events with live search & filters
├── event-details.html      # Individual Event Details & Stage Schedule
├── bookings.html           # My Bookings Dashboard (localStorage persistence)
├── artists.html            # Artists Directory
├── about.html              # Brand Story & Contact Page
├── css/
│   ├── style.css           # Global design system, variables, layouts
│   ├── responsive.css      # Mobile, tablet, desktop breakpoints
│   └── animations.css      # Smooth transitions, glows, keyframes
├── js/
│   ├── main.js             # Navigation, scroll behaviors, countdown timer
│   ├── events.js           # Event catalog data, search, filter, sort logic
│   ├── event-details.js    # Event detail renderer & ticket tier selector
│   ├── registration.js     # Form validation, ticket calculator, confirmation
│   ├── storage.js          # localStorage CRUD helpers
│   └── bookings.js         # My Bookings dashboard management & cancellation
└── assets/
    ├── images/
    │   ├── hero/           # Hero banners
    │   ├── events/         # Event posters
    │   ├── categories/     # Category tiles
    │   ├── artists/        # Artist portraits
    │   └── backgrounds/    # Section backgrounds
    └── icons/              # Scalable SVG icons
```

---

## 5. Development Milestones

1. **Milestone 1**: Project Setup, Folder Architecture, Local Asset Library & README (Current)
2. **Milestone 2**: Global Design System & Base Styling
3. **Milestone 3**: Navigation Bar Component
4. **Milestone 4**: Homepage Cinematic Hero Section
5. **Milestone 5**: Homepage Upcoming Events Grid
6. **Milestone 6**: Homepage Categories & Featured Artists
7. **Milestone 7**: Featured Festival Live Countdown Banner & Global Footer
8. **Milestone 8**: Explore Events Page (Dynamic Search & Filters)
9. **Milestone 9**: Individual Event Details Page
10. **Milestone 10**: Registration Flow & Form Validation
11. **Milestone 11**: My Bookings Dashboard (Stored Registrations & Cancellation)
12. **Milestone 12**: Artists Directory Page
13. **Milestone 13**: About Page & Contact Form
14. **Milestone 14**: Scroll Animations & Micro-interactions
15. **Milestone 15**: Comprehensive Responsive Verification
16. **Milestone 16**: Cross-browser Testing & Performance Verification
17. **Milestone 17**: Final README & Git Repository Finalization
18. **Milestone 18**: Live Deployment
