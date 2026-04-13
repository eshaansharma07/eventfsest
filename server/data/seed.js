import dotenv from 'dotenv';
import { connectDB } from '../config/db.js';
import { Category, Event, Notification, Registration, Review, Ticket, User, Waitlist, Certificate } from '../models/index.js';
import { USER_ROLES } from '../utils/constants.js';
import { slugify } from '../utils/slugify.js';
import { generateQRCodeDataUrl } from '../utils/qr.js';

dotenv.config();

const categories = [
  { name: 'Hackathons', slug: 'hackathons', color: '#60A5FA', icon: 'Code2', description: 'Buildathons, innovation jams, and coding competitions.' },
  { name: 'Cultural', slug: 'cultural', color: '#F472B6', icon: 'Music4', description: 'Concerts, dance nights, and creative showcases.' },
  { name: 'Workshops', slug: 'workshops', color: '#22D3EE', icon: 'Presentation', description: 'Skill-based learning sessions and masterclasses.' },
  { name: 'Sports', slug: 'sports', color: '#FBBF24', icon: 'Trophy', description: 'Competitive tournaments and physical activities.' }
];

const userSeeds = [
  {
    name: 'Aarav Mehta',
    email: 'admin@eventsphere.app',
    password: 'Admin@123',
    role: USER_ROLES.ADMIN,
    institution: 'EventSphere Central',
    department: 'Platform Operations',
    bio: 'Platform administrator managing approvals, analytics, and growth.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400'
  },
  {
    name: 'Ishita Rao',
    email: 'organizer@eventsphere.app',
    password: 'Organizer@123',
    role: USER_ROLES.ORGANIZER,
    institution: 'Aurora Tech Society',
    department: 'Creative Technology',
    bio: 'Organizer of premium campus experiences and immersive festivals.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400'
  },
  {
    name: 'Vihaan Kapoor',
    email: 'student@eventsphere.app',
    password: 'Student@123',
    role: USER_ROLES.PARTICIPANT,
    institution: 'Orion University',
    department: 'Computer Science',
    bio: 'Student participant exploring the smartest events across campus.',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400'
  }
];

const eventTemplates = [
  {
    title: 'FutureFest 2026',
    shortDescription: 'A cinematic flagship tech-and-culture festival for the next generation.',
    description: 'FutureFest blends startup energy, immersive stage design, keynote sessions, concert visuals, creator showcases, and premium networking across one spectacular campus experience.',
    category: 'cultural',
    venue: 'Orion Convention Dome',
    mode: 'offline',
    capacity: 500,
    registeredCount: 320,
    price: 499,
    featured: true,
    approved: true,
    status: 'upcoming',
    startsAt: new Date('2026-05-02T10:00:00.000Z'),
    endsAt: new Date('2026-05-02T19:00:00.000Z'),
    registrationDeadline: new Date('2026-05-01T18:00:00.000Z'),
    tags: ['festival', 'innovation', 'music'],
    sponsors: ['Nova Labs', 'SkyGrid'],
    agenda: [
      { time: '10:00 AM', title: 'Opening Light Show', speaker: 'EventSphere Studio' },
      { time: '12:00 PM', title: 'Founder Fireside', speaker: 'Ishita Rao' },
      { time: '04:00 PM', title: 'Concert Finale', speaker: 'Aurora Stage Crew' }
    ],
    banner: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200'
  },
  {
    title: 'Quantum Build Sprint',
    shortDescription: 'A 24-hour high-energy hackathon with AI, XR, and product design tracks.',
    description: 'Quantum Build Sprint brings developers, designers, and strategists together to ship ambitious prototypes with mentorship, judging, and late-night energy.',
    category: 'hackathons',
    venue: 'Innovation Lab Arena',
    mode: 'hybrid',
    capacity: 250,
    registeredCount: 210,
    price: 0,
    featured: true,
    approved: true,
    status: 'upcoming',
    startsAt: new Date('2026-05-10T08:00:00.000Z'),
    endsAt: new Date('2026-05-11T08:00:00.000Z'),
    registrationDeadline: new Date('2026-05-08T18:00:00.000Z'),
    tags: ['hackathon', 'ai', 'xr'],
    sponsors: ['CodeForge', 'HyperStack'],
    agenda: [
      { time: '08:00 AM', title: 'Theme Reveal', speaker: 'Aarav Mehta' },
      { time: '11:00 PM', title: 'Midnight Mentor Hour', speaker: 'Nova Labs' },
      { time: '07:00 AM', title: 'Final Demo Pitch', speaker: 'Judging Panel' }
    ],
    banner: 'https://images.unsplash.com/photo-1515169067868-5387ec356754?w=1200'
  },
  {
    title: 'Creator Commerce Masterclass',
    shortDescription: 'A premium workshop on event branding, content, and monetization.',
    description: 'This hands-on workshop teaches club leaders and student creators how to scale community-driven events with branding systems, sponsor decks, and audience growth.',
    category: 'workshops',
    venue: 'Skyline Media Studio',
    mode: 'online',
    capacity: 120,
    registeredCount: 89,
    price: 199,
    featured: false,
    approved: true,
    status: 'upcoming',
    startsAt: new Date('2026-05-17T13:00:00.000Z'),
    endsAt: new Date('2026-05-17T16:00:00.000Z'),
    registrationDeadline: new Date('2026-05-16T18:00:00.000Z'),
    tags: ['branding', 'content', 'marketing'],
    sponsors: ['Notionary', 'LensLab'],
    agenda: [
      { time: '01:00 PM', title: 'Branding Frameworks', speaker: 'Mira Shah' },
      { time: '02:30 PM', title: 'Sponsor Pitch Sprint', speaker: 'Kabir Singh' }
    ],
    banner: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200'
  },
  {
    title: 'Campus Legends Cup',
    shortDescription: 'A smart tournament management experience for college sports communities.',
    description: 'Campus Legends Cup combines fixtures, attendance tracking, QR check-ins, and instant announcements for a smooth athletic event experience.',
    category: 'sports',
    venue: 'Zenith Turf Complex',
    mode: 'offline',
    capacity: 300,
    registeredCount: 275,
    price: 149,
    featured: true,
    approved: true,
    status: 'ongoing',
    startsAt: new Date('2026-04-14T07:00:00.000Z'),
    endsAt: new Date('2026-04-16T17:00:00.000Z'),
    registrationDeadline: new Date('2026-04-13T17:00:00.000Z'),
    tags: ['football', 'campus', 'league'],
    sponsors: ['PulseFit', 'Zen Sports'],
    agenda: [
      { time: '07:00 AM', title: 'Team Check-In', speaker: 'Sports Desk' },
      { time: '10:30 AM', title: 'Semifinal Fixtures', speaker: 'Fixture Control' },
      { time: '04:30 PM', title: 'Final Ceremony', speaker: 'Arena Host' }
    ],
    banner: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1200'
  }
];

const seed = async () => {
  await connectDB();

  await Promise.all([
    Category.deleteMany(),
    Event.deleteMany(),
    Notification.deleteMany(),
    Registration.deleteMany(),
    Review.deleteMany(),
    Ticket.deleteMany(),
    Waitlist.deleteMany(),
    Certificate.deleteMany(),
    User.deleteMany()
  ]);

  const createdCategories = await Category.insertMany(categories);
  const users = [];

  for (const userSeed of userSeeds) {
    const user = await User.create(userSeed);
    users.push(user);
  }

  const admin = users.find((user) => user.role === USER_ROLES.ADMIN);
  const organizer = users.find((user) => user.role === USER_ROLES.ORGANIZER);
  const participant = users.find((user) => user.role === USER_ROLES.PARTICIPANT);

  const createdEvents = [];
  for (const template of eventTemplates) {
    const category = createdCategories.find((item) => item.slug === template.category);
    const event = await Event.create({
      ...template,
      category: category._id,
      organizer: organizer._id,
      slug: `${slugify(template.title)}-${Math.random().toString(36).slice(2, 6)}`
    });
    createdEvents.push(event);
  }

  for (const event of createdEvents.slice(0, 3)) {
    const qrCode = await generateQRCodeDataUrl(
      JSON.stringify({ ticketCode: `EVS-${event.title.slice(0, 3).toUpperCase()}`, eventId: event._id, userId: participant._id })
    );

    const registration = await Registration.create({
      event: event._id,
      participant: participant._id,
      status: event.status === 'ongoing' ? 'attended' : 'registered',
      ticketCode: `EVS-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
      qrCode,
      checkedInAt: event.status === 'ongoing' ? new Date() : undefined,
      paymentStatus: event.price > 0 ? 'paid' : 'free'
    });

    await Ticket.create({
      registration: registration._id,
      qrCode,
      downloadedAt: new Date()
    });
  }

  await Review.insertMany([
    {
      event: createdEvents[0]._id,
      user: participant._id,
      rating: 5,
      comment: 'One of the most premium and polished campus event experiences I have seen.'
    },
    {
      event: createdEvents[1]._id,
      user: participant._id,
      rating: 4,
      comment: 'Excellent mentor energy, strong problem statements, and a smooth registration flow.'
    }
  ]);

  await Notification.insertMany([
    {
      title: 'FutureFest countdown started',
      message: 'Only 19 days left until the spotlight turns on. Confirm your team slots.',
      type: 'reminder',
      audience: 'all',
      event: createdEvents[0]._id
    },
    {
      title: 'Organizer approval workflow',
      message: 'New event submissions are now reviewed within 24 hours.',
      type: 'announcement',
      audience: 'organizers',
      recipient: organizer._id
    },
    {
      title: 'Your registration is confirmed',
      message: 'Quantum Build Sprint ticket and QR code are now live in your dashboard.',
      type: 'success',
      audience: 'participants',
      recipient: participant._id,
      event: createdEvents[1]._id
    }
  ]);

  admin.favorites = [createdEvents[0]._id];
  organizer.favorites = [createdEvents[0]._id, createdEvents[1]._id];
  participant.favorites = [createdEvents[1]._id, createdEvents[2]._id];

  await Promise.all([admin.save(), organizer.save(), participant.save()]);

  console.log('Seed completed successfully');
  console.log('Demo users:');
  console.log('Admin -> admin@eventsphere.app / Admin@123');
  console.log('Organizer -> organizer@eventsphere.app / Organizer@123');
  console.log('Participant -> student@eventsphere.app / Student@123');
  process.exit(0);
};

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
