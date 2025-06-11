import { Router,Request,Response } from "express";
import { spawn } from "child_process";

const router = Router();

router.get("/fetch-info", (req, res) => {
  const videoURL = req.query.url;

  res.setHeader("Content-Disposition", 'attachment; filename="video.mp4"');

  const ytdlp = spawn("yt-dlp", ["-f", "best", "-o", "-", videoURL as string]);

  ytdlp.stdout.pipe(res);

  ytdlp.stderr.on("data", (data) => {
    console.error(`Error: ${data}`);
  });

  ytdlp.on("close", () => {
    console.log("Download complete");
  });
}); 

router.get('/download',(req, res) => {
    res.json({
        msg:"Downloaded"
    });
});

router.get('/history',(req, res) => {
    res.json({
        msg:"history"
    });
});

export const mainRouter = router;