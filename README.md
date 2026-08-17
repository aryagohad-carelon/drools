# Drools 🤤

A community-driven food recommendation app for discovering great restaurants through trusted recommendations from people you know.

## Tech Stack

- **React 19** + TypeScript
- **Vite 8** (build tool)
- **Tailwind CSS v4** (styling)
- **React Router v7** (client-side routing)

## Getting Started

```bash
npm install
npm run dev
```

The app runs on `http://localhost:5173`.

## Project Structure

```
src/
├── types/          # TypeScript interfaces
├── constants/      # Design tokens, filter options
├── data/           # Mock seed data
├── context/        # RestaurantContext (global state)
├── components/
│   ├── ui/         # Avatar, CuisineTag, FilterChip, LikeButton, SearchBar, Modal
│   ├── cards/      # RestaurantCard (horizontal + vertical), SkeletonCard
│   ├── layout/     # AppShell, BottomNav
│   ├── states/     # EmptyState, SuccessState, NoResults
│   └── forms/      # AddRecommendationForm
└── screens/
    ├── HomeFeed.tsx
    ├── RestaurantDetail.tsx
    └── AddRecommendation.tsx
```

## Screens

| Route | Screen |
|-------|--------|
| `/` | Home Feed — hero, trending row, filters, vertical feed |
| `/restaurant/:id` | Restaurant Detail — hero, AI summary, community recs, sticky CTA |
| `/add` | Add Recommendation — form with validation + success state |

## What's Next

- Supabase backend integration (real persistence)
- Search Results screen
- Explore, Favorites, Profile screens
- Authentication
