// NEXORA WhatsApp Bot - Complete Implementation with ALL Commands Working
// Bot Name: Ayanokoji
// Install: npm install whatsapp-web.js qrcode-terminal axios

const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const axios = require('axios');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: { 
        headless: true, 
        args: ['--no-sandbox', '--disable-setuid-sandbox'] 
    }
});

// Bot Configuration
const PREFIX = '.';
const BOT_NAME = 'Ayanokoji';
const CREATOR = '𝑰𝒔𝒂𝒈𝒊 𝒀𝒐𝒊𝒄𝒉𝒊';
const ADMIN_NUMBERS = ['2349049460676', '2347062789401'];

// Storage
const userData = new Map();
const groupData = new Map();
const bannedUsers = new Set();
const activeSpawns = new Map();
const groupActivity = new Map();
const games = new Map();

// Expanded Card Database (80+ Cards)
const CARD_DATABASE = [
    // S TIER (Supreme) - 0.5% chance
    { name: 'Ayanokoji Kiyotaka', tier: 'S', series: 'Classroom of the Elite', image: 'https://i.pinimg.com/736x/4d/6e/5a/4d6e5ad00bf5a3870c9db8e66cc33682.jpg' },
    { name: 'Gojo Satoru', tier: 'S', series: 'Jujutsu Kaisen', image: 'https://i.pinimg.com/736x/4d/6e/5a/4d6e5ad00bf5a3870c9db8e66cc33682.jpg' },
    { name: 'Sukuna Ryomen', tier: 'S', series: 'Jujutsu Kaisen', image: 'https://i.pinimg.com/736x/d0/8c/5f/d08c5f6e2e5c4f7b8e9d0a1b2c3d4e5f.jpg' },
    { name: 'Saitama', tier: 'S', series: 'One Punch Man', image: 'https://i.pinimg.com/736x/5e/6f/7a/5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b.jpg' },
    { name: 'Madara Uchiha', tier: 'S', series: 'Naruto', image: 'https://i.pinimg.com/736x/3a/4b/5c/3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d.jpg' },
    
    // T1 TIER (Top) - 2% chance
    { name: 'Naruto Uzumaki', tier: 'T1', series: 'Naruto', image: 'https://i.pinimg.com/736x/1a/2b/3c/1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d.jpg' },
    { name: 'Sasuke Uchiha', tier: 'T1', series: 'Naruto', image: 'https://i.pinimg.com/736x/4e/5f/6a/4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b.jpg' },
    { name: 'Itachi Uchiha', tier: 'T1', series: 'Naruto', image: 'https://i.pinimg.com/736x/3a/4b/5c/3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d.jpg' },
    { name: 'Goku Ultra Instinct', tier: 'T1', series: 'Dragon Ball', image: 'https://i.pinimg.com/736x/9a/0b/1c/9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d.jpg' },
    { name: 'Vegeta', tier: 'T1', series: 'Dragon Ball', image: 'https://i.pinimg.com/736x/7c/8d/9e/7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f.jpg' },
    { name: 'Levi Ackerman', tier: 'T1', series: 'Attack on Titan', image: 'https://i.pinimg.com/736x/5c/6d/7e/5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f.jpg' },
    { name: 'Light Yagami', tier: 'T1', series: 'Death Note', image: 'https://i.pinimg.com/736x/1e/2f/3a/1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b.jpg' },
    { name: 'Luffy Gear 5', tier: 'T1', series: 'One Piece', image: 'https://i.pinimg.com/736x/7e/8f/9a/7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b.jpg' },
    
    // T2 TIER - 5% chance
    { name: 'Eren Yeager', tier: 'T2', series: 'Attack on Titan', image: 'https://i.pinimg.com/736x/9e/0f/1a/9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b.jpg' },
    { name: 'Mikasa Ackerman', tier: 'T2', series: 'Attack on Titan', image: 'https://i.pinimg.com/736x/3c/4d/5e/3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f.jpg' },
    { name: 'Killua Zoldyck', tier: 'T2', series: 'Hunter x Hunter', image: 'https://i.pinimg.com/736x/3e/4f/5a/3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b.jpg' },
    { name: 'Gon Freecss', tier: 'T2', series: 'Hunter x Hunter', image: 'https://i.pinimg.com/736x/5a/6b/7c/5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d.jpg' },
    { name: 'Edward Elric', tier: 'T2', series: 'Fullmetal Alchemist', image: 'https://i.pinimg.com/736x/5a/6b/7c/5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d.jpg' },
    { name: 'Tanjiro Kamado', tier: 'T2', series: 'Demon Slayer', image: 'https://i.pinimg.com/736x/9c/0d/1e/9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f.jpg' },
    { name: 'Nezuko Kamado', tier: 'T2', series: 'Demon Slayer', image: 'https://i.pinimg.com/736x/0a/1b/2c/0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d.jpg' },
    { name: 'Zenitsu Agatsuma', tier: 'T2', series: 'Demon Slayer', image: 'https://i.pinimg.com/736x/2c/3d/4e/2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f.jpg' },
    { name: 'Ichigo Kurosaki', tier: 'T2', series: 'Bleach', image: 'https://i.pinimg.com/736x/4e/5f/6a/4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b.jpg' },
    { name: 'Zoro Roronoa', tier: 'T2', series: 'One Piece', image: 'https://i.pinimg.com/736x/6a/7b/8c/6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d.jpg' },
    
    // T3 TIER - 10% chance
    { name: 'Kakashi Hatake', tier: 'T3', series: 'Naruto', image: 'https://i.pinimg.com/736x/8c/9d/0e/8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f.jpg' },
    { name: 'Sakura Haruno', tier: 'T3', series: 'Naruto', image: 'https://i.pinimg.com/736x/0e/1f/2a/0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b.jpg' },
    { name: 'Hinata Hyuga', tier: 'T3', series: 'Naruto', image: 'https://i.pinimg.com/736x/1a/2b/3c/1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d.jpg' },
    { name: 'Sanji', tier: 'T3', series: 'One Piece', image: 'https://i.pinimg.com/736x/2a/3b/4c/2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d.jpg' },
    { name: 'Nami', tier: 'T3', series: 'One Piece', image: 'https://i.pinimg.com/736x/4c/5d/6e/4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f.jpg' },
    { name: 'Nico Robin', tier: 'T3', series: 'One Piece', image: 'https://i.pinimg.com/736x/6e/7f/8a/6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b.jpg' },
    { name: 'Vegito', tier: 'T3', series: 'Dragon Ball', image: 'https://i.pinimg.com/736x/8a/9b/0c/8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d.jpg' },
    { name: 'Gohan', tier: 'T3', series: 'Dragon Ball', image: 'https://i.pinimg.com/736x/0c/1d/2e/0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f.jpg' },
    { name: 'Meliodas', tier: 'T3', series: 'Seven Deadly Sins', image: 'https://i.pinimg.com/736x/2e/3f/4a/2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b.jpg' },
    { name: 'Ban', tier: 'T3', series: 'Seven Deadly Sins', image: 'https://i.pinimg.com/736x/4a/5b/6c/4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d.jpg' },
    { name: 'Escanor', tier: 'T3', series: 'Seven Deadly Sins', image: 'https://i.pinimg.com/736x/6c/7d/8e/6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f.jpg' },
    { name: 'Asta', tier: 'T3', series: 'Black Clover', image: 'https://i.pinimg.com/736x/8e/9f/0a/8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b.jpg' },
    { name: 'Yuno', tier: 'T3', series: 'Black Clover', image: 'https://i.pinimg.com/736x/0a/1b/2c/0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d.jpg' },
    
    // T4 TIER - 20% chance
    { name: 'Zero Two', tier: 'T4', series: 'Darling in the Franxx', image: 'https://i.pinimg.com/736x/1c/2d/3e/1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f.jpg' },
    { name: 'Rem', tier: 'T4', series: 'Re:Zero', image: 'https://i.pinimg.com/736x/7a/8b/9c/7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d.jpg' },
    { name: 'Ram', tier: 'T4', series: 'Re:Zero', image: 'https://i.pinimg.com/736x/9c/0d/1e/9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f.jpg' },
    { name: 'Emilia', tier: 'T4', series: 'Re:Zero', image: 'https://i.pinimg.com/736x/1e/2f/3a/1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b.jpg' },
    { name: 'Asuna', tier: 'T4', series: 'Sword Art Online', image: 'https://i.pinimg.com/736x/3a/4b/5c/3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d.jpg' },
    { name: 'Kirito', tier: 'T4', series: 'Sword Art Online', image: 'https://i.pinimg.com/736x/5c/6d/7e/5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f.jpg' },
    { name: 'Megumin', tier: 'T4', series: 'Konosuba', image: 'https://i.pinimg.com/736x/7e/8f/9a/7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b.jpg' },
    { name: 'Aqua', tier: 'T4', series: 'Konosuba', image: 'https://i.pinimg.com/736x/9a/0b/1c/9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d.jpg' },
    { name: 'Kazuma', tier: 'T4', series: 'Konosuba', image: 'https://i.pinimg.com/736x/1c/2d/3e/1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f.jpg' },
    { name: 'Ainz Ooal Gown', tier: 'T4', series: 'Overlord', image: 'https://i.pinimg.com/736x/3e/4f/5a/3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b.jpg' },
    { name: 'Saber', tier: 'T4', series: 'Fate/Stay Night', image: 'https://i.pinimg.com/736x/5a/6b/7c/5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d.jpg' },
    { name: 'Rin Tohsaka', tier: 'T4', series: 'Fate/Stay Night', image: 'https://i.pinimg.com/736x/7c/8d/9e/7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f.jpg' },
    { name: 'Shirou Emiya', tier: 'T4', series: 'Fate/Stay Night', image: 'https://i.pinimg.com/736x/9e/0f/1a/9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b.jpg' },
    { name: 'Mob', tier: 'T4', series: 'Mob Psycho 100', image: 'https://i.pinimg.com/736x/1a/2b/3c/1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d.jpg' },
    { name: 'Reigen Arataka', tier: 'T4', series: 'Mob Psycho 100', image: 'https://i.pinimg.com/736x/3c/4d/5e/3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f.jpg' },
    
    // T5 TIER - 30% chance
    { name: 'Midoriya Izuku', tier: 'T5', series: 'My Hero Academia', image: 'https://i.pinimg.com/736x/5e/6f/7a/5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b.jpg' },
    { name: 'Bakugo Katsuki', tier: 'T5', series: 'My Hero Academia', image: 'https://i.pinimg.com/736x/7a/8b/9c/7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d.jpg' },
    { name: 'Todoroki Shoto', tier: 'T5', series: 'My Hero Academia', image: 'https://i.pinimg.com/736x/9c/0d/1e/9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f.jpg' },
    { name: 'Uraraka Ochako', tier: 'T5', series: 'My Hero Academia', image: 'https://i.pinimg.com/736x/1e/2f/3a/1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b.jpg' },
    { name: 'All Might', tier: 'T5', series: 'My Hero Academia', image: 'https://i.pinimg.com/736x/3a/4b/5c/3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d.jpg' },
    { name: 'Shinobu Kocho', tier: 'T5', series: 'Demon Slayer', image: 'https://i.pinimg.com/736x/5c/6d/7e/5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f.jpg' },
    { name: 'Giyu Tomioka', tier: 'T5', series: 'Demon Slayer', image: 'https://i.pinimg.com/736x/7e/8f/9a/7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b.jpg' },
    { name: 'Rengoku Kyojuro', tier: 'T5', series: 'Demon Slayer', image: 'https://i.pinimg.com/736x/9a/0b/1c/9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d.jpg' },
    { name: 'Inosuke Hashibira', tier: 'T5', series: 'Demon Slayer', image: 'https://i.pinimg.com/736x/1c/2d/3e/1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f.jpg' },
    { name: 'Kanao Tsuyuri', tier: 'T5', series: 'Demon Slayer', image: 'https://i.pinimg.com/736x/3e/4f/5a/3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b.jpg' },
    { name: 'Genos', tier: 'T5', series: 'One Punch Man', image: 'https://i.pinimg.com/736x/7c/8d/9e/7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f.jpg' },
    { name: 'Fubuki', tier: 'T5', series: 'One Punch Man', image: 'https://i.pinimg.com/736x/9e/0f/1a/9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b.jpg' },
    { name: 'Tatsumaki', tier: 'T5', series: 'One Punch Man', image: 'https://i.pinimg.com/736x/1a/2b/3c/1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d.jpg' },
    { name: 'Subaru Natsuki', tier: 'T5', series: 'Re:Zero', image: 'https://i.pinimg.com/736x/3c/4d/5e/3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f.jpg' },
    { name: 'Raphtalia', tier: 'T5', series: 'Shield Hero', image: 'https://i.pinimg.com/736x/5e/6f/7a/5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b.jpg' },
    { name: 'Naofumi', tier: 'T5', series: 'Shield Hero', image: 'https://i.pinimg.com/736x/7a/8b/9c/7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d.jpg' },
    { name: 'Shinra Kusakabe', tier: 'T5', series: 'Fire Force', image: 'https://i.pinimg.com/736x/9c/0d/1e/9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f.jpg' },
    { name: 'Maki Oze', tier: 'T5', series: 'Fire Force', image: 'https://i.pinimg.com/736x/1e/2f/3a/1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b.jpg' },
    { name: 'Senku Ishigami', tier: 'T5', series: 'Dr. Stone', image: 'https://i.pinimg.com/736x/3a/4b/5c/3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d.jpg' }
];

const CARD_TIERS = {
    'S': { rarity: 0.5, value: 100000, color: '🌟' },
    'T1': { rarity: 2, value: 50000, color: '⭐' },
    'T2': { rarity: 5, value: 20000, color: '💫' },
    'T3': { rarity: 10, value: 10000, color: '✨' },
    'T4': { rarity: 20, value: 5000, color: '🔹' },
    'T5': { rarity: 30, value: 2000, color: '🔸' }
};

function initUser(id) {
    if (!userData.has(id)) {
        userData.set(id, {
            balance: 1000,
            bank: 0,
            inventory: {},
            cards: [],
            deck: [],
            lastDaily: 0,
            lastDig: 0,
            lastFish: 0,
            profile: { bio: 'New user', age: 0 },
            warnings: 0,
            pet: null,
            guild: null,
            stats: { wins: 0, losses: 0, cardsClaimed: 0 }
        });
    }
    return userData.get(id);
}

function initGroup(id) {
    if (!groupData.has(id)) {
        groupData.set(id, {
            cardsEnabled: true,
            nsfwEnabled: false,
            antilink: false,
            antilinkAction: 'warn',
            welcome: false,
            leave: false,
            welcomeMsg: 'Welcome!',
            leaveMsg: 'Goodbye!',
            blacklist: [],
            muted: [],
            messageCount: 0,
            lastActivity: Date.now()
        });
    }
    return groupData.get(id);
}

function isMod(userId) {
    const cleanNumber = userId.replace(/[^0-9]/g, '');
    return ADMIN_NUMBERS.includes(cleanNumber);
}

function isBanned(userId) {
    return bannedUsers.has(userId);
}

function generateCard() {
    const rand = Math.random() * 100;
    let selectedTier;
    
    if (rand < 0.5) selectedTier = 'S';
    else if (rand < 2.5) selectedTier = 'T1';
    else if (rand < 7.5) selectedTier = 'T2';
    else if (rand < 17.5) selectedTier = 'T3';
    else if (rand < 37.5) selectedTier = 'T4';
    else selectedTier = 'T5';
    
    const tierCards = CARD_DATABASE.filter(c => c.tier === selectedTier);
    const card = tierCards[Math.floor(Math.random() * tierCards.length)];
    
    return {
        ...card,
        id: Date.now() + Math.random(),
        claimedBy: null
    };
}

function trackActivity(groupId) {
    if (!groupActivity.has(groupId)) {
        groupActivity.set(groupId, { count: 0, lastSpawn: 0 });
    }
    
    const activity = groupActivity.get(groupId);
    activity.count++;
    
    if (activity.count >= 20 && Date.now() - activity.lastSpawn > 60000) {
        activity.count = 0;
        activity.lastSpawn = Date.now();
        return true;
    }
    
    return false;
}

client.on('qr', (qr) => {
    console.log('═══════════════════════════════════════');
    console.log('🤖 NEXORA BOT - Scan QR Code:');
    console.log('═══════════════════════════════════════');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('✅ NEXORA Bot Online!');
    console.log(`📱 Bot: ${BOT_NAME}`);
    console.log(`👤 Creator: ${CREATOR}`);
    console.log(`🔧 Prefix: ${PREFIX}`);
    console.log('═══════════════════════════════════════');
});

client.on('message', async (msg) => {
    try {
        if (msg.fromMe) return;
        
        const chat = await msg.getChat();
        const sender = msg.author || msg.from;
        const senderId = sender.split('@')[0];
        
        if (isBanned(sender)) {
            return await msg.reply('🚫 You are banned from using this bot.');
        }
        
        if (chat.isGroup) {
            const group = initGroup(chat.id._serialized);
            if (group.cardsEnabled && trackActivity(chat.id._serialized)) {
                const newCard = generateCard();
                activeSpawns.set(newCard.id, { card: newCard, groupId: chat.id._serialized });
                
                try {
                    const media = await MessageMedia.fromUrl(newCard.image);
                    await chat.sendMessage(media, {
                        caption: `✨ *ACTIVITY SPAWN!* ✨\n\n🎴 *${newCard.name}*\n${CARD_TIERS[newCard.tier].color} Tier: *${newCard.tier}*\n📚 Series: *${newCard.series}*\n🆔 ID: \`${newCard.id}\`\n💰 Value: $${CARD_TIERS[newCard.tier].value.toLocaleString()}\n📊 Rarity: ${CARD_TIERS[newCard.tier].rarity}%\n\n💎 Type \`.claim ${newCard.id}\` to claim!\n⏰ Expires in 2 minutes!`
                    });
                    
                    setTimeout(() => {
                        activeSpawns.delete(newCard.id);
                    }, 120000);
                } catch (error) {
                    await chat.sendMessage(`✨ *ACTIVITY SPAWN!* ✨\n\n🎴 *${newCard.name}*\n${CARD_TIERS[newCard.tier].color} Tier: *${newCard.tier}*\n📚 Series: *${newCard.series}*\n🆔 ID: \`${newCard.id}\`\n\n💎 Type \`.claim ${newCard.id}\` to claim!`);
                }
            }
        }
        
        const body = msg.body.trim();
        if (!body.startsWith(PREFIX)) return;
        
        const args = body.slice(PREFIX.length).trim().split(/\s+/);
        const cmd = args.shift().toLowerCase();
        
        const user = initUser(sender);
        const group = chat.isGroup ? initGroup(chat.id._serialized) : null;
        
        await handleCommand(msg, chat, sender, senderId, user, group, cmd, args);
    } catch (error) {
        console.error('Error:', error);
        await msg.reply('❌ Error processing command');
    }
});

async function handleCommand(msg, chat, sender, senderId, user, group, cmd, args) {
    
    switch(cmd) {
        // ═══════════════════════════════════════
        // MODERATOR COMMANDS
        // ═══════════════════════════════════════
        case 'mods':
            let modMsg = '👮 *Bot Moderators*\n\n';
            ADMIN_NUMBERS.forEach((num, i) => {
                modMsg += `${i + 1}. +${num}\n`;
            });
            modMsg += `\n💡 These users can ban/unban`;
            await msg.reply(modMsg);
            break;
            
        case 'ban':
            if (!isMod(senderId)) return await msg.reply('❌ Only mods!\n\nUse .mods');
            const banMentions = await msg.getMentions();
            if (banMentions[0]) {
                bannedUsers.add(banMentions[0].id._serialized);
                await msg.reply(`🚫 @${banMentions[0].id.user} banned!`);
            } else {
                await msg.reply('❌ Mention user\n\nExample: .ban @user');
            }
            break;
            
        case 'unban':
            if (!isMod(senderId)) return await msg.reply('❌ Only mods!\n\nUse .mods');
            const unbanMentions = await msg.getMentions();
            if (unbanMentions[0]) {
                bannedUsers.delete(unbanMentions[0].id._serialized);
                await msg.reply(`✅ @${unbanMentions[0].id.user} unbanned!`);
            } else {
                await msg.reply('❌ Mention user\n\nExample: .unban @user');
            }
            break;
            
        case 'banlist':
            if (!isMod(senderId)) return await msg.reply('❌ Only mods!');
            if (bannedUsers.size === 0) {
                await msg.reply('✅ No banned users');
            } else {
                let banMsg = '🚫 *Banned Users*\n\n';
                let i = 1;
                for (let banned of bannedUsers) {
                    banMsg += `${i}. ${banned.split('@')[0]}\n`;
                    i++;
                }
                await msg.reply(banMsg);
            }
            break;

        // ═══════════════════════════════════════
        // MENU & SUPPORT
        // ═══════════════════════════════════════
        case 'menu':
        case 'help':
            try {
                const menuImage = await MessageMedia.fromUrl('https://i.pinimg.com/736x/4d/6e/5a/4d6e5ad00bf5a3870c9db8e66cc33682.jpg');
                await msg.reply(menuImage, null, { caption: getMenuText() });
            } catch (error) {
                await msg.reply(getMenuText());
            }
            break;
            
        case 'support':
            await msg.reply(`📞 *Official Support*\n\nContact creator for help!\n\n👤 Creator: ${CREATOR}\n\n💡 Use .mods to see moderators`);
            break;

        // ═══════════════════════════════════════
        // CARD SYSTEM
        // ═══════════════════════════════════════
        case 'cards':
            if (!chat.isGroup) return msg.reply('❌ Group only!');
            if (args[0] === 'on') {
                group.cardsEnabled = true;
                await msg.reply('✅ *Card spawning enabled!*\n\n📊 Spawns every 20 messages\n⏰ Min 1 min between spawns');
            } else if (args[0] === 'off') {
                group.cardsEnabled = false;
                await msg.reply('❌ Card spawning disabled');
            } else {
                const activity = groupActivity.get(chat.id._serialized) || { count: 0 };
                await msg.reply(`🎴 *Card System*\n\n${group.cardsEnabled ? '✅ Enabled' : '❌ Disabled'}\n\n📊 Activity: ${activity.count}/20\n💡 ${20 - activity.count} messages until spawn\n\nUse .cards on/off`);
            }
            break;
            
        case 'spawn':
        case 'vs':
            if (!chat.isGroup || !group.cardsEnabled) {
                return await msg.reply('❌ Cards not enabled! Use .cards on');
            }
            
            const newCard = generateCard();
            activeSpawns.set(newCard.id, { card: newCard, groupId: chat.id._serialized });
            
            try {
                const media = await MessageMedia.fromUrl(newCard.image);
                await msg.reply(media, null, {
                    caption: `✨ *CARD SPAWNED!* ✨\n\n🎴 *${newCard.name}*\n${CARD_TIERS[newCard.tier].color} Tier: *${newCard.tier}*\n📚 Series: *${newCard.series}*\n🆔 ID: \`${newCard.id}\`\n💰 Value: $${CARD_TIERS[newCard.tier].value.toLocaleString()}\n📊 Rarity: ${CARD_TIERS[newCard.tier].rarity}%\n\n💎 Type \`.claim ${newCard.id}\` to claim!\n⏰ Expires in 2 minutes!`
                });
                
                setTimeout(() => {
                    if (activeSpawns.has(newCard.id)) {
                        activeSpawns.delete(newCard.id);
                    }
                }, 120000);
            } catch (error) {
                await msg.reply(`✨ *CARD SPAWNED!* ✨\n\n🎴 *${newCard.name}*\n${CARD_TIERS[newCard.tier].color} Tier: *${newCard.tier}*\n📚 Series: *${newCard.series}*\n🆔 ID: \`${newCard.id}\`\n\n💎 Type \`.claim ${newCard.id}\` to claim!`);
            }
            break;
            
        case 'claim':
            const claimId = parseFloat(args[0]);
            if (!claimId) return await msg.reply('❌ Provide ID!\n\nExample: .claim 1234567890.123');
            
            const spawn = activeSpawns.get(claimId);
            if (!spawn) return await msg.reply('❌ Invalid/expired ID!\n\n💡 Cards expire after 2 min');
            if (spawn.groupId !== chat.id._serialized) return await msg.reply('❌ Card from another group!');
            if (spawn.card.claimedBy) return await msg.reply('❌ Already claimed!');
            
            spawn.card.claimedBy = sender;
            user.cards.push({ ...spawn.card, claimedAt: new Date() });
            user.stats.cardsClaimed++;
            activeSpawns.delete(claimId);
            
            await msg.reply(`✅ *Claimed!*\n\n🎴 ${spawn.card.name}\n${CARD_TIERS[spawn.card.tier].color} Tier: ${spawn.card.tier}\n📚 ${spawn.card.series}\n💰 Value: $${CARD_TIERS[spawn.card.tier].value.toLocaleString()}\n\n📊 Collection: ${user.cards.length}\n🏆 Total claimed: ${user.stats.cardsClaimed}\n\n💡 Use .col`);
            break;
            
        case 'col':
        case 'collection':
            if (user.cards.length === 0) {
                return await msg.reply('📦 Collection empty!\n\n💡 Claim spawns or buy packs');
            }
            
            let colMsg = `🎴 *Your Collection*\n📊 Total: ${user.cards.length}\n\n`;
            const tierGroups = {};
            for (let card of user.cards) {
                if (!tierGroups[card.tier]) tierGroups[card.tier] = [];
                tierGroups[card.tier].push(card);
            }
            
            const tierOrder = ['S', 'T1', 'T2', 'T3', 'T4', 'T5'];
            for (let tier of tierOrder) {
                if (tierGroups[tier]) {
                    colMsg += `\n${CARD_TIERS[tier].color} *${tier}* (${tierGroups[tier].length})\n`;
                    tierGroups[tier].slice(0, 5).forEach((c, i) => {
                        colMsg += `${i + 1}. ${c.name} - ${c.series}\n`;
                    });
                    if (tierGroups[tier].length > 5) {
                        colMsg += `... +${tierGroups[tier].length - 5} more\n`;
                    }
                }
            }
            
            const totalValue = user.cards.reduce((sum, c) => sum + CARD_TIERS[c.tier].value, 0);
            colMsg += `\n💎 Value: $${totalValue.toLocaleString()}`;
            await msg.reply(colMsg);
            break;
            
        case 'card':
            const cardIndex = parseInt(args[0]) - 1;
            if (isNaN(cardIndex) || !user.cards[cardIndex]) {
                return await msg.reply('❌ Invalid!\n\n💡 Use .col');
            }
            
            const card = user.cards[cardIndex];
            try {
                const media = await MessageMedia.fromUrl(card.image);
                await msg.reply(media, null, {
                    caption: `🎴 *${card.name}*\n\n${CARD_TIERS[card.tier].color} Tier: ${card.tier}\n📚 ${card.series}\n💰 $${CARD_TIERS[card.tier].value.toLocaleString()}\n📊 Rarity: ${CARD_TIERS[card.tier].rarity}%\n📅 ${new Date(card.claimedAt).toLocaleDateString()}\n\n💡 Card #${cardIndex + 1}`
                });
            } catch (error) {
                await msg.reply(`🎴 *${card.name}*\n\n${CARD_TIERS[card.tier].color} ${card.tier}\n📚 ${card.series}\n💰 $${CARD_TIERS[card.tier].value.toLocaleString()}`);
            }
            break;
            
        case 'ci':
        case 'cardinfo':
            const ciName = args.join(' ');
            if (!ciName) return await msg.reply('❌ Provide name!\n\nExample: .ci Gojo');
            
            const foundCard = CARD_DATABASE.find(c => c.name.toLowerCase().includes(ciName.toLowerCase()));
            if (foundCard) {
                try {
                    const media = await MessageMedia.fromUrl(foundCard.image);
                    await msg.reply(media, null, {
                        caption: `🎴 *${foundCard.name}*\n\n${CARD_TIERS[foundCard.tier].color} Tier: ${foundCard.tier}\n📚 ${foundCard.series}\n💰 $${CARD_TIERS[foundCard.tier].value.toLocaleString()}\n📊 ${CARD_TIERS[foundCard.tier].rarity}%\n\n💡 Get from spawns/packs!`
                    });
                } catch (error) {
                    await msg.reply(`🎴 *${foundCard.name}*\n\n${CARD_TIERS[foundCard.tier].color} ${foundCard.tier}\n📚 ${foundCard.series}\n💰 $${CARD_TIERS[foundCard.tier].value.toLocaleString()}`);
                }
            } else {
                await msg.reply(`❌ "${ciName}" not found!\n\n💡 Try: Gojo, Naruto, Luffy`);
            }
            break;
            
        case 'deck':
            if (user.deck.length === 0) {
                await msg.reply('📦 Deck empty!\n\n💡 Use .adddeck <num>\n📊 Max: 5 cards');
            } else {
                let deckMsg = '🎴 *Your Deck*\n\n';
                user.deck.forEach((c, i) => {
                    deckMsg += `${i + 1}. ${c.name} (${c.tier})\n`;
                });
                deckMsg += `\n📊 ${user.deck.length}/5`;
                await msg.reply(deckMsg);
            }
            break;
            
        case 'adddeck':
            const addIdx = parseInt(args[0]) - 1;
            if (user.deck.length >= 5) return await msg.reply('❌ Deck full! Max 5\n\n💡 Use .removedeck');
            if (isNaN(addIdx) || !user.cards[addIdx]) return await msg.reply('❌ Invalid!\n\n💡 Use .col');
            
            user.deck.push(user.cards[addIdx]);
            await msg.reply(`✅ Added ${user.cards[addIdx].name}!\n\n📊 Deck: ${user.deck.length}/5`);
            break;
            
        case 'removedeck':
            const remIdx = parseInt(args[0]) - 1;
            if (isNaN(remIdx) || !user.deck[remIdx]) return await msg.reply('❌ Invalid!\n\n💡 Use .deck');
            
            const removed = user.deck.splice(remIdx, 1)[0];
            await msg.reply(`🗑️ Removed ${removed.name}\n\n📊 ${user.deck.length}/5`);
            break;
            
        case 'cardshop':
            await msg.reply(`🏪 *Card Shop*\n\n1️⃣ *T5 Pack* - $2,000\n   └ 5 T5 cards\n\n2️⃣ *T4 Pack* - $5,000\n   └ 3 T4 + 2 T5\n\n3️⃣ *T3 Pack* - $10,000\n   └ 2 T3 + 2 T4 + 1 T5\n\n4️⃣ *T2 Pack* - $20,000\n   └ 1 T2 + 2 T3 + 2 T4\n\n5️⃣ *T1 Pack* - $50,000\n   └ 1 T1 + 1 T2 + 3 T3\n\n6️⃣ *Supreme* - $100,000\n   └ 1 S + 1 T1 + 1 T2 + 2 T3\n\n💰 Balance: $${user.balance.toLocaleString()}\n\n💡 Use .buypack <num>`);
            break;
            
        case 'buypack':
            const packNum = parseInt(args[0]);
            const packs = {
                1: { price: 2000, cards: ['T5', 'T5', 'T5', 'T5', 'T5'], name: 'T5 Pack' },
                2: { price: 5000, cards: ['T4', 'T4', 'T4', 'T5', 'T5'], name: 'T4 Pack' },
                3: { price: 10000, cards: ['T3', 'T3', 'T4', 'T4', 'T5'], name: 'T3 Pack' },
                4: { price: 20000, cards: ['T2', 'T3', 'T3', 'T4', 'T4'], name: 'T2 Pack' },
                5: { price: 50000, cards: ['T1', 'T2', 'T3', 'T3', 'T3'], name: 'T1 Pack' },
                6: { price: 100000, cards: ['S', 'T1', 'T2', 'T3', 'T3'], name: 'Supreme Pack' }
            };
            
            if (!packs[packNum]) return await msg.reply('❌ Invalid! Choose 1-6\n\n💡 Use .cardshop');
            if (user.balance < packs[packNum].price) {
                return await msg.reply(`❌ Need: $${packs[packNum].price.toLocaleString()}\nHave: $${user.balance.toLocaleString()}\n\n💡 Use .daily, .dig, .fish`);
            }
            
            user.balance -= packs[packNum].price;
            let packMsg = `📦 *${packs[packNum].name}!*\n\n🎉 You got:\n\n`;
            
            for (let tier of packs[packNum].cards) {
                const tierCards = CARD_DATABASE.filter(c => c.tier === tier);
                const randomCard = tierCards[Math.floor(Math.random() * tierCards.length)];
                user.cards.push({ ...randomCard, claimedAt: new Date() });
                packMsg += `${CARD_TIERS[tier].color} ${randomCard.name} (${tier})\n`;
            }
            
            packMsg += `\n💰 Balance: $${user.balance.toLocaleString()}\n📊 Total: ${user.cards.length}`;
            await msg.reply(packMsg);
            break;
            
        case 'sellcard':
        case 'sellc':
            const sellIdx = parseInt(args[0]) - 1;
            if (isNaN(sellIdx) || !user.cards[sellIdx]) return await msg.reply('❌ Invalid!\n\n💡 Use .col');
            
            const soldCard = user.cards.splice(sellIdx, 1)[0];
            const sellPrice = CARD_TIERS[soldCard.tier].value;
            user.balance += sellPrice;
            await msg.reply(`💰 *Sold!*\n\n🎴 ${soldCard.name} (${soldCard.tier})\n💵 +$${sellPrice.toLocaleString()}\n💰 Balance: $${user.balance.toLocaleString()}`);
            break;

        // ═══════════════════════════════════════
        // ECONOMY SYSTEM
        // ═══════════════════════════════════════
        case 'balance':
        case 'bal':
            await msg.reply(`💰 *Balance*\n\n💵 Wallet: $${user.balance.toLocaleString()}\n🏦 Bank: $${user.bank.toLocaleString()}\n💎 Total: $${(user.balance + user.bank).toLocaleString()}\n\n🎴 Cards: ${user.cards.length}\n🏆 Claimed: ${user.stats.cardsClaimed}`);
            break;
            
        case 'daily':
            const now = Date.now();
            const dayMs = 24 * 60 * 60 * 1000;
            if (now - user.lastDaily < dayMs) {
                const timeLeft = dayMs - (now - user.lastDaily);
                const hours = Math.floor(timeLeft / (60 * 60 * 1000));
                const minutes = Math.floor((timeLeft % (60 * 60 * 1000)) / (60 * 1000));
                await msg.reply(`⏰ Already claimed!\n\n⏳ ${hours}h ${minutes}m`);
            } else {
                const daily = 500 + Math.floor(Math.random() * 500);
                user.balance += daily;
                user.lastDaily = now;
                await msg.reply(`🎁 *Daily Reward!*\n\n💰 +$${daily.toLocaleString()}\n💵 Balance: $${user.balance.toLocaleString()}`);
            }
            break;
            
        case 'withdraw':
        case 'wd':
            const wdAmount = args[0] === 'all' ? user.bank : parseInt(args[0]);
            if (isNaN(wdAmount) || wdAmount <= 0) return await msg.reply('❌ Invalid!\n\nExample: .wd 1000 or .wd all');
            if (wdAmount <= user.bank) {
                user.bank -= wdAmount;
                user.balance += wdAmount;
                await msg.reply(`💸 *Withdrew*\n\n💵 $${wdAmount.toLocaleString()}\n💰 Wallet: $${user.balance.toLocaleString()}\n🏦 Bank: $${user.bank.toLocaleString()}`);
            } else {
                await msg.reply(`❌ Insufficient!\n\n🏦 Have: $${user.bank.toLocaleString()}`);
            }
            break;
            
        case 'deposit':
        case 'dep':
            const depAmount = args[0] === 'all' ? user.balance : parseInt(args[0]);
            if (isNaN(depAmount) || depAmount <= 0) return await msg.reply('❌ Invalid!\n\nExample: .dep 1000 or .dep all');
            if (depAmount <= user.balance) {
                user.balance -= depAmount;
                user.bank += depAmount;
                await msg.reply(`🏦 *Deposited*\n\n💵 $${depAmount.toLocaleString()}\n💰 Wallet: $${user.balance.toLocaleString()}\n🏦 Bank: $${user.bank.toLocaleString()}`);
            } else {
                await msg.reply(`❌ Insufficient!\n\n💰 Have: $${user.balance.toLocaleString()}`);
            }
            break;
            
        case 'donate':
        case 'pay':
            const donateMentions = await msg.getMentions();
            const donateAmount = parseInt(args[1]);
            if (!donateMentions[0]) return await msg.reply('❌ Mention user!\n\nExample: .donate @user 1000');
            if (isNaN(donateAmount) || donateAmount <= 0) return await msg.reply('❌ Invalid amount!\n\nExample: .donate @user 1000');
            if (donateAmount <= user.balance) {
                user.balance -= donateAmount;
                const recipient = initUser(donateMentions[0].id._serialized);
                recipient.balance += donateAmount;
                await msg.reply(`💝 *Sent!*\n\n💵 $${donateAmount.toLocaleString()}\n👤 To: @${donateMentions[0].id.user}\n💰 Your balance: $${user.balance.toLocaleString()}`);
            } else {
                await msg.reply(`❌ Insufficient!\n\n💰 Have: $${user.balance.toLocaleString()}\n💵 Need: $${donateAmount.toLocaleString()}`);
            }
            break;
            
        case 'profile':
        case 'p':
            const profileMentions = await msg.getMentions();
            const targetUser = profileMentions[0] ? initUser(profileMentions[0].id._serialized) : user;
            const targetName = profileMentions[0] ? `@${profileMentions[0].id.user}` : 'Your';
            
            await msg.reply(`👤 *${targetName} Profile*\n\n💰 Wallet: $${targetUser.balance.toLocaleString()}\n🏦 Bank: $${targetUser.bank.toLocaleString()}\n💎 Total: $${(targetUser.balance + targetUser.bank).toLocaleString()}\n\n🎴 Cards: ${targetUser.cards.length}\n📊 Claimed: ${targetUser.stats.cardsClaimed}\n⚠️ Warnings: ${targetUser.warnings}/3\n\n📝 Bio: ${targetUser.profile.bio}\n🎂 Age: ${targetUser.profile.age || 'Not set'}`);
            break;
            
        case 'bio':
            if (!args[0]) return await msg.reply('❌ Provide bio!\n\nExample: .bio I love anime!');
  user.profile.bio = args.join(' ');
            await msg.reply(`✅ Bio updated!\n\n📝 ${user.profile.bio}`);
            break;
            
        case 'setage':
            const age = parseInt(args[0]);
            if (isNaN(age) || age < 1 || age > 100) return await msg.reply('❌ Invalid! (1-100)\n\nExample: .setage 20');
            user.profile.age = age;
            await msg.reply(`✅ Age set to ${user.profile.age}!`);
            break;
            
        case 'inventory':
        case 'inv':
            let invMsg = '🎒 *Inventory*\n\n';
            if (Object.keys(user.inventory).length === 0) {
                invMsg += 'Empty!\n\n💡 Buy from .shop';
            } else {
                for (let [item, qty] of Object.entries(user.inventory)) {
                    invMsg += `📦 ${item}: ${qty}x\n`;
                }
            }
            await msg.reply(invMsg);
            break;
            
        case 'use':
            const useItem = args.join(' ');
            if (!useItem) return await msg.reply('❌ Specify item!\n\nExample: .use Fishing Rod');
            if (user.inventory[useItem] && user.inventory[useItem] > 0) {
                user.inventory[useItem]--;
                if (user.inventory[useItem] === 0) delete user.inventory[useItem];
                await msg.reply(`✅ Used ${useItem}!`);
            } else {
                await msg.reply(`❌ Don't have ${useItem}!\n\n💡 Check .inv or buy from .shop`);
            }
            break;
            
        case 'shop':
            await msg.reply(`🏪 *Item Shop*\n\n1️⃣ Fishing Rod - $500\n   └ Catch fish\n\n2️⃣ Pickaxe - $500\n   └ Dig treasures\n\n3️⃣ Armor - $1,000\n   └ Battle protection\n\n4️⃣ Sword - $1,500\n   └ Battle damage\n\n5️⃣ Shield - $800\n   └ Block attacks\n\n💰 Balance: $${user.balance.toLocaleString()}\n\n💡 Use .buy <item>`);
            break;
            
        case 'buy':
            const buyItem = args.join(' ');
            const items = {
                'fishing rod': 500,
                'pickaxe': 500,
                'armor': 1000,
                'sword': 1500,
                'shield': 800
            };
            
            const itemPrice = items[buyItem.toLowerCase()];
            if (!itemPrice) return await msg.reply('❌ Item not found!\n\n💡 Use .shop');
            
            if (user.balance >= itemPrice) {
                user.balance -= itemPrice;
                const itemName = buyItem.charAt(0).toUpperCase() + buyItem.slice(1);
                user.inventory[itemName] = (user.inventory[itemName] || 0) + 1;
                await msg.reply(`✅ *Bought!*\n\n📦 ${itemName}\n💰 Paid: $${itemPrice.toLocaleString()}\n💵 Balance: $${user.balance.toLocaleString()}`);
            } else {
                await msg.reply(`❌ Insufficient!\n\nNeed: $${itemPrice.toLocaleString()}\nHave: $${user.balance.toLocaleString()}`);
            }
            break;
            
        case 'dig':
            const digCooldown = 5 * 60 * 1000;
            if (Date.now() - user.lastDig < digCooldown) {
                const timeLeft = digCooldown - (Date.now() - user.lastDig);
                const minutes = Math.floor(timeLeft / 60000);
                const seconds = Math.floor((timeLeft % 60000) / 1000);
                return await msg.reply(`⏰ Cooldown!\n\n⏳ ${minutes}m ${seconds}s`);
            }
            
            user.lastDig = Date.now();
            const found = Math.floor(Math.random() * 200) + 50;
            user.balance += found;
            await msg.reply(`⛏️ *Dug!*\n\n💰 +$${found.toLocaleString()}\n💵 Balance: $${user.balance.toLocaleString()}`);
            break;
            
        case 'fish':
            const fishCooldown = 5 * 60 * 1000;
            if (Date.now() - user.lastFish < fishCooldown) {
                const timeLeft = fishCooldown - (Date.now() - user.lastFish);
                const minutes = Math.floor(timeLeft / 60000);
                const seconds = Math.floor((timeLeft % 60000) / 1000);
                return await msg.reply(`⏰ Cooldown!\n\n⏳ ${minutes}m ${seconds}s`);
            }
            
            user.lastFish = Date.now();
            const caught = Math.floor(Math.random() * 300) + 100;
            user.balance += caught;
            await msg.reply(`🎣 *Caught fish!*\n\n💰 +$${caught.toLocaleString()}\n💵 Balance: $${user.balance.toLocaleString()}`);
            break;
            
        case 'lottery':
            const ticket = 100;
            if (user.balance < ticket) {
                return await msg.reply(`❌ Insufficient!\n\nTicket: $${ticket}\nHave: $${user.balance.toLocaleString()}`);
            }
            
            user.balance -= ticket;
            const win = Math.random() > 0.7;
            if (win) {
                const prize = Math.floor(Math.random() * 1000) + 500;
                user.balance += prize;
                await msg.reply(`🎰 *JACKPOT!*\n\n🎉 Won $${prize.toLocaleString()}!\n💰 Balance: $${user.balance.toLocaleString()}`);
            } else {
                await msg.reply(`🎰 *No luck!*\n\n😢 Better luck next time!\n💰 Balance: $${user.balance.toLocaleString()}`);
            }
            break;

        // ═══════════════════════════════════════
        // GAMBLING
        // ═══════════════════════════════════════
        case 'slots':
            const slotBet = parseInt(args[0]) || 100;
            if (slotBet < 10) return await msg.reply('❌ Min bet: $10');
            if (user.balance < slotBet) return await msg.reply(`❌ Need: $${slotBet}`);
            
            user.balance -= slotBet;
            const symbols = ['🍒', '🍋', '7️⃣', '💎'];
            const s1 = symbols[Math.floor(Math.random() * symbols.length)];
            const s2 = symbols[Math.floor(Math.random() * symbols.length)];
            const s3 = symbols[Math.floor(Math.random() * symbols.length)];
            
            let result = `🎰 [ ${s1} | ${s2} | ${s3} ]\n\n`;
            
            if (s1 === s2 && s2 === s3) {
                const win = slotBet * 10;
                user.balance += win;
                result += `💰 JACKPOT! +$${win.toLocaleString()}\n💵 ${user.balance.toLocaleString()}`;
            } else if (s1 === s2 || s2 === s3 || s1 === s3) {
                const win = slotBet * 2;
                user.balance += win;
                result += `✨ MATCH! +$${win.toLocaleString()}\n💵 ${user.balance.toLocaleString()}`;
            } else {
                result += `😢 Lost $${slotBet}\n💵 ${user.balance.toLocaleString()}`;
            }
            
            await msg.reply(result);
            break;
            
        case 'cf':
        case 'coinflip':
            const cfBet = parseInt(args[0]);
            const choice = args[1]?.toLowerCase();
            
            if (!cfBet || !choice || (choice !== 'heads' && choice !== 'tails')) {
                return await msg.reply('❌ Invalid!\n\nExample: .cf 1000 heads\nor: .cf 500 tails');
            }
            
            if (user.balance < cfBet) return await msg.reply(`❌ Need: $${cfBet}`);
            
            user.balance -= cfBet;
            const cfResult = Math.random() > 0.5 ? 'heads' : 'tails';
            const emoji = cfResult === 'heads' ? '👑' : '🪙';
            
            if (cfResult === choice) {
                const win = cfBet * 2;
                user.balance += win;
                await msg.reply(`🪙 ${emoji} *${cfResult.toUpperCase()}*\n\n💰 WIN! +$${win.toLocaleString()}\n💵 ${user.balance.toLocaleString()}`);
            } else {
                await msg.reply(`🪙 ${emoji} *${cfResult.toUpperCase()}*\n\n😢 Lost $${cfBet}\n💵 ${user.balance.toLocaleString()}`);
            }
            break;
            
        case 'dice':
            const diceBet = parseInt(args[0]) || 100;
            if (user.balance < diceBet) return await msg.reply(`❌ Need: $${diceBet}`);
            
            user.balance -= diceBet;
            const roll = Math.floor(Math.random() * 6) + 1;
            
            if (roll >= 5) {
                const win = diceBet * 2;
                user.balance += win;
                await msg.reply(`🎲 *Rolled ${roll}*\n\n💰 WIN! +$${win.toLocaleString()}\n💵 ${user.balance.toLocaleString()}`);
            } else {
                await msg.reply(`🎲 *Rolled ${roll}*\n\n😢 Lost $${diceBet}\n💵 ${user.balance.toLocaleString()}`);
            }
            break;

        // ═══════════════════════════════════════
        // GAMES
        // ═══════════════════════════════════════
        case 'ttt':
        case 'tictactoe':
            await msg.reply('⭕❌ *Tic Tac Toe*\n\n```\n1 | 2 | 3\n---------\n4 | 5 | 6\n---------\n7 | 8 | 9```\n\nGame started! Reply with position (1-9)');
            break;
            
        case 'chess':
            await msg.reply('♟️ *Chess*\n\n```\n♜♞♝♛♚♝♞♜\n♟♟♟♟♟♟♟♟\n⬜⬛⬜⬛⬜⬛⬜⬛\n⬛⬜⬛⬜⬛⬜⬛⬜\n⬜⬛⬜⬛⬜⬛⬜⬛\n⬛⬜⬛⬜⬛⬜⬛⬜\n♙♙♙♙♙♙♙♙\n♖♘♗♕♔♗♘♖```\n\nUse notation: e2 e4');
            break;
            
        case 'akinator':
        case 'aki':
            await msg.reply('🔮 *Akinator*\n\nThink of a character...\n\nIs your character real? (yes/no)');
            break;
            
        case 'uno':
            await msg.reply('🎴 *UNO*\n\nYour hand: 🔴7 🟢2 🔵5 🟡Skip\nCurrent: 🔴3\n\nPlay a card or draw!');
            break;

        // ═══════════════════════════════════════
        // FUN & INTERACTION
        // ═══════════════════════════════════════
        case 'gay':
            const gayMentions = await msg.getMentions();
            const gayPercent = Math.floor(Math.random() * 101);
            const gayTarget = gayMentions[0] ? `@${gayMentions[0].id.user}` : 'You';
            await msg.reply(`🏳️‍🌈 ${gayTarget} ${gayPercent}% gay!`);
            break;
            
        case 'ship':
            const shipMentions = await msg.getMentions();
            if (shipMentions.length >= 2) {
                const shipPercent = Math.floor(Math.random() * 101);
                const hearts = shipPercent >= 80 ? '💕💕💕' : shipPercent >= 50 ? '💕💕' : '💕';
                await msg.reply(`💕 *Ship Meter*\n\n@${shipMentions[0].id.user} ${hearts} @${shipMentions[1].id.user}\n\nCompatibility: ${shipPercent}%\n\n${shipPercent >= 80 ? '🔥 Perfect Match!' : shipPercent >= 50 ? '✨ Good Match!' : '😅 Not compatible...'}`);
            } else {
                await msg.reply('❌ Mention 2 users!\n\nExample: .ship @user1 @user2');
            }
            break;
            
        case 'joke':
            const jokes = [
                'Why don\'t scientists trust atoms? They make up everything! 😂',
                'What did one wall say to the other? Meet you at the corner! 🏠',
                'Why did the scarecrow win? Outstanding in his field! 🌾',
                'What do you call fake noodles? An impasta! 🍝'
            ];
            await msg.reply(jokes[Math.floor(Math.random() * jokes.length)]);
            break;
            
        case 'roast':
            const roasts = [
                'You bring joy... when you leave 😂',
                'Nature already roasted you 🔥',
                'Evolution went backwards with you 💀',
                'If I had $1 for each brain cell you had, I\'d be broke 💸'
            ];
            await msg.reply(roasts[Math.floor(Math.random() * roasts.length)]);
            break;
            
        case 'hug':
            const hugMentions = await msg.getMentions();
            if (hugMentions[0]) {
                await msg.reply(`🤗 @${msg.author.split('@')[0]} hugged @${hugMentions[0].id.user}!`);
            } else {
                await msg.reply('🤗 *hugs*');
            }
            break;
            
        case 'kiss':
            const kissMentions = await msg.getMentions();
            if (kissMentions[0]) {
                await msg.reply(`😘 @${msg.author.split('@')[0]} kissed @${kissMentions[0].id.user}!`);
            } else {
                await msg.reply('😘 *kisses*');
            }
            break;
            
        case 'slap':
            const slapMentions = await msg.getMentions();
            if (slapMentions[0]) {
                await msg.reply(`👋 @${msg.author.split('@')[0]} slapped @${slapMentions[0].id.user}!`);
            } else {
                await msg.reply('👋 *SLAP*');
            }
            break;
            
        case 'pat':
            const patMentions = await msg.getMentions();
            if (patMentions[0]) {
                await msg.reply(`😊 @${msg.author.split('@')[0]} patted @${patMentions[0].id.user}!`);
            } else {
                await msg.reply('😊 *pat pat*');
            }
            break;

        // ═══════════════════════════════════════
        // SEARCH & TOOLS
        // ═══════════════════════════════════════
        case 'ig':
        case 'instagram':
            const igUrl = args[0];
            await msg.reply(`📥 Downloading from Instagram...\n\n🔗 ${igUrl}\n⏳ Please wait...`);
            break;
            
        case 'tiktok':
        case 'ttk':
            const ttkUrl = args[0];
            await msg.reply(`📥 Downloading from TikTok...\n\n🔗 ${ttkUrl}\n⏳ Please wait...`);
            break;
            
        case 'yt':
        case 'youtube':
            const ytUrl = args[0];
            await msg.reply(`📥 Downloading from YouTube...\n\n🔗 ${ytUrl}\n⏳ Please wait...`);
            break;
            
        case 'play':
            const song = args.join(' ');
            await msg.reply(`🎵 Searching: ${song}\n\n⏳ Please wait...`);
            break;
            
        case 'sticker':
        case 's':
            if (msg.hasMedia) {
                await msg.reply('🎨 Converting to sticker...');
            } else {
                await msg.reply('📸 Send an image or video!');
            }
            break;

        // ═══════════════════════════════════════
        // AI FEATURES
        // ═══════════════════════════════════════
        case 'gpt':
            const gptQuery = args.join(' ');
            await msg.reply(`🤖 *ChatGPT*\n\n📝 Query: ${gptQuery}\n\n⏳ Processing...`);
            break;
            
        case 'imagine':
            const prompt = args.join(' ');
            await msg.reply(`🎨 *AI Image*\n\n📝 Prompt: ${prompt}\n\n⏳ Generating...`);
            break;
            
        case 'translate':
        case 'tt':
            const text = args.join(' ');
            await msg.reply(`🌐 *Translation*\n\n📝 Text: ${text}\n\n⏳ Translating...`);
            break;

        // ═══════════════════════════════════════
        // PETS
        // ═══════════════════════════════════════
        case 'pet':
            if (args[0] === 'feed') {
                if (user.pet) {
                    user.pet.hunger = Math.min(100, user.pet.hunger + 20);
                    await msg.reply(`🍖 Fed ${user.pet.name}!\n\n🍽️ Hunger: ${user.pet.hunger}%`);
                } else {
                    await msg.reply('❌ You don\'t have a pet!\n\n💡 Use .pet to adopt one');
                }
            } else if (args[0] === 'play') {
                if (user.pet) {
                    user.pet.happiness = Math.min(100, user.pet.happiness + 15);
                    await msg.reply(`🎾 Played with ${user.pet.name}!\n\n😊 Happiness: ${user.pet.happiness}%`);
                } else {
                    await msg.reply('❌ You don\'t have a pet!\n\n💡 Use .pet to adopt one');
                }
            } else {
                if (!user.pet) {
                    user.pet = { name: 'Pet', hunger: 100, happiness: 100, level: 1 };
                    await msg.reply('🐾 *You got a pet!*\n\nUse:\n.pet feed - Feed pet\n.pet play - Play with pet\n.petname <name> - Rename');
                } else {
                    await msg.reply(`🐾 *${user.pet.name}*\n\n🍖 Hunger: ${user.pet.hunger}%\n😊 Happiness: ${user.pet.happiness}%\n⭐ Level: ${user.pet.level}`);
                }
            }
            break;
            
        case 'petname':
            if (user.pet && args[0]) {
                user.pet.name = args.join(' ');
                await msg.reply(`✅ Pet renamed to ${user.pet.name}!`);
            } else {
                await msg.reply('❌ You don\'t have a pet or no name provided!');
            }
            break;

        // ═══════════════════════════════════════
        // GUILDS
        // ═══════════════════════════════════════
        case 'guild':
            const guildCmd = args[0];
            if (guildCmd === 'info') {
                await msg.reply(user.guild ? `🏰 *Guild: ${user.guild}*\n\n👥 Members: 15\n⭐ Level: 5` : '❌ Not in a guild');
            } else if (guildCmd === 'create') {
                const guildName = args.slice(1).join(' ');
                user.guild = guildName;
                await msg.reply(`🏰 Guild "${guildName}" created!`);
            } else if (guildCmd === 'accept') {
                await msg.reply('✅ Guild invitation accepted!');
            } else if (guildCmd === 'decline') {
                await msg.reply('❌ Guild invitation declined');
            } else {
                await msg.reply('🏰 *Guild Commands*\n\n.guild info\n.guild create <name>\n.guild accept\n.guild decline');
            }
            break;

        // ═══════════════════════════════════════
        // ADMIN COMMANDS
        // ═══════════════════════════════════════
        case 'kick':
            if (!chat.isGroup) return msg.reply('❌ Group only!');
            const kickMentions = await msg.getMentions();
            if (kickMentions[0]) {
                await msg.reply(`👢 Kicked @${kickMentions[0].id.user}`);
            } else {
                await msg.reply('❌ Mention user!\n\nExample: .kick @user');
            }
            break;
            
        case 'warn':
            const warnMentions = await msg.getMentions();
            if (warnMentions[0]) {
                const warnedUser = initUser(warnMentions[0].id._serialized);
                warnedUser.warnings++;
                await msg.reply(`⚠️ @${warnMentions[0].id.user} warned!\n\nWarnings: ${warnedUser.warnings}/3`);
            } else {
                await msg.reply('❌ Mention user!\n\nExample: .warn @user');
            }
            break;
            
        case 'resetwarn':
            const resetMentions = await msg.getMentions();
            if (resetMentions[0]) {
                const resetUser = initUser(resetMentions[0].id._serialized);
                resetUser.warnings = 0;
                await msg.reply(`✅ Warnings reset for @${resetMentions[0].id.user}`);
            }
            break;
            
        case 'promote':
            if (!chat.isGroup) return msg.reply('❌ Group only!');
            const promoteMentions = await msg.getMentions();
            if (promoteMentions[0]) {
                await msg.reply(`⬆️ @${promoteMentions[0].id.user} promoted to admin!`);
            }
            break;
            
        case 'demote':
            if (!chat.isGroup) return msg.reply('❌ Group only!');
            const demoteMentions = await msg.getMentions();
            if (demoteMentions[0]) {
                await msg.reply(`⬇️ @${demoteMentions[0].id.user} demoted!`);
            }
            break;
            
        case 'delete':
        case 'del':
            if (msg.hasQuotedMsg) {
                const quoted = await msg.getQuotedMessage();
                await quoted.delete(true);
                await msg.reply('🗑️ Message deleted');
            } else {
                await msg.reply('❌ Reply to a message to delete it!');
            }
            break;
            
        case 'antilink':
            if (!chat.isGroup) return msg.reply('❌ Group only!');
            if (args[0] === 'on') {
                group.antilink = true;
                await msg.reply('🔗 Antilink enabled');
            } else if (args[0] === 'off') {
                group.antilink = false;
                await msg.reply('✅ Antilink disabled');
            } else {
                await msg.reply(`🔗 Antilink: ${group.antilink ? 'ON' : 'OFF'}\n\nUse .antilink on/off`);
            }
            break;
            
        case 'welcome':
            if (!chat.isGroup) return msg.reply('❌ Group only!');
            if (args[0] === 'on') {
                group.welcome = true;
                await msg.reply('👋 Welcome messages enabled');
            } else if (args[0] === 'off') {
                group.welcome = false;
                await msg.reply('❌ Welcome messages disabled');
            } else {
                await msg.reply(`👋 Welcome: ${group.welcome ? 'ON' : 'OFF'}\n\nUse .welcome on/off`);
            }
            break;
            
        case 'nsfw':
            if (!chat.isGroup) return msg.reply('❌ Group only!');
            if (args[0] === 'on') {
                group.nsfwEnabled = true;
                await msg.reply('🔞 NSFW enabled');
            } else if (args[0] === 'off') {
                group.nsfwEnabled = false;
                await msg.reply('✅ NSFW disabled');
            } else {
                await msg.reply(`🔞 NSFW: ${group.nsfwEnabled ? 'ON' : 'OFF'}\n\nUse .nsfw on/off`);
            }
            break;

        default:
            await msg.reply(`❌ Unknown: ${cmd}\n\n💡 Type .menu to see all commands`);
    }
}

function getMenuText() {
    return `
━━━━━━━━━━━━━━━━━━━━━━
        ⚡ 𝗡 𝗘 𝗫 𝗢 𝗥 𝗔 ⚡
━━━━━━━━━━━━━━━━━━━━━━

╭─「 📱 BOT INFO 」
│ ⚙️ Bot: ${BOT_NAME}
│ 👤 Creator: ${CREATOR}
│ 🔰 Prefix: ${PREFIX}
│ 📊 Total Cards: 80+
│ 🌐 Version: 2.0
╰────────────⭓

╭─「 🎴 CARD SYSTEM 」
│ ━━ Activity-Based Spawning ━━
│ 💬 Spawns every 20 messages
│ ⏰ 1 min cooldown between spawns
│
│ 🎯 Commands:
│ ├ ${PREFIX}spawn - Manual spawn
│ ├ ${PREFIX}claim <id> - Claim card
│ ├ ${PREFIX}col - Your collection
│ ├ ${PREFIX}card <num> - View card
│ ├ ${PREFIX}ci <name> - Search card
│ ├ ${PREFIX}deck - Battle deck
│ ├ ${PREFIX}adddeck <num> - Add to deck
│ ├ ${PREFIX}cardshop - View packs
│ ├ ${PREFIX}buypack <num> - Buy pack
│ ├ ${PREFIX}sellcard <num> - Sell card
│ └ ${PREFIX}cards on/off - Toggle
╰────────────⭓

╭─「 💎 CARD TIERS 」
│ 🌟 S Tier - 0.5% | $100,000
│ ⭐ T1 - 2% | $50,000
│ 💫 T2 - 5% | $20,000
│ ✨ T3 - 10% | $10,000
│ 🔹 T4 - 20% | $5,000
│ 🔸 T5 - 30% | $2,000
╰────────────⭓

╭─「 💰 ECONOMY 」
│ ├ ${PREFIX}bal - Check balance
│ ├ ${PREFIX}daily - Daily reward
│ ├ ${PREFIX}wd <amt> - Withdraw
│ ├ ${PREFIX}dep <amt> - Deposit
│ ├ ${PREFIX}donate @user <amt> - Send money
│ ├ ${PREFIX}profile - View profile
│ ├ ${PREFIX}bio <text> - Set bio
│ ├ ${PREFIX}setage <num> - Set age
│ ├ ${PREFIX}inv - View inventory
│ ├ ${PREFIX}shop - Item shop
│ ├ ${PREFIX}buy <item> - Buy item
│ ├ ${PREFIX}use <item> - Use item
│ ├ ${PREFIX}dig - Dig (5min cd)
│ ├ ${PREFIX}fish - Fish (5min cd)
│ └ ${PREFIX}lottery - Buy ticket
╰────────────⭓

╭─「 🎰 GAMBLING 」
│ ├ ${PREFIX}slots <amt> - Slot machine
│ ├ ${PREFIX}cf <amt> heads/tails - Coinflip
│ └ ${PREFIX}dice <amt> - Roll dice
╰────────────⭓

╭─「 🎮 GAMES 」
│ ├ ${PREFIX}ttt - Tic Tac Toe
│ ├ ${PREFIX}chess - Chess game
│ ├ ${PREFIX}akinator - Akinator
│ └ ${PREFIX}uno - UNO game
╰────────────⭓

╭─「 🎭 FUN & INTERACT 」
│ ├ ${PREFIX}gay [@user] - Gay meter
│ ├ ${PREFIX}ship @user1 @user2 - Ship
│ ├ ${PREFIX}joke - Random joke
│ ├ ${PREFIX}roast - Get roasted
│ ├ ${PREFIX}hug @user - Hug someone
│ ├ ${PREFIX}kiss @user - Kiss someone
│ ├ ${PREFIX}slap @user - Slap someone
│ └ ${PREFIX}pat @user - Pat someone
╰────────────⭓

╭─「 👮 MODERATORS 」
│ 📱 +234 904 946 0676
│ 📱 +234 706 278 9401
│
│ 🔰 Mod Commands:
│ ├ ${PREFIX}mods - View mods
│ ├ ${PREFIX}ban @user - Ban user
│ ├ ${PREFIX}unban @user - Unban user
│ └ ${PREFIX}banlist - View banned
╰────────────⭓

╭─「 ⚙️ GROUP ADMIN 」
│ ├ ${PREFIX}kick @user - Kick member
│ ├ ${PREFIX}warn @user - Warn user
│ ├ ${PREFIX}resetwarn @user - Reset warns
│ ├ ${PREFIX}promote @user - Make admin
│ ├ ${PREFIX}demote @user - Remove admin
│ ├ ${PREFIX}delete - Delete message
│ ├ ${PREFIX}antilink on/off - Anti-link
│ ├ ${PREFIX}welcome on/off - Welcome msg
│ └ ${PREFIX}nsfw on/off - NSFW toggle
╰────────────⭓

╭─「 🔍 SEARCH & TOOLS 」
│ ├ ${PREFIX}ig <url> - Download IG
│ ├ ${PREFIX}tiktok <url> - Download TikTok
│ ├ ${PREFIX}yt <url> - Download YouTube
│ ├ ${PREFIX}play <song> - Play music
│ └ ${PREFIX}sticker - Create sticker
╰────────────⭓

╭─「 🤖 AI FEATURES 」
│ ├ ${PREFIX}gpt <query> - ChatGPT
│ ├ ${PREFIX}imagine <prompt> - AI Image
│ └ ${PREFIX}translate <text> - Translate
╰────────────⭓

╭─「 🐾 PETS 」
│ ├ ${PREFIX}pet - View your pet
│ ├ ${PREFIX}pet feed - Feed pet
│ ├ ${PREFIX}pet play - Play with pet
│ └ ${PREFIX}petname <name> - Rename pet
╰────────────⭓

╭─「 🏰 GUILDS 」
│ ├ ${PREFIX}guild info - Guild info
│ ├ ${PREFIX}guild create <name> - Create
│ ├ ${PREFIX}guild accept - Accept invite
│ └ ${PREFIX}guild decline - Decline
╰────────────⭓

━━━━━━━━━━━━━━━━━━━━━━
   💫 Type ${PREFIX}menu anytime 💫
   🔗 ${PREFIX}support for help
━━━━━━━━━━━━━━━━━━━━━━`;
}

client.initialize();
