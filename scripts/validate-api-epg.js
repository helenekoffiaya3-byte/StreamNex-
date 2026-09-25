const assert = require("node:assert/strict");
const { spawn } = require("node:child_process");
const path = require("node:path");
const fs = require("node:fs");

const port = 4317;
const tempDataDir = path.join(process.cwd(), ".tmp-api-epg-data");
fs.rmSync(tempDataDir, { recursive: true, force: true });
fs.mkdirSync(tempDataDir, { recursive: true });

process.env.STREAMLIVE_DATA_DIR = tempDataDir;
const { upsertProgram, addOccurrence } = require("../models/program-db");

const realStart = new Date(Date.now() - 30 * 60 * 1000).toISOString();
const realEnd = new Date(Date.now() + 60 * 60 * 1000).toISOString();
upsertProgram({
  programId: "epg-test-tf1-real",
  channelId: "tf1",
  title: "Programme EPG réel de test",
  type: "show",
  description: "Donnée injectée uniquement dans la base temporaire du test.",
  playbackUrl: null
});
addOccurrence("epg-test-tf1-real", {
  channelId: "tf1",
  startAt: realStart,
  endAt: realEnd,
  subtitle: null,
  seasonNumber: null,
  episodeNumber: null,
  description: "Donnée injectée uniquement dans la base temporaire du test.",
  poster: null,
  playbackUrl: null
});

const child = spawn(process.execPath, ["server.js"], {
  cwd: process.cwd(),
  env: {
    ...process.env,
    PORT: String(port),
    NODE_ENV: "test",
    EPG_SYNC_ON_START: "false",
    STREAMLIVE_DATA_DIR: tempDataDir,
    SOURCE_EPG_URL: "",
    EPG_USE_IPTV_ORG_GUIDES: "false"
  },
  stdio: ["ignore", "pipe", "pipe"]
});

let logs = "";
child.stdout.on("data", chunk => { logs += chunk.toString(); });
child.stderr.on("data", chunk => { logs += chunk.toString(); });

async function waitForServer() {
  const deadline = Date.now() + 15000;
  while (Date.now() < deadline) {
    try {
      return await fetch(`http://127.0.0.1:${port}/api/channels/a-plus-ivoire/programs`);
    } catch {
      await new Promise(resolve => setTimeout(resolve, 250));
    }
  }
  throw new Error("Serveur StreamLive non démarré dans les 15 secondes.");
}

(async () => {
  let exitCode = 0;
  try {
    const response = await waitForServer();
    assert.equal(response.status, 200);
    const body = await response.json();

    assert.equal(body.success, true);
    assert.equal(body.channelId, "a-plus-ivoire");
    assert.equal(body.programCount, 20);
    assert.equal(body.programs.length, 20);
    assert.equal(body.source, "synthetic-fallback");
    assert.equal(body.sourceDetail, "generated");
    assert.equal(body.occurrences.length, 0);
    assert.equal(body.programs[0].startTime, "06:00");
    assert.equal(body.programs.at(-1).endTime, "06:00");
    assert.equal(body.programs.every(item => item.streamEnabled === false), true);
    assert.equal(body.programs.every(item => item.timezone === "Africa/Abidjan"), true);

    const realResponse = await fetch(`http://127.0.0.1:${port}/api/channels/tf1/programs`);
    assert.equal(realResponse.status, 200);
    const realBody = await realResponse.json();
    assert.equal(realBody.success, true);
    assert.equal(realBody.channelId, "tf1");
    assert.equal(realBody.source, "real-epg-sync");
    assert.equal(realBody.sourceDetail, "sqlite");
    assert.equal(realBody.occurrences.length, 1);
    assert.equal(realBody.programs.length, 1);
    assert.equal(realBody.programs[0].programId, "epg-test-tf1-real");
    assert.equal(realBody.occurrences[0].programId, "epg-test-tf1-real");

    const notFound = await fetch(`http://127.0.0.1:${port}/api/channels/does-not-exist/programs`);
    assert.equal(notFound.status, 404);
    const errorBody = await notFound.json();
    assert.equal(errorBody.success, false);
    assert.match(errorBody.error, /Chaîne non trouvée/);

    const serialized = JSON.stringify(body);
    assert.equal(/password|secret|authorization|epg_sync_token/i.test(serialized), false);

    console.log("✅ API EPG valide: 200/20 programmes + 404 chaîne inconnue + absence de secrets.");
  } catch (error) {
    exitCode = 1;
    console.error("❌ Validation API EPG échouée:", error.message);
    if (logs) console.error(logs);
  } finally {
    child.kill("SIGTERM");
    setTimeout(() => {
      fs.rmSync(tempDataDir, { recursive: true, force: true });
      process.exit(exitCode);
    }, 500);
  }
})();
