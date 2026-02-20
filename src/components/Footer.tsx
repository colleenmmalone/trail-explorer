import { Mountain } from "lucide-react";

const Footer = () => (
  <>
  {/* mountains  */}
    <div className="w-full inset-0 m-0 p-0 bottom-0 z-0 pointer-events-none" style={{ height: "45vh" }}>
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
          fill="hsl(var(--trail-purple))"
        />
        {/* Mid range */}
        <path
          d="M0 400 L0 310 L100 260 L200 290 L320 220 L440 270 L520 200 L640 250 L760 190 L880 240 L1000 180 L1120 230 L1240 210 L1360 240 L1440 220 L1440 400Z"

          fill="hsl(var(--trail-brown))"
        />
        {/* Near range */}
        <path
          d="M0 400 L0 340 L160 300 L280 330 L400 280 L520 310 L640 270 L760 300 L880 260 L1000 290 L1120 270 L1280 300 L1440 280 L1440 400Z"
          fill="hsl(var(--trail-green))"
          stroke="hsl(var(--trail-green))"
        />
      </svg>
    </div>

{/* footer  */}
    <div className="w-full min-h-[20vh] bg-primary items-start inset-0 inset-b-4 m-0 px-6 py-4 bottom-0 z-10 pointer-events-none flex ">
      <div className="flex flex-col sm:flex-row items-center gap-2 font-display text-3xl  text-background">
        <Mountain className="h-6 w-6" />
        <span className="inline">pebl</span>
        <span className="inline font-sans text-[18px] opacity-70">- trail explorer app using the NPS API</span>
      </div>

    </div>
  </>
);

export default Footer;
