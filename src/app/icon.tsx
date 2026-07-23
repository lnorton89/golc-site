import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <svg width={32} height={32} viewBox="0 0 100 100">
        <rect x="2" y="2" width="96" height="96" rx="22" fill="#17181C" />
        <polygon points="50,25 18.5,84 25.5,84" fill="#C0554A" />
        <polygon points="50,25 29.5,84 36.5,84" fill="#CC8A47" />
        <polygon points="50,25 40.5,84 47.5,84" fill="#B6A24C" />
        <polygon points="50,25 51.5,84 58.5,84" fill="#4E9E68" />
        <polygon points="50,25 62.5,84 69.5,84" fill="#1B44D9" />
        <polygon points="50,25 73.5,84 80.5,84" fill="#6A50A8" />
        <rect x="40" y="18" width="20" height="7" rx="3" fill="#F4F1EB" />
      </svg>
    ),
    { ...size }
  );
}
