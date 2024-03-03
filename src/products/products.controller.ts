import { Controller, Get, Post, Body, OnModuleInit } from '@nestjs/common';
import { SupabaseService } from '../../supabase/supabase.service';
import { RealtimeClient, RealtimeChannel } from '@supabase/realtime-js';

@Controller('products')
export class ProductsController implements OnModuleInit {
    private supabase: any;
    private realtime: RealtimeClient;
    private channel: RealtimeChannel;

    constructor(private readonly supabaseService: SupabaseService) {
    }

    async onModuleInit() {
        this.supabase = this.supabaseService.getClient();
        this.realtime = this.supabaseService.getRealtime();

        this.channel = this.realtime.channel('products');

        this.channel
            .on('postgres_changes', {
                event: '*',
                schema: 'public',
                table: 'products',
            }, (payload) => this.handleRealtimeEvent(payload))
            .subscribe();
    }

    private handleRealtimeEvent(payload: any) {
        console.log('Real-time event received:', payload);
    }

    @Get()
    async findAll() {
        try {
            const { data, error } = await this.supabase.from('products').select('*');

            if (error) {
                console.error('Error fetching data:', error.message);
                throw new Error(error.message);
            }

            console.log('Success!')
            console.log('Fetched data:', data);

            return data;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    @Post()
    async create(@Body() productData: any) {
        try {
            const { data, error } = await this.supabase.from('products').upsert([productData]);

            if (error) {
                console.error('Error inserting data:', error.message);
                throw new Error(error.message);
            }

            console.log('Success!')
            console.log('Inserted data:', data);
            return { message: 'Successfully inserted!' };
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
