export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          phone: string | null;
          name: string;
          role: 'student' | 'teacher' | 'admin';
          avatar: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          phone?: string | null;
          name: string;
          role?: 'student' | 'teacher' | 'admin';
          avatar?: string | null;
        };
        Update: {
          email?: string;
          phone?: string | null;
          name?: string;
          role?: 'student' | 'teacher' | 'admin';
          avatar?: string | null;
        };
      };
      orders: {
        Row: {
          id: string;
          user_id: string;
          order_number: string;
          total_amount: number;
          status: 'pending' | 'paid' | 'completed' | 'cancelled';
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          order_number: string;
          total_amount: number;
          status?: 'pending' | 'paid' | 'completed' | 'cancelled';
        };
        Update: {
          status?: 'pending' | 'paid' | 'completed' | 'cancelled';
          total_amount?: number;
        };
      };
    };
  };
}