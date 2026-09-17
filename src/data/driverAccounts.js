// 4 Verified Driver Demo Accounts for Mechify Intelligent Driver Platform
// Accounts support both "with_car" (Driver With Car) and "without_car" (Driver Without Car)
// All accounts have password: "123"

export const DRIVER_DEMO_ACCOUNTS = [
  {
    id: 'drv-1',
    email: 'driver1@gmail.com',
    password: '123',
    name: 'Kamrul Hassan',
    phone: '+880 1711-234567',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop',
    driverType: 'with_car', // 'with_car' | 'without_car'
    role: 'driver',
    rating: 4.96,
    reviewsCount: 312,
    experience: '8 years',
    completedTrips: 1420,
    onlineHours: 6.5,
    todayEarnings: 4200,
    weekEarnings: 28500,
    monthEarnings: 114000,
    totalEarnings: 845000,
    availableBalance: 18450,
    pendingBalance: 3200,
    acceptanceRate: '98.5%',
    cancellationRate: '0.8%',
    onTimeRate: '99.2%',
    repeatCustomers: 48,
    isOnline: true,
    languages: ['Bengali', 'English', 'Hindi'],
    serviceAreas: ['Gulshan', 'Banani', 'Dhanmondi', 'Airport', 'Uttara'],
    drivingSpecialties: ['Executive Chauffeur', 'Airport VIP Transfers', 'Highway Cruising', 'Smooth Defensive Driving'],
    certifications: ['BRTA Professional License', 'Mechify Defensive Chauffeur', 'First Aid Certified'],
    vehicle: {
      make: 'Toyota',
      model: 'Camry Hybrid G-Selection',
      year: 2022,
      regNumber: 'Dhaka Metro-Gha 33-8901',
      color: 'Pearl White Metallic',
      seats: 4,
      transmission: 'Automatic (e-CVT)',
      fuelType: 'Hybrid Petrol-Electric',
      fuelLevel: '78%',
      mileage: '38,400 km',
      status: 'Available', // Available | On Trip | Maintenance
      image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&h=500&fit=crop',
      features: ['Dual Climate AC', 'Leather Chauffeur Seats', 'Free Onboard WiFi', 'Bottled Water', 'Phone Chargers'],
      maintenance: {
        oilChange: 'In 3,600 km',
        tireInspection: 'Good (5.2mm tread depth)',
        brakeInspection: 'Ceramic pads inspected 2 weeks ago',
        registrationRenewal: 'Expires 14 Dec 2026',
        insuranceRenewal: 'Valid till 28 Feb 2027'
      }
    },
    verification: {
      overallStatus: 'Verified',
      identity: { status: 'Verified', date: '12 Jan 2024', docNumber: 'NID-1988291029381' },
      license: { status: 'Verified', date: 'BRTA Dhaka Metro', docNumber: 'DL-DK-8891024', expiry: '2028-11-20' },
      vehicleDocs: { status: 'Verified', date: 'Tax Token & Fitness Valid', expiry: '2027-04-15' },
      vehicleInsurance: { status: 'Verified', provider: 'Green Delta Insurance', policyNo: 'GD-MEC-9901' },
      backgroundCheck: { status: 'Verified', agency: 'Special Branch Police Clearance' }
    },
    payoutAccount: {
      preferredMethod: 'bKash',
      bKashNumber: '01711234567',
      nagadNumber: '01711234567',
      bankName: 'City Bank Ltd',
      accountNumber: '108-291-002',
      routingNumber: '08526172'
    },
    activeJob: {
      id: 'TRIP-9041',
      customerName: 'Zubair Al-Mamun',
      customerPhone: '+880 1912-889900',
      customerAvatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&h=150&fit=crop',
      pickupLocation: 'Gulshan 2, Road 113, Plot 12 (Near Mechify Hub)',
      destination: 'Hazrat Shahjalal International Airport (Terminal 2)',
      pickupTime: 'Today, 8:45 PM',
      vehicle: 'Driver With Car (Toyota Camry Hybrid 2022)',
      distance: '11.4 km',
      estimatedDuration: '28 mins',
      estimatedEarnings: 1450,
      platformFee: 145,
      netEarnings: 1305,
      status: 'heading_to_pickup', // heading_to_pickup | arrived | in_progress | completed
      customerNotes: 'Please turn on AC and pop the trunk for 2 large suitcases.'
    },
    upcomingBookings: [
      {
        id: 'BK-7701',
        customerName: 'Sadia Chowdhury',
        customerPhone: '+880 1711-445566',
        date: 'Tomorrow, 09:30 AM',
        pickup: 'Baridhara Diplomatic Zone, Road 4',
        destination: 'Dhaka Club, Ramna',
        vehicle: 'Driver With Car (Camry Hybrid)',
        estimatedEarnings: 1800,
        status: 'Confirmed',
        countdown: 'Starts in 12h 45m'
      },
      {
        id: 'BK-7702',
        customerName: 'Farhan Kabir',
        customerPhone: '+880 1819-778899',
        date: 'Friday, 02:00 PM',
        pickup: 'Banani 11 Intersection',
        destination: 'Purbachal Golf Club',
        vehicle: 'Driver With Car (Camry Hybrid)',
        estimatedEarnings: 2500,
        status: 'Confirmed',
        countdown: 'Starts in 2 days'
      }
    ],
    recentTrips: [
      { id: 'TRIP-8991', customer: 'Mahir Faisal', pickup: 'Dhanmondi 27', dropoff: 'Gulshan-1 Circle', date: 'Today 04:30 PM', gross: 1200, fee: 120, net: 1080, method: 'bKash' },
      { id: 'TRIP-8985', customer: 'Tahsin Ahmed', pickup: 'Uttara Sector 7', dropoff: 'Hazrat Shahjalal Airport', date: 'Today 01:15 PM', gross: 850, fee: 85, net: 765, method: 'Cash' },
      { id: 'TRIP-8972', customer: 'Nasir Uddin', pickup: 'Bashundhara R/A Block C', dropoff: 'Motijheel Commercial Area', date: 'Yesterday 06:00 PM', gross: 1650, fee: 165, net: 1485, method: 'Card' },
      { id: 'TRIP-8960', customer: 'Arif Chowdhury', pickup: 'Banani Road 8', dropoff: 'Tejgaon Industrial Hub', date: 'Yesterday 02:40 PM', gross: 600, fee: 60, net: 540, method: 'bKash' }
    ],
    reviews: [
      { id: 'REV-1', author: 'Zubair Al-Mamun', rating: 5, date: 'Yesterday', carRating: 5, comment: 'Kamrul bhai drove so smoothly on the flyover. The Camry was immaculate and AC was freezing cold. Top tier Mechify executive experience!', reply: 'Thank you Zubair bhai, absolute pleasure driving you!' },
      { id: 'REV-2', author: 'Dr. Rebecca Evans', rating: 5, date: '3 days ago', carRating: 5, comment: 'Punctual airport pickup at midnight. Helped with luggage and drove defensive and calm. Highly recommended.', reply: 'Safe travels in Bangladesh Dr. Rebecca!' },
      { id: 'REV-3', author: 'Imtiaz Hossain', rating: 5, date: '1 week ago', carRating: 4.8, comment: 'Great gentleman driver. WiFi worked flawlessly for my Zoom meeting while stuck in Mohakhali traffic.', reply: null }
    ]
  },
  {
    id: 'drv-2',
    email: 'driver2@gmail.com',
    password: '123',
    name: 'Rahim Uddin',
    phone: '+880 1819-345678',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop',
    driverType: 'without_car', // 'without_car'
    role: 'driver',
    rating: 4.98,
    reviewsCount: 189,
    experience: '12 years',
    completedTrips: 980,
    onlineHours: 5.0,
    todayEarnings: 3100,
    weekEarnings: 21000,
    monthEarnings: 88000,
    totalEarnings: 620000,
    availableBalance: 14200,
    pendingBalance: 2400,
    acceptanceRate: '99.1%',
    cancellationRate: '0.4%',
    onTimeRate: '99.6%',
    repeatCustomers: 62,
    isOnline: true,
    languages: ['Bengali', 'English'],
    serviceAreas: ['Gulshan', 'Banani', 'Baridhara Diplomatic', 'Bashundhara', 'Motijheel'],
    drivingSpecialties: ['Supercars & Luxury Sedans', 'Heavy Duty 4x4 SUVs', 'Long Distance Highway', 'VIP Diplomatic Escort'],
    certifications: ['BRTA Heavy & Light Professional', 'Advanced Supercar Driving Academy UK', 'Defensive Chauffeur Master'],
    vehicleCategoriesCanDrive: [
      'Supercars & Exotic Dual-Clutch (Ferrari, Porsche, AMG, Lamborghini)',
      'Full-Size Luxury SUVs (Land Cruiser 300, Range Rover, Defender)',
      'Executive Sedans (BMW 7-Series, Mercedes S-Class, Audi A8)',
      'Electric Vehicles (Tesla, Porsche Taycan, BMW iX)',
      'Manual Transmission Sports Cars'
    ],
    verification: {
      overallStatus: 'Verified',
      identity: { status: 'Verified', date: '05 Mar 2024', docNumber: 'NID-1984210982736' },
      license: { status: 'Verified', date: 'BRTA Heavy & Light', docNumber: 'DL-DK-3341098', expiry: '2029-08-14' },
      backgroundCheck: { status: 'Verified', agency: 'Special Branch Police Clearance' }
    },
    payoutAccount: {
      preferredMethod: 'Nagad',
      bKashNumber: '01819345678',
      nagadNumber: '01819345678',
      bankName: 'Eastern Bank Ltd',
      accountNumber: '204-110-891',
      routingNumber: '09026114'
    },
    activeJob: {
      id: 'TRIP-9042',
      customerName: 'Arman Khan',
      customerPhone: '+880 1911-223344',
      customerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
      pickupLocation: 'Gulshan 1, House 45, Road 22',
      destination: 'Dhaka Elevated Expressway ➔ Padma Bridge Toll Plaza',
      pickupTime: 'Today, 8:15 PM',
      vehicle: "Customer's Car (Ferrari 488 Pista / Automatic F1 Dual-Clutch)",
      customerVehicleInfo: {
        make: 'Ferrari',
        model: '488 Pista',
        transmission: '7-Speed F1 Dual-Clutch',
        fuelType: 'Octane 95 Super',
        plateNumber: 'KB 1024 KYG'
      },
      distance: '42.0 km',
      estimatedDuration: '45 mins',
      estimatedEarnings: 3500,
      platformFee: 350,
      netEarnings: 3150,
      status: 'in_progress',
      customerNotes: 'Customer requires master supercar chauffeur for high-speed highway transit.'
    },
    upcomingBookings: [
      {
        id: 'BK-7703',
        customerName: 'Naveed Rahman',
        customerPhone: '+880 1715-998811',
        date: 'Tomorrow, 08:00 AM',
        pickup: 'Baridhara DOHS Road 2',
        destination: 'Savar EPZ Factory Compound',
        vehicle: "Customer's Car (Toyota Land Cruiser LC300)",
        estimatedEarnings: 2800,
        status: 'Confirmed',
        countdown: 'Starts in 11h 15m'
      }
    ],
    recentTrips: [
      { id: 'TRIP-8980', customer: 'Kazi Enamul', pickup: 'Gulshan 2', dropoff: 'Sena Malancha', date: 'Today 03:00 PM', gross: 1800, fee: 180, net: 1620, method: 'bKash' },
      { id: 'TRIP-8968', customer: 'Sarah Miller', pickup: 'Radisson Blu Water Garden', dropoff: 'InterContinental Dhaka', date: 'Yesterday 07:30 PM', gross: 2200, fee: 220, net: 1980, method: 'Card' }
    ],
    reviews: [
      { id: 'REV-11', author: 'Arman Khan', rating: 5, date: '2 days ago', comment: 'Rahim is one of the rare drivers in Bangladesh who truly understands high-performance mid-engine supercars. Flawless throttle control and gearbox respect.', reply: 'Thank you Arman bhai, an honor driving the 488 Pista!' },
      { id: 'REV-12', author: 'Kazi Enamul', rating: 5, date: '1 week ago', comment: 'Punctual, dressed sharp in full suit, and handled my Land Cruiser through horrible Friday traffic like a true VIP chauffeur.', reply: 'Always at your service sir.' }
    ]
  },
  {
    id: 'drv-3',
    email: 'driver3@gmail.com',
    password: '123',
    name: 'Tanvir Ahmed',
    phone: '+880 1912-456789',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop',
    driverType: 'with_car',
    role: 'driver',
    rating: 4.92,
    reviewsCount: 245,
    experience: '10 years',
    completedTrips: 1150,
    onlineHours: 7.0,
    todayEarnings: 5400,
    weekEarnings: 34000,
    monthEarnings: 135000,
    totalEarnings: 980000,
    availableBalance: 22100,
    pendingBalance: 4500,
    acceptanceRate: '97.8%',
    cancellationRate: '1.1%',
    onTimeRate: '98.9%',
    repeatCustomers: 51,
    isOnline: true,
    languages: ['Bengali', 'English'],
    serviceAreas: ['Dhaka All Zones', 'Chittagong Highway', 'Sylhet Tours'],
    drivingSpecialties: ['Offroad & Mountain Expeditions', 'Intercity Long Hauls', 'Family Vacations'],
    certifications: ['BRTA Professional License', '4x4 Off-Road Master Certified'],
    vehicle: {
      make: 'Toyota',
      model: 'Land Cruiser Prado TX-L 4WD',
      year: 2021,
      regNumber: 'Dhaka Metro-Gha 44-1029',
      color: 'Obsidian Black Metallic',
      seats: 7,
      transmission: 'Automatic 6-Speed',
      fuelType: 'Diesel Turbo',
      fuelLevel: '92%',
      mileage: '52,000 km',
      status: 'Available',
      image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&h=500&fit=crop',
      features: ['High-Ground Clearance 4WD', 'Third Row Seating', 'Roof Luggage Rack', 'Cool Box Center Console'],
      maintenance: {
        oilChange: 'In 2,100 km',
        tireInspection: 'Good (6.0mm tread)',
        brakeInspection: 'Brembo heavy pads installed',
        registrationRenewal: 'Expires 19 Aug 2027',
        insuranceRenewal: 'Valid till 15 Nov 2026'
      }
    },
    verification: {
      overallStatus: 'Verified',
      identity: { status: 'Verified', date: '20 Feb 2024', docNumber: 'NID-1990219837461' },
      license: { status: 'Verified', date: 'BRTA Professional', docNumber: 'DL-DK-9901823', expiry: '2028-06-11' },
      vehicleDocs: { status: 'Verified', date: 'Fitness Certificate A-Grade', expiry: '2027-01-20' },
      vehicleInsurance: { status: 'Verified', provider: 'Sena Kalyan Insurance', policyNo: 'SKI-90182' },
      backgroundCheck: { status: 'Verified', agency: 'CID Verified' }
    },
    payoutAccount: {
      preferredMethod: 'Bank Wire',
      bKashNumber: '01912456789',
      nagadNumber: '01912456789',
      bankName: 'BRAC Bank PLC',
      accountNumber: '150-102-984',
      routingNumber: '06026189'
    },
    activeJob: null,
    upcomingBookings: [
      {
        id: 'BK-7705',
        customerName: 'Shakil Anwar',
        customerPhone: '+880 1718-223311',
        date: 'Tomorrow, 07:00 AM',
        pickup: 'Uttara Sector 3',
        destination: 'Sreemangal Tea Resort, Sylhet',
        vehicle: 'Driver With Car (Land Cruiser Prado 4x4)',
        estimatedEarnings: 9500,
        status: 'Confirmed',
        countdown: 'Starts in 10h 15m'
      }
    ],
    recentTrips: [
      { id: 'TRIP-8955', customer: 'Fahim Morshed', pickup: 'Gulshan 2', dropoff: 'Comilla Highway Rest Area', date: 'Yesterday 10:00 AM', gross: 4500, fee: 450, net: 4050, method: 'bKash' }
    ],
    reviews: [
      { id: 'REV-21', author: 'Shakil Anwar', rating: 5, date: '1 week ago', comment: 'Tanvir took our family safely through wet highway roads to Sylhet. Prado 4x4 was extremely comfortable.', reply: 'Glad your family enjoyed the journey!' }
    ]
  },
  {
    id: 'drv-4',
    email: 'driver4@gmail.com',
    password: '123',
    name: 'Sultana Razia',
    phone: '+880 1611-567890',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop',
    driverType: 'without_car',
    role: 'driver',
    rating: 4.99,
    reviewsCount: 142,
    experience: '7 years',
    completedTrips: 760,
    onlineHours: 4.5,
    todayEarnings: 2800,
    weekEarnings: 18500,
    monthEarnings: 74000,
    totalEarnings: 490000,
    availableBalance: 12800,
    pendingBalance: 1900,
    acceptanceRate: '100%',
    cancellationRate: '0%',
    onTimeRate: '100%',
    repeatCustomers: 45,
    isOnline: true,
    languages: ['Bengali', 'English'],
    serviceAreas: ['Dhanmondi', 'Gulshan', 'Uttara', 'Mirpur DOHS'],
    drivingSpecialties: ['Female Executive Chauffeur', 'School & Family Transport', 'Patient Hospital Transit', 'Punctual Corporate Driving'],
    certifications: ['BRTA Professional License', 'Red Crescent First Aid Responder', 'Defensive Chauffeur Academy'],
    vehicleCategoriesCanDrive: [
      'Automatic Compact & Midsize Sedans (Toyota Allion, Corolla Cross, Honda Grace)',
      'Hybrid & Electric Crossovers (Nissan Kicks e-POWER, BYD Atto 3)',
      'Mini MPVs & Wagons (Toyota Noah, Voxy, Sienta)'
    ],
    verification: {
      overallStatus: 'Verified',
      identity: { status: 'Verified', date: '18 Apr 2024', docNumber: 'NID-1994829103948' },
      license: { status: 'Verified', date: 'BRTA Light Professional', docNumber: 'DL-DK-1182930', expiry: '2029-03-25' },
      backgroundCheck: { status: 'Verified', agency: 'Dhaka Metropolitan Police Clearance' }
    },
    payoutAccount: {
      preferredMethod: 'bKash',
      bKashNumber: '01611567890',
      nagadNumber: '01611567890',
      bankName: 'Islami Bank Bangladesh Ltd',
      accountNumber: '205-019-442',
      routingNumber: '12526108'
    },
    activeJob: null,
    upcomingBookings: [
      {
        id: 'BK-7708',
        customerName: 'Taslima Nasreen',
        customerPhone: '+880 1714-332211',
        date: 'Tomorrow, 08:30 AM',
        pickup: 'Dhanmondi Road 8A',
        destination: 'United Hospital, Gulshan 2',
        vehicle: "Customer's Car (Toyota Corolla Cross Hybrid)",
        estimatedEarnings: 1500,
        status: 'Confirmed',
        countdown: 'Starts in 11h 45m'
      }
    ],
    recentTrips: [
      { id: 'TRIP-8940', customer: 'Rumana Siddique', pickup: 'Uttara Sector 11', dropoff: 'Scholastica Junior School', date: 'Today 08:00 AM', gross: 900, fee: 90, net: 810, method: 'bKash' }
    ],
    reviews: [
      { id: 'REV-31', author: 'Rumana Siddique', rating: 5, date: 'Yesterday', comment: 'Sultana apu is punctual to the minute, gentle, and the safest driver for my children. Five stars always!', reply: 'Thank you Rumana bhabi, your children are wonderful.' }
    ]
  }
];
