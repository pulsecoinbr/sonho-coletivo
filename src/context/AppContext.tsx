import React, { createContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session } from '@supabase/supabase-js';

interface AppContextType {
  session: Session | null;
  user: any; // This will hold the profile data from the 'profiles' table
  signIn: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<void>;
  signUp: (email: string, password: string, firstName: string, lastName: string) => Promise<any>;
}

export const AppContext = createContext<AppContextType>({
  session: null,
  user: null,
  signIn: async () => {},
  signOut: async () => {},
  signUp: async () => {},
});

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<any>(null); // State to hold user profile data

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      if (session) {
        fetchUser(session.user.id);
      }
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        fetchUser(session.user.id);
      } else {
        setUser(null); // Clear user profile on sign out
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUser = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      setUser(data);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const signIn = async (email: string, password: string) => {
    return await supabase.auth.signInWithPassword({ email, password });
  };

  const signOut = async () => {
    return await supabase.auth.signOut();
  };

  const signUp = async (email: string, password: string, firstName: string, lastName: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        }
      }
    });

    if (data.user) {
      // The handle_new_user function in Supabase will automatically create the profile.
      // No need to manually insert here if the trigger is set up.
      // However, if the trigger is not set up or needs to be explicit,
      // you might insert here, but it's generally better to rely on the trigger.
      // For now, I'll keep the manual insert as a fallback/example if the trigger isn't active.
      await supabase
        .from('profiles')
        .insert([
          {
            id: data.user.id,
            first_name: firstName,
            last_name: lastName,
          }
        ]);
    }

    return { data, error };
  };

  return (
    <AppContext.Provider value={{ session, user, signIn, signOut, signUp }}>
      {children}
    </AppContext.Provider>
  );
};