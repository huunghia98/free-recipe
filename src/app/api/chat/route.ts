import { GEMINI_KEY } from '@/constant/env';
import {
  Content,
  GenerationConfig,
  GoogleGenerativeAI,
} from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const aiClient = new GoogleGenerativeAI(GEMINI_KEY);
  const model = aiClient.getGenerativeModel({ model: 'gemini-pro' });
  const data: { message: string; role: 'user' | 'model' }[] =
    await request.json();
  const history: Content[] = normalize(data);
  const config: GenerationConfig = {
    maxOutputTokens: 2000,
  };
  try {
    const result = await model.generateContent({
      contents: history,
      generationConfig: config,
    });
    return NextResponse.json({ data: result.response.text() }, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: 'Busy' }, { status: 200 });
  }
}

const MAX_WORDS_CONTEXT = 2000;
function normalize(
  context: { message: string; role: 'user' | 'model' }[]
): Content[] {
  // ensure role turn by turn, if some errors occur
  const stack: Content[] = [];
  context.forEach((item) => {
    const role = item.role === 'user' ? 'user' : 'model';
    const content: Content = { role, parts: [{ text: item.message }] };

    if (stack.length === 0 || stack[stack.length - 1].role !== role) {
      stack.push(content);
    } else {
      // Merge parts if roles match
      stack[stack.length - 1].parts.push(...content.parts);
    }
  });

  let words = 0;
  for (let index = stack.length - 1; index >= 0; index--) {
    words += stack[index].parts
      .flatMap((r) => r.text!.split(' ').length)
      .reduce((p, c) => p + c, 0);
    if (words > MAX_WORDS_CONTEXT) {
      return stack.slice(index);
    }
  }
  if (stack[0].role === 'user') {
    stack[0].parts[0].text =
      `You are Recipeer Master Chef, who know all about cooking and recipes. ` +
      stack[0].parts[0].text;
  } else {
    stack.unshift({
      role: 'user',
      parts: [
        {
          text: `You are Recipeer Master Chef, who know all about cooking and recipes`,
        },
      ],
    });
  }

  return stack;
}
