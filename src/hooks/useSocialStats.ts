import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface SocialStats {
  platform: string;
  followers_count: number;
  posts_count: number;
  engagement_rate: number;
  last_updated: string;
}

export function useSocialStats() {
  const [stats, setStats] = useState<SocialStats[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSocialStats();
  }, []);

  const fetchSocialStats = async () => {
    const { data, error } = await supabase
      .from('social_stats')
      .select('*');

    if (error) {
      console.error('Error fetching social stats:', error);
      return;
    }

    setStats(data);
    setLoading(false);
  };

  const updateSocialStats = async (platform: string, newStats: Partial<SocialStats>) => {
    const { error } = await supabase
      .from('social_stats')
      .upsert({
        platform,
        ...newStats,
        last_updated: new Date().toISOString()
      });

    if (error) throw error;
    await fetchSocialStats();
  };

  return {
    stats,
    loading,
    updateSocialStats
  };
}