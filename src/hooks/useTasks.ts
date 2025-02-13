import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface Task {
  id: string;
  title: string;
  description: string;
  reward_amount: number;
  task_type: string;
  platform: string | null;
  required_proof: string | null;
  is_active: boolean;
}

interface UserTask {
  id: string;
  task_id: string;
  status: string;
  proof_submitted: string | null;
  completed_at: string | null;
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [userTasks, setUserTasks] = useState<UserTask[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
    fetchUserTasks();
  }, []);

  const fetchTasks = async () => {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('is_active', true);

    if (error) {
      console.error('Error fetching tasks:', error);
      return;
    }

    setTasks(data);
    setLoading(false);
  };

  const fetchUserTasks = async () => {
    const { data, error } = await supabase
      .from('user_tasks')
      .select('*');

    if (error) {
      console.error('Error fetching user tasks:', error);
      return;
    }

    setUserTasks(data);
  };

  const submitTaskCompletion = async (taskId: string, proof: string) => {
    const { error } = await supabase
      .from('user_tasks')
      .insert({
        task_id: taskId,
        proof_submitted: proof,
        status: 'pending'
      });

    if (error) throw error;
    await fetchUserTasks();
  };

  return {
    tasks,
    userTasks,
    loading,
    submitTaskCompletion
  };
}