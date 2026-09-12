// ============================================================
// REPLACE WITH YOUR OWN CONTENT
// This is the single file you need to edit to personalise
// the entire website. Every section pulls from here.
// ============================================================

// -- Opening screen ------------------------------------------
export const opening = {
  headline: "I wanted to make you something no one else could send you.",
  buttonText: "Come inside",
};

// -- Time zones ----------------------------------------------
export const timeZones = {
  caption: "Now neither of us has to ask what time it is.",
  zones: [
    { label: "Singapore", timezone: "Asia/Singapore" },
    { label: "India", timezone: "Asia/Kolkata" },
  ] as const,
};

// -- Things I notice about you --------------------------------
export const thingsINotice = [
  "How deeply you feel things, even when you pretend they're not affecting you.",
  "The way you remember tiny details about people you care about.",
  "How you want to share every little thing with someone once they become yours.",
  "The way you can be fiercely independent and still secretly want to be taken care of.",
  "How much respect matters to you, even underneath all the teasing and chaos.",
  "The way you turn completely ordinary conversations into something I keep thinking about later.",
  "How you get shy the second someone sees a little too much of the real you.",
  "The way you feel everything intensely: love, anger, excitement, affection, all of it.",
  "How you'll send me something random just because your first thought was that I should see it too.",
  "The way you make room for me in your day without making a big deal out of it.",
  "How you can go from a deep conversation about life to absolute nonsense in five seconds.",
  "The way you want to be understood, not just listened to.",
  "How you care for people even when you're exhausted from caring too much.",
  "The way you're learning to choose yourself without becoming any less loving.",
  "How your soft side appears right after you've spent ten minutes pretending you're tough.",
  "The way your shyness and your wild side somehow exist in the exact same person.",
  "How you make me want to tell you about things I normally wouldn't think were worth sharing.",
  "The way you somehow became part of the small, ordinary moments of my day.",
];

// -- Our little timeline --------------------------------------
export interface TimelineMoment {
  date: string;
  title: string;
  quote: string;
  description: string;
  image?: string; // path relative to public/, e.g. "images/moment1.jpg"
  location?: string;
  isClosing?: boolean;
}

export const timeline: TimelineMoment[] = [
  {
    date: "2016",
    title: "When we first met",
    quote: "Back then, you were just someone I knew from college. I had no idea you'd end up meaning this much to me.",
    description:
      "We met in college in 2016. At that time, there was nothing dramatic about it. Just two people crossing paths, living their own lives, not knowing that years later we'd be this close.",
  },
  {
    date: "2018",
    title: "College ended, but not the story",
    quote: "We graduated and went our separate ways, but somehow you never completely disappeared from my life.",
    description:
      "College ended in 2018. Life moved on, everyone got busy, and things changed. We weren't talking all the time, but you were still somewhere in the background of my life.",
  },
  {
    date: "2020",
    title: "Then COVID happened",
    quote: "The whole world stopped, and somehow we started talking more.",
    description:
      "We were both stuck at home, everything outside felt paused, and that's when our conversations really started growing. What began casually slowly became longer calls, more random messages, more sharing, more knowing each other properly.",
  },
  {
    date: "During lockdown",
    title: "The endless conversations",
    quote: "Somewhere between being stuck at home and talking for hours, I started seeing a version of you I had never known before.",
    description:
      "We talked about everything. Random things, life, people, feelings, stupid stuff, serious stuff. There was always one more thing to say. And somehow, talking to you started becoming one of the best parts of those strange days.",
  },
  {
    date: "After that",
    title: "I started knowing you",
    quote: "Not the college version of you. Not the surface version. You.",
    description:
      "I started understanding how deeply you feel things, how much you care, how quickly you can go from serious to completely chaotic, how much respect matters to you, and how soft you are underneath all that independence.",
  },
  {
    date: "Somewhere along the way",
    title: "You became familiar",
    quote: "You became one of those people I could come back to after any amount of time and somehow still feel comfortable.",
    description:
      "Even when life moved, changed, got busy, or took us in different directions, there was always something familiar about talking to you. Like we could pick things up again without starting from zero.",
  },
  {
    date: "Then, recently",
    title: "Something changed again",
    quote: "I don't know exactly when our conversations stopped feeling casual.",
    description:
      "Maybe it was the way we started sharing every little thing. Maybe it was the late-night talks. Maybe it was how easily we started opening up. But at some point, you stopped being just someone from my past and became very present in my life again.",
  },
  {
    date: "Now",
    title: "This version of us",
    quote: "From meeting in college to knowing each other like this... I definitely didn't see this coming.",
    description:
      "Now you're someone I want to tell things to. Someone whose day I actually care about. Someone I notice little things about. Someone who can make me laugh, worry, flirt, overthink, and feel close from miles away.\n\nAnd honestly, I think that's what makes this special.\n\nWe didn't meet yesterday. We just took years to really find each other.",
    isClosing: true,
  },
];

// -- Open when letters ----------------------------------------
// REPLACE WITH YOUR OWN LETTERS
export interface Letter {
  label: string;
  message: string;
}

export const letters: Letter[] = [
  {
    label: "Open when you miss me",
    message:
      `Hey Pema,

If you opened this because you miss me, then first of all... same. Probably more than I'd admit without you bullying it out of me 😭❤️

I know there are cities, time zones and a stupid amount of distance between us right now, but somehow you've still managed to become part of the smallest pieces of my day. I see something pretty and think of showing you. Something stupid happens and I already know how I'd tell you. Sometimes I look at the time and automatically wonder what you're doing there.

So until I can actually be beside you, imagine me leaning down towards you with those doe eyes you keep talking about, pulling you into a long hug and saying, "I'm here, babe."

You don't have to miss me alone. ❤️`,
  },
  {
    label: "Open when you've had a difficult day",
    message:
      `Come here, my love.

You don't have to explain everything immediately. You don't have to make your feelings neat enough for somebody else to understand them either.

I know how deeply you feel things. I know sometimes you give so much of yourself to people and then wonder why they couldn't see the love behind it. And I know you've had moments where being understood felt harder than it should have.

But I need you to remember something you once told me yourself: you cannot betray yourself anymore.

Choose yourself. Protect your peace. Be angry if you need to. Be quiet if you need to. Cry, complain, disappear under a blanket for a while. I'll still be here when you come back.

And if I were there right now, I wouldn't try to fix everything.

I'd just hold you until you didn't feel like you had to carry all of it by yourself. ❤️`,
  },
  {
    label: "Open when you can't sleep",
    message:
      `Still awake, huh? 😭

Okay, no more fighting your brain for tonight.

Put the phone down for a minute and imagine we're somewhere with no notifications, no people needing something from us, no Singapore-India time difference, nothing.

Just you telling me one of your completely random thoughts and me listening until somehow we've gone from talking about life and the universe to absolute nonsense again.

You once called me your living diary, your journal, your books, your pages and words.

So if your head is too loud tonight, give me the thoughts.

You don't have to carry every unfinished sentence to sleep with you.

And yes, I'd absolutely stay on the call until one of us accidentally stopped replying because we fell asleep. ❤️`,
  },
  {
    label: "Open when you need to smile",
    message:
      `Okay, serious emergency.

If you're reading this with that grumpy little face, I need you to remember that you are the same woman who can go from discussing the meaning of life to saying something completely unhinged in approximately seven seconds.

The same person who calls herself shy and then proceeds to say things that make my brain malfunction.

The same girl who went from "you can't see me, John Cena" to keeping my timezone on her screen.

The same person who somehow manages to be independent, dramatic, soft, chaotic, thoughtful and ridiculously adorable at the same time.

So smile, idiot. 😭❤️

Because somewhere in Singapore there's one boy who would probably start smiling just because you did.`,
  },
  {
    label: "Open when you feel like you're too much",
    message:
      `You're not too much for me.

Not when you talk too much. Not when you feel too deeply. Not when your mind jumps between ten different things. Not when you need reassurance. Not when you're independent one minute and just want someone to take care of you the next.

I don't want some edited, easier-to-handle version of you.

I like that there are layers.

And maybe the strangest part is that you keep asking me how I understand you when, to me, you've slowly started making more and more sense.

You once wondered if you were too complicated for people to know. I think some people simply never stayed long enough to learn your language. ❤️`,
  },
];

// -- Songs that remind me of you ------------------------------
// REPLACE WITH YOUR OWN SONGS
export interface Song {
  title: string;
  artist: string;
  coverImage?: string; // path relative to public/, e.g. "images/song1.jpg"
  note: string;
  spotifyUrl?: string;
  youtubeUrl?: string;
}

export const playlist: Song[] = [
  {
    title: "Tum Se Hi",
    artist: "Mohit Chauhan",
    note: "Somewhere along the way, ordinary days started having a little bit of you in them.",
    youtubeUrl: "https://www.youtube.com/watch?v=mt9xg0mmt28",
  },
  {
    title: "Until I Found You",
    artist: "Stephen Sanchez",
    note: "Maybe we didn't meet at the right moment. Maybe we just took a few years to really find each other.",
    youtubeUrl: "https://www.youtube.com/watch?v=MlThQTo6D8A",
  },
  {
    title: "I Like Me Better",
    artist: "Lauv",
    note: "You somehow make me like the version of myself that exists around you.",
    youtubeUrl: "https://www.youtube.com/watch?v=a7fzkqLozwA",
  },
  {
    title: "Apna Bana Le",
    artist: "Arijit Singh",
    note: "You started feeling familiar long before I realised I was getting attached.",
    youtubeUrl: "https://www.youtube.com/watch?v=Wv5Ac3su5r4",
  },
  {
    title: "Best Part",
    artist: "Daniel Caesar ft. H.E.R.",
    note: "It's not always the big moments. Somehow the smallest parts of you stay with me the longest.",
    youtubeUrl: "https://www.youtube.com/watch?v=vBy7FaapGRo",
  },
  {
    title: "Golden Hour",
    artist: "JVKE",
    note: "For all those little moments when something beautiful makes me wish you were standing beside me.",
    youtubeUrl: "https://www.youtube.com/watch?v=PEM0Vs8jf1w",
  },
  {
    title: "Die With A Smile",
    artist: "Lady Gaga & Bruno Mars",
    note: "You once said you hoped we'd meet in every universe. I think I'd look for you too.",
    youtubeUrl: "https://www.youtube.com/watch?v=kPa7bsKwL-c",
  },
];

// -- Places we should go --------------------------------------
// REPLACE WITH YOUR OWN DESTINATIONS
export interface Place {
  name: string;
  photo?: string; // path relative to public/, e.g. "images/place1.jpg"
  note: string;
  status: "Someday" | "Planning" | "We went";
}

export const places: Place[] = [
  {
    name: "Somewhere by the sea",
    photo: "images/places/beach.jpg",
    note: "Just the sound of waves and nothing we need to do.",
    status: "Someday",
  },
  {
    name: "A mountain with no signal",
    photo: "images/places/mountain.jpg",
    note: "I want to sit at the top with you and not say anything for a while.",
    status: "Someday",
  },
  {
    name: "A tiny café in a city neither of us knows",
    photo: "images/places/cafe.jpg",
    note: "Two coffees, a window seat, and an afternoon with nowhere to be.",
    status: "Someday",
  },
  {
    name: "Back to our college",
    note: "Where it all started without either of us knowing.",
    status: "Someday",
  },
  {
    name: "Somewhere halfway between India and Singapore",
    photo: "images/places/airplane.jpg",
    note: "Splitting the distance because neither of us should always be the one flying.",
    status: "Someday",
  },
  {
    name: "A long drive with no destination",
    photo: "images/places/road.jpg",
    note: "Windows down, music loud, and nowhere we have to be.",
    status: "Someday",
  },
  {
    name: "Somewhere during heavy rain",
    photo: "images/places/rain.jpg",
    note: "We don't need to go anywhere today.",
    status: "Someday",
  },
  {
    name: "A place with an insane night sky",
    photo: "images/places/stars.jpg",
    note: "You once said you hoped we'd meet in every universe. I'd look for you too.",
    status: "Someday",
  },
  {
    name: "Wherever feels like home with you",
    photo: "images/places/home.jpg",
    note: "Not a place on a map. Just wherever you are.",
    status: "Someday",
  },
];

// -- A reason to smile ----------------------------------------
// REPLACE WITH YOUR OWN MESSAGES
export const smileReasons: string[] = [
  "You make ordinary days feel like something worth remembering.",
  "The world is better with you in it. I really believe that.",
  "I hope you know how much your smile means to the people around you.",
  "You deserve every good thing that's coming your way.",
  "Someone out there thinks you're pretty incredible. (It's me.)",
  "You have this way of making people feel seen. It's rare.",
  "I'm grateful you exist. That's not something I say lightly.",
  "You're doing better than you think. I promise.",
  "There's no one else I'd rather share a silence with.",
  "If I could pick anyone to talk to at the end of a long day, it would be you.",
  "You've probably forgotten a hundred small kindnesses you've done. Other people haven't.",
  "The fact that you're here, reading this, already makes me smile.",
];

// -- Hidden surprise ------------------------------------------
export const hiddenSurprise = {
  secretMessage: "You found the part I was secretly hoping you would.",
  // REPLACE: Add a URL to a voice note, video, or longer message
  mediaUrl: "",
  mediaLabel: "A little something extra, just for you",
};

// -- Final section --------------------------------------------
export const closing = {
  message: "This page isn't finished. I'm hoping we still have plenty left to add.",
  signature: "With love,\nPiyush",
};

// -- Music (optional) -----------------------------------------
// REPLACE: Place an audio file at public/music/background.mp3
// The music toggle will only appear if this path points to a valid file.
export const musicPath = "music/background.mp3";
