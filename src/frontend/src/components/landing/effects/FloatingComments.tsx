import { useEffect, useRef, useState } from "react";

interface CommentEntry {
  username: string;
  text: string;
}

const COMMENTS: CommentEntry[] = [
  { username: "@aadirajsonawane7428", text: "What is that?" },
  { username: "@aadirajsonawane7428", text: "App" },
  { username: "@ShriRam_Bhakt6", text: "What is the name of the app ??" },
  { username: "@ShriRam_Bhakt6", text: "Which app you used ? 😢" },
  { username: "@sunilkawade1231", text: "Which app" },
  { username: "@rangusandhya4043", text: "Which app?" },
  { username: "@goateeehexbtsxgg", text: "Nice" },
  { username: "@C9959-z9b", text: "Gl bro" },
  { username: "@C9959-z9b", text: "gotta lock in" },
  { username: "@BoomerangX-z2v", text: "Thankyou brooo 🫶🏼 bhot Aage jaoge" },
  {
    username: "@BoomerangX-z2v",
    text: "very Goodd Bro Helps me In focusing more on studies and not to get distracted",
  },
  {
    username: "@BoomerangX-z2v",
    text: "approximately 8-9 times in last 2 days",
  },
  { username: "@MansiSingh-j9g", text: "Which timer?" },
  { username: "@PrapurnaDas2", text: "Which app?" },
  { username: "@AtharvShukla-your", text: "❤❤❤❤❤❤❤❤❤❤❤❤" },
  { username: "@AtharvShukla-your", text: "Bhai bohot accha hia" },
  { username: "@davidGOGGINSsuiiiiiiii07", text: "All the best bhai❤" },
  { username: "@BansitaDas-x2h", text: "Konsa app❤" },
  { username: "@Iconicff-h8i2s", text: "But I downloaded it" },
  { username: "@user-io6kq2ef7d", text: "Which app" },
  { username: "@sarthakgameslover2619", text: "How to download it" },
];

interface ActiveComment {
  id: number;
  comment: CommentEntry;
  leftPercent: number;
  startY: number; // px from bottom
  duration: number; // ms
  spawnedAt: number; // timestamp
}

let globalIdCounter = 0;

export default function FloatingComments() {
  const [activeComments, setActiveComments] = useState<ActiveComment[]>([]);
  const commentIndexRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Spawn initial burst of comments spread across time
    const spawnComment = () => {
      const idx = commentIndexRef.current % COMMENTS.length;
      commentIndexRef.current += 1;

      const id = ++globalIdCounter;
      const leftPercent = 5 + Math.random() * 65; // keep within 5%–70% so it doesn't clip right edge
      const duration = 6000 + Math.random() * 4000; // 6–10s float up

      setActiveComments((prev) => [
        ...prev,
        {
          id,
          comment: COMMENTS[idx],
          leftPercent,
          startY: 0,
          duration,
          spawnedAt: Date.now(),
        },
      ]);

      // Remove comment after animation completes
      setTimeout(() => {
        setActiveComments((prev) => prev.filter((c) => c.id !== id));
      }, duration + 500);
    };

    // Spawn first few immediately with stagger
    const initialDelays = [0, 800, 1600, 2600, 3800, 5200];
    const initialTimers = initialDelays.map((delay) =>
      setTimeout(spawnComment, delay),
    );

    // Then spawn continuously
    const interval = setInterval(spawnComment, 2200);

    return () => {
      initialTimers.forEach(clearTimeout);
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 40,
        overflow: "hidden",
      }}
    >
      {activeComments.map((ac) => (
        <FloatingBubble key={ac.id} item={ac} />
      ))}
    </div>
  );
}

function FloatingBubble({ item }: { item: ActiveComment }) {
  const animName = `float-comment-${item.id}`;

  return (
    <>
      <style>{`
        @keyframes ${animName} {
          0% {
            transform: translateY(0px);
            opacity: 0;
          }
          8% {
            opacity: 1;
          }
          80% {
            opacity: 1;
          }
          100% {
            transform: translateY(-${Math.floor(window.innerHeight * 0.85)}px);
            opacity: 0;
          }
        }
      `}</style>
      <div
        style={{
          position: "absolute",
          bottom: "8%",
          left: `${item.leftPercent}%`,
          animation: `${animName} ${item.duration}ms ease-out forwards`,
          maxWidth: "260px",
          minWidth: "140px",
        }}
      >
        <div
          style={{
            background: "rgba(4, 8, 22, 0.78)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            border: "1px solid rgba(100, 150, 255, 0.22)",
            borderRadius: "12px",
            padding: "8px 12px",
            boxShadow:
              "0 2px 20px rgba(60, 100, 200, 0.15), 0 0 0 1px rgba(100,150,255,0.06)",
          }}
        >
          <span
            style={{
              display: "block",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.04em",
              color: "rgba(140, 195, 255, 0.92)",
              marginBottom: "3px",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            {item.comment.username}
          </span>
          <span
            style={{
              display: "block",
              fontSize: "13px",
              lineHeight: "1.4",
              color: "rgba(215, 230, 255, 0.88)",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            {item.comment.text}
          </span>
        </div>
      </div>
    </>
  );
}
