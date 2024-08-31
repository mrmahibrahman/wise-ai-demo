import { NextResponse } from "next/server"
import OpenAI from "openai"

const systemPrompt = 'You are to give users advice SPECIFICALLY ON SOCIAL PROBLEMS THEY May have. If the problem they have is not related to a social problem, tell them that you cant answer the problem to the best of your ability, but that you can help with social problems. Some examples of social problems include relationship issues, family, etc, how to talk to people, etc. Make sure to have short and brief answers and make sure it is conversational! '

export async function POST(req){
    const openai = new OpenAI()
    const data = await req.json()

    const completion = await openai.chat.completions.create({
        messages: [
            {
                role: 'system',
                content: systemPrompt,
            },
            ...data
        ],
        model: 'gpt-4o-mini',
        stream: true,
    })

    const stream = new ReadableStream({
        async start(controller){
            const encoder = new TextEncoder()
            try{
                for await (const chunk of completion){
                    const content = chunk.choices[0]?.delta?.content
                    if(content){
                        const text = encoder.encode(content)
                        controller.enqueue(text)
                    }
                }
            } catch (err) {
                controller.error(err)
            } finally {
                controller.close()
            }
        },
    })

    return new NextResponse(stream)
}