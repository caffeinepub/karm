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

const MAX_COMMENTS = 8;

interface ActiveComment {
  id: number;
  comment: CommentEntry;
  leftPercent: number;
  topPercent: number;
  bobOffset: number;
}

let globalIdCounter = 0;

export default function FloatingComments() {
  const [activeComments, setActiveComments] = useState<ActiveComment[]>([]);
  const commentIndexRef = useRef(0);
  // Track count via ref so spawn logic doesn't need activeComments in deps
  const activeCountRef = useRef(0);

  useEffect(() => {
    const spawnComment = () => {
      if (activeCountRef.current >= MAX_COMMENTS) return;

      const idx = commentIndexRef.current % COMMENTS.length;
      commentIndexRef.current += 1;

      const id = ++globalIdCounter;
      const leftPercent = 5 + Math.random() * 62;
      const topPercent = 10 + Math.random() * 72;
      const bobOffset = 6 + Math.random() * 8;

      activeCountRef.current += 1;
      setActiveComments((prev) => [
        ...prev,
        { id, comment: COMMENTS[idx], leftPercent, topPercent, bobOffset },
      ]);

      // Total: 0.8s fade-in + 2.5s hold + 0.8s fade-out = 4.1s
      setTimeout(() => {
        activeCountRef.current -= 1;
        setActiveComments((prev) => prev.filter((c) => c.id !== id));
      }, 4200);
    };

    // Staggered initial burst
    const initialDelays = [0, 600, 1300, 2100, 3000];
    const initialTimers = initialDelays.map((delay) =>
      setTimeout(spawnComment, delay),
    );

    // Continuous spawn every 2s
    const interval = setInterval(spawnComment, 2000);

    return () => {
      initialTimers.forEach(clearTimeout);
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
        zIndex: 10,
      }}
    >
      {activeComments.map((ac) => (
        <FloatingBubble key={ac.id} item={ac} />
      ))}
    </div>
  );
}

function FloatingBubble({ item }: { item: ActiveComment }) {
  const fadeAnimName = `karm-fade-${item.id}`;
  const bobAnimName = `karm-bob-${item.id}`;

  return (
    <>
      <style>{`
        @keyframes ${fadeAnimName} {
          0%   { opacity: 0; }
          19%  { opacity: 1; }
          80%  { opacity: 1; }
          100% { opacity: 0; }
        }
        @keyframes ${bobAnimName} {
          0%   { transform: translateY(0px); }
          50%  { transform: translateY(-${item.bobOffset}px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
      <div
        style={{
          position: "absolute",
          left: `${item.leftPercent}%`,
          top: `${item.topPercent}%`,
          animation: `${fadeAnimName} 4.1s ease-in-out forwards, ${bobAnimName} 3.2s ease-in-out infinite`,
          maxWidth: "260px",
          minWidth: "130px",
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
