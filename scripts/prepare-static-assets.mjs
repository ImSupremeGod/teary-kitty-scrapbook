import fs from "node:fs/promises";
import path from "node:path";

const origin = (process.env.LOVABLE_ASSET_ORIGIN || "https://teary-kitty-scrapbook.lovable.app").replace(/\/$/, "");
const assetDir = path.resolve("src/assets");
const publicDir = path.resolve("public/lovable-assets");

await fs.mkdir(publicDir, { recursive: true });
const names = (await fs.readdir(assetDir)).filter((name) => name.endsWith(".asset.json"));
if (names.length === 0) {
  console.log("No Lovable asset manifests found.");
  process.exit(0);
}

for (const name of names) {
  const manifestPath = path.join(assetDir, name);
  const manifest = JSON.parse(await fs.readFile(manifestPath, "utf8"));
  if (!manifest.url || !manifest.original_filename || !manifest.size) {
    throw new Error(`Invalid asset manifest: ${name}`);
  }

  const sourceUrl = new URL(manifest.url, origin);
  const response = await fetch(sourceUrl);
  if (!response.ok) {
    // This optional second track was added after the currently published
    // Lovable deployment, so its asset route can return 404 until republished.
    // Keep the playlist functional with the first track rather than fail all hosting.
    if (response.status === 404 && manifest.original_filename === "birthday-song-2.mp3") {
      manifest.url = "";
      await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2) + "\\n");
      console.warn(`Optional asset not published yet; skipping ${name}`);
      continue;
    }
    throw new Error(`Could not retrieve ${name}: HTTP ${response.status} from ${sourceUrl}`);
  }

  const bytes = Buffer.from(await response.arrayBuffer());
  if (bytes.length !== Number(manifest.size)) {
    throw new Error(`Size mismatch for ${name}: expected ${manifest.size}, received ${bytes.length}`);
  }

  const filename = path.basename(manifest.original_filename);
  await fs.writeFile(path.join(publicDir, filename), bytes);

  // The app imports these JSON manifests and reads the .url property.
  // Point it at the local copy so the deployed site does not depend on
  // Lovable's private/internal asset route.
  manifest.url = `/lovable-assets/${filename}`;
  await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2) + "\n");
  console.log(`Downloaded ${filename} (${bytes.length} bytes)`);
}
