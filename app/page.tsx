"use client";

import { useState } from "react";

export default function Home() {
  const [script, setScript] = useState("");
  const [scenes, setScenes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!script.trim()) {
      alert("请输入剧本内容");
      return;
    }

    setLoading(true);
    try {
      // 调用分镜API
      const storyboardResponse = await fetch("/api/storyboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ script }),
      });
      const storyboardData = await storyboardResponse.json();

      // 为每个场景生成图片
      const generatedScenes = await Promise.all(
        storyboardData.scenes.map(async (scene: any) => {
          try {
            const imageResponse = await fetch("/api/generate-image", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ prompt: scene.imagePrompt }),
            });
            const imageData = await imageResponse.json();

            return {
              ...scene,
              imageUrl: imageData.imageUrl || null,
            };
          } catch (err) {
            console.error("图片生成失败:", err);
            return {
              ...scene,
              imageUrl: null,
            };
          }
        })
      );

      setScenes(generatedScenes);
    } catch (error) {
      console.error("生成失败:", error);
      alert("生成失败,请重试");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-8 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100">
          剧本转漫画生成器
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 输入区域 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-200">
              输入剧本
            </h2>
            <textarea
              value={script}
              onChange={(e) => setScript(e.target.value)}
              placeholder="在这里输入你的剧本...&#10;&#10;示例:&#10;场景1: 小明走在放学的路上,天空突然下起了雨。&#10;小明: '糟糕,忘记带伞了!'&#10;&#10;场景2: 小红撑着伞走过来。&#10;小红: '小明,我们一起走吧!'"
              className="w-full h-96 p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            />
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="mt-4 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 shadow-md"
            >
              {loading ? "生成中..." : "生成漫画"}
            </button>
          </div>

          {/* 预览区域 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-200">
              漫画预览
            </h2>
            <div className="space-y-6 overflow-y-auto max-h-[600px]">
              {scenes.length === 0 ? (
                <div className="text-center text-gray-500 dark:text-gray-400 py-20">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="mt-4">还没有生成的漫画</p>
                </div>
              ) : (
                scenes.map((scene, index) => (
                  <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="font-semibold text-sm text-gray-600 dark:text-gray-400 mb-2">
                      场景 {index + 1}
                    </div>
                    {scene.imageUrl ? (
                      <img
                        src={scene.imageUrl}
                        alt={`场景 ${index + 1}`}
                        className="w-full rounded-lg mb-3"
                      />
                    ) : (
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-lg mb-3 p-8 text-center">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          图片生成功能开发中...
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                          提示词: {scene.imagePrompt}
                        </p>
                      </div>
                    )}
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      {scene.description}
                    </p>
                    {scene.dialogue && (
                      <div className="mt-2 bg-gray-100 dark:bg-gray-700 p-2 rounded">
                        <p className="text-sm italic text-gray-600 dark:text-gray-400">
                          "{scene.dialogue}"
                        </p>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
