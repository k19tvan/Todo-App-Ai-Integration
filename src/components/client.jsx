
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://sqlwkxgywfoavdtswnkg.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxbHdreGd5d2ZvYXZkdHN3bmtnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc4NTQ0NTcsImV4cCI6MjA3MzQzMDQ1N30.15OgwC6NxctzaF-LPva7lN6LDRpI58eHVFU-xbprD2Q"
export const supabase = createClient(supabaseUrl, supabaseKey)