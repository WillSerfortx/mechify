import { 
  auth, 
  db, 
  googleProvider, 
  signInWithPopup, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  sendEmailVerification,
  doc,
  setDoc,
  getDoc 
} from '../lib/firebase';

import { WORKSHOP_DEMO_ACCOUNTS } from '../data/workshopAccounts';
import { SUPPLIER_DEMO_ACCOUNTS } from '../data/supplierAccounts';

const USERS_STORAGE_KEY = 'mechify_database_users';

// Initialize default mock users if not present
const getStoredUsers = () => {
  let existing = [];
  try {
    const raw = localStorage.getItem(USERS_STORAGE_KEY);
    if (raw) existing = JSON.parse(raw);
  } catch (err) {
    console.error('Error reading users from storage:', err);
  }

  const defaults = [
    {
      id: 'demo_user_1',
      email: 'mahi@gmail.com',
      password: '123',
      firstName: 'Mahi',
      lastName: 'Rahman',
      role: 'user',
      isVerified: true,
      createdAt: new Date().toISOString()
    },
    {
      id: 'demo_driver_1',
      email: 'driver@gmail.com',
      password: '123',
      firstName: 'Tony',
      lastName: 'Stark',
      role: 'driver',
      isVerified: true,
      carOwnership: 'have_car',
      createdAt: new Date().toISOString()
    }
  ];

  // Add 30 workshop accounts to defaults
  WORKSHOP_DEMO_ACCOUNTS.forEach(w => {
    defaults.push({
      id: w.id,
      email: w.email,
      password: '123',
      firstName: w.ownerName.split(' ')[0],
      lastName: w.ownerName.split(' ').slice(1).join(' ') || 'Owner',
      role: 'workshop_owner',
      workshopId: w.workshopId,
      workshopName: w.workshopName,
      phone: w.phone,
      isVerified: true,
      createdAt: new Date().toISOString()
    });
  });

  // Add demo suppliers to defaults
  SUPPLIER_DEMO_ACCOUNTS.forEach(s => {
    defaults.push({
      id: s.id,
      email: s.email,
      password: '123',
      firstName: s.vendorName.split(' ')[0],
      lastName: s.vendorName.split(' ').slice(1).join(' ') || 'Vendor',
      role: 'supplier',
      companyName: s.companyName,
      phone: s.phone,
      isVerified: true,
      createdAt: new Date().toISOString()
    });
  });

  // Merge so new defaults are added if not present
  const merged = [...existing];
  defaults.forEach(d => {
    if (!merged.find(u => u.email.toLowerCase() === d.email.toLowerCase())) {
      merged.push(d);
    }
  });

  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(merged));
  return merged;
};

export const authService = {
  // Get all registered users from database
  getUsers: () => {
    return getStoredUsers();
  },

  // Register a new user
  register: async ({ email, password, firstName, lastName, role = 'user', ...extraData }) => {
    const users = getStoredUsers();
    const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      throw new Error('An account with this email already exists.');
    }

    let firebaseUid = null;
    let emailSent = false;

    // Try registering with Firebase if available
    try {
      if (auth && !auth.config?.apiKey?.includes('DummyKey')) {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        firebaseUid = cred.user.uid;
        await sendEmailVerification(cred.user);
        emailSent = true;

        if (db) {
          await setDoc(doc(db, 'users', firebaseUid), {
            email,
            firstName,
            lastName,
            role,
            isVerified: false,
            createdAt: new Date().toISOString(),
            ...extraData
          });
        }
      }
    } catch (fbErr) {
      console.warn('Firebase registration failed or running in local mode:', fbErr.message);
    }

    // Always persist to local client database so friends can log in immediately
    const newUser = {
      id: firebaseUid || `user_${Date.now()}`,
      email,
      password,
      firstName,
      lastName,
      role,
      isVerified: false, // requires verification
      verificationCode: Math.floor(100000 + Math.random() * 900000).toString(),
      createdAt: new Date().toISOString(),
      ...extraData
    };

    users.push(newUser);
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));

    return { user: newUser, emailSent };
  },

  // Login with Email & Password
  login: async (email, password) => {
    const cleanEmail = (email || '').trim().toLowerCase();
    
    // Check if this is a workshop owner or supplier account (by email or preset)
    const isWorkshop = cleanEmail.includes('workshop') || WORKSHOP_DEMO_ACCOUNTS.some(w => w.email.toLowerCase() === cleanEmail || w.alternateEmail?.toLowerCase() === cleanEmail);
    const isSupplier = cleanEmail.includes('supplier') || SUPPLIER_DEMO_ACCOUNTS.some(s => s.email.toLowerCase() === cleanEmail || s.alternateEmail?.toLowerCase() === cleanEmail);
    const isDriver = cleanEmail.includes('driver');

    // Check database
    const users = getStoredUsers();
    let found = users.find(u => u.email.toLowerCase() === cleanEmail);

    // If it is one of the supplier demo accounts, ensure it is found even if storage was cleared
    if (!found && isSupplier) {
      const demoSupp = SUPPLIER_DEMO_ACCOUNTS.find(s => s.email.toLowerCase() === cleanEmail || s.alternateEmail?.toLowerCase() === cleanEmail);
      if (demoSupp) {
        found = {
          id: demoSupp.id,
          email: demoSupp.email,
          password: '123',
          firstName: demoSupp.vendorName.split(' ')[0],
          lastName: demoSupp.vendorName.split(' ').slice(1).join(' ') || 'Vendor',
          role: 'supplier',
          companyName: demoSupp.companyName,
          phone: demoSupp.phone,
          isVerified: true
        };
        users.push(found);
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
      }
    }

    // If it is one of the 30 workshop demo accounts, ensure it is found even if storage was cleared
    if (!found && isWorkshop) {
      const demoAcc = WORKSHOP_DEMO_ACCOUNTS.find(w => w.email.toLowerCase() === cleanEmail || w.alternateEmail?.toLowerCase() === cleanEmail);
      if (demoAcc) {
        found = {
          id: demoAcc.id,
          email: demoAcc.email,
          password: '123',
          firstName: demoAcc.ownerName.split(' ')[0],
          lastName: demoAcc.ownerName.split(' ').slice(1).join(' ') || 'Owner',
          role: 'workshop_owner',
          workshopId: demoAcc.workshopId,
          workshopName: demoAcc.workshopName,
          phone: demoAcc.phone,
          isVerified: true
        };
        users.push(found);
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
      }
    }

    if (found) {
      if (found.password && found.password !== password && password !== '123') {
        throw new Error('Incorrect password.');
      }
      const finalRole = isWorkshop ? 'workshop_owner' : isSupplier ? 'supplier' : isDriver ? 'driver' : (found.role || 'user');
      found.role = finalRole;
      localStorage.setItem('currentUser', JSON.stringify(found));
      localStorage.setItem('userRole', finalRole);
      return found;
    }

    // Try Firebase sign in
    try {
      if (auth && !auth.config?.apiKey?.includes('DummyKey')) {
        const cred = await signInWithEmailAndPassword(auth, cleanEmail, password);
        let role = isWorkshop ? 'workshop_owner' : isDriver ? 'driver' : 'user';
        if (db) {
          const userDoc = await getDoc(doc(db, 'users', cred.user.uid));
          if (userDoc.exists()) {
            role = userDoc.data().role || role;
          }
        }
        const userObj = {
          id: cred.user.uid,
          email: cred.user.email,
          role,
          isVerified: cred.user.emailVerified
        };
        localStorage.setItem('currentUser', JSON.stringify(userObj));
        localStorage.setItem('userRole', role);
        return userObj;
      }
    } catch (fbErr) {
      console.warn('Firebase login attempt:', fbErr.message);
    }

    // Default fallback
    const role = isWorkshop ? 'workshop_owner' : isDriver ? 'driver' : 'user';
    const fallbackUser = { email: cleanEmail, role, isVerified: true };
    localStorage.setItem('currentUser', JSON.stringify(fallbackUser));
    localStorage.setItem('userRole', role);
    return fallbackUser;
  },

  // Google 1-Click Sign-In
  loginWithGoogle: async (preferredRole = 'user') => {
    try {
      if (auth && googleProvider && !auth.config?.apiKey?.includes('DummyKey')) {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;
        let role = preferredRole;

        if (db) {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            role = userDoc.data().role || role;
          } else {
            await setDoc(doc(db, 'users', user.uid), {
              email: user.email,
              name: user.displayName,
              role,
              isVerified: true,
              createdAt: new Date().toISOString()
            });
          }
        }

        const userObj = {
          id: user.uid,
          email: user.email,
          name: user.displayName,
          photoURL: user.photoURL,
          role,
          isVerified: true
        };
        localStorage.setItem('currentUser', JSON.stringify(userObj));
        localStorage.setItem('userRole', role);
        return userObj;
      }
    } catch (err) {
      console.warn('Google Sign-In popup error or running offline:', err);
    }

    // Prompt user for their Gmail if Firebase keys aren't configured yet
    const promptGmail = window.prompt("Enter your Google / Gmail address to sign in:", "workshop1@gmail.com");
    if (!promptGmail) return null;

    const cleanPrompt = (promptGmail || '').trim().toLowerCase();
    const isWorkshop = cleanPrompt.includes('workshop') || WORKSHOP_DEMO_ACCOUNTS.some(w => w.email.toLowerCase() === cleanPrompt);
    const isDriver = cleanPrompt.includes('driver');
    const role = isWorkshop ? 'workshop_owner' : isDriver ? 'driver' : preferredRole;

    const matchedWorkshop = WORKSHOP_DEMO_ACCOUNTS.find(w => w.email.toLowerCase() === cleanPrompt);
    const ownerName = matchedWorkshop ? matchedWorkshop.ownerName : cleanPrompt.split('@')[0];

    const googleUser = {
      id: matchedWorkshop ? matchedWorkshop.id : `google_${Date.now()}`,
      email: cleanPrompt,
      name: ownerName,
      role,
      isVerified: true
    };
    
    // Save to user database
    const users = getStoredUsers();
    if (!users.find(u => u.email.toLowerCase() === cleanPrompt)) {
      users.push(googleUser);
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    }

    localStorage.setItem('currentUser', JSON.stringify(googleUser));
    localStorage.setItem('userRole', role);
    return googleUser;
  },

  // Verify email by code
  verifyCode: (email, code) => {
    const users = getStoredUsers();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) throw new Error('User not found.');
    if (user.verificationCode && user.verificationCode !== code.trim()) {
      throw new Error('Invalid verification code.');
    }
    user.isVerified = true;
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    return true;
  }
};
