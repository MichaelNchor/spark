export const mockProfiles = [
    {
      id: '1',
      name: 'Emma',
      age: 28,
      bio: 'Love exploring new places and trying different cuisines. Looking for someone to share adventures with!',
      images: [
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=600&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=600&fit=crop&crop=face'
      ],
      distance: '2 km away',
      occupation: 'Marketing Manager',
      education: 'MBA, Stanford',
      interests: ['Travel', 'Photography', 'Cooking', 'Hiking', 'Wine', 'Dogs'],
      isVerified: true
    },
    {
      id: '2',
      name: 'Alex',
      age: 32,
      bio: 'Tech enthusiast and weekend warrior. Always down for a good coffee and deep conversations.',
      images: [
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=600&fit=crop&crop=face'
      ],
      distance: '5 km away',
      occupation: 'Software Engineer',
      education: 'CS, MIT',
      interests: ['Technology', 'Coffee', 'Gaming', 'Fitness', 'Music', 'Movies'],
      isVerified: false
    },
    {
      id: '3',
      name: 'Sofia',
      age: 26,
      bio: 'Artist at heart, yoga enthusiast, and lover of all things creative. Let\'s create beautiful memories together!',
      images: [
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=600&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=600&fit=crop&crop=face'
      ],
      distance: '3 km away',
      occupation: 'Graphic Designer',
      education: 'Fine Arts, RISD',
      interests: ['Art', 'Yoga', 'Dancing', 'Photography', 'Fashion', 'Beach'],
      isVerified: true
    },
    {
      id: '4',
      name: 'Marcus',
      age: 30,
      bio: 'Fitness coach who loves helping others reach their goals. When I\'m not at the gym, you can find me hiking or cooking.',
      images: [
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=600&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=600&fit=crop&crop=face'
      ],
      distance: '4 km away',
      occupation: 'Fitness Coach',
      education: 'Kinesiology, UCLA',
      interests: ['Fitness', 'Hiking', 'Cooking', 'Sports', 'Health', 'Adventure'],
      isVerified: false
    },
    {
      id: '5',
      name: 'Luna',
      age: 29,
      bio: 'Bookworm, cat mom, and part-time adventurer. Looking for someone who appreciates quiet moments and spontaneous trips.',
      images: [
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=600&fit=crop&crop=face'
      ],
      distance: '1 km away',
      occupation: 'Librarian',
      education: 'Literature, NYU',
      interests: ['Reading', 'Cats', 'Coffee', 'Museums', 'Writing', 'Travel'],
      isVerified: true
    },
    {
      id: '6',
      name: 'Diego',
      age: 27,
      bio: 'Chef by day, musician by night. I believe the best way to someone\'s heart is through their stomach.',
      images: [
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=600&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&h=600&fit=crop&crop=face'
      ],
      distance: '6 km away',
      occupation: 'Chef',
      education: 'Culinary Arts, CIA',
      interests: ['Cooking', 'Music', 'Wine', 'Concerts', 'Travel', 'Comedy'],
      isVerified: false
    }
  ];
  
  export const mockEvents = [
    {
      id: '1',
      title: 'Wine Tasting Night',
      date: '2024-01-20',
      time: '19:00',
      location: 'Downtown Wine Bar',
      description: 'Join us for an evening of wine tasting and great conversations.',
      attendees: 12,
      maxAttendees: 20,
      image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&h=300&fit=crop'
    },
    {
      id: '2',
      title: 'Hiking Adventure',
      date: '2024-01-22',
      time: '09:00',
      location: 'Mountain Trail',
      description: 'Morning hike with beautiful views and new friends.',
      attendees: 8,
      maxAttendees: 15,
      image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=300&fit=crop'
    },
    {
      id: '3',
      title: 'Cooking Class',
      date: '2024-01-25',
      time: '18:30',
      location: 'Culinary Studio',
      description: 'Learn to make authentic Italian pasta from scratch.',
      attendees: 6,
      maxAttendees: 12,
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop'
    }
  ];
  
  export const mockMessages = [
    {
      id: '1',
      matchId: '1',
      messages: [
        {
          id: '1',
          senderId: '1',
          text: 'Hey! I saw you love hiking too. Have you been to the new trail?',
          timestamp: '2024-01-15T10:30:00Z',
          isRead: true
        },
        {
          id: '2',
          senderId: 'current',
          text: 'Hi Emma! Yes, I went last weekend. The views were incredible!',
          timestamp: '2024-01-15T10:45:00Z',
          isRead: true
        }
      ]
    }
  ];