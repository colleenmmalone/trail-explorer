const MountainBackground = () => (
  <div className="fixed inset-x-0 bottom-0 z-0 pointer-events-none overflow-hidden" style={{ height: "45vh" }}>
    <svg
      viewBox="0 0 1440 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      preserveAspectRatio="xMidYMax slice"
    >
      {/* Far range */}
      <path
        d="M0 400 L0 280 L120 200 L240 250 L360 170 L480 220 L600 140 L720 190 L840 130 L960 180 L1080 110 L1200 170 L1320 150 L1440 200 L1440 400Z"
        fill="hsl(var(--trail-dusk))"
        opacity="0.12"
      />
      {/* Mid range */}
      <path
        d="M0 400 L0 310 L100 260 L200 290 L320 220 L440 270 L520 200 L640 250 L760 190 L880 240 L1000 180 L1120 230 L1240 210 L1360 240 L1440 220 L1440 400Z"
        fill="hsl(var(--trail-lichen))"
        opacity="0.15"
      />
      {/* Near range */}
      <path
        d="M0 400 L0 340 L160 300 L280 330 L400 280 L520 310 L640 270 L760 300 L880 260 L1000 290 L1120 270 L1280 300 L1440 280 L1440 400Z"
        fill="hsl(var(--trail-moss))"
        opacity="0.18"
      />
      {/* Foreground hills */}
      <path
        d="M0 400 L0 370 L200 350 L400 360 L600 340 L800 355 L1000 345 L1200 360 L1440 350 L1440 400Z"
        fill="hsl(var(--trail-bark))"
        opacity="0.1"
      />
    </svg>
  </div>
);

export default MountainBackground;
