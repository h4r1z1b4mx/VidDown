"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainRouter = void 0;
const express_1 = require("express");
const child_process_1 = require("child_process");
const router = (0, express_1.Router)();
router.get("/fetch-info", (req, res) => {
    const videoURL = req.query.url;
    res.setHeader("Content-Disposition", 'attachment; filename="video.mp4"');
    const ytdlp = (0, child_process_1.spawn)("yt-dlp", ["-f", "best", "-o", "-", videoURL]);
    ytdlp.stdout.pipe(res);
    ytdlp.stderr.on("data", (data) => {
        console.error(`Error: ${data}`);
    });
    ytdlp.on("close", () => {
        console.log("Download complete");
    });
});
router.get('/download', (req, res) => {
    res.json({
        msg: "Downloaded"
    });
});
router.get('/history', (req, res) => {
    res.json({
        msg: "history"
    });
});
exports.mainRouter = router;
