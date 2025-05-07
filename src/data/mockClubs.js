/* mockClubs.js */
import sampleClubIcon from '../assets/board-logo.png';
import defaultLeaderPic from '../assets/leader.jpeg';
import sampleBoardGamesEventBanner from '../assets/board-event-banner.png';
import sampleCCSCEventBanner from '../assets/ccsc-event-banner.png';
import sampleITEventBanner from '../assets/it-event-banner.png';
import sampleArtEventBanner from '../assets/art-event-banner.png';

const mockEvents = [
    {
        id: 1,
        name: "Board Games Night",
        imageUrl: sampleBoardGamesEventBanner,
        description: `🎲 Welcome to Board Games Night — where strategy meets laughter and epic moments are made around the table! 🎲

Join us for an exciting evening hosted by the Board Games Club at Curtin Singapore. Whether you're a tactical mastermind or just here to roll the dice and have fun, this night is all about great games and even greater company.

Expect a carefully selected mix of classics and modern hits, from the trading tactics of Catan and the wordplay of Codenames, to the wild chaos of Exploding Kittens and other surprise favorites.

📌 What’s on the table:
- A diverse collection of games for all skill levels
- Easy rule explanations — no experience needed!
- A relaxed, social vibe perfect for making new friends
- Space to bring your own games and teach others
- Lots of laughs, snacks, and shared moments

Don’t miss out — grab a seat, roll the dice, and let the games begin!`,
        date: "2025-04-20",
        time: "06:00 PM",
        place: "Curtin Singapore",
        unit: "Unihub+",
        club: {
            name: "Board Games Club",
            logoUrl: "https://i.imgur.com/IquR4rn.png"
        }
    },
    {
        id: 2,
        name: "Curtin Community Volunteering Fair",
        imageUrl: sampleCCSCEventBanner,
        description: "Discover how you can make a real difference at the Curtin Community Volunteering Fair!",
        date: "2025-05-10",
        time: "10:00 AM",
        place: "Curtin Singapore",
        unit: "312",
        club: {
            name: "CCSC",
            logoUrl: "https://i.imgur.com/OFYpDfS.png"
        }
    },
    {
        id: 3,
        name: "Annual Hackathon Showdown",
        imageUrl: sampleITEventBanner,
        description: "Get ready to code, collaborate, and conquer! Join our 24-hour coding marathon.",
        date: "2025-06-15",
        time: "08:00 AM",
        place: "Curtin Singapore",
        unit: "201",
        club: {
            name: "IT Club",
            logoUrl: "https://i.imgur.com/oIeX78g.png"
        }
    },
    {
        id: 4,
        name: "Curtin Arts Festival 2025",
        imageUrl: sampleArtEventBanner,
        description: "Celebrate creativity at the Curtin Arts Festival with workshops, live painting sessions, and more!",
        date: "2025-04-20",
        time: "12:00 PM",
        place: "Curtin Singapore",
        unit: "Unihub+",
        club: {
            name: "Art Society",
            logoUrl: "https://i.imgur.com/SXbupr8.png"
        }
    }
];

const mockClubs = [
    {
        name: 'Board Games Club',
        bannerUrl: 'https://i.imgur.com/UXpOp6P.png',
        logoUrl: sampleClubIcon,
        description: `🎲 Welcome to the Board Game Club — where strategy meets laughter, and friendships are forged over cardboard battlefields! 🎲

Join us for an unforgettable evening filled with excitement, challenge, and pure tabletop fun! Whether you're a seasoned board game strategist or just beginning your adventure into the world of meeples, dice, and cards, our club offers something for everyone.

Each session brings together a passionate community of players eager to explore both timeless classics and modern masterpieces. From high-stakes social deduction games and fast-paced party hits, to deep, brain-burning strategy games — we carefully curate a mix that guarantees you'll always find something you love (or something new to get obsessed with!).

📌 What to Expect:
- A wide variety of games — from Catan, Wingspan, and Azul to hidden gems and indie titles
- Friendly, welcoming atmosphere for all skill levels
- Game tutorials and rule explanations (no prior knowledge needed!)
- Opportunities to bring and share your own favorite games
- Themed nights, tournaments, and special challenges throughout the year
- Snacks, great conversation, and lots of laughter

🕖 When: 6:00 PM, April 20, 2025  
📍 Where: Curtin Singapore, Unihub+

Ready to roll the dice? Your seat at the table is waiting!`,
        leaderName: 'Hans Hartowidjojo',
        leaderId: '234607',
        leaderPhoto: defaultLeaderPic,
        roles: [
            { id: 1, name: "Vice President", assignedMember: null },
            { id: 2, name: "Treasurer", assignedMember: { id: "234609", name: "Emily Johnson" } },
            {
                id: 101,
                name: "Event Coordinator", 
                assignedMember: {          
                    id: "234609",
                    name: "Emily Johnson"
                }
            }
        ],
        events: [
            { id: 1, title: 'Catan Tournament', date: 'April 15, 2025' },
            { id: 2, title: 'Board Game Night', date: 'April 22, 2025' }
        ]
    },
    {
        name: 'CCSC',
        bannerUrl: 'https://i.imgur.com/87INjr7.png',
        logoUrl: sampleClubIcon,
        description: 'Curtin Computing Students Club: for all IT and computing enthusiasts, networking, workshops, and tech talks.',
        leaderName: 'Tom Wu',
        leaderPhoto: 'https://i.imgur.com/kqLZxZT.jpeg',
        events: []
    },
    {
        name: 'IT Club',
        bannerUrl: 'https://i.imgur.com/chZp8k7.png',
        logoUrl: sampleClubIcon,
        description: 'Dedicated to IT students. Join coding sessions, hackathons, and tech events to sharpen your skills.',
        leaderName: 'Emily Zhang',
        leaderPhoto: 'https://i.imgur.com/kqLZxZT.jpeg',
        events: [
            { id: 3, title: 'Hackathon 2025', date: 'May 3, 2025' }
        ]
    },
    {
        name: 'Art Society',
        bannerUrl: 'https://i.imgur.com/LArlm9Z.png',
        logoUrl: sampleClubIcon,
        description: 'For creative artists, painters, and designers. Attend workshops, exhibitions, and showcase your talent.',
        leaderName: 'Lucas Tan',
        leaderPhoto: 'https://i.imgur.com/kqLZxZT.jpeg',
        events: []
    },
    {
        name: 'Music Club',
        bannerUrl: 'https://i.imgur.com/AEShXl2.png',
        logoUrl: sampleClubIcon,
        description: 'Dedicated to musicians and performers interested in jamming, composing, and live events.',
        leaderName: 'Sophia Lee',
        leaderPhoto: 'https://i.imgur.com/kqLZxZT.jpeg',
        events: [
            { id: 4, title: 'Jam Night', date: 'April 29, 2025' }
        ]
    },
    {
        name: 'Curtin Sports',
        bannerUrl: 'https://i.imgur.com/46w02QX.png',
        logoUrl: sampleClubIcon,
        description: 'Join sports activities, tournaments, and fitness sessions. All levels welcome!',
        leaderName: 'Michael Chen',
        leaderPhoto: 'https://i.imgur.com/kqLZxZT.jpeg',
        events: []
    },
    {
        name: 'Future Chefs',
        bannerUrl: 'https://i.imgur.com/58i0x0k.png',
        logoUrl: sampleClubIcon,
        description: 'Learn culinary skills, exchange recipes, and participate in cooking competitions to become a master chef.',
        leaderName: 'Isabella Tan',
        leaderPhoto: 'https://i.imgur.com/kqLZxZT.jpeg',
        events: []
    },
    {
        name: 'Esports Club',
        bannerUrl: 'https://i.imgur.com/kKQuIQ5.png',
        logoUrl: sampleClubIcon,
        description: 'For competitive gamers. Engage in tournaments, strategy sessions, and team matches.',
        leaderName: 'David Park',
        leaderPhoto: 'https://i.imgur.com/kqLZxZT.jpeg',
        events: [
            { id: 5, title: 'Valorant Tournament', date: 'May 10, 2025' }
        ]
    },
    {
        name: 'Chess Club',
        bannerUrl: 'https://i.imgur.com/w5BFPFc.png',
        logoUrl: sampleClubIcon,
        description: 'Sharpen your strategic thinking with weekly chess matches, coaching, and competitions.',
        leaderName: 'Anna Kim',
        leaderPhoto: 'https://i.imgur.com/kqLZxZT.jpeg',
        events: []
    },
    {
        name: 'Movie Critics Club',
        bannerUrl: 'https://i.imgur.com/64gR5Uo.jpg',
        logoUrl: sampleClubIcon,
        description: 'Discuss, analyze, and critique the latest films. Explore cinematography, storytelling, and film theory.',
        leaderName: 'Ethan Ong',
        leaderPhoto: 'https://i.imgur.com/kqLZxZT.jpeg',
        events: []
    },
    {
        name: 'Underwater Fishes',
        bannerUrl: 'https://i.imgur.com/tDaZLt7.png',
        logoUrl: sampleClubIcon,
        description: 'Dive into adventure, explore marine life, and learn scuba diving skills with experienced divers.',
        leaderName: 'Chloe Low',
        leaderPhoto: 'https://i.imgur.com/kqLZxZT.jpeg',
        events: []
    },
    {
        name: 'Photography Enthusiasts',
        bannerUrl: 'https://i.imgur.com/4yg5DDu.png',
        logoUrl: sampleClubIcon,
        description: "Capture moments, learn photography techniques, and join photo walks and editing workshops.",
        leaderName: 'Nathan Sim',
        leaderPhoto: 'https://i.imgur.com/kqLZxZT.jpeg',
        events: [
            { id: 6, title: 'Nature Photo Walk', date: 'May 18, 2025' }
        ]
    }
];

// Function to merge events into clubs based on matching club names
const distributeEventsToClubs = (clubs, events) => {
    return clubs.map(club => {
        const clubEvents = events.filter(event =>
            event.club.name.toLowerCase() === club.name.toLowerCase()
        );
        const formattedEvents = clubEvents.map(evt => ({
            id: evt.id,
            title: evt.name,
            date: evt.date,
            time: evt.time,
            description: evt.description,
            bannerUrl: evt.imageUrl,
            place: evt.place,
            unit: evt.unit,
            club: evt.club
        }));
        return { ...club, events: formattedEvents };
    });
};

const clubsWithEvents = distributeEventsToClubs(mockClubs, mockEvents);

export default clubsWithEvents;