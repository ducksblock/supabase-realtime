import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient, RealtimeClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY

@Injectable()
export class SupabaseService {
    private supabase: SupabaseClient;

    constructor() {
        this.supabase = createClient(
            supabaseUrl,
            supabaseKey
        );
    }

    getClient(): SupabaseClient {
        return this.supabase;
    }

    getRealtime(): RealtimeClient {
        return this.supabase.realtime;
    }
}
