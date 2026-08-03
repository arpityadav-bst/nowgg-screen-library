import { GAMES } from '@/lib/mock-data'

// Mock offers for the nowBux offerwall (Torox-style). Reuses real now.gg game icons; the
// reward / category / goals are fabricated placeholder data for the demo flow.
export type Goal = { n: number; label: string; reward: number }
export type Offer = {
  id: string
  title: string
  icon: string
  category: string
  completed: string
  reward: number
  blurb: string
  goals: Goal[]
}

const META = [
  { category: 'Hyper Casual', completed: '174K', reward: 2328 },
  { category: 'Casual', completed: '103K', reward: 5052 },
  { category: 'Puzzle', completed: '142K', reward: 1309 },
  { category: 'Puzzle', completed: '80K', reward: 1306 },
  { category: 'Casual', completed: '61K', reward: 980 },
  { category: 'Arcade', completed: '47K', reward: 1540 },
]

const GOALS: Goal[] = [
  { n: 1, label: 'Open and play the game', reward: 120 },
  { n: 2, label: 'Reach level 5', reward: 540 },
  { n: 3, label: 'Rank top 3 in a tournament', reward: 980 },
]

export const OFFERS: Offer[] = GAMES.slice(0, 6).map((g, i) => ({
  id: g.id,
  title: g.title,
  icon: g.icon,
  category: META[i].category,
  completed: META[i].completed,
  reward: META[i].reward,
  blurb: 'Play the game and complete the tasks to earn nowBux.',
  goals: GOALS,
}))

export const fmtBux = (n: number) => n.toLocaleString('en-US')
