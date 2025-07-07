const express = require('express')
const qrcode = require('qrcode-terminal')
const { LocalAuth, Client } = require('whatsapp-web.js')

const app = express()
const port = process.env.PORT || 3000

const client = new Client({
    authStrategy: new LocalAuth({ clientId: "xaveny" }),
    puppeteer: {
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
        ]
    }
})

const contact = ['6289613645898', '6283842220421']

client.on('qr', qr => qrcode.generate(qr, { small: true }))
client.on('authenticated', () => console.log('Terhubung'))
client.on('ready', () => console.log('Ready'))

client.on('message', async msg => {
    for (let i = 0; i < contact.length; i++) {
        if (msg.from == (contact[i] + '@c.us')) {
            msg.reply('Hidup')
        }
    }
})

client.initialize()

app.listen(port, () => console.log("Bot Menyala"))
