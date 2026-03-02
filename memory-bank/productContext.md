# Product Context

## Why This Project Exists
VIRT provides a dating/social matching experience embedded within Telegram, reducing friction by leveraging Telegram's user base and WebApp platform for instant access without app store installs.

## Problems It Solves
- Low entry barrier: users access the app directly from Telegram without registration
- Authentication handled via Telegram WebApp data (no passwords)
- Real-time matching and chat without leaving the Telegram ecosystem

## How It Works
1. User opens the Telegram bot or WebApp link
2. Profile is created/loaded using Telegram identity
3. User fills profile: name, date of birth, role, photo, description
4. User browses feed of profiles with infinite scroll
5. Like/dislike actions; mutual likes create matches
6. Matched users can invite each other to chat
7. Chat requests must be accepted before messaging begins
8. Real-time chat via WebSocket

## Pages (5 tabs)
- **Feed** — browse and like/dislike profiles
- **Likes** — see who liked you, like back for match
- **Matches** — mutual likes, invite to chat
- **Requests** — incoming chat invitations, accept/decline
- **Profile/Settings** — edit name, age, role, photo, description, visibility

## User Roles
Passive, Active, Universal, Uni-Passive, Uni-Active, Not Decided

## Planned Features
- **AI Companions**: AI-powered profiles that users can match and chat with, using LLM for conversation and pre-generated photos
- **Monetization via Telegram Stars**: Premium subscriptions, photo unlocks, super likes, boosts
- **Freemium funnel**: Free AI chat with teaser content → paid photo unlocks (15-25 Stars per photo, packs, monthly subscriptions)

## User Experience Goals
- Seamless Telegram integration (no separate login)
- Fast, responsive profile browsing with infinite scroll
- Instant real-time chat notifications
- Photo-centric profiles
- Clear empty states and loading indicators on all pages
