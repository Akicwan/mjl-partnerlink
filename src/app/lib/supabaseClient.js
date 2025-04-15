import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jdqifenyuiedsfclfbhx.supabase.co' // Replace this
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpkcWlmZW55dWllZHNmY2xmYmh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ3MjQyODcsImV4cCI6MjA2MDMwMDI4N30.U9iZflR2QWD8xKMTftKKkNJQzaN4Lzl-fBBiMpJhbUI' // Replace this

export const supabase = createClient(supabaseUrl, supabaseAnonKey)