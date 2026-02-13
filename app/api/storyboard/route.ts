import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(request: NextRequest) {
  try {
    const { script } = await request.json();

    if (!script) {
      return NextResponse.json(
        { error: "请提供剧本内容" },
        { status: 400 }
      );
    }

    // 使用Gemini 2.5 Flash分析剧本并生成分镜
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `你是一个专业的漫画分镜师。你的任务是将用户提供的剧本分解成多个漫画场景。

对于每个场景,请提供:
1. description: 场景描述
2. dialogue: 对话内容(如果有)
3. imagePrompt: 用于生成图片的详细英文提示词(包含画风、角色、动作、背景等)

请以JSON格式返回,格式如下:
{
  "scenes": [
    {
      "description": "场景描述",
      "dialogue": "角色对话",
      "imagePrompt": "detailed image generation prompt in English, manga style, ..."
    }
  ]
}

画风要求: 日式漫画风格,清晰的线条,表情生动

用户剧本:
${script}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // 尝试从响应中提取JSON
    let parsedResult;
    try {
      // 移除可能的markdown代码块标记
      const cleanedText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      parsedResult = JSON.parse(cleanedText);
    } catch (e) {
      // 如果解析失败,尝试找到JSON部分
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsedResult = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("无法解析Gemini返回的JSON格式");
      }
    }

    return NextResponse.json(parsedResult);
  } catch (error: any) {
    console.error("分镜生成失败:", error);
    return NextResponse.json(
      { error: error.message || "分镜生成失败" },
      { status: 500 }
    );
  }
}
