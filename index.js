import express from "express";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// === API pour recevoir les données du plugin Lua ===
app.post("/status", (req, res) => {
    const secret = req.body.secret || "";
    if (secret !== "monsecret123") {
        return res.status(403).send("Forbidden");
    }

    const online = req.body.online || "false";
    const players = req.body.players || "0";
    const max = req.body.maxPlayers || "0";
    const map = req.body.map || "unknown";

    // On prépare un fichier lisible pour Bot Designer
    const data = `${online}|${players}|${max}|${map}`;

    // On renvoie directement la réponse
    res.send(data);
});

app.get("/status.txt", (req, res) => {
    res.send("OFFLINE|0|0|unknown"); // fallback si jamais le POST n'a rien envoyé
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API en ligne sur port ${PORT}`));
