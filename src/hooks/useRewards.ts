import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface Reward {
  id: string;
  task_id: string;
  amount: number;
  transaction_hash: string | null;
  status: string;
  distributed_at: string | null;
}

export function useRewards() {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [totalRewards, setTotalRewards] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRewards();
  }, []);

  const fetchRewards = async () => {
    const { data, error } = await supabase
      .from('rewards')
      .select('*');

    if (error) {
      console.error('Error fetching rewards:', error);
      return;
    }

    setRewards(data);
    calculateTotalRewards(data);
    setLoading(false);
  };

  const calculateTotalRewards = (rewardsData: Reward[]) => {
    const total = rewardsData.reduce((sum, reward) => {
      return reward.status === 'distributed' ? sum + reward.amount : sum;
    }, 0);
    setTotalRewards(total);
  };

  return {
    rewards,
    totalRewards,
    loading,
    refreshRewards: fetchRewards
  };
}