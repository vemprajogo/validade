
import { supabase } from "@/integrations/supabase/client";

export interface Code {
  id: number;
  codigo: string;
  produto: string;
  industria: string;
  created_at: string;
}

export const fetchCodes = async (): Promise<Code[]> => {
  try {
    const { data, error } = await supabase
      .from('codigos')
      .select('*');
    
    if (error) {
      console.error('Error fetching codes:', error);
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('Error in fetchCodes:', error);
    return [];
  }
};

export const fetchCodeByCode = async (code: string): Promise<Code | null> => {
  try {
    const { data, error } = await supabase
      .from('codigos')
      .select('*')
      .eq('codigo', code)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        // No rows found
        return null;
      }
      console.error('Error fetching code details:', error);
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('Error in fetchCodeByCode:', error);
    return null;
  }
};
