---
name: Unified play button for audio + auto-scroll teleprompter
description: Pattern for driving two independent React hooks (audio playback, auto-scroll) from one play/pause control without them drifting out of sync.
---

When a single "play" button is meant to start/stop two independently-implemented systems (e.g. an `<audio>`
element via a custom hook, and a `requestAnimationFrame`-driven auto-scroll hook), simply toggling both states
together on click is not enough — one can fail asynchronously (e.g. `audio.play()` promise rejects due to
autoplay policy) while the other keeps running, leaving them desynced.

**Why:** `HTMLMediaElement.play()` returns a promise that can reject (autoplay restrictions, missing user
gesture, decoding errors). If only the click handler sets both states optimistically, a play() rejection leaves
audio paused but auto-scroll still running.

**How to apply:** Keep the audio hook as the source of truth for whether playback is actually happening (update
its `isPlaying` state in the `.catch()` of `play()`, and also on the native `pause` event to catch external
pauses). Then add a small effect in the consuming component: `useEffect(() => { if (!audioPlaying &&
isAutoScrolling) toggleAutoScroll(); }, [audioPlaying])`. This lets the audio hook's real state pull the scroll
state back into sync whenever they diverge, instead of trusting the initial click-time toggle. Applied in the
Durga Chalisa app's teleprompter + aarti-audio player.
