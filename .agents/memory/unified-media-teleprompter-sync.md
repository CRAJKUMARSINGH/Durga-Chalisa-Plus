---
name: Syncing a scrolling teleprompter to an audio track
description: How to keep auto-scroll speed locked to audio playback over long tracks, and why cross-syncing two independent play/pause states via effects backfires.
---

**Don't** drive a teleprompter with its own independent `requestAnimationFrame` timer (fixed px/sec) while audio
plays separately, and **don't** paper over drift/desync with a `useEffect` that force-stops one system whenever
the other's `isPlaying` state flips false.

**Why:** Two failure modes were hit in the Durga Chalisa app:
1. An independent px/sec scroll timer drifts from the audio's actual position over a ~20 minute track — there is
   no guarantee frame timing tracks real playback speed, and it ignores `playbackRate` changes entirely.
2. Cross-syncing via `useEffect(() => { if (!audioPlaying && isAutoScrolling) toggleAutoScroll() }, [audioPlaying])`
   is fragile: `audioPlaying` can flip false transiently (buffering stalls on a large file firing the native
   `pause` event, or a `play()` promise rejection on first click) and permanently kills the scroll even though
   the reader never asked it to stop.

**How to apply:** Make scroll position a *pure function* of live audio progress instead of an independently
clocked animation. Each RAF frame, read `audio.currentTime / audio.duration` (via a ref exposed from the audio
hook, not React state, since `timeupdate` only fires a few times a second) and set `scrollTop = ratio * maxScroll`
directly. This guarantees zero drift and automatically honors playback-rate changes since scroll derives from the
same clock as the audio. Separately, always allow native manual scrolling: detect reader-initiated scroll via the
container's `scroll` event (compare against the last value the RAF loop itself set, with a small pixel tolerance,
to tell manual from programmatic), pause auto-follow for a few seconds, then resume — and reset follow state to
`true` whenever playback starts/stops so a manual pause can never strand auto-follow off on the next play.
