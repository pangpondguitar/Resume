import fs from "node:fs";
import path from "node:path";
import Resume from "@/components/Resume";

// Drop a photo at public/profile.png (or .jpg) to replace the initials avatar.
const photo =
  ["profile.png", "profile.jpg"].find((f) =>
    fs.existsSync(path.join(process.cwd(), "public", f)),
  ) ?? null;

export default function Home() {
  return <Resume photo={photo ? `/${photo}` : null} />;
}
