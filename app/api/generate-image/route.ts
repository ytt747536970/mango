import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "请提供图片提示词" },
        { status: 400 }
      );
    }

    // 使用Gemini 2.5 Flash Image生成图片
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-image",
    });

    const result = await model.generateContent({
      contents: [{
        role: "user",
        parts: [{
          text: `Generate a manga/comic style image: ${prompt}. Style: Japanese manga art with clean lines, expressive characters, and vivid details.`
        }]
      }],
      generationConfig: {
        temperature: 0.4,
        candidateCount: 1,
      },
    });

    const response = await result.response;

    // 检查是否有生成的图片
    if (response.candidates && response.candidates[0].content.parts) {
      const parts = response.candidates[0].content.parts;

      // 查找图片数据
      for (const part of parts) {
        if (part.inlineData) {
          // 返回base64编码的图片
          const imageUrl = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
          return NextResponse.json({ imageUrl });
        }
      }
    }

    // 如果没有生成图片,返回错误
    throw new Error("Gemini 2.5 Flash Image未返回图片数据");

  } catch (error: any) {
    console.error("图片生成失败:", error);
    return NextResponse.json(
      { error: error.message || "图片生成失败" },
      { status: 500 }
    );
  }
}
