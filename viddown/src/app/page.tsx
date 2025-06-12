"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import InputFeild from "@/components/InputFeild";
import { Nav } from "@/components/Nav";
import { Text } from "@/components/Text";
import { ThreeBackground } from "@/components/ui/Threebackground";

export default function Home() {
  const searchParams = useSearchParams();
  const [post, setPost] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const url = searchParams.get("url");

  useEffect(() => {
    const fetchPostData = async () => {
      if (!url) return;

      try {
        const res = await fetch("/api/download", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url }),
        });

        if (!res.ok) throw new Error("Failed to fetch post data");
        const data = await res.json();
        setPost(data);
      } catch (err: any) {
        setError(err.message || "Something went wrong.");
      }
    };

    fetchPostData();
  }, [url]);


  // console.log(post.data.image_medium_url);
  const media = post?.data?.media?.items?.[0];
  const video = media?.V_HLSV3_MOBILE;
  const videoUrl = video?.url || null;
  const videoThumbnail = video?.thumbnail || null;
  const thumbnail = post?.data?.image_medium_url;

  const imageThumbnails = post?.data?.thumbnails || {};
  const imageUrl =
    imageThumbnails["736x"]?.url ||
    imageThumbnails["564x"]?.url ||
    imageThumbnails["474x"]?.url ||
    imageThumbnails["orig"]?.url ||
    post?.data?.pinner?.image_medium_url;


const handleSubmit = async () => {
  try {
    const response = await fetch(thumbnail, { mode: "cors" });
    const blob = await response.blob();
    const downloadUrl = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = "pinterest-image.jpg";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(downloadUrl);
  } catch (err) {
    console.error("Image download failed:", err);
  }
};

  const title = post?.data?.title || "Media Preview";

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <p className="text-red-500 text-xl font-semibold">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Background */}
      <div className="absolute pt-13 inset-0 z-0">
        <ThreeBackground />
      </div>

      {/* Foreground content */}
      <div className="relative z-10 h-full w-full flex flex-col">
        <div className="h-[10%] w-full flex justify-between items-center p-10 px-15">
          <Nav />
        </div>

        <div className="h-[80%] w-full flex flex-col justify-start items-center gap-10 pt-15">
          <div className="w-[60%] text-center">
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
              Pinterest Media Downloader
            </h1>
            <Text />
          </div>

          <InputFeild />

          {url && post?.data && (
            <div className="bg-white dark:bg-gray-800 text-black dark:text-white p-6 rounded-lg shadow-lg w-[80%] max-w-4xl flex flex-col items-center gap-6">
              <h2 className="text-2xl font-bold mb-2 text-center">{title}</h2>

              {/* Priority: Video > Video Thumbnail > Image */}
              {videoUrl ? (
                <>
                  <video
                    className="w-full max-w-2xl rounded-lg"
                    controls
                    playsInline
                    poster={videoThumbnail}
                    src={videoUrl}
                  />
                  <a
                    href={videoUrl}
                    download
                    className="mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg"
                  >
                    Download Video (.m3u8)
                  </a>
                </>
              ) : videoThumbnail ? (
                <>
                  <img
                    src={videoThumbnail}
                    alt="Video Thumbnail"
                    className="w-full max-w-2xl rounded-lg"
                  />
                  <a
                    href={videoThumbnail}
                    download="video-thumbnail.jpg"
                    className="mt-4 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg"
                  >
                    Download Thumbnail
                  </a>
                </>
              ) : imageUrl ? (
                <><div className="w-full flex justify-center item-center gap-10">
                  <img
                    src={thumbnail}
                    alt="Pinterest Image"
                    className=" max-w-xl rounded-lg h-40"
                  />
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="h-12 p-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg"
                  >
                    Download Image
                  </button>
                  </div>
                </>
              ) : (
                <p className="text-red-500">No media found for this URL.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
