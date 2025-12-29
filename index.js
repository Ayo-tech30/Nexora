// TEKSUGA WhatsApp Bot for Railway
// This bot connects to YOUR WhatsApp number: +2347062789401

const { default: makeWASocket, DisconnectReason, useMultiFileAuthState, downloadMediaMessage } = require('@whiskeysockets/baileys');
const pino = require('pino');

const PREFIX = '.';
const BOT_NAME = 'Mita';
const CREATOR = '𝑰𝒔𝒂𝒈𝒊 𝒀𝒐𝒊𝒄𝒉𝒊';
const BOT_NUMBER = '2347062789401'; // Your WhatsApp number

// Database
const db = {
  users: new Map()
};

function getUser(sender) {
  if (!db.users.has(sender)) {
    db.users.set(sender, {
      balance: 0,
      bank: 0,
      cards: [],
      inventory: [],
      profile: { bio: '', age: null },
      lastDaily: 0,
      warnings: 0
    });
  }
  return db.users.get(sender);
}

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState('./auth_info');
  
  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: true,
    logger: pino({ level: 'silent' }),
    browser: ['TEKSUGA Bot', 'Chrome', '1.0.0']
  });
  
  sock.ev.on('creds.update', saveCreds);
  
  sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect, qr } = update;
    
    if (qr) {
      console.log('📱 QR Code Generated! Scan with +2347062789401');
    }
    
    if (connection === 'close') {
      const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
      console.log('Connection closed. Reconnecting:', shouldReconnect);
      if (shouldReconnect) {
        setTimeout(() => startBot(), 3000);
      }
    } else if (connection === 'open') {
      console.log('✅ TEKSUGA Bot Online! Number: +' + BOT_NUMBER);
    }
  });
  
  sock.ev.on('messages.upsert', async ({ messages }) => {
    const msg = messages[0];
    if (!msg.message || msg.key.fromMe) return;
    
    const from = msg.key.remoteJid;
    const isGroup = from.endsWith('@g.us');
    const sender = msg.key.participant || from;
    const text = msg.message.conversation || msg.message.extendedTextMessage?.text || '';
    
    if (!text.startsWith(PREFIX)) return;
    
    const args = text.slice(PREFIX.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    
    const user = getUser(sender);
    
    const reply = (text) => sock.sendMessage(from, { text }, { quoted: msg });
    
    try {
      switch (command) {
        case 'menu':
          const menu = `╭━━★彡 NEXORA 彡★━━╮
┃  𖤓 Prefix: ${PREFIX}
┃  𖤓 Name: ${BOT_NAME}  
┃  𖤓 Creator: ${CREATOR}
╰━━━━━━━━━━━━━╯  
ꕥ *.support* for official group

*🎴 CARDS 🎴*  
┣ ✦ .cards [on/off]  
┣ ✦ .card [index]  
┣ ✦ .ci [name] [tier]  
┣ ✦ .cardinfo [name] [tier]  
┣ ✦ .si [name]
┣ ✦ .ss [series_name] 
┣ ✦ .slb [series_name]
┣ ✦ .clb
┣ ✦ .deck  
┣ ✦ .col
┣ ✦ .cardshop
┣ ✦ .sellc [index] [price]
┣ ✦ .rc [index]
┣ ✦ .vs
┣ ✦ .claim [id]  
┣ ✦ .sc [@] [index] [price]  
┣ ✦ .tc [@] [index] [index]  
┣ ✦ .lendcard / lc  
┣ ✦ .auction  
┣ ✦ .submit [index] [price]  
┣ ✦ .myauc  
┣ ✦ .remauc [index]
┣ ✦ .listauc  
┗━━━━━━━━━━━  

*🎮 ECONOMY 🎮*  
┣ ✦ .balance / bal  
┣ ✦ .daily  
┣ ✦ .withdraw / wd  
┣ ✦ .deposit / dep  
┣ ✦ .donate 
┣ ✦ .lottery  
┣ ✦ .rich  
┣ ✦ .richg  
┣ ✦ .profile / p  
┣ ✦ .edit  
┣ ✦ .bio [bio]
┣ ✦ .setage [age]
┣ ✦ .inventory / inv  
┣ ✦ .use [item name]  
┣ ✦ .sell [item_name]  
┣ ✦ .shop  
┣ ✦ .dig  
┣ ✦ .fish  
┣ ✦ .leaderboard / lb  
┣ ✦ .roast  
┣ ✦ .gamble  
┣ ✦ .beg  
┗━━━━━━━━━━━  

*🎮 GAMES 🎮*  
┣ ✦ .ttt
┣ ✦ .startbattle
┣ ✦ .akinator/aki
┣ ✦ .greekgod / gg
┣ ✦ .c4
┣ ✦ .wcg
┣ ✦ .chess
┗━━━━━━━━━━━  

*🏰 GUILDS 🏰*
┣ This section is under development.  
┣ ✦ .guild info  
┣ ✦ .guild create [name]  
┣ ✦ .guild accept  
┣ ✦ .guild decline  
┣ ✦ .guild emblem  
┗━━━━━━━━━━━  

*🎰 GAMBLE 🎰*  
┣ ✦ .slots  
┣ ✦ .cf  
┣ ✦ .dice  
┣ ✦ .db  
┣ ✦ .dp  
┣ ✦ .roulette  
┣ ✦ .horse  
┗━━━━━━━━━━━  

*🐾 PETS 🐾*  
┣ This section is under development.
┣ ✦ .pet  
┣ ✦ .pet feed  
┣ ✦ .pet play
┣ ✦ .pet name
┗━━━━━━━━━━━  

*⚔️ RPG ⚔️* 
┣ This section is under development.  
┗━━━━━━━━━━━  

*👤 INTERACTION 👤*  
┣ ✦ .hug / .kiss / .slap  
┣ ✦ .wave / .pat / .dance  
┣ ✦ .sad / .smile / .laugh  
┣ ✦ .lick / .punch / .bonk  
┣ ✦ .fuck / .tickle / .wank  
┣ ✦ .jihad / .crusade / .kill  
┣ ✦ .shrug / .kidnap  
┗━━━━━━━━━━━  

*👤 FUN 👤*  
┣ ✦ .gay / .lesbian / .simp  
┣ ✦ .ship / .skill / .duality  
┣ ✦ .gen / .pov / .social  
┣ ✦ .relation / .pp  
┣ ✦ .wouldyourather / wyr
┣ ✦ .joke / .truth / .dare  
┣ ✦ .td / .uno
┗━━━━━━━━━━━  

*📲 DOWNLOADERS 📲*
┣ ✦ .ig / .ttk / .yt  
┣ ✦ .x / .fb / .play
┗━━━━━━━━━━━  

*🔍 SEARCH 🔍*
┣ ✦ .pinterest / pint  
┣ ✦ .sauce / reverseimg  
┣ ✦ .wallpaper / .lyrics  
┗━━━━━━━━━━━  

*🤖 AI 🤖*
┣ ✦ .copilot / .gpt  
┣ ✦ .perplexity / .imagine  
┣ ✦ .upscale / .translate  
┣ ✦ .transcribe / tb
┗━━━━━━━━━━━  

*👤 CONVERTER 👤*
┣ ✦ .sticker / s  
┣ ✦ .take / .toimg  
┣ ✦ .tovid / .rotate
┗━━━━━━━━━━━  

*🎮 ANIME SFW 🎮*   
┣ ✦ .waifu / .neko  
┣ ✦ .maid / .oppai  
┣ ✦ .selfies / .uniform  
┗━━━━━━━━━━━ 

*🎮 ANIME NSFW 🎮* 
┣ ✦ .nsfw on/off  
┣ ✦ .milf / .ass / .hentai  
┣ ✦ .oral / .ecchi / .paizuri  
┗━━━━━━━━━━━  

*⚙️ ADMIN ⚙️* 
┣ ✦ .kick / .delete  
┣ ✦ .antilink / .warn  
┣ ✦ .promote / .demote  
┣ ✦ .mute / .unmute  
┣ ✦ .hidetag / .tagall  
┣ ✦ .open / .close  
┗━━━━━━━━━━━`;
          await reply(menu);
          break;

        case 'mods':
          const modsMessage = `┌─❖
│「 𝚻𝚵𝚴𝐒𝐔𝚪𝚫 」
└┬❖ 「 👑 𝗠𝗼𝗱𝘀 👑 」
   │✑  @2347062789401
   │✑  
   │✑  
   │✑  
   ├────────────┈ ⳹
   │ 「 🛡️ 𝗚𝘂𝗮𝗿𝗱𝗶𝗮𝗻𝘀 🛡️ 」
   │✑  
   │✑  
   │✑  
   └────────────┈ ⳹

> ⚠️ Unnecessary use of this command will lead to a *ban from Teksuga community*.`;
          
          await sock.sendMessage(from, { 
            text: modsMessage,
            mentions: ['2347062789401@s.whatsapp.net']
          });
          break;

        case 'balance':
        case 'bal':
          await reply(`💰 *Balance*\n\n💵 Wallet: $${user.balance}\n🏦 Bank: $${user.bank}\n💎 Total: $${user.balance + user.bank}`);
          break;

        case 'daily':
          const now = Date.now();
          const cooldown = 24 * 60 * 60 * 1000;
          
          if (now - user.lastDaily < cooldown) {
            const timeLeft = cooldown - (now - user.lastDaily);
            const hours = Math.floor(timeLeft / (60 * 60 * 1000));
            await reply(`⏰ Daily reward claimed! Come back in ${hours} hours.`);
          } else {
            const reward = Math.floor(Math.random() * 500) + 100;
            user.balance += reward;
            user.lastDaily = now;
            await reply(`🎁 Daily reward claimed! You received $${reward}`);
          }
          break;

        case 'withdraw':
        case 'wd':
          const amount = parseInt(args[0]);
          if (!amount || amount <= 0) return reply('❌ Invalid amount!');
          if (user.bank < amount) return reply('❌ Insufficient bank balance!');
          
          user.bank -= amount;
          user.balance += amount;
          await reply(`✅ Withdrew $${amount} from bank`);
          break;

        case 'deposit':
        case 'dep':
          const depAmount = parseInt(args[0]);
          if (!depAmount || depAmount <= 0) return reply('❌ Invalid amount!');
          if (user.balance < depAmount) return reply('❌ Insufficient wallet balance!');
          
          user.balance -= depAmount;
          user.bank += depAmount;
          await reply(`✅ Deposited $${depAmount} to bank`);
          break;

        case 'profile':
        case 'p':
          await reply(`👤 *Profile*\n\n💰 Balance: $${user.balance}\n🏦 Bank: $${user.bank}\n🎴 Cards: ${user.cards.length}\n📦 Items: ${user.inventory.length}\n📝 Bio: ${user.profile.bio || 'Not set'}\n🎂 Age: ${user.profile.age || 'Not set'}`);
          break;

        case 'bio':
          if (!args.length) return reply('Usage: .bio [your bio]');
          user.profile.bio = args.join(' ');
          await reply('✅ Bio updated!');
          break;

        case 'setage':
          const age = parseInt(args[0]);
          if (!age || age < 13 || age > 100) return reply('❌ Invalid age! (13-100)');
          user.profile.age = age;
          await reply(`✅ Age set to ${age}`);
          break;

        case 'inventory':
        case 'inv':
          if (!user.inventory.length) return reply('📦 Your inventory is empty!');
          await reply(`📦 *Inventory*\n\n${user.inventory.map((item, i) => `${i+1}. ${item}`).join('\n')}`);
          break;

        case 'shop':
          await reply(`🏪 *Shop*\n\n1. 🎣 Fishing Rod - $500\n2. ⛏️ Pickaxe - $500\n3. 🍀 Luck Charm - $1000\n4. 💎 Gem - $2000\n\nUse: .buy [number]`);
          break;

        case 'dig':
          const digReward = Math.floor(Math.random() * 100) + 10;
          user.balance += digReward;
          await reply(`⛏️ You dug and found $${digReward}!`);
          break;

        case 'fish':
          const fishReward = Math.floor(Math.random() * 150) + 20;
          user.balance += fishReward;
          await reply(`🎣 You caught a fish worth $${fishReward}!`);
          break;

        case 'beg':
          const begReward = Math.floor(Math.random() * 50) + 5;
          user.balance += begReward;
          await reply(`🥺 Someone gave you $${begReward}`);
          break;

        case 'leaderboard':
        case 'lb':
          const sorted = Array.from(db.users.entries())
            .sort((a, b) => (b[1].balance + b[1].bank) - (a[1].balance + a[1].bank))
            .slice(0, 10);
          const lb = sorted.map((entry, i) => `${i+1}. @${entry[0].split('@')[0]} - $${entry[1].balance + entry[1].bank}`).join('\n');
          await reply(`🏆 *Leaderboard*\n\n${lb}`);
          break;

        case 'slots':
          const bet = parseInt(args[0]) || 10;
          if (user.balance < bet) return reply('❌ Insufficient balance!');
          
          const symbols = ['🍎', '🍊', '🍋', '🍇', '🍉', '⭐'];
          const result = [
            symbols[Math.floor(Math.random() * symbols.length)],
            symbols[Math.floor(Math.random() * symbols.length)],
            symbols[Math.floor(Math.random() * symbols.length)]
          ];
          
          let win = 0;
          if (result[0] === result[1] && result[1] === result[2]) {
            win = bet * 5;
          } else if (result[0] === result[1] || result[1] === result[2]) {
            win = bet * 2;
          }
          
          user.balance += win - bet;
          await reply(`🎰 ${result.join(' | ')}\n\n${win > 0 ? `✅ You won $${win}!` : `❌ You lost $${bet}`}`);
          break;

        case 'cf':
        case 'coinflip':
          const cfBet = parseInt(args[0]);
          const choice = args[1]?.toLowerCase();
          if (!cfBet || !choice || !['heads', 'tails', 'h', 't'].includes(choice)) {
            return reply('Usage: .cf [amount] [heads/tails or h/t]');
          }
          
          if (user.balance < cfBet) return reply('❌ Insufficient balance!');
          
          const flip = Math.random() < 0.5 ? 'heads' : 'tails';
          const won = flip === choice || flip[0] === choice;
          
          user.balance += won ? cfBet : -cfBet;
          await reply(`🪙 Coin landed on: *${flip}*\n\n${won ? `✅ You won $${cfBet * 2}!` : `❌ You lost $${cfBet}`}`);
          break;

        case 'dice':
          const diceBet = parseInt(args[0]) || 10;
          if (user.balance < diceBet) return reply('❌ Insufficient balance!');
          
          const roll = Math.floor(Math.random() * 6) + 1;
          const diceWon = roll >= 4;
          
          user.balance += diceWon ? diceBet : -diceBet;
          await reply(`🎲 You rolled: ${roll}\n\n${diceWon ? `✅ You won $${diceBet * 2}!` : `❌ You lost $${diceBet}`}`);
          break;

        case 'joke':
          const jokes = [
            "Why don't scientists trust atoms? Because they make up everything!",
            "I told my wife she was drawing her eyebrows too high. She looked surprised.",
            "Why don't programmers like nature? It has too many bugs!",
            "What do you call a bear with no teeth? A gummy bear!",
            "Why did the scarecrow win an award? He was outstanding in his field!"
          ];
          await reply(`😄 ${jokes[Math.floor(Math.random() * jokes.length)]}`);
          break;

        case 'gay':
          await reply(`🏳️‍🌈 You are ${Math.floor(Math.random() * 101)}% gay!`);
          break;

        case 'lesbian':
          await reply(`🏳️‍🌈 You are ${Math.floor(Math.random() * 101)}% lesbian!`);
          break;

        case 'simp':
          await reply(`💘 You are ${Math.floor(Math.random() * 101)}% simp!`);
          break;

        case 'pp':
          const size = Math.floor(Math.random() * 20) + 1;
          await reply(`🍆 PP Size: ${'='.repeat(size)}D (${size}cm)`);
          break;

        case 'ship':
          await reply(`💕 Ship Percentage: ${Math.floor(Math.random() * 101)}%`);
          break;

        case 'hug':
          await reply('🤗 *hugs*');
          break;

        case 'kiss':
          await reply('😘 *kisses*');
          break;

        case 'slap':
          await reply('👋 *slaps*');
          break;

        case 'pat':
          await reply('🤚 *pats head*');
          break;

        case 'dance':
          await reply('💃 *dances*');
          break;

        case 'kick':
          if (!isGroup) return reply('❌ Group command only!');
          await reply('👢 Kick feature requires admin permissions');
          break;

        case 'promote':
          if (!isGroup) return reply('❌ Group command only!');
          await reply('⬆️ Promote feature requires admin permissions');
          break;

        case 'tagall':
          if (!isGroup) return reply('❌ Group command only!');
          await reply('@everyone 📢 Attention please!');
          break;

        default:
          await reply(`❓ Unknown command: ${command}\n\nType ${PREFIX}menu for available commands`);
      }
    } catch (error) {
      console.error('Error handling command:', error);
      await reply('❌ An error occurred while processing your command.');
    }
  });
}

startBot().catch(console.error);
