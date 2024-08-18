import {NextResponse} from 'next/server';
import OpenAI from 'openai';

const systemPrompt = 'You are a flashcard creator. \
Return in the following JSON format \
{\
    "flashcards":[\
        {\
            "front": str, \
            "back": str, \
        } \
     ]\
}\ '

export async function POST(req) {
    const openai = new OpenAI();
    const data = await req.text()

    const completion = await openai.chat.completions.create({
        messages:[
            {role: 'system', content: systemPrompt},
            {role: 'user', content: data},
        ],
        model: "gpt-4o-mini",
        response_format: {type: 'json_object'}
    })

    const flashcards = JSON.parse(completion.choices[0].message.content)

    return NextResponse.json(flashcards.flashcards)

}