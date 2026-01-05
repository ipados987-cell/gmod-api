import express from "express";
import fetch from "node-fetch";

const app = express();

// 🔒 CONFIG
const PTERO_API_KEY = "ptlc_vg1Ei7n8Ay6n2xfaZMKnRif3zQCqzhDX4c35DZ68D1F";
const PANEL_URL = "https://panel.syntrahost.com";
const SERVER_ID = "ab4e224d";

app.get("/gmod", async (req, res) => {
  try {
    const response = await fetch(
      `${PANEL_URL}/api/client/servers/${SERVER_ID}/resources`,
      {
        headers: {
          Authorization: `Bearer ${PTERO_API_KEY}`,
          Accept: "application/json"
        }
      }
    );

    if (!response.ok) {
      return res.json({ online: false });
    }

    const data = await response.json();

    res.json({
      online: data.attributes.current_state === "running",
      cpu: data.attributes.resources.cpu_absolute,
      ram: Math.round(data.attributes.resources.memory_bytes / 1024 / 1024)
    });

  } catch (err) {
    res.json({ online: false });
  }
});

app.listen(3000, () => {
  console.log("API en ligne");
});