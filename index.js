const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const https = require("https");

const bot = new Telegraf(process.env.BOT_KEY)

bot.start( (ctx) => {
  ctx.reply("Hola amigos!");
  ({ ctx }) =>
  ctx('', Markup
    .keyboard(['Получить картинку'])
    .oneTime()
    .resize()
    .extra()
  )
} )


bot.hears('Получить картинку', (ctx)=>{
  const url = 'https://api.unsplash.com/photos/random?client_id='+process.env.PUBLIC_KEY;

  https.get(url, res => {
    res.setEncoding("utf8");
    let body = "";
    res.on("data", data => {
      body += data;
    });
    res.on("end", () => {
      body = JSON.parse(body);
      ctx.replyWithPhoto(body.urls.full)
    });
  });
})

bot.telegram.setWebhook(`${process.env.URL}/bot${process.env.BOT_KEY}`);
bot.startWebhook(`/bot${process.env.BOT_KEY}`, null, process.env.PORT)

bot.launch()


