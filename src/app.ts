import { createBot, createFlow,MemoryDB, createProvider, addKeyword} from '@bot-whatsapp/bot'
import { BaileysProvider, handleCtx } from '@bot-whatsapp/provider-baileys'

const flowBienvenida = addKeyword('hola').addAnswer('Bienvenido')
const main = async () =>{
    const provider = createProvider(BaileysProvider);
    provider.initHttpServer(3002)

    provider.http?.server.post('/send-message', (req, res) => {
        res.end('esto es del server de polka')
    })

    provider.http?.server.post('/send-message-media',handleCtx(async (bot, req, res)=> {
        const body = req.body
        const phone = body.phone
        const message = body.message
        const mediaUrl = body.mediaUrl
        await bot.sendMessage(phone,message,{
            media: mediaUrl
        })
        res.end('esto es del server de polka')
    })) 
    provider.http?.server.post('/send-message',handleCtx(async (bot, req, res)=> {
        const body = req.body
        const phone = body.phone
        const message = body.message
        await bot.sendMessage(phone,message,{})
        res.end('esto es del server de polka')
    })) 
    await createBot({
        flow: createFlow([flowBienvenida]),
        database: new MemoryDB(),
        provider
    })

}
main()